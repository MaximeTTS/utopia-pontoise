// Pill used for showtimes, formats and section counters
import React, { ReactNode } from "react";

type TagVariant = "accent" | "outline" | "ink";

interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}

const variants: Record<TagVariant, string> = {
  accent: "bg-accent text-white font-bold",
  outline: "border border-ink/25 text-ink",
  ink: "border border-ink text-ink font-bold uppercase tracking-[0.16em]",
};

export default function Tag({ children, variant = "accent", className = "" }: TagProps) {
  return (
    <span className={`inline-block px-3.5 py-2 text-lg lg:text-note font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
