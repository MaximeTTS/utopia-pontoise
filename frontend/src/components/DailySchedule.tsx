// Today's schedule: the featured film, then afternoon and evening screenings
"use client";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDailySchedule, fetchWeeklySchedule, DailySchedule, WeeklySchedule } from "../api/utopia";
import { splitDay } from "../utils/schedule";
import Eyebrow from "./Eyebrow";
import FitText from "./FitText";
import SectionTitle from "./SectionTitle";
import ShowRow from "./ShowRow";
import Tag from "./Tag";

export default function DailyScheduleView() {
  const [sched, setSched] = useState<DailySchedule | null>(null);
  const [week, setWeek] = useState<WeeklySchedule | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDailySchedule()
      .then(setSched)
      .catch(() => setError("Impossible de charger le programme du jour."));
    fetchWeeklySchedule().then(setWeek).catch(console.error);
  }, []);

  if (error) return <p className="px-5 sm:px-8 wide:px-0 py-[77px] text-accent">{error}</p>;
  if (!sched) return <p className="px-5 sm:px-8 wide:px-0 py-[77px] text-muted">Chargement du programme…</p>;

  const { featured, afternoon, evening } = splitDay(sched.screenings);

  return (
    <section id="jour" className="px-5 sm:px-8 wide:px-0 py-8 lg:py-16">
      <SectionTitle
        title="Programme du jour"
        aside={
          <Tag variant="ink" className="py-[8px] text-[11px]">
            {sched.day} · {sched.screenings.length} séances
          </Tag>
        }
        className="mb-1.5"
      />

      {/* Film mis en avant */}
      {featured && (
        <>
          <Eyebrow className="mt-8 mb-3 tracking-[0.2em]">À l'affiche</Eyebrow>
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 bg-ink text-cream">
            <span className="min-w-0 flex-1 flex flex-wrap items-baseline gap-3.5">
              <Link to={`/film?url=${encodeURIComponent(featured.link)}`} className="link-hover-effect min-w-0">
                <FitText className="font-archivo text-[26px] tracking-[-0.01em]">{featured.title}</FitText>
              </Link>
            </span>
            <span className="flex flex-wrap gap-2 shrink-0">
              {featured.times.map((time) => (
                <Tag key={time} className="py-1.5 text-base min-w-[5ch] text-center tabular-nums">
                  {time}
                </Tag>
              ))}
            </span>
          </div>
        </>
      )}

      {/* Créneaux de l'après-midi */}
      {afternoon.length > 0 && (
        <>
          <Eyebrow tone="subtle" className="mt-9 mb-1 tracking-[0.2em]">
            Après-midi
          </Eyebrow>
          <div className="flex flex-col">
            {afternoon.map((show, i) => (
              <ShowRow key={show.link} show={show} last={i === afternoon.length - 1} />
            ))}
          </div>
        </>
      )}

      {/* Créneaux de la soirée */}
      {evening.length > 0 && (
        <>
          <Eyebrow tone="subtle" className="mt-9 mb-1 tracking-[0.2em]">
            Soirée
          </Eyebrow>
          <div className="flex flex-col">
            {evening.map((show, i) => (
              <ShowRow key={show.link} show={show} last={i === evening.length - 1} />
            ))}
          </div>
        </>
      )}

      {week && (
        <p className="mt-7 text-label text-muted">
          {week.label} — le programme détaillé est disponible dans la{" "}
          <a href={week.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            gazette
          </a>
        </p>
      )}
    </section>
  );
}
