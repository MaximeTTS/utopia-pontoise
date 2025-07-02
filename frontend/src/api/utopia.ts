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

// Ne plus définir BASE ici, on passe par proxy CRA

export const fetchWeekMovies = () => axios.get<Movie[]>("/api/semaine").then((r) => r.data);

export const fetchMovieDetails = (url: string) =>
  axios.get<MovieDetails>(`/api/film?url=${encodeURIComponent(url)}`).then((r) => r.data);
