import React, { useEffect, useState } from "react";
import { fetchDailySchedule, DailySchedule } from "../api/utopia";

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
    <div className="p-4" id="jour">
      <h2 className="text-xl font-bold mb-4">Horaire du jour</h2>

      {sched.resourceType === "image" ? (
        <img src={sched.url} alt="Horaire du jour" className="w-full max-h-64 object-contain rounded-lg shadow" />
      ) : (
        <iframe
          src={sched.url}
          title="Horaire du jour PDF"
          className="w-full h-64 md:h-80 rounded-lg shadow"
          style={{ border: "none" }}
        />
      )}
    </div>
  );
}
