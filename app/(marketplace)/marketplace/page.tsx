import { Suspense } from "react";
import BackButton from "./_components/BackButton";
import MarketplaceGrid from "./_components/MarketplaceGrid";
import { MarketplaceSkeleton } from "./_components/MarketplaceSkeleton";
import MarketHeader from "./_components/MarketHeader";

export default async function Home() {
  return (
    <div className="min-h-screen w-full bg-[#FFFC79] px-8 pt-30 pb-30 text-gray-800">
      <div className="mx-auto flex w-full flex-col gap-8">
        {/* Ini akan LANGSUNG muncul tanpa menunggu API selesai */}
        <MarketHeader />

        {/* Bagian ini akan menampilkan skeleton saat API sedang loading */}
        <Suspense fallback={<MarketplaceSkeleton />}>
          <MarketplaceGrid />
        </Suspense>

        {/* Tombol back juga langsung muncul, UX jadi terasa instan */}
        <BackButton />
      </div>
    </div>
  );
}
