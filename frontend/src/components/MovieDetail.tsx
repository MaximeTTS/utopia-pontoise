import React from "react";
import { MovieDetails } from "../api/utopia";
import Title from "./Title";

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
    <div className="max-w-7xl mx-auto px-2 ">
      <div className="bg-[#03001e]">
        <div className="mx-auto py-16">
          <div className="max-w-6xl">
            <h1 className="text-[32px] xs:text-[38px] md:text-[48px] lg:text-[72px] text-white mb-4 p-4">
              {details.title}
            </h1>
            <div className="w-48 h-px bg-white ml-4" />
          </div>
        </div>
      </div>

      <div className="mx-auto py-4 mb-16 rounded-lg bg-[#29273B]">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-8">
            {paragraphs.map((para, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? "text-lg leading-relaxed text-white font-light first-letter:text-6xl first-letter:font-thin first-letter:float-left first-letter:mr-2 first-letter:-mt-1 first-letter:text-red-600 p-4"
                    : "text-lg leading-relaxed text-white font-light p-4"
                }
              >
                {para}
              </p>
            ))}
          </div>

          {/* Affiche éditorial */}
          {details.image && (
            <div className="lg:col-span-4 lg:pr-4 pr-0">
              <div className="flex justify-center pt-4">
                <div className="p-8 w-full max-w-[350px] border border-zinc-200 shadow-sm bg-[#29273B]">
                  <img src={details.image} alt={details.title} className="w-full h-auto object-cover max-h-[700px]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bande-annonce centrée si disponible */}
        {details.trailer && (
          <div className="m-4 mt-16 pt-16 border-t border-white">
            <div className="max-w-4xl mx-auto text-center">
              <Title title="BANDE-ANNONCE" />
              <div className=" =border border-zinc-200 shadow-sm ">
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
