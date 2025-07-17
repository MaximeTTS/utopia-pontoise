import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getMovieDetails } from "../backend/src/fetchScrape";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const queryUrl = Array.isArray(req.query.url) ? req.query.url[0] : req.query.url;
  if (!queryUrl) {
    return res.status(400).json({ error: "Paramètre url manquant." });
  }
  try {
    const details = await getMovieDetails(decodeURIComponent(queryUrl));
    res.status(200).json(details);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors du scraping du détail du film." });
  }
}
