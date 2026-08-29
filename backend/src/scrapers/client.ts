// Shared HTTP client and URL helpers for the Utopia scrapers
import axios from "axios";
import { load, CheerioAPI } from "cheerio";

// Le site a migré de www.cinemas-utopia.org/saintouen vers ce sous-domaine
export const BASE_URL = "https://saintouen.cinemas-utopia.org";

const HEADERS = { "User-Agent": "Mozilla/5.0", "Accept-Language": "fr" };

// Charge une page du site et renvoie le document cheerio prêt à requêter
export async function loadPage(path: string): Promise<CheerioAPI> {
  const { data } = await axios.get(absoluteUrl(path), { headers: HEADERS, timeout: 10000 });
  return load(data);
}

// Transforme un href relatif du site en URL absolue
export function absoluteUrl(href: string): string {
  return new URL(href, BASE_URL).toString();
}

// Normalise un texte scrapé : espaces insécables et retours à la ligne compris
export function cleanText(value: string | undefined): string {
  return (value || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
}
