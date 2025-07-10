"use client";

import React from "react";

export default function Location() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
      {/* Titre principal */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-[48px] font-light text-black mb-4">Notre Localisation</h2>
        <div className="w-24 h-px bg-black mx-auto"></div>
      </div>

      {/* Carte Google Maps */}
      <div className="mb-8 sm:mb-10 md:mb-12">
        <div className="ml-4 sm:ml-6 md:ml-8">
          <div className="bg-gray-100 p-3 sm:p-4 md:p-6 border border-gray-200">
            {/* Iframe Google Maps intégré */}
            <iframe
              title="Carte Google Maps Utopia"
              src="https://www.google.com/maps/d/u/0/embed?mid=1IEC0xkR8Az6talbLsb0I6m-vTCo&hl=fr&ehbc=2E312F"
              width="100%"
              height="500"
              className="rounded-lg shadow border-none"
              allowFullScreen
              loading="lazy"
            />
            {/* Bouton de redirection alternative */}
            <div className="text-center mt-6">
              <a
                href="https://www.google.com/maps/d/u/0/viewer?mid=1IEC0xkR8Az6talbLsb0I6m-vTCo&hl=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                Voir sur Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
