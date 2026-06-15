"use client";

const heroCardWidthClasses = "min-w-33 sm:min-w-46 md:min-w-50 lg:min-w-55 xl:min-w-64 max-w-64";
const genericCardWidthClasses = "w-56 md:w-60 lg:w-64 max-w-64";
const cardWidthClasses = genericCardWidthClasses;

type CardSkeletonProps = {
  className?: string;
  compact?: boolean; 
};

export function HeroCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`${heroCardWidthClasses} aspect-16/23 rounded border-2 sm:border-4 border-gray-300 p-4 flex flex-col justify-between overflow-hidden relative bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer ${className}`}
      style={{
        backgroundSize: "200% 100%",
      }}
    >
      <div className="w-full h-24 sm:h-32 md:h-40 bg-gray-300 rounded-xl opacity-40" />
      <div className="h-4 sm:h-5 md:h-6 bg-gray-300 rounded w-3/4 mt-2 sm:mt-3 md:mt-4 opacity-40" />
      <div className="h-2 sm:h-3 md:h-4 bg-gray-300 rounded w-1/2 mt-1 sm:mt-2 opacity-40" />
      <div className="h-6 sm:h-8 md:h-10 bg-gray-300 rounded-xl w-full mt-2 sm:mt-3 md:mt-4 opacity-40" />
    </div>
  );
}

export function SharedCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`${genericCardWidthClasses} aspect-16/23 rounded border-2 sm:border-4 border-gray-300 p-4 flex flex-col justify-between overflow-hidden relative bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer ${className}`}
      style={{
        backgroundSize: "200% 100%",
      }}
    >
      <div className="w-full h-24 sm:h-32 md:h-40 bg-gray-300 rounded-xl opacity-40" />
      <div className="h-4 sm:h-5 md:h-6 bg-gray-300 rounded w-3/4 mt-2 sm:mt-3 md:mt-4 opacity-40" />
      <div className="h-2 sm:h-3 md:h-4 bg-gray-300 rounded w-1/2 mt-1 sm:mt-2 opacity-40" />
      <div className="h-6 sm:h-8 md:h-10 bg-gray-300 rounded-xl w-full mt-2 sm:mt-3 md:mt-4 opacity-40" />
    </div>
  );
}

export function CardSkeleton({ className = "", compact = false }: CardSkeletonProps) {
  const skeletonCards = Array.from({ length: 5 });
  const containerBase = compact
    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-7 md:gap-8 lg:gap-10 xl:gap-12 w-full justify-items-center place-items-center"
    : "mt-6 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-7 md:gap-8 lg:gap-10 xl:gap-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 w-full justify-items-center place-items-center";

  return (
    <div className={`${containerBase} ${className}`}>
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className={`
            mx-auto
            ${cardWidthClasses}
            ${index === 0 ? "block" : "hidden"}
            ${index === 1 ? "sm:block" : ""}
            ${index === 2 ? "md:block" : ""}
            ${index === 3 ? "lg:block" : ""}
            ${index === 4 ? "xl:block" : ""}
          `}
        >
          <SharedCardSkeleton />
        </div>
      ))}
    </div>
  );
}

export function CardHeaderSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4 md:px-6 my-6 md:my-8 justify-items-center place-items-center">
      {[...Array(5)].map((_, index) => (
        <div 
          key={index}
          className={`${index === 0 ? "block" : "hidden"}
            ${index === 1 ? "sm:block" : ""}
            ${index == 2 ? "md:block" : ""}
            ${index >= 3 ? "lg:block" : ""}`}
        >
          <SharedCardSkeleton />
        </div>
      ))}
    </div>
  );
}

export function CardTileSkeleton({ className = "" }: CardSkeletonProps) {
  return (
    <div
      className={`aspect-3/4 w-full rounded overflow-hidden bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer border-2 border-gray-300 ${className}`}
      style={{
        backgroundSize: "200% 100%",
      }}
    />
  );
}

export function CardImageSkeleton({ className = "" }: CardSkeletonProps) {
  return (
    <div
      className={`absolute inset-0 z-10 rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer ${className}`}
      style={{
        backgroundSize: "200% 100%",
      }}
    />
  );
}

export function MarketplaceCardSkeleton({ className = "" }: CardSkeletonProps) {
  return (
    <div className={`w-60 xl:w-64 overflow-hidden rounded border-2 border-black bg-slate-200 flex flex-col ${className}`}>
      
      <div 
        className="relative aspect-16/23 w-full p-3 flex flex-col justify-between bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
        style={{ backgroundSize: "200% 100%" }}
      >
        <div className="flex justify-between items-center w-full">
          <div className="h-3 sm:h-4 bg-gray-300 rounded w-1/2 opacity-70" />
          <div className="h-3 sm:h-4 bg-gray-300 rounded w-10 opacity-70" />
        </div>

        <div className="w-full aspect-4/3 border-2 border-dashed border-gray-300 rounded-sm bg-gray-100/50 opacity-60 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-gray-300 opacity-40" />
        </div>

        <div className="w-full flex flex-col gap-1.5 mt-2">
          <div className="w-full h-1 bg-gray-300 opacity-50 mb-1" />
          
          <div className="h-2.5 sm:h-3 bg-gray-300 rounded w-3/4 opacity-60" />
          <div className="h-2.5 sm:h-3 bg-gray-300 rounded w-1/2 opacity-60" />
        </div>
      </div>

      <div className="flex justify-between items-center bg-blue-600 px-2 py-2 border-t-2 border-black">
        <div className="h-7 sm:h-8 bg-gray-300 rounded w-20 sm:w-24 opacity-70" />
        <div className="h-5 sm:h-6 bg-gray-300 rounded w-14 sm:w-16 opacity-70" />
      </div>

    </div>
  );
}