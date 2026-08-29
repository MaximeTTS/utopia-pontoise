// Small uppercase label used to introduce a block
import React, { ReactNode } from "react";

type EyebrowTone = "accent" | "subtle" | "light";
type EyebrowSize = "note" | "label" | "mini" | "custom";

interface EyebrowProps {
  children: ReactNode;
  tone?: EyebrowTone;
  // La taille est une propriété, pas une classe : deux classes de taille sur le
  // même élément se départageraient selon l'ordre du CSS généré, pas de l'attribut
  size?: EyebrowSize;
  className?: string;
}

const tones: Record<EyebrowTone, string> = {
  accent: "text-accent",
  subtle: "text-subtle",
  // Sur la carte tarif rouge, le seul fond coloré du site
  light: "text-white/80",
};

const sizes: Record<EyebrowSize, string> = {
  note: "text-note",
  label: "text-label",
  mini: "text-mini",
  // Aucune taille imposée : elle vient du className, sans classe concurrente
  custom: "",
};

export default function Eyebrow({ children, tone = "accent", size = "note", className = "" }: EyebrowProps) {
  return (
    <span
      className={`block ${sizes[size]} font-bold uppercase tracking-[0.24em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
