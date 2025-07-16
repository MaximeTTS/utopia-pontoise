"use client";

import React from "react";
import Title from "./Title";

export default function Location() {
  return (
    <div className=" py-6 sm:py-8 md:py-10 lg:py-12">
      {/* Carte Google Maps */}
      <div className="mb-10">
        <div className="bg-[#29273B] p-3 sm:p-4 md:p-6  rounded-lg ">
          {/* Titre principal */}
          <Title title="NOTRE LOCALISATION" />
          {/* Iframe Google Maps intégré */}
          <iframe
            title="Carte Google Maps Utopia"
            src="https://www.google.com/maps/d/u/0/embed?mid=1IEC0xkR8Az6talbLsb0I6m-vTCo&hl=fr&ehbc=2E312F"
            className="w-full h-[400px] sm:h-[600px] rounded-lg shadow border-none"
            allowFullScreen
            loading="lazy"
          />
          {/* Bouton de redirection alternative */}
          <div className="text-center mt-6">
            <a
              href="https://www.google.com/maps/d/u/0/viewer?mid=1IEC0xkR8Az6talbLsb0I6m-vTCo&hl=fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#03001e] text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Voir sur Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
