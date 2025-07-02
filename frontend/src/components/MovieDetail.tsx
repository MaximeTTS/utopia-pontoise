import React from "react";
import { MovieDetails } from "../api/utopia";

interface Props {
  details: MovieDetails;
}

export default function MovieDetail({ details }: Props) {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">{details.title}</h1>
      {details.image && <img src={details.image} alt={details.title} className="w-full max-w-md mx-auto rounded" />}
      <p className="text-gray-700">{details.description}</p>
      {details.trailer && <video controls src={details.trailer} className="w-full max-w-lg mx-auto mt-4" />}
    </div>
  );
}
