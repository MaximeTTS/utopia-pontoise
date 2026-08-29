// Groups the day's screenings by film and splits them between afternoon and evening
import { Screening, Showtime } from "../api/utopia";

export interface MovieScreenings {
  title: string;
  link: string;
  venue: string;
  times: string[];
}

// Le programme bascule en soirée à partir de 16h00
const EVENING_HOUR = 16;

// Regroupe les séances par film pour éviter de répéter le titre à chaque horaire
export function groupByMovie(screenings: Screening[]): MovieScreenings[] {
  const films: MovieScreenings[] = [];

  screenings.forEach((s) => {
    const entry = films.find((film) => film.link === s.link);
    if (entry) {
      entry.times.push(s.time);
    } else {
      films.push({ title: s.title, link: s.link, venue: s.room, times: [s.time] });
    }
  });

  return films;
}

// Un film part en soirée dès que sa première séance démarre après 16h
function isEvening(film: MovieScreenings): boolean {
  return parseInt(film.times[0], 10) >= EVENING_HOUR;
}

// Sépare le programme en trois : le film à la une, l'après-midi et la soirée
export function splitDay(screenings: Screening[]) {
  const [featured, ...rest] = groupByMovie(screenings);

  return {
    featured: featured || null,
    afternoon: rest.filter((film) => !isEvening(film)),
    evening: rest.filter(isEvening),
  };
}

export interface DayShowtimes {
  day: string;
  times: string[];
}

// Regroupe les séances d'un film par jour : une ligne par date plutôt qu'une pastille par horaire
export function groupByDay(showtimes: Showtime[]): DayShowtimes[] {
  const days: DayShowtimes[] = [];

  showtimes.forEach((s) => {
    const entry = days.find((day) => day.day === s.day);
    if (entry) {
      entry.times.push(s.time);
    } else {
      days.push({ day: s.day, times: [s.time] });
    }
  });

  return days;
}
