// frontend/src/pages/Home.tsx

import React from "react";
import MovieList from "../components/MovieList";
import CinemaProgram from "../components/CinemaProgram";
import Location from "../components/Location";
import DailyMovieCard from "../components/DailyMovie";

export default function Home() {
  return (
    <div className="p-2">
      <CinemaProgram />
      <Location />
      {/* Nouveau bloc : film à la une */}
      <DailyMovieCard />
      {/* Liste des films */}
      <MovieList />
    </div>
  );
}
