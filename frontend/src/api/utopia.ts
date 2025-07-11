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
export interface DailyMovie {
  title: string;
  showtime: string;
  cast: string;
  dateRange: string;
  description: string;
  imageUrl: string;
}

const BASE = ""; // proxy CRA → http://localhost:3000

// Liste des films de la semaine
export function fetchWeekMovies() {
  return fetchWithCache("weekMovies", () => axios.get<Movie[]>("/api/semaine").then((r) => r.data));
}

// Détails d'un film avec l'ajout d'un trailer auto via l'api youtube
export function fetchMovieDetails(url: string): Promise<MovieDetails> {
  return fetchWithCache<MovieDetails>(`/api/film?url=${encodeURIComponent(url)}`, () =>
    axios.get<MovieDetails>(`/api/film?url=${encodeURIComponent(url)}`).then((res) => res.data)
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

// Film du jour
export function fetchDailyMovie(): Promise<DailyMovie> {
  return axios.get<DailyMovie>("/api/film-du-jour").then((r) => r.data);
}
