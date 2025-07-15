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
              Bonjour et bienvenue sur mon projet Utopia Pontoise ! Vous y découvrirez plusieurs contenus du site
              officiel, collecté grâce à mes scripts de scraping. Dans le footer, vous trouverez l’ensemble de mes liens
              professionnels pour me contacter ou découvrir mes autres projets.
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
