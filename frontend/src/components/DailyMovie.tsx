// frontend/src/components/DailyMovieCard.tsx
import React, { useEffect, useState } from "react";
import { fetchDailyMovie, DailyMovie } from "../api/utopia";
import Title from "./Title";

export default function DailyMovieCard() {
  const [movie, setMovie] = useState<DailyMovie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDailyMovie()
      .then(setMovie)
      .catch(() => setError("Impossible de charger le film du jour."));
  }, []);

  if (error) {
    return <p className="p-4 text-red-500 text-center">{error}</p>;
  }
  if (!movie) {
    return <p className="p-4 text-gray-500 text-center">Chargement du film du jour…</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className=" py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Titre du film */}
        <Title title={movie.title} />

        {/* Informations et affiche */}
        <div className="border-b border-gray-300 pb-8 sm:pb-10 md:pb-12 mb-8 sm:mb-10 md:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 sm:gap-12 md:gap-16">
            {/* Informations du film - 3 colonnes */}
            <div className="lg:col-span-3 ml-4 sm:ml-6 md:ml-8 space-y-4 sm:space-y-5 md:space-y-6">
              <div className="border-l-2 border-gray-200 pl-4 sm:pl-5 md:pl-6 py-3 sm:py-4 hover:border-black transition-colors">
                <h4 className="font-semibold text-black mb-3 sm:mb-4 text-xl sm:text-2xl">Séances</h4>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  <span className="font-medium text-black">Horaires :</span> {movie.showtime}
                  <br />
                  <span className="font-medium text-black">Période :</span> {movie.dateRange}
                </p>
              </div>

              <div className="border-l-2 border-gray-200 pl-4 sm:pl-5 md:pl-6 py-3 sm:py-4 hover:border-black transition-colors">
                <h4 className="font-semibold text-black mb-3 sm:mb-4 text-xl sm:text-2xl">Fiche technique</h4>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{movie.cast}</p>
              </div>
            </div>

            {/* Affiche du film à droite - 2 colonnes */}
            <div className="lg:col-span-2">
              <div className="bg-gray-100 p-4 sm:p-5 md:p-6 border border-gray-200 shadow-sm">
                <img
                  src={movie.imageUrl}
                  alt={`Affiche du film ${movie.title}`}
                  className="w-full h-auto rounded-sm object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div>
          <Title title="Synopsis" />
          <div className="ml-4 sm:ml-6 md:ml-8 max-w-4xl">
            <div className="border-l-2 border-gray-200 pl-4 sm:pl-5 md:pl-6 py-5 sm:py-6 hover:border-black transition-colors">
              {movie.description.split("\n").map((para, i) => (
                <p key={i} className="text-base sm:text-lg text-gray-600 leading-relaxed mb-5">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
