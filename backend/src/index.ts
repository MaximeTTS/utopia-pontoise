// Configuration du serveur Express et définition des routes API

import express from "express";
import { getWeekMovies, getMovieDetails } from "./fetchScrape";
import { getWeeklySchedule } from "./fetchSchedule";
import { getDailySchedule } from "./fetchDailySchedule";

const app = express();
const PORT = process.env.PORT || 3000;

// Route principale : renvoie la programmation hebdomadaire
app.get("/api/semaine", async (req, res) => {
  try {
    const movies = await getWeekMovies();
    res.json(movies);
  } catch (err) {
    console.error("Erreur sur /api/semaine :", err);
    res.status(500).json({ error: "Impossible de récupérer les films de la semaine." });
  }
});

// Route pour détails d'un film
app.get("/api/film", async (req, res) => {
  const urlParam = req.query.url;
  if (typeof urlParam !== "string") {
    res.status(400).json({ error: "L'URL du film est requise" });
    return;
  }
  try {
    const details = await getMovieDetails(urlParam);
    res.json(details);
  } catch (err) {
    console.error("Erreur sur /api/film :", err);
  }
});

// horaires PDF de la semaine
app.get("/api/horaires", (req, res) => {
  getWeeklySchedule()
    .then((schedule) => {
      if (!schedule) {
        return res.status(404).json({ error: "Section horaires introuvable" });
      }
      res.json(schedule);
    })
    .catch((err) => {
      console.error("Erreur sur /api/horaires :", err);
      res.status(500).json({ error: "Impossible de récupérer les horaires de la semaine." });
    });
});

// Route pour le programme PDF/JPG du jour
app.get("/api/horaires/aujourdhui", (_req, res) => {
  getDailySchedule()
    .then((meta) => {
      if (!meta) {
        return res.status(404).json({ error: "Programme du jour introuvable." });
      }
      res.json(meta);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Scraping KO." });
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Backend utopia-pontoise lancé sur http://localhost:${PORT}`);
});
