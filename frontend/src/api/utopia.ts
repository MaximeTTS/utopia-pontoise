import axios from "axios";
import { fetchWithCache } from "../utils/cacheHelper";
export interface Movie {
  title: string;
  link: string;
}
export interface MovieDetails extends Movie {
  description: string;
  image: string | null;
  trailer: string | null;
}
export interface WeeklySchedule {
  label: string;
  pdfUrl: string;
}
export interface DailySchedule {
  url: string;
  resourceType: "pdf" | "image";
}

const BASE = ""; // proxy CRA → http://localhost:3000

// Liste des films de la semaine
export function fetchWeekMovies() {
  return fetchWithCache("weekMovies", () => axios.get<Movie[]>("/api/semaine").then((r) => r.data));
}

// Détails d'un film
export function fetchMovieDetails(url: string) {
  return fetchWithCache(`movieDetails:${url}`, () =>
    axios.get<MovieDetails>(`${BASE}/api/film?url=${encodeURIComponent(url)}`).then((r) => r.data)
  );
}

// Horaire de la semaine
export function fetchWeeklySchedule() {
  return axios.get<WeeklySchedule>("/api/horaires").then((r) => r.data);
}

// Horaire du jour
export function fetchDailySchedule() {
  return fetchWithCache("dailySchedule", () =>
    axios.get<DailySchedule>(`${BASE}/api/horaires/aujourdhui`).then((r) => r.data)
  );
}
