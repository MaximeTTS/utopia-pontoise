// Utility functions to scrape movie listings and details
import axios from "axios";
import { load, CheerioAPI } from "cheerio";
import * as dotenv from "dotenv";
import { loadPage, absoluteUrl, cleanText, BASE_URL } from "./client";
import { getDailySchedule } from "./fetchDailySchedule";

dotenv.config();

export interface Movie {
  title: string;
  link: string;
  image: string | null;
  duration: string;
  countryYear: string;
}

// Fiche technique éclatée en champs, pour que le front les affiche séparément
export interface MovieInfo {
  director: string;
  cast: string;
  screenplay: string;
  genre: string;
  country: string;
  year: string;
  duration: string;
  version: string;
  release: string;
}

export interface MovieDetails extends Movie {
  description: string;
  trailer: string | null;
  info: MovieInfo;
  showtimes: Showtime[];
}

export interface Showtime {
  day: string;
  time: string;
  room: string;
}

export interface DailyMovie extends MovieDetails {
  showtime: string;
  dateRange: string;
}

// La clé YouTube est optionnelle : sans elle on se prive juste du repli bande-annonce
const YT_API_KEY = process.env.YOUTUBE_API_KEY;
const YT_API_URL = "https://www.googleapis.com/youtube/v3/search";

// Le titre d'une carte est le premier noeud texte, avant l'ornement et les métadonnées
function cardTitle($: CheerioAPI, card: any): string {
  return cleanText(
    $(card)
      .find(".film_a_laffiche_titre")
      .contents()
      .filter((_, node) => node.type === "text")
      .first()
      .text()
  );
}

// Le site liste des vignettes 300x428 : on remonte à l'original, bien plus net.
// Les tailles intermédiaires (768, 1024) ne renvoient qu'un placeholder, on les ignore.
function fullSize(url: string): string {
  return url.replace(/-\d+x\d+(\.[a-z]+)$/i, "$1");
}

// Films de la semaine
export async function getWeekMovies(): Promise<Movie[]> {
  const $ = await loadPage("/a-laffiche/");

  return $(".film_a_laffiche")
    .toArray()
    .map((card) => {
      const $card = $(card);
      const href = $card.find("a").attr("href") || "";
      const poster = $card.find(".film_a_laffiche_affiche img[data-src]").attr("data-src");

      return {
        title: cardTitle($, card),
        link: href ? absoluteUrl(href) : "",
        image: poster ? fullSize(absoluteUrl(poster)) : null,
        duration: cleanText($card.find(".film_a_laffiche_duree").text()),
        countryYear: cleanText($card.find(".film_a_laffiche_pays_annee").text()),
      };
    })
    // Le site intercale des cartes vides pour ses événements, on ne garde que les films
    .filter((movie) => movie.title !== "" && movie.link !== "");
}

// La fiche d'un film n'expose que sa couverture large : on va chercher l'affiche
// portrait sur la page "à l'affiche", mémorisée pour ne pas la rescraper à chaque appel
const POSTER_TTL = 30 * 60 * 1000;
let posterCache: { expiresAt: number; byId: Map<string, string> } | null = null;

// Les liens du site portent parfois un &src=… : on ne compare que l'identifiant
function filmId(url: string): string {
  return new URL(url, BASE_URL).searchParams.get("id") || url;
}

async function getPosters(): Promise<Map<string, string>> {
  if (posterCache && Date.now() < posterCache.expiresAt) return posterCache.byId;

  const movies = await getWeekMovies();
  const byId = new Map<string, string>();
  movies.forEach((movie) => {
    if (movie.image) byId.set(filmId(movie.link), movie.image);
  });

  posterCache = { expiresAt: Date.now() + POSTER_TTL, byId };
  return byId;
}

// Découpe une colonne "Label : valeur<br>…" en lignes propres, entités décodées
function columnLines($: CheerioAPI, column: any): string[] {
  const html = ($(column).html() || "").replace(/<br\s*\/?>/gi, "\n");
  return load(html)
    .root()
    .text()
    .split("\n")
    .map((line) => cleanText(line))
    .filter(Boolean);
}

