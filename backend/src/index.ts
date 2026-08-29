// Express server exposing scraping endpoints

import express from "express";
import { getWeekMovies, getMovieDetails, fetchDailyMovie } from "./scrapers/fetchScrape";
import { getWeeklySchedule } from "./scrapers/fetchSchedule";
import { getDailySchedule } from "./scrapers/fetchDailySchedule";

const app = express();
const PORT = process.env.PORT || 3000;

// Route principale : renvoie la programmation hebdomadaire
app.get("/api/semaine", async (_req, res) => {
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
    res.status(500).json({ error: "Impossible de récupérer les détails du film." });
  }
});

// Gazette PDF de la semaine
app.get("/api/horaires", async (_req, res) => {
  try {
    const schedule = await getWeeklySchedule();
    if (!schedule) {
      res.status(404).json({ error: "Gazette de la semaine introuvable." });
      return;
    }
    res.json(schedule);
  } catch (err) {
    console.error("Erreur sur /api/horaires :", err);
    res.status(500).json({ error: "Impossible de récupérer les horaires de la semaine." });
  }
});

// Route pour les séances du jour
app.get("/api/horaires/aujourdhui", async (_req, res) => {
  try {
    const schedule = await getDailySchedule();
    if (!schedule) {
      res.status(404).json({ error: "Programme du jour introuvable." });
      return;
    }
    res.json(schedule);
  } catch (err) {
    console.error("Erreur sur /api/horaires/aujourdhui :", err);
    res.status(500).json({ error: "Impossible de récupérer le programme du jour." });
  }
});

// Route pour le film du jour
app.get("/api/film-du-jour", async (_req, res) => {
  try {
    const today = await fetchDailyMovie();
    if (!today) {
      res.status(404).json({ error: "Aucun film programmé aujourd'hui." });
      return;
    }
    res.json(today);
  } catch (err) {
    console.error("Erreur sur /api/film-du-jour :", err);
    res.status(500).json({ error: "Impossible de récupérer le film du jour." });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Backend utopia-pontoise lancé sur http://localhost:${PORT}`);
});
