// Scrape the "weekly schedule" section and return the PDF link
import axios from "axios";
import * as cheerio from "cheerio";

const WEEK_URL = "https://www.cinemas-utopia.org/saintouen/index.php?mode=prochains";
const HEADERS = { "User-Agent": "Mozilla/5.0", "Accept-Language": "fr" };

// Scrape la section "LES HORAIRES (format PDF)" et retourne le label et l'URL du PDF.
export async function getWeeklySchedule(): Promise<{ label: string; pdfUrl: string } | null> {
  const { data: html } = await axios.get(WEEK_URL, { headers: HEADERS });
  const $ = cheerio.load(html);

  // Cibler le titre h4 commençant par "LES HORAIRES"
  const header = $("h4")
    .filter((_, el) => $(el).text().trim().toUpperCase().startsWith("LES HORAIRES"))
    .first();
  if (!header.length) return null;

  // Récupérer le premier lien dans la liste qui suit
  const linkEl = header.nextAll("ul").first().find("li a").first();
  const label = linkEl.text().trim();
  const href = linkEl.attr("href");
  if (!href) return null;

  // Construire URL absolu vers le PDF
  const pdfUrl = new URL(href, WEEK_URL).toString();
  return { label, pdfUrl };
}
