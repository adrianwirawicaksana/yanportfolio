"use client";

import Image from "next/image";
import { useState } from "react";
import type { PokemonCard } from "@/types/pokemon";

type Props = {
  card: PokemonCard;
};

const CardPokemon = ({ card }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  // Ganti validasi ke images.small agar selaras dengan data yang digunakan
  if (!card?.images?.large) {
    return null;
  }

  const showSkeleton = !isLoaded || isError;

  return (
    <div className="relative min-w-33 sm:min-w-40 md:min-w-50 lg:min-w-60 w-full max-w-60 aspect-16/23 border sm:border-2 border-black rounded scale-102 overflow-hidden bg-slate-200">
      {/* SKELETON SILUET KARTU */}
      {showSkeleton && (
        <div className="absolute inset-0 z-10 bg-slate-100 p-3 flex flex-col justify-between animate-pulse">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-slate-300 rounded w-1/2" />
            <div className="h-4 bg-slate-300 rounded-full w-8" />
          </div>

          <div className="w-full flex-1 my-3 bg-slate-200 rounded-md border border-slate-300/50" />

          <div className="space-y-2">
            <div className="h-3 bg-slate-300 rounded w-full" />
            <div className="h-3 bg-slate-300 rounded w-5/6" />
            <div className="flex justify-between pt-1">
              <div className="h-2 bg-slate-300 rounded w-1/4" />
              <div className="h-2 bg-slate-300 rounded w-1/4" />
            </div>
          </div>
        </div>
      )}

      {/* GAMBAR POKEMON ASLI */}
      <Image
        // 1. FIX: Gunakan gambar versi 'large' agar kualitasnya lebih baik
        src={card.images.large}
        alt={card.name}
        fill
        sizes="(max-width: 640px) 130px, (max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
        className={`object-cover transition-opacity duration-500 scale-105 ${
          isLoaded && !isError ? "opacity-100" : "opacity-0"
        }`}
        // 2. FIX: Hapus loading="eager" dan unoptimized agar Next.js bisa mengonversi gambar ke WebP/AVIF secara otomatis
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />
    </div>
  );
};

export default CardPokemon;
