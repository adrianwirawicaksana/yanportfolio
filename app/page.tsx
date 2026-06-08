import dynamic from "next/dynamic";
import { Suspense } from "react";
import { CardHeader } from "./components/CardHeader";
import HeroSection from "./components/HeroSection";
import MarketPlace from "./components/MarketPlace";
import SourceSection from "./components/SourceSection";
import SourceHeader from "./components/HeaderSource";
import { CardSkeleton, CardHeaderSkeleton } from "./components/CardSkeleton";

// Pindahkan fetcher ke komponen pembungkus khusus agar bisa di-stream
import PokemonGridWrapper from "./components/PokemonGridWrapper";
import ShowCaseWrapper from "./components/ShowcaseWrapper";

export default function Home() {
  return (
    <div className="min-h-full w-full bg-[#FFFC79] flex flex-col items-center justify-center text-gray-800">
      {/* Hero Section langsung beres tanpa nunggu API */}
      <HeroSection>
        <CardHeader />
        <Suspense fallback={<CardHeaderSkeleton />}>
          <PokemonGridWrapper />
        </Suspense>
      </HeroSection>

      {/* Marketplace di-render menyusul saat data siap */}
      <MarketPlace>
        {/* Mengubah div judul menjadi H2 semantik */}
        <h2 className="w-full bg-linear-to-t from-red-700 to-red-500 rounded border-4 border-blue-600 p-2 mb-4 text-center font-title text-2xl font-bold text-white sm:border-6 sm:text-4xl">
          Show Case Cards
        </h2>
        <Suspense fallback={<CardSkeleton />}>
          <ShowCaseWrapper />
        </Suspense>
      </MarketPlace>

      <SourceSection>
        <SourceHeader />
      </SourceSection>
    </div>
  );
}
