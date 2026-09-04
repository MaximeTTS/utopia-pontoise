// One line of the daily schedule: film and its showtimes
import React from "react";
import { Link } from "react-router-dom";
import { MovieScreenings } from "../utils/schedule";
import FitText from "./FitText";
import Tag from "./Tag";

interface ShowRowProps {
  show: MovieScreenings;
  last?: boolean;
}

export default function ShowRow({ show, last = false }: ShowRowProps) {
  return (
    <div className={`flex items-center justify-between gap-6 py-3.5 ${last ? "" : "border-b border-ink/[0.14]"}`}>
      <span className="min-w-0 text-note font-medium">
        <Link to={`/film?url=${encodeURIComponent(show.link)}`} className="link-hover-effect">
          <FitText>{show.title}</FitText>
        </Link>
      </span>
      {/* Mêmes pastilles que le film à l'affiche : cadre rouge, chiffres en blanc */}
      <span className="flex flex-wrap justify-end gap-2 shrink-0">
        {show.times.map((time) => (
          <Tag key={time} className="py-1.5 text-lg lg:text-note min-w-[5ch] text-center tabular-nums">
            {time}
          </Tag>
        ))}
      </span>
    </div>
  );
}
