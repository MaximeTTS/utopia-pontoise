// Main landing page assembling all sections

import React from "react";
import DailyScheduleView from "../components/DailySchedule";
import Hero from "../components/Hero";
import Location from "../components/Location";
import MovieList from "../components/MovieList";
import PracticalInfo from "../components/PracticalInfo";
import Tariffs from "../components/Tariffs";

export default function Home() {
  return (
    <>
      {/* Film du jour et mot d'accueil */}
      <Hero />

      {/* Séances du jour */}
      <DailyScheduleView />

      {/* Tarifs */}
      <Tariffs />

      {/* Liste des films */}
      <MovieList />

      {/* Informations pratiques */}
      <PracticalInfo />

      {/* Localisation */}
      <Location />
    </>
  );
}
