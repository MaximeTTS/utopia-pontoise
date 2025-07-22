"use client";

import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const controls = useAnimation();
  const [menuVisible, setMenuVisible] = useState(false);

  const menuVariants: Variants = {
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.6,
        delay: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
    closed: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.5,
        when: "afterChildren",
        staggerChildren: 0.15,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants: Variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 20 },
  };

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
      transition: { duration: 0.3 },
    }),
  };

  const closeButtonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 1.3, transition: { duration: 0.2 } },
  };

  const handleToggle = async () => {
    if (!menuVisible) {
      await controls.start("open");
      setMenuVisible(true);
    } else {
      setMenuVisible(false);
    }
  };

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
      <div className="mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold mb-2 md:mb-0">
          Royal Utopia
        </Link>

        <nav className="hidden md:block w-auto">
          <ul className="flex flex-wrap justify-start gap-4 md:gap-6 lg:gap-8">
            {links.map((item, idx) => {
              const isHash = item.to.includes("#");
              const className = "text-white text-base link-hover-effect block py-1";
              return (
                <li key={idx}>
                  {isHash ? (
                    <a href={item.to} className={className}>
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.to} className={className}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <motion.button
          className="md:hidden text-white w-8 h-8 relative focus:outline-none"
          onClick={handleToggle}
          initial="closed"
          animate={controls}
        >
          <span className="sr-only">Ouvrir le menu</span>
          <div className="absolute w-5 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {[0, 1, 2].map((i) => (
              <motion.span key={i} custom={i} variants={lineVariants} className="block absolute h-0.5 w-5 bg-current" />
            ))}
          </div>
        </motion.button>
      </div>

      <AnimatePresence onExitComplete={() => controls.start("closed")}>
        {menuVisible && (
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
                const className = "text-white text-xl link-hover-effect py-1";
                return (
                  <motion.li key={idx} variants={itemVariants}>
                    {isHash ? (
                      <a href={item.to} onClick={handleToggle} className={className}>
                        {item.label}
                      </a>
                    ) : (
                      <Link to={item.to} onClick={handleToggle} className={className}>
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </ul>
            <motion.button
              className="absolute top-4 right-4 text-white p-2"
              onClick={handleToggle}
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
