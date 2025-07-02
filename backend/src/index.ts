// Configuration du serveur Express et définition des routes API

import express from "express";
import { getWeekMovies, getMovieDetails } from "./fetchScrape";

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

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Backend utopia-pontoise lancé sur http://localhost:${PORT}`);
});
