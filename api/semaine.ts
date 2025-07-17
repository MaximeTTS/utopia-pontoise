import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getWeekMovies } from "../backend/src/fetchScrape";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const movies = await getWeekMovies();
    res.status(200).json(movies);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors du scraping des films de la semaine." });
  }
}
