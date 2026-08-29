// Ticket prices and accepted payment methods
import React from "react";
import SectionTitle from "./SectionTitle";
import TariffCard, { Tariff } from "./TariffCard";

const TARIFFS: Tariff[] = [
  { label: "Standard", name: "Tarif normal", price: "7,50€" },
  {
    label: "Premium",
    name: "Carnet Ticket",
    detail: "10 places non limitées dans le temps, valables dans tous les Utopia",
    price: "55€",
    premium: true,
  },
  { label: "Collectif", name: "Groupe", detail: "Plus de 30 personnes", price: "3,50€" },
  {
    label: "Réduit",
    name: "Tarif réduit",
    detail: "Étudiants - demandeurs d'emploi - bénéficiaires du RSA",
    price: "4,50€",
  },
  { label: "Étudiant", name: "Pass Campus", price: "4,00€" },
];

export default function Tariffs() {
  return (
    <section id="Tarifs" className="border-y border-ink/10 px-5 sm:px-8 wide:px-0 py-8 lg:py-16">
      <SectionTitle title="Nos tarifs" className="mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {TARIFFS.map((tariff) => (
          <TariffCard key={tariff.name} tariff={tariff} />
        ))}
      </div>
      <p className="mt-4 text-base xs:text-label text-muted">
        Les moyens de paiement disponibles : CB, Chèque ou Espèces
      </p>
    </section>
  );
}
