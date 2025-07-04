// frontend/src/pages/Home.tsx

import React from "react";
import ScheduleView from "../components/ScheduleView";
import MovieList from "../components/MovieList";
import DailyScheduleView from "../components/DailySchedule";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Programmation de la semaine</h1>
      {/* Nouvelle section horaires PDF */}
      <ScheduleView />
      {/* Pdf horaire du jour */}
      <DailyScheduleView />
      {/* Liste des films */}
      <MovieList />
    </div>
  );
}
