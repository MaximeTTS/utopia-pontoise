// Helper functions to call the backend API
import axios from "axios";
import { fetchWithCache } from "../utils/cacheHelper";

export interface Movie {
  title: string;
  link: string;
  image: string | null;
  duration: string;
  countryYear: string;
}
export interface Showtime {
  day: string;
  time: string;
  room: string;
}
export interface MovieInfo {
  director: string;
  cast: string;
  screenplay: string;
  genre: string;
  country: string;
  year: string;
  duration: string;
  version: string;
  release: string;
}
export interface MovieDetails extends Movie {
  description: string;
  trailer: string | null;
  info: MovieInfo;
  showtimes: Showtime[];
}
export interface WeeklySchedule {
  label: string;
  pdfUrl: string;
}
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
export interface DailyMovie extends MovieDetails {
  showtime: string;
  dateRange: string;
}

// Liste des films à l'affiche, affiches comprises
export function fetchWeekMovies() {
  return fetchWithCache("weekMovies", () => axios.get<Movie[]>("/api/semaine").then((r) => r.data));
}

// Détails d'un film avec l'ajout d'un trailer auto via l'api youtube
export function fetchMovieDetails(url: string): Promise<MovieDetails> {
  const endpoint = `/api/film?url=${encodeURIComponent(url)}`;
  return fetchWithCache<MovieDetails>(endpoint, () => axios.get<MovieDetails>(endpoint).then((r) => r.data));
}

// Gazette de la semaine
export function fetchWeeklySchedule() {
  return fetchWithCache("weeklySchedule", () => axios.get<WeeklySchedule>("/api/horaires").then((r) => r.data));
}

// Séances du jour
export function fetchDailySchedule() {
  return fetchWithCache("dailySchedule", () =>
    axios.get<DailySchedule>("/api/horaires/aujourdhui").then((r) => r.data)
  );
}

// Film du jour
export function fetchDailyMovie() {
  return fetchWithCache("dailyMovie", () => axios.get<DailyMovie>("/api/film-du-jour").then((r) => r.data));
}
