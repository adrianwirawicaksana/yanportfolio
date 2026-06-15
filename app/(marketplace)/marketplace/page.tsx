import { Suspense } from "react";
import BackButton from "./_components/BackButton";
import MarketplaceGrid from "./_components/MarketplaceGrid";
import { MarketplaceSkeleton } from "./_components/MarketplaceSkeleton";
import MarketHeader from "./_components/MarketHeader";

export default async function Home() {
  return (
    <div className="min-h-screen w-full bg-yellow-300 px-8 pt-30 pb-30 text-gray-800">
      <div className="mx-auto flex w-full flex-col gap-8">
        <MarketHeader />

        <Suspense fallback={<MarketplaceSkeleton />}>
          <MarketplaceGrid />
        </Suspense>

        <BackButton />
      </div>
    </div>
  );
}
