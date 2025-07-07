// frontend/src/components/MovieList.tsx
import React, { useEffect, useState } from "react";
import { fetchWeekMovies, fetchMovieDetails, MovieDetails } from "../api/utopia";
import MovieCard from "./MovieCard";

export default function MovieList() {
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  useEffect(() => {
    fetchWeekMovies()
      .then((list) => Promise.all(list.map((m) => fetchMovieDetails(m.link))))
      .then(setMovies)
      .catch(console.error);
  }, []);

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4">Films de la semaine</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2.5">
        {movies.map((m) => (
          <MovieCard key={m.link} title={m.title} link={m.link} image={m.image} />
        ))}
      </div>
    </div>
  );
}
