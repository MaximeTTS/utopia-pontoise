"use client";

import React, { useEffect, useState } from "react";
import { fetchDailySchedule, DailySchedule } from "../api/utopia";
import Title from "./Title";

export default function DailyScheduleView() {
  const [sched, setSched] = useState<DailySchedule | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDailySchedule()
      .then(setSched)
      .catch(() => setError("Impossible de charger le programme du jour."));
  }, []);

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!sched) return <p className="p-4">Chargement…</p>;

  return (
    <div>
      {/* En-tête centré avec nouveau style */}
      <Title title="Programme du Jour" />

      {/* Contenu du programme du jour */}
      <div className="ml-4 sm:ml-6 md:ml-8 mb-6 sm:mb-8 md:mb-10">
        {sched.resourceType === "image" ? (
          <div className="bg-gray-100 p-3 sm:p-4 md:p-6 border border-gray-200">
            <img src={sched.url} alt="Programme du jour" className="w-full h-auto rounded-lg shadow" />
          </div>
        ) : (
          <iframe
            src={sched.url}
            title="Programme du jour"
            className="w-full h-64 md:h-80 rounded-lg shadow border-none"
          />
        )}
      </div>
    </div>
  );
}
