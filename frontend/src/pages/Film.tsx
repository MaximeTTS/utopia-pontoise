import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchMovieDetails, MovieDetails } from "../api/utopia";
import MovieDetail from "../components/MovieDetail";

export default function Film() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const url = params.get("url") || "";
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

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!details) return <p className="p-4">Chargement...</p>;

  return <MovieDetail details={details} />;
}
