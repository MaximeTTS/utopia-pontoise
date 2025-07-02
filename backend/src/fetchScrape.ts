// backend/src/fetchScrape.ts

import axios from "axios";
import * as cheerio from "cheerio";

export interface Movie {
  title: string;
  description: string;
  pubDate: string;
  link: string;
}
export interface MovieDetails extends Movie {
  image: string | null;
  trailer: string | null;
}

const WEEK_URL = "https://www.cinemas-utopia.org/saintouen/index.php?mode=prochains";
const HEADERS = {
  "User-Agent": "Mozilla/5.0",
  "Accept-Language": "fr",
};

/**
 * Scrape la liste des films programmés pour la semaine
 * en ciblant la section sous le titre "LES FILMS PROGRAMMÉS".
 */
export async function getWeekMovies(): Promise<Movie[]> {
  // Charger la page HTML
  const { data: html } = await axios.get(WEEK_URL, { headers: HEADERS });
  const $ = cheerio.load(html);

  // Trouver l'en-tête h4 avec texte exact
  const header = $("h4")
    .filter((_, el) => $(el).text().trim().toUpperCase().startsWith("LES FILMS PROGRAMMÉS"))
    .first();
  if (!header.length) {
    console.error('⚠️ Section "LES FILMS PROGRAMMÉS" introuvable');
    return [];
  }

  // La liste se situe dans la première <ul> qui suit ce header
  const list = header.nextAll("ul").first();
  if (!list.length) {
    console.error("⚠️ Liste des films introuvable après le header");
    return [];
  }

  // Parcourir chaque lien dans la liste
  const movies: Movie[] = [];
  list.find("li a").each((_, el) => {
    const a = $(el);
    const title = a.text().trim();
    if (!title) return;

    // Construire URL vers la fiche film
    let href = a.attr("href") || "";
    if (!href.includes("mode=film")) {
      href += (href.includes("?") ? "&" : "?") + "mode=film";
    }
    const link = new URL(href, WEEK_URL).toString();

    movies.push({ title, description: "", pubDate: new Date().toISOString(), link });
  });

  return movies;
}

/**
 * Scrape la fiche détaillée d'un film via son URL Utopia.
 */
export async function getMovieDetails(url: string): Promise<MovieDetails> {
  // S'assurer du mode film
  const detailUrl = url.includes("mode=film") ? url : `${url}${url.includes("?") ? "&" : "?"}mode=film`;
  const { data } = await axios.get(detailUrl, { headers: HEADERS });
  const $ = cheerio.load(data);

  const title = $("div#centre div#film h1").text().trim();
  const description = $("div#centre div#film p.texte").html()?.trim() || "";

  const imgSrc = $("div#centre div#film img.imgfilm").attr("src");
  const image = imgSrc ? new URL(imgSrc, detailUrl).toString() : null;

  const videoSrc =
    $("div#centre div#film video source").attr("src") || $("div#centre div#film iframe").attr("src") || null;
  const trailer = videoSrc ? new URL(videoSrc, detailUrl).toString() : null;

  return { title, description, pubDate: new Date().toISOString(), link: detailUrl, image, trailer };
}
