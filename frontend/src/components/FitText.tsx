// Single-line text that shrinks its own font-size so it never overflows its box
import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";

interface FitTextProps {
  children: ReactNode;
  className?: string;
}

export default function FitText({ children, className = "" }: FitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      const ratio = parent.clientWidth / el.scrollWidth;
      setScale(ratio < 1 ? ratio : 1);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [children]);

  return (
    <span
      ref={ref}
      className={`inline-block whitespace-nowrap ${className}`}
      style={scale < 1 ? { transform: `scale(${scale})`, transformOrigin: "left center" } : undefined}
    >
      {children}
    </span>
  );
}
