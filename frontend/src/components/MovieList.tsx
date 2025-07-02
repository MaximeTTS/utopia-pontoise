import React, { useEffect, useState } from "react";
import { fetchWeekMovies, Movie } from "../api/utopia";
import { Link } from "react-router-dom";

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchWeekMovies()
      .then(setMovies)
      .catch((err) => console.error("Erreur chargement liste:", err));
  }, []);

  return (
    <ul className="space-y-4">
      {movies.map((movie) => (
        <li key={movie.link} className="border rounded p-4 hover:shadow">
          <h3 className="text-xl font-semibold">{movie.title}</h3>
          <p className="text-gray-600 text-sm">{movie.pubDate}</p>
          <p className="text-gray-800 truncate">{movie.description}</p>
          <Link to={`/film?url=${encodeURIComponent(movie.link)}`} className="text-blue-500 hover:underline mt-2 block">
            Voir détails
          </Link>
        </li>
      ))}
    </ul>
  );
}
