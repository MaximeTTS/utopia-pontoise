// backend/src/fetchScrape.ts

import axios from "axios";
import { load } from "cheerio";

export interface Movie {
  title: string;
  link: string;
}
export interface MovieDetails extends Movie {
  description: string;
  image: string | null;
  trailer: string | null;
}

const HEADERS = { headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "fr" } };
const WEEK_URL = "https://www.cinemas-utopia.org/saintouen/index.php?mode=prochains";

// Nettoyage rapide de HTML en texte brut
const clean = (html: string) =>
  html
    .replace(/&nbsp;/gi, " ") // remplacer entités &nbsp; par espace
    .replace(/<img[^>]*>/gi, "") // retirer les balises <img>
    .replace(/<br\s*\/?>/gi, "\n\n") // convertir <br> en double saut de ligne
    .replace(/<[^>]+>/g, "") // supprimer toutes les autres balises
    .replace(/&lt;|&gt;/g, "") // supprimer les entités &lt; et &gt;
    .replace(/^[«»\s]+/, "") // retirer guillemets français et espaces en début
    .replace(/^[^A-Za-zÀ-ÖØ-öø-ÿ]*/, "") // retirer tout caractère non-lettre en début
    .replace(/\s+/g, " ") // compacter les espaces multiples
    .trim();

// Films de la semaine
export async function getWeekMovies(): Promise<Movie[]> {
  const { data } = await axios.get(WEEK_URL, HEADERS);
  const $ = load(data);
  return $("h4:contains('LES FILMS PROGRAMMÉS')")
    .next("ul")
    .find("li a")
    .toArray()
    .map((el) => {
      const title = $(el).text().trim();
      let href = $(el).attr("href") || "";
      if (!href.includes("mode=film")) href += (href.includes("?") ? "&" : "?") + "mode=film";
      return { title, link: new URL(href, WEEK_URL).toString() };
    });
}

// Détails d'un film
export async function getMovieDetails(url: string): Promise<MovieDetails> {
  const detailUrl = url.includes("mode=film") ? url : `${url}${url.includes("?") ? "&" : "?"}mode=film`;
  const { data } = await axios.get(detailUrl, HEADERS);
  const $ = load(data);

  const title = $("div#centre div#film h1").text().trim();
  const raw = $("div#centre div#film p.texte").html() || "";
  const description = clean(raw);

  const img = $("img.imgfilm").attr("src") || "";
  const image = img ? new URL(img, detailUrl).toString() : null;

  const src = $("video source").attr("src") || $("iframe").attr("src") || "";
  const trailer = src ? new URL(src, detailUrl).toString() : null;

  return { title, link: detailUrl, description, image, trailer };
}
