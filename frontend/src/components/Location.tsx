// Google Maps embed for the cinema location
"use client";

import React from "react";
import SectionTitle from "./SectionTitle";

const MAP_EMBED = "https://www.google.com/maps/d/u/0/embed?mid=1IEC0xkR8Az6talbLsb0I6m-vTCo&hl=fr&ehbc=2E312F";
const MAP_VIEWER = "https://www.google.com/maps/d/u/0/viewer?mid=1IEC0xkR8Az6talbLsb0I6m-vTCo&hl=fr";

export default function Location() {
  return (
    <section id="Localisation" className="px-5 sm:px-8 wide:px-0 py-8 lg:py-16 flex flex-col gap-8">
      <SectionTitle title="Notre localisation" />
      {/* Iframe Google Maps intégré */}
      <div className="map-hatch border border-ink/20">
        <iframe
          title="Carte Google Maps Utopia"
          src={MAP_EMBED}
          className="w-full h-[422px] sm:h-[768px] block border-none"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {/* Bouton de redirection alternative */}
      <a
        href={MAP_VIEWER}
        target="_blank"
        rel="noopener noreferrer"
        className="link-hover-effect self-center px-6 py-3.5 bg-accent text-white text-mini font-bold uppercase tracking-[0.2em] hover:bg-accent/90 transition-colors"
      >
        Voir sur Google Maps
      </a>
    </section>
  );
}
