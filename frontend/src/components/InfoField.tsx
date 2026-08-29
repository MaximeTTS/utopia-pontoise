// One label/value pair of a film's credits list
import React from "react";

interface InfoFieldProps {
  label: string;
  value: string;
}

export default function InfoField({ label, value }: InfoFieldProps) {
  if (!value) return null;

  return (
    <>
      <span className="text-muted">{label}</span>
      <span>{value}</span>
    </>
  );
}
