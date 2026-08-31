// Full-screen curtain shown while the homepage data warms up
import React, { useEffect } from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";
import { fetchDailyMovie, fetchDailySchedule, fetchWeeklySchedule, fetchWeekMovies, fetchMovieDetails, Movie } from "../api/utopia";
import Eyebrow from "./Eyebrow";

interface LoaderProps {
  onReady: () => void;
}

const fadeVariants: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const markVariants: Variants = {
  initial: { opacity: 0, scale: 0.92 },
  enter: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.1 } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.3 } },
};

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PREFETCH_CONCURRENCY = 4;

async function warmMovieDetails(movies: Movie[]) {
  const queue = [...movies];
  const worker = async () => {
    let movie = queue.shift();
    while (movie) {
      await fetchMovieDetails(movie.link).catch(() => null);
      movie = queue.shift();
    }
  };
  await Promise.all(Array.from({ length: PREFETCH_CONCURRENCY }, worker));
}

export default function Loader({ onReady }: LoaderProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    const daily = fetchDailyMovie().catch(() => null);
    const schedule = fetchDailySchedule().catch(() => null);
    const weekly = fetchWeeklySchedule().catch(() => null);
    const week = fetchWeekMovies().catch(() => []);

    const timeout = new Promise((resolve) => setTimeout(resolve, 4000));
    Promise.race([Promise.all([daily, schedule, weekly, week]), timeout]).then(() => {
      if (!cancelled) onReady();
    });

    week.then((movies) => warmMovieDetails(movies));

    return () => {
      cancelled = true;
    };
  }, [onReady]);

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={fadeVariants}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-cream text-ink px-6"
    >
      <motion.div variants={markVariants} className="relative flex items-center justify-center">
        <motion.svg
          viewBox="0 0 100 100"
          className="h-48 w-48 sm:h-64 sm:w-64"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="50" cy="50" r={RADIUS} fill="none" strokeWidth="1.5" className="stroke-ink/10" />
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * 0.78}
            className="stroke-accent"
          />
        </motion.svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex gap-[6px] sm:gap-2">
            <span className="h-8 w-2.5 sm:h-11 sm:w-3.5 bg-accent" />
            <span className="h-8 w-2.5 sm:h-11 sm:w-3.5 bg-accent/50" />
            <span className="h-8 w-2.5 sm:h-11 sm:w-3.5 bg-accent" />
          </span>
        </div>
      </motion.div>

      <motion.div variants={markVariants} className="flex flex-col items-center gap-4">
        <h1 className="font-archivo text-[40px] sm:text-[56px] uppercase leading-[0.9] tracking-[-0.02em] text-center">
          Utopia <span className="text-accent">Pontoise</span>
        </h1>
        <Eyebrow size="mini" tone="subtle" className="tracking-[0.3em]">
          Ouverture du rideau…
        </Eyebrow>
      </motion.div>
    </motion.div>
  );
}
