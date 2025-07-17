// Serverless API retrieving today's schedule
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDailySchedule } from "../../backend/src/scrapers/fetchDailySchedule";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const daily = await getDailySchedule();
    if (!daily) {
      return res.status(404).json({ error: "Aucun horaire du jour trouvé." });
    }
    res.status(200).json(daily);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors du scraping de l'horaire du jour." });
  }
}
