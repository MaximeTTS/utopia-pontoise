import React from "react";
interface TitleProps {
  title: string;
}
export default function Title({ title }: TitleProps) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-[48px] font-normal text-white mb-4">{title}</h2>
      <div className="w-24 h-px bg-white mx-auto" />
    </div>
  );
}
