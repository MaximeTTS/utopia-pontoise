// backend/src/fetchDailySchedule.ts
import axios from "axios";
import * as cheerio from "cheerio";

export interface DailySchedule {
  url: string;
  resourceType: "image" | "pdf";
}

const BASE = "http://www.cinemas-utopia.org/U-blog/saintouen/public/horaires/";

const HEADERS = { "User-Agent": "Mozilla/5.0", "Accept-Language": "fr" };

/* Test HEAD : vrai si 200 */
const exists = async (url: string) => {
  try {
    return (await axios.head(url, { timeout: 3000 })).status === 200;
  } catch {
    return false;
  }
};

/* 1) tente <jour>.jpg puis .pdf */
const tryToday = async (): Promise<string | null> => {
  const day = new Date().toLocaleString("en-US", { timeZone: "Europe/Paris", day: "numeric" });
  for (const ext of ["jpg", "pdf"]) {
    const url = `${BASE}${day}.${ext}`;
    if (await exists(url)) return url;
  }
  return null;
};

/* 2) sinon prend le fichier le + récent listé dans le répertoire */
const latestInDir = async (): Promise<string | null> => {
  const { data: html } = await axios.get(BASE, { timeout: 4000 });
  const $ = cheerio.load(html);

  const files = $("a[href$='.jpg'], a[href$='.pdf']")
    .map((_, el) => $(el).attr("href")!) // ← plus d’erreur TS
    .get()
    .filter((name) => /^\d+\.(jpg|pdf)$/i.test(name))
    .sort((a, b) => parseInt(b) - parseInt(a)); // 30 → 1

  return files[0] ? BASE + files[0] : null;
};

export const getDailySchedule = async (): Promise<DailySchedule | null> => {
  const url = (await tryToday()) || (await latestInDir());
  return url ? { url, resourceType: url.endsWith(".pdf") ? "pdf" : "image" } : null;
};
