// Section heading, with an optional note aligned on its vertical centre
import React, { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  aside?: ReactNode;
  className?: string;
}

export default function SectionTitle({ title, aside, className = "" }: SectionTitleProps) {
  return (
    // items-center : la mention se cale au milieu du titre sur l'axe vertical
    <div className={`flex flex-wrap items-center justify-between gap-3 ${className}`}>
      <h2 className="font-archivo text-[40px] xs:text-[42px] sm:text-[62px] leading-[1.3] uppercase tracking-[-0.005em]">
        {title}
      </h2>
      {aside}
    </div>
  );
}
