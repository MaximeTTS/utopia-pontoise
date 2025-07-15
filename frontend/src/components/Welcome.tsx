import React from "react";

export default function Welcome() {
  return (
    <div>
      {/* En-tête centré avec nouveau style */}
      <div className=" px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 bg-white">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-[48px] font-light text-black mb-4">Cinémas Utopia Pontoise</h2>
          <div className="w-24 h-px bg-black mx-auto"></div>
          <div className="text-left ml-4 sm:ml-6 md:ml-8 mt-6 text-base sm:text-lg text-gray-600 font-light">
            <p>
              Bienvenue sur la version portfolio de Utopia Pontoise ! Vous y découvrirez l’intégralité du contenu du
              site officiel, collecté grâce à mes scripts de scraping. Dans le footer, vous trouverez l’ensemble de mes
              liens professionnels ainsi que la documentation détaillée du projet, qui décrit chaque étape de sa
              conception et de son développement. <br />
              <br />
              Vous pourrez également explorer mon portfolio complet et découvrir mon dernier chantier : la refonte
              intégrale du site de Vivenden, une chaîne de salles de sport implantée partout en France.
            </p>
            <p className="text-center">
              <br />
              Je vous souhaite une excellente visite !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
