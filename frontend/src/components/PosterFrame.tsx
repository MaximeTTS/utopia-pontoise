// Poster in its 2:3 portrait frame, with a typographic plate as fallback
import React from "react";

interface PosterFrameProps {
  title: string;
  image: string | null;
  // L'affiche d'ouverture est la première image vue : elle ne doit pas attendre
  priority?: boolean;
}

export default function PosterFrame({ title, image, priority = false }: PosterFrameProps) {
  if (image) {
    return (
      <img
        src={image}
        alt={`Affiche de ${title}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block w-full aspect-[2/3] object-cover bg-frame"
      />
    );
  }

  // Certaines séances locales n'ont aucune affiche chez Utopia : on compose la nôtre
  return (
    <div className="aspect-[2/3] bg-frame flex flex-col justify-between p-5">
      <span className="flex gap-[4px]">
        <span className="h-4 w-1 bg-accent" />
        <span className="h-4 w-1 bg-accent/50" />
        <span className="h-4 w-1 bg-accent" />
      </span>
      <span className="font-archivo text-[26px] leading-[1.05] uppercase tracking-[-0.02em] text-ink break-words">
        {title}
      </span>
      <span className="text-[11px] lg:text-[20px] font-bold uppercase tracking-[0.2em] text-faint">Séance Utopia</span>
    </div>
  );
}
