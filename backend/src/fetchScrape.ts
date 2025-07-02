// Logique de scraping pour le cinéma Utopia Pontoise

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

const BASE_URL = "https://www.cinemas-utopia.org/saintouen/index.php?mode=prochains";
const HEADERS = { "User-Agent": "Mozilla/5.0", "Accept-Language": "fr" };

// Récupère et analyse la liste des films de la semaine

export async function getWeekMovies(): Promise<Movie[]> {
  const { data } = await axios.get(BASE_URL, { headers: HEADERS });
  const $ = cheerio.load(data);

  // Parcours chaque élément de la liste et construit l'objet Movie
  return $("#centre ul li")
    .map((_, el) => {
      const e = $(el);
      let href = e.find("h3 a").attr("href") || "";
      if (!href.includes("mode=film")) href += (href.includes("?") ? "&" : "?") + "mode=film";
      return {
        title: e.find("h3 a").text().trim(),
        description: e.find("p").text().trim(),
        pubDate: new Date().toISOString(),
        link: new URL(href, BASE_URL).toString(),
      };
    })
    .get()
    .filter((m) => m.title);
}

// Récupère et analyse les détails d'un film à partir de son URL

export async function getMovieDetails(url: string): Promise<MovieDetails> {
  // Assure que l'URL cible la page détail
  const detailUrl = url.includes("mode=film") ? url : url + (url.includes("?") ? "&" : "?") + "mode=film";
  const requestUrl = detailUrl + "&t=" + Date.now(); // force un appel frais

  const { data } = await axios.get(requestUrl, { headers: HEADERS });
  const $ = cheerio.load(data);

  // Titre du film
  const title = $("div#centre div#film h1").text().trim();
  // Synopsis détaillé
  const description = $("div#centre div#film p.texte").text().trim();
  // Affiche du film
  const imgSrc = $("div#centre div#film img.imgfilm").attr("src") || null;
  const image = imgSrc ? new URL(imgSrc, detailUrl).toString() : null;

  // URL de la bande-annonce ou vidéo intégrée
  let trailerSrc =
    $("div#centre div#film video source").attr("src") || $("div#centre div#film iframe").attr("src") || null;
  const trailer = trailerSrc ? new URL(trailerSrc, detailUrl).toString() : null;

  return { title, description, pubDate: new Date().toISOString(), link: detailUrl, image, trailer };
}
