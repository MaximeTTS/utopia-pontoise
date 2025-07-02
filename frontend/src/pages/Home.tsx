import React from "react";
import MovieList from "../components/MovieList";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Programmation de la semaine</h1>
      <MovieList />
    </div>
  );
}
