import React, { useEffect, useRef, useState } from "react";
import { MovieDetails } from "../api/utopia";
import Title from "./Title";

interface Props {
  details: MovieDetails;
}

const isYouTubeUrl = (url: string) => url.startsWith("https://www.youtube.com/embed/") || url.includes("youtu.be/");

export default function MovieDetailEditorial({ details }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  const [posterStyle, setPosterStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handleScroll = () => {
      const parent = parentRef.current;
      const poster = posterRef.current;
      if (!parent || !poster) {
        return setPosterStyle({});
      }

      const { top } = parent.getBoundingClientRect();
      const maxY = parent.offsetHeight - poster.offsetHeight;
      if (maxY <= 0) {
        return setPosterStyle({});
      }

      const shift = Math.min(Math.max(80 - top, 0), maxY);
      setPosterStyle({ transform: `translateY(${shift}px)` });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [details]);

  // Nettoyage et découpe des paragraphes
  const paragraphs = details.description
    .replace(/<[^>]+>/g, "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-2 ">
      {/* En-tête avec titre */}
      <div className="bg-[#03001e]">
        <div className="mx-auto pb-16 pt-8">
          <div className="max-w-6xl">
            <h1 className="text-[32px] xs:text-[38px] md:text-[48px] lg:text-[72px] text-white mb-4 p-4">
              {details.title}
            </h1>
            <div className="w-48 h-px bg-white ml-4" />
          </div>
        </div>
      </div>

      {/* Contenu éditorial */}
      <div className="mx-auto py-4 mb-16 rounded-lg bg-[#29273B]">
        <div className="grid lg:grid-cols-12">
          {/* Texte */}
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

          {/* Affiche du film animée */}
          {details.image && (
            <div ref={parentRef} className="lg:col-span-4 lg:pr-4 pr-0 my-4">
              <div ref={posterRef} style={posterStyle} className="flex justify-center pt-4 p-4 lg:p-0">
                <div className="p-8 w-full max-w-[350px] border border-zinc-200 shadow-sm bg-[#29273B]">
                  <img src={details.image} alt={details.title} className="w-full h-auto object-cover max-h-[700px]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bande-annonce avec l'api youtube si pas dispo backend */}
        {details.trailer && (
          <div className="m-4 mt-16 pt-16 border-t border-white">
            <div className="max-w-4xl mx-auto text-center">
              <Title title="BANDE-ANNONCE" />
              <div className="border border-zinc-200 shadow-sm">
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
