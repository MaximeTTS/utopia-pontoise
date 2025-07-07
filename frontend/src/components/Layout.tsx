import React, { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { opacity, expand } from "./anim";
import Footer from "../components/Footer";

interface LayoutProps {
  children: ReactNode;
  backgroundColor?: string;
}

// Initialise Lenis pour smooth scrolling sur tout le site
export default function Layout({ children, backgroundColor = "transparent" }: LayoutProps) {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const anim = (variants: any, custom: number | null = null) => ({
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
    custom,
  });
  const nbOfColumns = 5;

  return (
    <div className="page stairs" style={{ backgroundColor }}>
      <motion.div {...anim(opacity)} className="transition-background" />
      <div className="transition-container">
        {[...Array(nbOfColumns)].map((_, i) => (
          <motion.div key={i} {...anim(expand, nbOfColumns - i)} />
        ))}
      </div>
      {children}
      <Footer />
    </div>
  );
}
