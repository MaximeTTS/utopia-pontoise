// frontend/src/pages/Home.tsx

import React from "react";
import MovieList from "../components/MovieList";
import CinemaProgram from "../components/CinemaProgram";
import Location from "../components/Location";
import DailyMovieCard from "../components/DailyMovie";
import Welcome from "../components/Welcome";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-2">
      <Welcome />

      {/* Localisation */}
      <CinemaProgram />

      {/* Liste des films */}
      <MovieList />

      {/* Nouveau bloc : film à la une */}
      <DailyMovieCard />

      {/* Localisation */}
      <Location />
    </div>
  );
}
