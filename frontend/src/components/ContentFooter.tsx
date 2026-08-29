// Footer navigation links and info
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Eyebrow from "./Eyebrow";

const NAVIGATION = [
  { to: "/", label: "Accueil" },
  { to: "/#jour", label: "Programmes" },
  { to: "/#Tarifs", label: "Tarifs" },
  { to: "/#film", label: "Nos films" },
  { to: "/#Daily", label: "Film du jour" },
  { to: "/#Localisation", label: "Localisation" },
];

const PROJET = [
  { href: "https://maxime-turquet.vercel.app/", label: "Mon portfolio" },
  { href: "https://gmsproject-01.vercel.app/", label: "Mon dernier projet" },
  { href: "https://github.com/MaximeTTS", label: "Mon GitHub" },
  { href: "/CV%20Maxime%20Turquet%20Samus.pdf", label: "Mon CV" },
];

const MAPS_URL = "https://www.google.com/maps/d/u/0/viewer?mid=1IEC0xkR8Az6talbLsb0I6m-vTCo&hl=fr";

// Bandeau de titre encadré de deux filets
const Banner: FC = () => (
  <div className="flex items-center gap-6">
    <span className="h-px flex-1 bg-cream/20" />
    <span className="text-label font-bold uppercase tracking-[0.28em] text-black text-center">
      Cinéma Utopia · Saint-Ouen l'Aumône · près de Pontoise
    </span>
    <span className="h-px flex-1 bg-cream/20" />
  </div>
);

// Colonne de liens, même gabarit pour la navigation et le projet
const LinkColumn: FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="flex flex-col items-start gap-3">
    <Eyebrow size="label" className="mb-1 tracking-[0.26em]">
      {title}
    </Eyebrow>
    {children}
  </div>
);

const linkClass = "link-hover-effect text-[18px] text-black font-medium hover:text-cream transition-colors";

const Columns: FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
    {/* Le cinéma */}
    <LinkColumn title="Le cinéma">
      <p className="text-[18px] text-black font-medium leading-relaxed">
        Utopia Stella
        <br />1 place Mendès France
        <br />
        Saint-Ouen l'Aumône
      </p>
      <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
        Itinéraire
      </a>
      <a href="tel:+33130377552" className={linkClass}>
        01 30 37 75 52
      </a>
    </LinkColumn>

    {/* Horaires de vente */}
    <LinkColumn title="Horaires">
      <p className="text-[18px] text-black font-medium leading-relaxed">Ouverture des ventes</p>
      <p className="text-[18px] text-black font-medium leading-relaxed -mt-2">
        Environ 15 minutes avant l'heure de la séance
      </p>
      <p className="text-[18px] text-black font-medium leading-relaxed mt-1">Clôture</p>
      <p className="text-[18px] text-black font-medium leading-relaxed -mt-2">15 minutes après l'heure indiquée</p>
      <p className="text-[18px] text-black font-medium leading-relaxed">Ni pop-corn, ni téléphone allumé.</p>
    </LinkColumn>

    {/* Navigation interne */}
    <LinkColumn title="Navigation">
      {NAVIGATION.map((item) =>
        item.to.includes("#") ? (
          <a key={item.label} href={item.to} className={linkClass}>
            {item.label}
          </a>
        ) : (
          <Link key={item.label} to={item.to} className={linkClass}>
            {item.label}
          </Link>
        ),
      )}
    </LinkColumn>

    {/* Le projet et son auteur */}
    <LinkColumn title="Le projet">
      <p className="text-[18px] text-black font-medium leading-relaxed">
        Site personnel alimenté par mes scripts de scraping du site officiel Utopia.
      </p>
      {PROJET.map((item) => (
        <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {item.label}
        </a>
      ))}
    </LinkColumn>
  </div>
);

// Équivalent de la lettre d'information : la gazette hebdomadaire du cinéma
const Gazette: FC = () => (
  <div className="flex flex-col items-start gap-3 max-w-md">
    <Eyebrow size="label" className="tracking-[0.26em]">
      La gazette
    </Eyebrow>
    <p className="text-[18px] text-black font-medium leading-relaxed">
      Le programme détaillé de la semaine, les avant-premières et les séances spéciales.
    </p>
    <a
      href="https://saintouen.cinemas-utopia.org/gazettes/"
      target="_blank"
      rel="noopener noreferrer"
      className="link-hover-effect flex items-center gap-3 text-[18px] text-black font-medium hover:text-accent transition-colors"
    >
      Consulter les gazettes <span aria-hidden>→</span>
    </a>
  </div>
);

// Lettrage géant, signature du bas de page
const Wordmark: FC = () => (
  <h2 className="font-archivo text-[min(10vw,160px)] uppercase text-cream font-medium leading-[0.8] tracking-[-0.03em]">
    Utopia <span className="text-accent">Pontoise</span>
  </h2>
);

// Composant principal du footer
const ContentFooter: FC = () => (
  <footer className="bg-[#FFFF] w-full px-5 sm:px-10 lg:px-16 py-10 flex flex-col gap-10">
    <Banner />
    <Columns />
    <Gazette />
    <Wordmark />
  </footer>
);

export default ContentFooter;
