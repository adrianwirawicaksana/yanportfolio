"use client";

import Image from "next/image";
import { useState } from "react";
import type { PokemonCard } from "@/src/types/pokemon";

type Props = {
  card: PokemonCard;
  priority?: boolean;
};

const CardPokemon = ({ card, priority = false }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  if (!card?.images?.large) {
    return null;
  }

  const showSkeleton = !isLoaded || isError;

  return (
    <div className="relative min-w-33 sm:min-w-46 md:min-w-50 lg:min-w-55 xl:min-w-
    64 max-w-64 aspect-16/23 border sm:border-2 border-black rounded scale-102 overflow-hidden bg-slate-200">
      {showSkeleton && (
        <div
          className="absolute inset-0 z-10 p-4 flex flex-col justify-between bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
          style={{ backgroundSize: "200% 100%" }}
        >
          <div className="w-full h-24 sm:h-32 md:h-40 bg-gray-300 rounded opacity-40" />
          <div className="h-4 sm:h-5 md:h-6 bg-gray-300 rounded w-3/4 mt-2 sm:mt-3 md:mt-4 opacity-40" />
          <div className="h-2 sm:h-3 md:h-4 bg-gray-300 rounded w-1/2 mt-1 sm:mt-2 opacity-40" />
          <div className="h-6 sm:h-8 md:h-10 bg-gray-300 rounded-xl w-full mt-2 sm:mt-3 md:mt-4 opacity-40" />
        </div>
      )}

      <Image
        src={card.images.large}
        alt={card.name}
        fill
        sizes="(max-width: 640px) 130px, (max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
        className={`object-cover transition-opacity duration-500 scale-105 ${
          isLoaded && !isError ? "opacity-100" : "opacity-0"
        }`}
        quality={85}
        priority={priority}
        placeholder="empty"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />
    </div>
  );
};

export default CardPokemon;
