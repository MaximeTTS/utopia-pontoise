// frontend/src/components/ScheduleView.tsx

import React, { useEffect, useState } from "react";
import { fetchWeeklySchedule, WeeklySchedule } from "../api/utopia";

export default function ScheduleView() {
  const [schedule, setSchedule] = useState<WeeklySchedule | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeeklySchedule()
      .then(setSchedule)
      .catch(() => setError("Impossible de charger les horaires."));
  }, []);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!schedule) return <p className="p-4">Chargement des horaires...</p>;

  return (
    <div className="p-4 border rounded mb-6">
      <h2 className="text-xl font-bold mb-2">{schedule.label}</h2>
      <a href={schedule.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
        Télécharger la grille PDF
      </a>
    </div>
  );
}
