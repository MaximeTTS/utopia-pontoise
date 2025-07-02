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

const BASE = "http://localhost:3000";

export const fetchWeekMovies = () => axios.get<Movie[]>(`${BASE}/api/semaine`).then((r) => r.data);

export const fetchMovieDetails = (url: string) =>
  axios.get<MovieDetails>(`${BASE}/api/film?url=${encodeURIComponent(url)}`).then((r) => r.data);
