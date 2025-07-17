// Displays link to the weekly program PDF
"use client";

import React, { useEffect, useState } from "react";
import { fetchWeeklySchedule, WeeklySchedule } from "../api/utopia";

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
      <div className="text-left">
        <p className="text-base sm:text-lg text-white font-light">
          Vous pouvez consulter le programme détaillé de la semaine {sched.label.toLowerCase()} via ce{" "}
          <a
            href={sched.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline hover:no-underline"
          >
            pdf
          </a>
        </p>
      </div>
    </div>
  );
}
