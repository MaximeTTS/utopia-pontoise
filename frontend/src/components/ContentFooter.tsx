import React, { FC } from "react";

// Composant de navigation avec grid responsive
const Nav: FC = () => (
  <div className="flex flex-col xs:flex-row gap-8 xs:gap-16">
    {/* Colonne “À propos” */}
    <div className="flex flex-col gap-2 text-[17px]">
      <h3 className="mb-2 uppercase text-white">À propos</h3>
      <a href="…" className="link-hover-effect">
        Site Utopia
      </a>
      <a href="#semaine" className="link-hover-effect">
        Horaires de la semaine
      </a>
      <a href="#film" className="link-hover-effect">
        Films de la semaine
      </a>
      <a href="#jour" className="link-hover-effect">
        Horaires du jour
      </a>
    </div>

    {/* Colonne “À propos de moi” */}
    <div className="flex flex-col gap-2 text-[17px]">
      <h3 className="mb-2 uppercase text-white">À propos de moi</h3>
      <a href="…" className="link-hover-effect">
        Mon dernier projet
      </a>
      <a href="…" className="link-hover-effect">
        Mon portfolio
      </a>
      <a href="…" className="link-hover-effect">
        Mon GitHub
      </a>
      <a href="…" className="link-hover-effect">
        Mon CV
      </a>
    </div>
  </div>
);

// Seconde section du footer
const Section2: FC = () => (
  <div className="flex justify-between items-end">
    <h1 className="text-[9vw] text-white leading-[0.8] mt-10">UTOPIA PONTOISE</h1>
    <p className="text-white">©copyright</p>
  </div>
);

// Composant principal du footer
const ContentFooter: FC = () => (
  <div className="bg-[#29273B] py-8 px-4 xs:px-8 md:xs:px-12 h-full w-full flex flex-col justify-between">
    <Nav />
    <Section2 />
  </div>
);

export default ContentFooter;
