// Displays daily schedule and weekly program sections
"use client";

import React from "react";
import DailySchedule from "./DailySchedule";
import ScheduleView from "./ScheduleView";
import Title from "./Title";

export default function CinemaProgram() {
  return (
    <div className="min-h-scree">
      <div className="">
        {/* 01 – Programme du jour */}
        <div className=" md:mb-12 px-4 md:px-8 py-8 bg-[#29273B] rounded-lg">
          <DailySchedule />
          <ScheduleView />
        </div>

        {/* 02 – Nos Tarifs */}
        <div id="Tarifs" className="pt-8 pb-4 mb-12 bg-[#29273B] rounded-lg mt-12">
          <Title title="NOS TARIFS" />

          <div className="p-4 md:p-8 pt-0 space-y-6 sm:space-y-3 md:space-y-4">
            {[
              { title: "Tarif normal", price: "7,50€", category: "Standard" },
              {
                title: "Carnet d'abonnement",
                price: "55€",
                category: "Premium",
                desc: "10 places non limitées dans le temps, valables dans tous les Utopia",
              },
              { title: "Groupe", price: "3,50€", category: "Collectif", desc: "Plus de 30 personnes" },
              {
                title: "Tarif réduit",
                price: "4,50€",
                category: "Réduit",
                desc: "Étudiants, lycéens, collégiens, demandeurs d'emploi, bénéficiaires du RSA",
              },
              { title: "Pass Campus", price: "4,00€", category: "Étudiant" },
            ].map((tarif, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-3 sm:pl-4 md:pl-6 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                  <div className="flex-1">
                    <div className="text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 font-medium mb-1">
                      {tarif.category}
                    </div>
                    <div className="text-xl sm:text-2xl font-light text-white mb-1 sm:mb-2">{tarif.title}</div>
                    {tarif.desc && (
                      <div className="text-sm sm:text-base text-footer leading-relaxed pr-2 sm:pr-0">{tarif.desc}</div>
                    )}
                  </div>
                  <div className="text-xl sm:text-2xl font-semibold text-white text-center min-w-[80px] flex items-center justify-center">
                    {tarif.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4  text-base sm:text-lg text-footer">
            <span className="font-medium text-white">Les moyens de paiement disponibles :</span> CB, Chèque ou Espèces
          </div>
        </div>

        {/* 03 – Informations Pratiques */}
        <div className="bg-[#29273B] rounded-lg p-4 md:p-8">
          <Title title="Imformations Pratiques" />

          <div className=" space-y-6 sm:space-y-4 md:space-y-5 text-gray-700 leading-relaxed">
            <div className="border-l-2 border-gray-200 pl-3 sm:pl-4 md:pl-6 py-2 sm:py-3">
              <h4 className="font-semibold text-white mb-2 sm:mb-3 text-xl">Horaires de vente</h4>
              <p className="text-base text-footer leading-relaxed">
                En dehors des événements annoncés dans la gazette, les ventes pour toutes les séances sont ouvertes
                environ 15 minutes avant l'heure indiquée, et définitivement closes 15 minutes après.
              </p>
            </div>
            <div className="border-l-2 border-gray-200 pl-3 sm:pl-4 md:pl-6 py-2 sm:py-3 ">
              <h4 className="font-semibold text-white mb-2 sm:mb-3 text-xl">Règlement intérieur</h4>
              <p className="text-base text-footer leading-relaxed">
                Nous ne vendons pas de pop-corn et nous vous demandons de bien vouloir éteindre vos téléphones, afin de
                ne pas déranger l'expérience cinématographique de vos voisins.
              </p>
            </div>
            <div className="text-center pt-3 sm:pt-4">
              <div className="text-xl sm:text-2xl font-thin text-white">Merci de votre compréhension</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
