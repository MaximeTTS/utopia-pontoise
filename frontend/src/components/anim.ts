// Framer Motion animation variants used across pages
import { Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];
const DURATION = 0.68;
const STAGGER = 0.075;

export const expand: Variants = {
  initial: { top: 0 },
  enter: (i: number) => ({
    top: "100vh",
    transition: {
      duration: DURATION,
      delay: STAGGER * i,
      ease: EASE,
    },
    transitionEnd: { height: "0", top: "0" },
  }),
  exit: (i: number) => ({
    height: "100vh",
    transition: {
      duration: DURATION,
      delay: STAGGER * i,
      ease: EASE,
    },
  }),
};

export const opacity: Variants = {
  initial: { opacity: 0.5 },
  enter: { opacity: 0 },
  exit: { opacity: 0.5 },
};
