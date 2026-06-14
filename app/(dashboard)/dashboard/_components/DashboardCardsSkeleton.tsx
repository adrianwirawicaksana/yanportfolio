// Dashboard cards skeleton loader
import { CardImageSkeleton } from "@/app/_components/CardSkeleton";

export function DashboardCardsSkeleton() {
  const dummyItems = Array.from({ length: 10 });

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center border-b-4 border-yellow-500 pb-3 shrink-0">
        <div className="h-8 w-48 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer rounded-lg" style={{ backgroundSize: '200% 100%' }} />
      </div>

      {/* Grid Koleksi Kartu */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-6">
        {dummyItems.map((_, index) => (
          <div key={index} className="group relative aspect-3/4 w-full rounded-xl overflow-hidden border-2 border-gray-300">
            <CardImageSkeleton className="absolute inset-0 z-10" />
          </div>
        ))}
      </div>
    </div>
  );
}
