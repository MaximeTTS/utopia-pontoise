// src/components/Header.tsx
import React, { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => (
  <header className="bg-[#29273B] shadow-md rounded-lg mt-4">
    <div className="px-4 py-4 flex flex-wrap justify-center md:justify-between items-center">
      {/* Logo / Titre */}
      <Link to="/" className="text-white text-[24px] font-bold mb-2 md:mb-0">
        Royal Utopia
      </Link>

      {/* Navigation */}
      <nav className="w-full md:w-auto">
        <ul className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 lg:gap-8 gap-y-0">
          <li>
            <Link to="/" className="text-white text-base link-hover-effect block py-1">
              Accueil
            </Link>
          </li>
          <li>
            <a href="/#semaine" className="text-white text-base link-hover-effect block py-1">
              Programmes
            </a>
          </li>
          <li>
            <a href="/#Tarifs" className="text-white text-base link-hover-effect block py-1">
              Tarifs
            </a>
          </li>
          <li>
            <a href="/#film" className="text-white text-base link-hover-effect block py-1">
              Nos films
            </a>
          </li>
          <li>
            <a href="/#Daily" className="text-white text-base link-hover-effect block py-1">
              Film du jour
            </a>
          </li>
          <li>
            <a href="/#Localisation" className="text-white text-base link-hover-effect block py-1">
              Localisation
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
