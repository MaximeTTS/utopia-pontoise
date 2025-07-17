import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchDailyMovie } from "../backend/src/fetchScrape";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const film = await fetchDailyMovie();
    res.status(200).json(film);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors du scraping du film du jour." });
  }
}
