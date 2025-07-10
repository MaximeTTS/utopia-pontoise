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
export interface DailyMovie {
  title: string;
  showtime: string;
  cast: string;
  dateRange: string;
  description: string;
  imageUrl: string;
}

const HEADERS = { headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "fr" } };
const WEEK_URL = "https://www.cinemas-utopia.org/saintouen/index.php?mode=prochains";

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
  // Récupérer la description brute (HTML -> texte)
  const description = $("div#centre div#film p.texte").text().trim();

  const imgSrc = $("img.imgfilm").attr("src") || "";
  const image = imgSrc ? new URL(imgSrc, detailUrl).toString() : null;

  const videoSrc = $("video source").attr("src") || $("iframe").attr("src") || null;
  const trailer = videoSrc ? new URL(videoSrc, detailUrl).toString() : null;

  return { title, link: detailUrl, description, image, trailer };
}

// Film du jour
export async function fetchDailyMovie(): Promise<DailyMovie> {
  const pageUrl = "https://www.cinemas-utopia.org/saintouen/";
  const response = await axios.get(pageUrl);
  const $ = load(response.data);

  const filmDiv = $("#film");
  const showtime = filmDiv.find(".soiree strong").text().trim();
  const title = filmDiv.find("h1").text().trim();
  const cast = filmDiv.find(".cast strong").parent().text().trim().replace(/\s+/g, " ");
  const dateRange = filmDiv.find(".date").text().trim();

  const description = filmDiv.find(".texte").clone().find("img").remove().end().text().replace(/\s+/g, " ").trim();

  // Normalisation de l'URL de l'image
  const imgRelative = filmDiv.find(".texte img").attr("src") || "";
  const imageUrl = new URL(imgRelative, pageUrl).href;

  return { title, showtime, cast, dateRange, description, imageUrl };
}
