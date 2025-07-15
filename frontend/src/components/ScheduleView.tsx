"use client";

import React, { useEffect, useState } from "react";
import { fetchWeeklySchedule, WeeklySchedule } from "../api/utopia";
import Title from "./Title";

export default function ScheduleView() {
  const [sched, setSched] = useState<WeeklySchedule | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeeklySchedule()
      .then(setSched)
      .catch(() => setError("Impossible de charger le programme de la semaine."));
  }, []);

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!sched) return <p className="p-4">Chargement…</p>;

  return (
    <div>
      {/* En-tête centré avec nouveau style */}
      <Title title="Programme de la Semaine" />
      <div className="text-left ml-4 sm:ml-6 md:ml-8 mt-6">
        <p className="text-base sm:text-lg text-gray-600 font-light">
          Veuillez retrouver tout notre programme de la semaine {sched.label.toLowerCase()} via ce{" "}
          <a
            href={sched.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline hover:no-underline"
          >
            pdf
          </a>
          .
        </p>
      </div>
    </div>
  );
}
