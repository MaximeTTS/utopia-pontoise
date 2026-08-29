// Ticket desk hours and house rules
import React from "react";
import Eyebrow from "./Eyebrow";
import SectionTitle from "./SectionTitle";

const BLOCKS = [
  {
    label: "Horaires de vente",
    text: "En dehors des événements annoncés dans la gazette, les ventes pour toutes les séances sont ouvertes environ 15 minutes avant l'heure indiquée, et définitivement closes 15 minutes après.",
  },
  {
    label: "Règlement intérieur",
    text: "Nous ne vendons pas de pop-corn et nous vous demandons de bien vouloir éteindre vos téléphones, afin de ne pas déranger l'expérience cinématographique de vos voisins.",
  },
];

export default function PracticalInfo() {
  return (
    <section className="px-5 sm:px-8 wide:px-0 py-8 lg:py-16 flex flex-col gap-8 border-y border-ink/10">
      <SectionTitle title="Informations pratiques" />
      {BLOCKS.map((block) => (
        <div key={block.label} className="flex flex-col gap-2">
          <Eyebrow className="tracking-[0.26em]">{block.label}</Eyebrow>
          <p className="text-note leading-relaxed text-muted">{block.text}</p>
        </div>
      ))}
      <p className="text-base font-bold">Merci de votre compréhension</p>
    </section>
  );
}
