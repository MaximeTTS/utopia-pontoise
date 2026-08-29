// Scrape the screenings listed on the homepage schedule
import { loadPage, absoluteUrl, cleanText } from "./client";

export interface Screening {
  title: string;
  time: string;
  room: string;
  link: string;
}

export interface DailySchedule {
  day: string;
  screenings: Screening[];
}

// Libellé du jour tel qu'affiché par le site, ex. "samedi 29 août"
function todayLabel(): string {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

// Toutes les séances annoncées, groupées par jour dans l'ordre du site
async function getScreeningsByDay(): Promise<Map<string, Screening[]>> {
  const $ = await loadPage("/?mode=prochains");
  const byDay = new Map<string, Screening[]>();

  $(".item_liste_horaire").each((_, el) => {
    const item = $(el);
    const day = cleanText(item.find(".jour_seance").text());
    const href = item.find("a").attr("href") || item.closest("a").attr("href");
    // Les séances de la page d'accueil portent toutes un jour et un lien de fiche
    if (!day || !href) return;

    const screening: Screening = {
      title: cleanText(item.find("b").text()),
      time: cleanText(item.find(".heure_seance").text()),
      room: cleanText(item.find(".nom_salle").text()),
      link: absoluteUrl(href),
    };
    byDay.set(day, [...(byDay.get(day) || []), screening]);
  });

  return byDay;
}

// Séances du jour, ou du prochain jour programmé si la journée est terminée
export async function getDailySchedule(): Promise<DailySchedule | null> {
  const byDay = await getScreeningsByDay();
  if (byDay.size === 0) return null;

  const label = todayLabel();
  const today = [...byDay.keys()].find((day) => day.toLowerCase() === label.toLowerCase());
  const day = today ?? [...byDay.keys()][0];

  return { day, screenings: byDay.get(day) || [] };
}
