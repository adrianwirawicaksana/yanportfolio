import { MarketplaceCardSkeleton } from "@/app/_components/CardSkeleton";

export function MarketplaceSkeleton() {
  const dummyItems = Array.from({ length: 10 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-2 sm:px-4 md:px-6 justify-items-center">
      {dummyItems.map((_, index) => (
        <MarketplaceCardSkeleton key={index} />
      ))}
    </div>
  );
}