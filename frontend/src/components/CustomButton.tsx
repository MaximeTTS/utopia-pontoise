// Reusable button with optional styling
"use client";
import type { ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function CustomButton({ children, className = "", onClick }: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium 
        ring-offset-background focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
        disabled:opacity-50 text-white shadow hover:shadow-lg active:scale-95 
        transition-all duration-200 ${className}
      `}
    >
      {children}
    </button>
  );
}
