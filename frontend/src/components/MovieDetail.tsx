import React from "react";
import { MovieDetails } from "../api/utopia";

interface Props {
  details: MovieDetails;
}

// Utilitaire pour détecter un embed YouTube
const isYouTubeUrl = (url: string) => url.startsWith("https://www.youtube.com/embed/") || url.includes("youtu.be/");

export default function MovieDetailEditorial({ details }: Props) {
  // Fonction de nettoyage front-end
  const clean = (text: string) =>
    text
      .replace(/&nbsp;/gi, " ")
      .replace(/&lt;|&gt;/g, "")
      .replace(/>+/g, "")
      .trim();

  // Découpage de la description en paragraphes nettoyés
  const paragraphs = clean(details.description)
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p);

  return (
    <div className="min-h-screen ">
      <div className="bg-white ">
        <div className="container mx-auto px-4 py-20 border-b border-zinc-200">
          <div className="max-w-4xl">
            <h1 className="text-7xl md:text-8xl font-thin tracking-tight leading-[0.85] text-zinc-900 mb-8">
              {details.title}
            </h1>
            <div className="w-24 h-px bg-red-600 mt-8" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 bg-zinc-50">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-8">
            {paragraphs.map((para, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? "text-lg leading-relaxed text-zinc-700 font-light first-letter:text-6xl first-letter:font-thin first-letter:float-left first-letter:mr-2 first-letter:-mt-1 first-letter:text-red-600"
                    : "text-lg leading-relaxed text-zinc-700 font-light"
                }
              >
                {para}
              </p>
            ))}
          </div>

          {/* Affiche éditorial */}
          {details.image && (
            <div className="lg:col-span-4">
              <div className="sticky top-8">
                <div className="bg-white p-8 shadow-sm border border-zinc-200">
                  <img src={details.image} alt={details.title} className="w-full h-auto object-cover max-h-[700px]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bande-annonce centrée si disponible */}
        {details.trailer && (
          <div className="mt-32 pt-16 border-t border-zinc-200">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-light tracking-wide text-zinc-900 mb-12 uppercase">Bande-annonce</h2>
              <div className="bg-white border border-zinc-200 shadow-sm p-8">
                <div className="relative w-full h-0 pb-[56.25%]">
                  {isYouTubeUrl(details.trailer) ? (
                    <iframe
                      src={details.trailer}
                      title={`Bande-annonce de ${details.title}`}
                      className="absolute top-0 left-0 w-full h-full rounded"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      controls
                      src={details.trailer}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
