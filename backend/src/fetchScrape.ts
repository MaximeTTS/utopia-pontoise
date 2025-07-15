// backend/src/fetchScrape.ts

import axios from "axios";
import { load } from "cheerio";
import * as dotenv from "dotenv";

dotenv.config();
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

// Vérification de la clé YouTube
const YT_API_KEY = process.env.YOUTUBE_API_KEY;
if (!YT_API_KEY) {
  throw new Error("La variable YOUTUBE_API_KEY n'est pas définie dans .env");
}

const HEADERS = { headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "fr" } };
const WEEK_URL = "https://www.cinemas-utopia.org/saintouen/index.php?mode=prochains";
const YT_API_URL = "https://www.googleapis.com/youtube/v3/search";

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

  // Scraping initial
  const { data } = await axios.get(detailUrl, HEADERS);
  const $ = load(data);

  const title = $("div#centre div#film h1").text().trim();
  const description = $("div#centre div#film p.texte").text().trim();

  const imgSrc = $("img.imgfilm").attr("src") || "";
  const image = imgSrc ? new URL(imgSrc, detailUrl).toString() : null;

  let videoSrc = $("video source").attr("src") || $("iframe").attr("src") || null;

  // Fallback YouTube si pas de trailer trouvé
  if (!videoSrc) {
    try {
      const ytRes = await axios.get(YT_API_URL, {
        params: {
          key: YT_API_KEY,
          part: "snippet",
          q: `${title} trailer`,
          maxResults: 1,
          type: "video",
          videoEmbeddable: "true",
        },
      });
      const items = ytRes.data.items;
      if (items && items.length > 0) {
        const videoId = items[0].id.videoId;
        videoSrc = `https://www.youtube.com/embed/${videoId}`;
      }
    } catch {
      videoSrc = null;
    }
  }

  const trailer = videoSrc ? new URL(videoSrc, detailUrl).toString() : null;

  return { title, link: detailUrl, description, image, trailer };
}

// Film du jour
export async function fetchDailyMovie(): Promise<DailyMovie> {
  const pageUrl = "https://www.cinemas-utopia.org/saintouen/";
  const { data } = await axios.get(pageUrl, HEADERS);
  const $ = load(data);
  const filmDiv = $("#film");
  const title = filmDiv.find("h1").text().trim();
  const showtime = filmDiv.find(".soiree strong").text().trim();
  const cast = filmDiv.find(".cast strong").parent().text().trim().replace(/\s+/g, " ");
  const dateRange = filmDiv.find(".date").text().trim();
  const rawHtml = filmDiv.find(".texte").html() || "";
  const description = rawHtml

    .replace(/<img[\s\S]*?>/gi, "")
    .replace(/<\/p>\s*<p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .trim();

  const imgSrc = filmDiv.find(".texte img").attr("src") || "";
  const imageUrl = new URL(imgSrc, pageUrl).href;

  return { title, showtime, cast, dateRange, description, imageUrl };
}
