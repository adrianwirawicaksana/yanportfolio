"use client";

import Image from "next/image";
import { useState } from "react";
import type { CardWithPrice } from "@/types/pokemon";

type MarketplaceCardGridProps = {
  card: CardWithPrice;
};

// Menggunakan MarketplaceCardGridProps yang sudah didefinisikan di atas
const MarketplaceCardGrid = ({ card }: MarketplaceCardGridProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false); // Handle jika gambar gagal di-load dari server

  if (!card?.images?.large) return null;

  // Kondisi menentukan kapan skeleton harus aktif
  const showSkeleton = !isLoaded || isError;

  return (
    <div
      className="
        min-w-60
        sm:min-w-40
        md:min-w-50
        lg:min-w-60
        w-full
        max-w-60
        overflow-hidden
        rounded-md
        border-2
        border-black
        bg-slate-200
        flex
        flex-col
      "
    >
      {/* AREA GAMBAR */}
      <div className="relative aspect-16/23 w-full overflow-hidden">
        {showSkeleton && (
          <div className="absolute inset-0 z-10 animate-pulse bg-slate-300" />
        )}

        <Image
          src={card.images.large}
          alt={card.name}
          fill
          className={`object-contain transition-all duration-500 scale-110 ${
            isLoaded && !isError
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
          // Disesuaikan agar browser mengunduh ukuran gambar yang pas
          sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 240px"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)} // Mencegah munculnya alt-text hancur saat error testing atau server mati
          loading="eager"
          unoptimized
        />
      </div>

      {/* BOTTOM BAR (Dikeluarkan dari div Image agar layout solid) */}
      <div className="flex items-center justify-between bg-blue-600 px-2 py-2 border-t-2 border-black">
        <button className="relative z-10 rounded bg-yellow-300 px-2 py-1 text-base sm:text-sm font-bold text-black cursor-pointer border-2 border-orange-300 hover:scale-105 active:scale-95 duration-300 transition-all ease-in-out">
          + Add Cart
        </button>

        <p className="text-xl font-extrabold text-white font-title whitespace-nowrap">
          {Math.trunc(card.marketPrice ?? 0).toLocaleString("id-ID")}
          <span className="text-yellow-300 ml-0.5">C</span>
        </p>
      </div>
    </div>
  );
};

export default MarketplaceCardGrid;
