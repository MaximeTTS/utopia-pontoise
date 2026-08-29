// Floating footer container component
import React, { FC, useLayoutEffect, useRef, useState } from "react";
import ContentFooter from "./ContentFooter";

const Footer: FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  // L'espace réservé doit valoir exactement la hauteur du footer : figée, elle
  // rognait le bas de page dès que le contenu grandissait
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => setHeight(el.offsetHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sur petit écran le footer suit le contenu : la révélation le tronquerait */}
      <div className="lg:hidden">
        <ContentFooter />
      </div>

      {/* Sur grand écran, il se dévoile derrière la page qui défile */}
      <div
        className="hidden lg:block relative"
        style={{ height, clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div ref={contentRef} className="fixed bottom-0 w-full">
          <ContentFooter />
        </div>
      </div>
    </>
  );
};

export default Footer;
