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
    <section>
      <div id="Daily" className=" bg-[#29273B] rounded-lg">
        <div className=" py-6 sm:py-8">
          <Title title="FILM DU JOUR" />
          {/* Titre du film */}
          <div className="text-start mb-8">
            <h2 className="text-[28px] xs:text-[32px] font-normal text-white mb-2 pl-8 md:pl-14">{movie.title}</h2>
            <div className="w-24 h-px bg-white ml-8 md:ml-14" />
          </div>

          {/* Informations et affiche */}
          <div className="border-b border-gray-300 pb-12 mb-8 m-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {/* Informations du film */}
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="border-l-2 border-gray-200 pl-4 sm:pl-5 md:pl-6 py-3 sm:py-4">
                  <h4 className="font-semibold text-white mb-3 sm:mb-4 text-xl sm:text-2xl">Séances</h4>
                  <p className="text-base sm:text-[16px] text-footer leading-relaxed">
                    <span className="font-medium text-white">Horaires :</span> {movie.showtime}
                    <br />
                    <br />
                    <span className="font-medium text-white">Période :</span> {movie.dateRange}
                  </p>
                </div>
                <div className="border-l-2 border-gray-200 pl-4 sm:pl-5 md:pl-6 py-3 sm:py-4">
                  <h4 className="font-semibold text-white mb-3 sm:mb-4 text-xl sm:text-2xl">Fiche technique</h4>
                  <p className="text-base sm:text-lg text-footer leading-relaxed break-words">{movie.cast}</p>
                </div>
              </div>

              {/* Affiche du film */}
              <div className="flex items-center justify-center md:justify-end">
                <div className="p-4 border border-gray-200 shadow-sm">
                  <img
                    src={movie.imageUrl}
                    alt={`Affiche du film ${movie.title}`}
                    className="w-full max-w-[400px] h-auto rounded-sm object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Synopsis */}
          <div className="md:m-[-16px]">
            <div className="text-start mb-8">
              <h2 className="text-[28px] xs:text-[32px] font-normal text-white mb-2 pl-8 md:pl-14">SYNOPSIS</h2>
              <div className="w-24 h-px bg-white ml-8 md:ml-14" />
            </div>
            <div className="ml-4 sm:ml-6 md:ml-8 w-auto">
              <div className="border-l-2 border-gray-200 pl-4 py-5 sm:py-6 pr-6 md:pr-8">
                {movie.description.split("\n").map((para, i) => (
                  <p key={i} className="text-base sm:text-lg text-footer leading-relaxed mb-5">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
