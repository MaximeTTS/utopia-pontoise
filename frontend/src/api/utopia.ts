import axios from "axios";
export interface Movie {
  title: string;
  description: string;
  pubDate: string;
  link: string;
}
export interface MovieDetails extends Movie {
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

const BASE = ""; // proxy CRA → renvoie vers http://localhost:3000

export function fetchWeekMovies() {
  return axios.get<Movie[]>("/api/semaine").then((r) => r.data);
}

export function fetchMovieDetails(url: string) {
  return axios.get<MovieDetails>(`/api/film?url=${encodeURIComponent(url)}`).then((r) => r.data);
}

// récupère le label et l'URL du PDF horaires
export function fetchWeeklySchedule() {
  return axios.get<WeeklySchedule>("/api/horaires").then((r) => r.data);
}

// récupère le pdf et l'URL du PDF horaires
export function fetchDailySchedule() {
  return axios.get<DailySchedule>(`${BASE}/api/horaires/aujourdhui`).then((response) => response.data);
}
