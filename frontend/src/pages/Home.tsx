// frontend/src/pages/Home.tsx

import React from "react";
import MovieList from "../components/MovieList";
import CinemaProgram from "../components/CinemaProgram";
import Location from "../components/Location";
import DailyMovieCard from "../components/DailyMovie";
import Welcome from "../components/Welcome";

export default function Home() {
  return (
    <div className="px-2">
      <div className="max-w-6xl mx-auto ">
        <Welcome />
        <CinemaProgram />
        <Location />
        {/* Nouveau bloc : film à la une */}
        <DailyMovieCard />
      </div>

      {/* Liste des films */}
      <div className="max-w-none w-full">
        <MovieList />
      </div>
    </div>
  );
}
