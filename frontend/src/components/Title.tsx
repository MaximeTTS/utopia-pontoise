import React from "react";

interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return (
    <div className="text-center mb-8 sm:mb-10 md:mb-12">
      <h2 className="text-[48px] font-light text-black mb-4 text-center">{title}</h2>
      <div className="w-24 h-px bg-black mx-auto" />
    </div>
  );
}
