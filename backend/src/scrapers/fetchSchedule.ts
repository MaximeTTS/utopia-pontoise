// Scrape the weekly gazette and return its label and PDF link
import { loadPage, cleanText } from "./client";

export interface WeeklySchedule {
  label: string;
  pdfUrl: string;
}

// Récupère la gazette de la semaine en cours et son intitulé
export async function getWeeklySchedule(): Promise<WeeklySchedule | null> {
  const $ = await loadPage("/?mode=prochains");

  // La gazette est le premier PDF de la page, sous le bouton "Télécharger la gazette"
  const pdfUrl = $("a[href$='.pdf']").first().attr("href");
  if (!pdfUrl) return null;

  // Le site titre chaque semaine "Semaine du 26 août au 01 septembre"
  const heading = $("h3")
    .filter((_, el) => cleanText($(el).text()).toLowerCase().startsWith("semaine du"))
    .first();
  const label = cleanText(heading.text()) || "en cours";

  return { label, pdfUrl };
}
