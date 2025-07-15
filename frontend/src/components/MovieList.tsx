// frontend/src/components/MovieList.tsx
import React, { useEffect, useState } from "react";
import { fetchWeekMovies, fetchMovieDetails, MovieDetails } from "../api/utopia";
import MovieCard from "./MovieCard";
import Title from "./Title";

export default function MovieList() {
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  useEffect(() => {
    fetchWeekMovies()
      .then((list) => Promise.all(list.map((m) => fetchMovieDetails(m.link))))
      .then(setMovies)
      .catch(console.error);
  }, []);

  return (
    <div className="" id="film">
      <Title title="Cinémas Utopia Pontoise" />
      <div className=" max-w-6xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2">
        {movies.map((m) => (
          <MovieCard key={m.link} title={m.title} link={m.link} image={m.image} />
        ))}
      </div>
    </div>
  );
}
