// Card showing a movie with link to its detail page
import React from "react";
import { Link } from "react-router-dom";
import PosterFrame from "./PosterFrame";

interface MovieCardProps {
  title: string;
  link: string;
  image: string | null;
  meta: string;
}

export default function MovieCard({ title, link, image, meta }: MovieCardProps) {
  return (
    <Link to={`/film?url=${encodeURIComponent(link)}`} className="group flex flex-col gap-2">
      <div className="relative overflow-hidden">
        {/* Affiche qui zoome et s'assombrit au survol */}
        <div className="transition-transform duration-500 group-hover:scale-105 group-hover:brightness-[0.35]">
          <PosterFrame title={title} image={image} />
        </div>

        {/* Seul le bouton remonte du bas */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 flex justify-center
          translate-y-full group-hover:translate-y-0 transition-transform duration-500"
        >
          <span className="px-5 py-2.5 bg-accent text-white font-archivo text-[12px] uppercase tracking-[0.2em]">
            En savoir plus
          </span>
        </div>
      </div>

      <span className="text-label font-bold group-hover:text-accent transition-colors">{title}</span>
      <span className="text-mini text-muted">{meta || "—"}</span>
    </Link>
  );
}
