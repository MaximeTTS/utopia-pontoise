// Fetches the movies currently showing and displays them as a grid
import React, { useEffect, useState } from "react";
import { fetchWeekMovies, fetchWeeklySchedule, Movie, WeeklySchedule } from "../api/utopia";
import MovieCard from "./MovieCard";
import SectionTitle from "./SectionTitle";

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [week, setWeek] = useState<WeeklySchedule | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeekMovies()
      .then(setMovies)
      .catch(() => setError("Impossible de charger les films de la semaine."));
    fetchWeeklySchedule().then(setWeek).catch(console.error);
  }, []);

  if (error) return <p className="px-5 sm:px-8 wide:px-0 py-[77px] text-accent">{error}</p>;
  if (!movies) return <p className="px-5 sm:px-8 wide:px-0 py-[77px] text-muted">Chargement des films…</p>;

  return (
    <section id="film" className="px-5 sm:px-8 wide:px-0 py-8 lg:py-16">
      <SectionTitle
        title="Films de la semaine"
        aside={week && <span className="text-mini uppercase tracking-[0.14em] text-muted">{week.label}</span>}
        className="mb-8"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[22px]">
        {movies.map((m) => (
          <MovieCard key={m.link} title={m.title} link={m.link} image={m.image} meta={m.countryYear || m.duration} />
        ))}
      </div>
    </section>
  );
}
