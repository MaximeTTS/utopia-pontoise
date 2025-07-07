import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { opacity, expand } from "./anim";

interface LayoutProps {
  children: ReactNode;
  backgroundColor?: string;
}

export default function Layout({ children, backgroundColor = "#FFFF" }: LayoutProps) {
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
    </div>
  );
}
