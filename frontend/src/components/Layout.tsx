// Common page layout with header, footer and animations
import React, { ReactNode, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Lenis from "lenis";
import { opacity, expand } from "./anim";
import Footer from "./Footer";
import Logo from "./Logo";

interface LayoutProps {
  children: ReactNode;
}

// Initialise Lenis pour smooth scrolling sur tout le site
export default function Layout({ children }: LayoutProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Chaque page s'ouvre en haut. Sans couper la restauration du navigateur,
    // celui-ci repositionne le défilement une fois les affiches chargées,
    // donc après notre remise à zéro.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

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
    <div className="page stairs">
      {/* Rideau de transition, sauté si l'utilisateur limite les animations */}
      {!reduceMotion && (
        <>
          <motion.div {...anim(opacity)} className="transition-background" />
          <div className="transition-container">
            {[...Array(nbOfColumns)].map((_, i) => (
              <motion.div key={i} {...anim(expand, nbOfColumns - i)} />
            ))}
          </div>
        </>
      )}

      {/* Le contenu défile par-dessus le footer fixe, d'où le fond et le z-index */}
      <main className="relative z-10 w-[1296px] max-w-full mx-auto bg-cream text-ink font-space">
          {/* Plus de navigation : seule la marque ouvre la page */}
          <div className="flex justify-center px-5 sm:px-8 wide:px-0 py-[26px] border-b border-ink/10">
            <Link to="/">
              <Logo />
            </Link>
          </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}
