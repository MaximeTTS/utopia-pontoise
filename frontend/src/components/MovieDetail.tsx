import React from "react";
import { MovieDetails } from "../api/utopia";

interface Props {
  details: MovieDetails;
}

export default function MovieDetail({ details }: Props) {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header avec le titre dynamique */}
      <div className="border-b-4 border-red-600">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mt-4 font-serif">
            {details.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          {/* 2. Description dynamique */}
          <div className="lg:col-span-8 space-y-6">
            <div className="prose prose-lg max-w-none font-serif">
              <p className="text-gray-800 leading-relaxed text-justify first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-red-600">
                {details.description}
              </p>
            </div>
          </div>

          {/* 3. Affiche du film s’il existe */}
          {details.image && (
            <div className="lg:col-span-4">
              <div className="sticky top-8">
                <div className="overflow-hidden border-2 border-gray-200 rounded-lg shadow-lg bg-white">
                  <img src={details.image} alt={details.title} className="w-full h-auto object-cover" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Section bande-annonce : n’apparaît que si details.trailer est défini */}
        {details.trailer && (
          <div className="border-t-2 border-gray-200 pt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-serif">BANDE-ANNONCE</h2>
              <div className="w-24 h-1 bg-red-600 mx-auto mt-2"></div>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="overflow-hidden border-2 border-gray-200 rounded-lg shadow-lg bg-white">
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  <video controls src={details.trailer} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 bg-gray-50">
                  <h3 className="font-bold font-serif">Bande-annonce officielle</h3>
                  <p className="text-sm text-gray-600">Découvrez l’univers poétique du film</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
