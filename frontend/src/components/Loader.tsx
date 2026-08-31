// Full-screen curtain shown while the homepage data warms up
import React, { useEffect } from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";
import { fetchDailyMovie, fetchDailySchedule, fetchWeeklySchedule, fetchWeekMovies } from "../api/utopia";
import Eyebrow from "./Eyebrow";

interface LoaderProps {
  onReady: () => void;
}

const fadeVariants: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Loader({ onReady }: LoaderProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const data = Promise.allSettled([
      fetchDailyMovie(),
      fetchDailySchedule(),
      fetchWeeklySchedule(),
      fetchWeekMovies(),
    ]);
    const timeout = new Promise((resolve) => setTimeout(resolve, 4000));

    Promise.race([data, timeout]).then(() => {
      if (!cancelled) onReady();
    });

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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-cream text-ink"
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="h-16 w-16 sm:h-20 sm:w-20"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r={RADIUS} fill="none" strokeWidth="4" className="stroke-ink/15" />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * 0.72}
          className="stroke-accent"
        />
        <g transform="translate(50 50)">
          <rect x="-7" y="-6" width="2.4" height="12" className="fill-accent" />
          <rect x="-1.2" y="-6" width="2.4" height="12" className="fill-accent/50" />
          <rect x="4.6" y="-6" width="2.4" height="12" className="fill-accent" />
        </g>
      </motion.svg>

      <Eyebrow size="mini" tone="subtle" className="tracking-[0.3em]">
        Ouverture du rideau…
      </Eyebrow>
    </motion.div>
  );
}
