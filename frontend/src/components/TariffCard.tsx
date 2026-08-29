// Single price card of the tariffs grid
import React from "react";
import Eyebrow from "./Eyebrow";

export interface Tariff {
  label: string;
  name: string;
  detail?: string;
  price: string;
  premium?: boolean;
}

interface TariffCardProps {
  tariff: Tariff;
}

export default function TariffCard({ tariff }: TariffCardProps) {
  const { label, name, detail, price, premium } = tariff;

  return (
    <div
      className={`border border-ink/25 p-5 flex flex-col gap-2 min-h-[211px] ${
        premium ? "bg-accent text-ink" : "bg-cream"
      }`}
    >
      <Eyebrow tone={premium ? "light" : "accent"} size="custom" className="text-[18px] md:text-[20px] tracking-[0.24em]">
        {label}
      </Eyebrow>
      <span className="text-[18px] md:text-[20px] font-bold">{name}</span>
      {detail && <span className={`text-mini leading-snug ${premium ? "text-ink" : "text-muted"}`}>{detail}</span>}
      <span className="mt-auto font-archivo text-[34px]">{price}</span>
    </div>
  );
}
