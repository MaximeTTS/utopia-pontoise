// frontend/src/pages/Home.tsx

import React from "react";
import MovieList from "../components/MovieList";
import CinemaProgram from "../components/CinemaProgram";

export default function Home() {
  return (
    <div className="p-2">
      <CinemaProgram />
      {/* Liste des films */}
      <MovieList />
    </div>
  );
}
