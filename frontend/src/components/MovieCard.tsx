// frontend/src/components/MovieCard.tsx

import { CustomButton } from "./CustomButton";
import { Link } from "react-router-dom";

interface MovieCardProps {
  title: string;
  link: string;
  image: string | null;
}

export default function MovieCard({ title, link, image }: MovieCardProps) {
  const detailUrl = `/film?url=${encodeURIComponent(link)}`;

  return (
    <div className="flex items-center justify-center rounded-lg">
      <div className="w-full mx-auto">
        <div
          className="group relative overflow-hidden rounded-lg bg-black shadow-xl
            w-full h-[350px]"
        >
          {/* Background image */}
          {image && (
            <img
              src={image}
              alt={`Affiche de ${title}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-50"
            />
          )}

          {/* Superposition dégradée */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

          {/* Titre qui disparaît au hover */}
          <div
            className="absolute bottom-0 left-0 right-0 p-2 lg:p-4 text-white
            opacity-100 group-hover:opacity-0 transition-opacity duration-300"
          >
            <h3 className="text-[20px] font-bold">{title}</h3>
          </div>

          {/* Panel qui remonte du bas */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent
            p-2 lg:p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
          >
            <div className="text-white text-center">
              <h3 className="text-[20px] font-bold mb-2.5">{title}</h3>
              <Link to={detailUrl}>
                <CustomButton className="bg-red-600 hover:bg-red-700 text-[18px] px-6 py-2.5 w-full">
                  En savoir plus
                </CustomButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
