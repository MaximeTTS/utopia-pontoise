// Opening panel: the film of the day, its synopsis and its credits
import React, { useEffect, useState } from "react";
import { fetchDailyMovie, DailyMovie } from "../api/utopia";
import Eyebrow from "./Eyebrow";
import InfoField from "./InfoField";
import PosterFrame from "./PosterFrame";
import Tag from "./Tag";

// Le dernier mot du titre passe en rouge, comme sur la maquette
function splitTitle(title: string) {
  const words = title.split(" ");
  const last = words.pop() || "";
  return { start: words.join(" "), last };
}

// Premier paragraphe du synopsis, coupé net sur un mot entier
function shortSynopsis(description: string, limit = 280): string {
  const first = description.split("\n\n")[0] || "";
  if (first.length <= limit) return first;

  const cut = first.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : limit).trimEnd()}…`;
}

export default function Hero() {
  const [movie, setMovie] = useState<DailyMovie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDailyMovie()
      .then(setMovie)
      .catch(() => setError("Impossible de charger le film du jour."));
  }, []);

  const { start, last } = splitTitle(movie ? movie.title : "");
  const badges = movie
    ? [
        movie.showtime,
        movie.info.version,
        movie.info.duration,
        [movie.info.country, movie.info.year].filter(Boolean).join(" · "),
      ]
    : [];

  return (
    <div id="Daily" className="grid grid-cols-1 lg:grid-cols-[480px_1fr] border-b border-ink/10 px-4 lg:px-8">
      {/* Affiche du film du jour */}
      <div className="lg:pr-8 pt-8 lg:py-16 flex flex-col gap-3.5 ">
        <div className="lg:max-w-none mx-auto w-full [&_img]:h-[200px] mobileWide:[&_img]:h-[350px] md:[&_img]:h-[550px] lg:[&_img]:h-full">
          <PosterFrame title={movie ? movie.title : "Film du jour"} image={movie ? movie.image : null} priority />
        </div>
      </div>

      {/* Titre, synopsis, générique, puis les mentions */}

      <div className="wide:px-0 py-8 lg:py-16 md:pt-[] flex flex-col gap-6">
        {error && <p className="text-accent">{error}</p>}
        <Eyebrow size="mini" className="tracking-[0.2em]">
          Film du jour
        </Eyebrow>
        <h1 className="font-archivo text-[64px] md:text-[102px] leading-[0.9] tracking-[-0.03em] uppercase break-words">
          {movie ? (
            <>
              {start} <span className="text-accent">{last}</span>
            </>
          ) : (
            "Utopia Pontoise"
          )}
        </h1>

        {movie && (
          <>
            <p className="max-w-[58ch] text-label leading-relaxed text-muted">{shortSynopsis(movie.description)}</p>

            <div className="grid grid-cols-[auto_1fr] gap-x-[22px] gap-y-4 text-lg lg:text-note leading-relaxed">
              <InfoField label="Réalisation" value={movie.info.director} />
              <InfoField label="Casting" value={movie.info.cast} />
              <InfoField label="Scénario" value={movie.info.screenplay} />
              <InfoField label="Sortie" value={movie.info.release} />
            </div>

            <div className="flex flex-wrap gap-2">
              {badges.filter(Boolean).map((badge, idx) => (
                <Tag key={badge} variant={idx === 0 ? "accent" : "outline"}>
                  {badge}
                </Tag>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
