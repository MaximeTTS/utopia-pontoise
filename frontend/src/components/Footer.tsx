// Floating footer container component
import React, { FC, useLayoutEffect, useRef, useState } from "react";
import ContentFooter from "./ContentFooter";

const Footer: FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  // L'espace réservé doit valoir exactement la hauteur du footer : figée, elle
  // rognait le bas de page dès que le contenu grandissait
  const [height, setHeight] = useState(0);
  // Un footer fixe plus haut que la fenêtre a son haut hors champ, inatteignable au scroll
  const [fitsViewport, setFitsViewport] = useState(true);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => {
      setHeight(el.offsetHeight);
      setFitsViewport(el.offsetHeight <= window.innerHeight);
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <>
      {/* Sur petit écran le footer suit le contenu : la révélation le tronquerait */}
      <div className="lg:hidden">
        <ContentFooter />
      </div>

      {/* Sur grand écran, il se dévoile derrière la page qui défile, sauf si ça le tronquerait */}
      <div
        className="hidden lg:block relative"
        style={fitsViewport ? { height, clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" } : undefined}
      >
        <div ref={contentRef} className={fitsViewport ? "fixed bottom-0 w-full" : "w-full"}>
          <ContentFooter />
        </div>
      </div>
    </>
  );
};

export default Footer;
