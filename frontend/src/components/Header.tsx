"use client";

import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controls = useAnimation();

  // Variants for menu animation
  const menuVariants: Variants = {
    open: {
      x: 0,
      transition: { type: "tween", duration: 0.5, delay: 0.4, when: "beforeChildren", staggerChildren: 0.15 },
    },
    closed: {
      x: "100%",
      transition: { type: "tween", duration: 0.5, when: "afterChildren", staggerChildren: 0.15, staggerDirection: -1 },
    },
  };

  // Variants for individual items
  const itemVariants: Variants = { open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: 20 } };

  // Variants for burger icon lines
  const lineVariants: Variants = {
    open: (i: number) => ({
      rotate: i === 0 ? 45 : -45,
      y: i === 0 ? 6 : -6,
      opacity: i === 1 ? 0 : 1,
      transition: { duration: 0.3 },
    }),
    closed: (i: number) => ({
      rotate: 0,
      y: i === 0 ? -6 : i === 2 ? 6 : 0,
      opacity: 1,
      transition: { duration: 0.1 },
    }),
  };

  // Variants for close button
  const closeButtonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 1.3, transition: { duration: 0.2 } },
  };

  // Toggle menu state and animations
  const toggleMenu = async () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      await controls.start("open");
    } else {
      await controls.start("closed");
      setIsMenuOpen(false);
    }
  };

  // Links array
  const links = [
    { to: "/", label: "Accueil" },
    { to: "/#semaine", label: "Programmes" },
    { to: "/#Tarifs", label: "Tarifs" },
    { to: "/#film", label: "Nos films" },
    { to: "/#Daily", label: "Film du jour" },
    { to: "/#Localisation", label: "Localisation" },
  ];

  return (
    <header className="bg-[#29273B] shadow-md rounded-lg mt-2 md:mt-6 p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo / Titre */}
        <Link to="/" className="text-white text-2xl font-bold mb-2 md:mb-0">
          Royal Utopia
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block w-auto">
          <ul className="flex flex-wrap justify-start gap-4 md:gap-6 lg:gap-8">
            {links.map((item, idx) => {
              const isHash = item.to.includes("#");
              return (
                <li key={idx}>
                  {isHash ? (
                    <a href={item.to} className="text-white text-base link-hover-effect block py-1">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.to} className="text-white text-base link-hover-effect block py-1">
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Toggle (Burger Icon) */}
        <motion.button
          className="md:hidden text-white w-8 h-8 relative focus:outline-none"
          onClick={toggleMenu}
          initial="closed"
          animate={controls}
        >
          <span className="sr-only">Open main menu</span>
          <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out"
                variants={lineVariants}
                custom={i}
              />
            ))}
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence onExitComplete={() => controls.start("closed")}>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-[#121629] z-50 flex items-center justify-center px-6"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ul className="flex flex-col items-center space-y-4">
              {links.map((item, idx) => {
                const isHash = item.to.includes("#");
                return (
                  <motion.li key={idx} variants={itemVariants}>
                    {isHash ? (
                      <a
                        href={item.to}
                        onClick={toggleMenu}
                        className="text-white text-xl link-hover-effect block py-1"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={toggleMenu}
                        className="text-white text-xl link-hover-effect block py-1"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 text-white p-2"
              onClick={toggleMenu}
              variants={closeButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <X size={32} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
