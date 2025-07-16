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
    <div id="jour">
      {/* En-tête centré avec nouveau style */}
      <Title title="PROGRAMME DU JOUR" />

      {/* Contenu du programme du jour */}
      <div className="mb-8">
        {sched.resourceType === "image" ? (
          <div className=" p-3 sm:p-4 md:p-6 border border-gray-200">
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