// Lit une valeur dans les lignes "Label : valeur" d'une colonne
function readField(lines: string[], label: string): string {
  const line = lines.find((item) => item.toLowerCase().startsWith(label.toLowerCase()));
  return line ? cleanText(line.slice(line.indexOf(":") + 1)) : "";
}

// Cherche une bande-annonce sur YouTube quand le site n'en héberge pas
async function findTrailerOnYouTube(title: string): Promise<string | null> {
  if (!YT_API_KEY) return null;

  try {
    const { data } = await axios.get(YT_API_URL, {
      params: {
        key: YT_API_KEY,
        part: "snippet",
        q: `${title} bande-annonce`,
        maxResults: 1,
        type: "video",
        videoEmbeddable: "true",
      },
    });
    const videoId = data.items?.[0]?.id?.videoId;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

// Détails d'un film avec l'ajout d'un trailer auto via l'api youtube
export async function getMovieDetails(url: string): Promise<MovieDetails> {
  const $ = await loadPage(url);
  const content = $(".entry-content").first();

  const title = cleanText($("h2").first().text());

  // Le site emploie deux gabarits : les paragraphes du synopsis portent tantôt
  // la classe wp-block-paragraph, tantôt aucune. On prend donc tous les <p> du
  // contenu, en écartant les colonnes qui portent la fiche technique.
  const description = content
    .find("p")
    .filter((_, el) => $(el).closest(".infos_films_columns").length === 0)
    .map((_, el) => cleanText($(el).text()))
    .get()
    .filter(Boolean)
    .join("\n\n");

  // Les colonnes et la grille d'horaires sont soeurs du bloc de contenu, pas ses filles
  const columns = $(".infos_films_columns .wp-block-column").toArray();
  const lines = columns.flatMap((column) => columnLines($, column));
  const info: MovieInfo = {
    director: readField(lines, "Réalisation"),
    cast: readField(lines, "Casting"),
    screenplay: readField(lines, "Scénario"),
    genre: readField(lines, "Type de film"),
    country: readField(lines, "Pays"),
    year: readField(lines, "Année"),
    duration: readField(lines, "Durée"),
    version: readField(lines, "Version"),
    release: readField(lines, "Sortie nationale"),
  };

  // L'affiche portrait de la page "à l'affiche" prime, la couverture large sert de repli
  const cover = $(".single_film_img").attr("data-back");
  const posters = await getPosters();
  const image = posters.get(filmId(url)) || (cover ? absoluteUrl(cover) : null);

  const hosted = content.find("video source").attr("src");
  const trailer = hosted ? absoluteUrl(hosted) : await findTrailerOnYouTube(title);

  const showtimes: Showtime[] = $(".liste_horaires_single_film .single_jour_liste_horaires")
    .toArray()
    .flatMap((block) => {
      const day = cleanText($(block).find(".single_jour_liste_horaires_titre").text());
      return $(block)
        .find(".item_liste_horaire")
        .toArray()
        .map((slot) => ({
          day,
          time: cleanText($(slot).find(".heure_seance").text()),
          room: cleanText($(slot).find(".nom_salle").text()),
        }));
    });

  return {
    title,
    link: absoluteUrl(url),
    image,
    duration: info.duration,
    countryYear: [info.country, info.year].filter(Boolean).join(" – "),
    description,
    trailer,
    info,
    showtimes,
  };
}

// Film du jour : la première séance programmée aujourd'hui, enrichie de sa fiche
export async function fetchDailyMovie(): Promise<DailyMovie | null> {
  const schedule = await getDailySchedule();
  const first = schedule?.screenings[0];
  if (!schedule || !first) return null;

  const details = await getMovieDetails(first.link);
  const times = schedule.screenings
    .filter((screening) => screening.link === first.link)
    .map((screening) => screening.time);

  return { ...details, showtime: times.join(", "), dateRange: schedule.day };
}
