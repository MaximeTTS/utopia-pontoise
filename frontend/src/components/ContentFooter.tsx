import React, { FC } from "react";

const Nav: FC = () => (
  <div className="flex shrink-0 gap-24">
    <div className="flex flex-col gap-2 text-[17px]">
      <h3 className="mb-2 uppercase text-[#ffffff80]">À propos</h3>
      <a
        href="https://www.cinemas-utopia.org/saintouen/"
        target="_blank"
        rel="noopener noreferrer"
        className="link-hover-effect"
      >
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

    <div className="flex flex-col gap-2 text-[17px]">
      <h3 className="mb-2 uppercase text-[#ffffff80]">À propos de moi</h3>
      <a
        href="https://gmsproject-01.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="link-hover-effect"
      >
        Mon dernier projet
      </a>
      <a
        href="https://maxime-turquet.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="link-hover-effect"
      >
        Mon portfolio
      </a>
      <a href="https://github.com/MaximeTTS" target="_blank" rel="noopener noreferrer" className="link-hover-effect">
        Mon GitHub
      </a>
      <a href="/CV Maxime Turquet Samus.pdf" target="_blank" rel="noopener noreferrer" className="link-hover-effect">
        Mon CV
      </a>
    </div>
  </div>
);

const Section2: FC = () => (
  <div className="flex justify-between items-end">
    <h1 className="text-[9vw] leading-[0.8] mt-10">UTOPIA PONTOISE</h1>
    <p>©copyright</p>
  </div>
);

const Content: FC = () => (
  <div className="bg-[#4E4E5A] py-8 px-12 h-full w-full flex flex-col justify-between">
    <Nav />
    <Section2 />
  </div>
);

export default Content;
