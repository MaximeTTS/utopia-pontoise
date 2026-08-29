// Wordmark with the three-strip film leader mark
import React, { FC } from "react";

const Logo: FC = () => (
  <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-6 whitespace-nowrap">
    <span className="flex gap-[4px]">
      <span className="h-6 w-1.5 sm:h-10 sm:w-2.5 lg:h-16 lg:w-4 bg-accent" />
      <span className="h-6 w-1.5 sm:h-10 sm:w-2.5 lg:h-16 lg:w-4 bg-accent/50" />
      <span className="h-6 w-1.5 sm:h-10 sm:w-2.5 lg:h-16 lg:w-4 bg-accent" />
    </span>
    <span className="font-archivo text-[28px] sm:text-[36px] md:text-[48px] uppercase text-ink">Utopia Pontoise</span>
  </div>
);

export default Logo;
