// CardSkeleton
export function CardSkeleton() {
  // Kita buat array dummy berisi ...length elemen untuk mensimulasikan grid kartu
  const skeletonCards = Array.from({ length: 10 });

  return (
    <div className="flex flex-wrap justify-around gap-8">
      {skeletonCards.map((_, index) => (
         <div 
          key={index} 
          className="w-64 h-80 animate-pulse rounded-xl border-4 border-gray-300 bg-white/60 p-4 flex flex-col justify-between"
        >
          <div className="w-full h-40 bg-gray-300 rounded-lg" />
          <div className="h-6 bg-gray-300 rounded w-3/4 mt-4" />
          <div className="h-4 bg-gray-300 rounded w-1/2 mt-2" />
          <div className="h-10 bg-gray-300 rounded-lg w-full mt-4" />
        </div>
      ))}
    </div>
  );
}

// CardHeaderSkeleton
export function CardHeaderSkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-8 my-8">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`
            w-64 h-80 animate-pulse rounded-xl border-4 border-gray-300 bg-white/60 p-4 flex flex-col justify-between
            ${index >= 1 ? "hidden sm:flex" : "flex"}
            ${index >= 3 ? "sm:hidden lg:flex" : ""}
          `}
        >
          <div className="w-full h-40 bg-gray-300 rounded-lg" />
          <div className="h-6 bg-gray-300 rounded w-3/4 mt-4" />
          <div className="h-4 bg-gray-300 rounded w-1/2 mt-2" />
          <div className="h-10 bg-gray-300 rounded-lg w-full mt-4" />
        </div>
      ))}
    </div>
  );
}