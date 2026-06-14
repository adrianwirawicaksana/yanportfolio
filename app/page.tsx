import dynamic from "next/dynamic";
import { Suspense } from "react";
import { CardHeader } from "./_components/CardHeader";
import HeroSection from "./_components/HeroSection";
import { CardHeaderSkeleton, CardSkeleton } from "./_components/CardSkeleton";
import SourceSectionClient from "./_components/SourceSectionClient";

// ==================== AKTIFKAN NEXT DYNAMIC (LAZY LOAD) ====================

const PokemonGridWrapper = dynamic(
  () => import("./_components/PokemonGridWrapper"),
  {
    ssr: true,
    loading: () => <CardSkeleton />,
  },
);

// 1. MarketPlace di-load dynamic karena berisi Showcase Cards yang berat bawah
const MarketPlace = dynamic(() => import("./_components/MarketPlace"), {
  ssr: true, // Tetap true agar tag h2 di dalamnya terbaca oleh SEO Google
});

// 2. Showcase Wrapper di dalam Marketplace juga kita buat dynamic
const ShowCaseWrapper = dynamic(() => import("./_components/ShowcaseWrapper"), {
  ssr: true,
  loading: () => <CardSkeleton />,
});

// 3. SourceSection & SourceHeader dibundel bersama secara dynamic agar CSS 2.5 KiB & 11.2 KiB lepas dari jalur utama
//    `ssr: false` sekarang berada di dalam client wrapper folder agar Server Component build rules tetap aman.

// ===========================================================================

export default function Home() {
  return (
    <div className="min-h-full w-full bg-yellow-300 flex flex-col items-center justify-center text-gray-800">
      {/* 🟢 BAGIAN ATAS (HERO): Dimuat Instan & Cepat Tanpa Sumbatan CSS Bawah */}
      <HeroSection>
        <CardHeader />
        <Suspense fallback={<CardHeaderSkeleton />}>
          <PokemonGridWrapper />
        </Suspense>
      </HeroSection>

      {/* 🟡 BAGIAN TENGAH (MARKETPLACE): CSS-nya baru diunduh setelah Hero selesai menggambar */}
      <MarketPlace>
        <h2 className="w-full bg-linear-to-t from-red-700 to-red-500 rounded border-4 border-blue-600 p-2 mb-4 text-center font-title text-2xl font-bold text-white sm:border-6 sm:text-4xl">
          Show Case Cards
        </h2>
        <Suspense fallback={<CardSkeleton />}>
          <ShowCaseWrapper />
        </Suspense>
      </MarketPlace>

      {/* 🔵 BAGIAN BAWAH (SOURCE & VIDEO): CSS Media dan Grid di-load paling akhir */}
      <SourceSectionClient />
    </div>
  );
}