// Serverless API giving the weekly schedule PDF
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getWeeklySchedule } from "../backend/src/scrapers/fetchSchedule";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const schedule = await getWeeklySchedule();
    if (!schedule) {
      return res.status(404).json({ error: "Aucun horaire trouvé." });
    }
    res.status(200).json(schedule);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors du scraping des horaires hebdomadaires." });
  }
}
