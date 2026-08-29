// Page displaying movie details fetched from the API
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchMovieDetails, MovieDetails } from "../api/utopia";
import Eyebrow from "../components/Eyebrow";
import MovieDetail from "../components/MovieDetail";

// Squelette de la fiche, aux mêmes proportions que le contenu à venir
function LoadingSkeleton({ title }: { title: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] animate-pulse">
      <div className="pl-0 pr-6 lg:pr-12 py-6">
        <div className="max-w-[280px] sm:max-w-[420px] lg:max-w-none mx-auto w-full aspect-[2/3] bg-frame" />
      </div>
      <div className="px-5 sm:px-8 wide:px-0 py-[48px] md:py-[62px] flex flex-col gap-5">
        <Eyebrow className="tracking-[0.3em]">Chargement de la fiche</Eyebrow>
        <h1 className="font-archivo text-[48px] sm:text-[62px] leading-[0.9] tracking-[-0.03em] uppercase">
          {title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {[4, 5, 6].map((w) => (
            <span key={w} className="h-9 bg-frame" style={{ width: `${w}rem` }} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {[70, 90, 55].map((w) => (
            <span key={w} className="h-4 bg-frame" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Film() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const url = params.get("url") || "";
  // Le titre transmis par la carte évite un écran vide pendant le chargement
  const passedTitle = (location.state as { title?: string } | null)?.title || "";

  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setError("URL du film manquante.");
      return;
    }
    fetchMovieDetails(url)
      .then(setDetails)
      .catch(() => setError("Impossible de charger les détails du film."));
  }, [url]);

  if (error) {
    return (
      <section className="px-5 sm:px-8 wide:px-0 py-[77px]">
        <p className="text-accent">{error}</p>
      </section>
    );
  }
  if (!details) return <LoadingSkeleton title={passedTitle} />;

  return <MovieDetail details={details} />;
}
