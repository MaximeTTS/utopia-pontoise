import React from "react";
import Title from "./Title";

export default function Welcome() {
  return (
    <div>
      {/* En-tête centré avec nouveau style */}
      <div className=" py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="p-8 bg-[#29273B] rounded-lg">
          <Title title="UTOPIA PONTOISE" />
          <div className="text-left mt-6 text-base sm:text-lg text-white font-light">
            <p>
              Bonjour et bienvenue sur mon projet Utopia Pontoise ! Vous y découvrirez plusieurs contenus du site
              officiel, collecté grâce à mes scripts de scraping. Dans le footer, vous trouverez l’ensemble de mes liens
              professionnels pour me contacter ou découvrir mes autres projets.
            </p>
            <p className="text-center text-lg">
              <br />
              Je vous souhaite une excellente visite !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
