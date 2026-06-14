const marketplaceCardWidth = "w-[min(36vw,130px)] sm:w-56 md:w-60 lg:w-64 max-w-64";

export function MarketplaceSkeleton() {
  const dummyItems = Array.from({ length: 10 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4 md:px-6">
      {dummyItems.map((_, index) => (
        <div 
          key={index} 
          className={`${marketplaceCardWidth} aspect-16/23 rounded-xl border-2 sm:border-4 border-gray-300 p-4 flex flex-col justify-between overflow-hidden relative bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer`}
          style={{
            backgroundSize: '200% 100%',
          }}
        >
          <div className="w-full h-24 sm:h-32 md:h-40 bg-gray-300 rounded-xl opacity-40" />
          <div className="h-4 sm:h-5 md:h-6 bg-gray-300 rounded w-3/4 mt-2 sm:mt-3 md:mt-4 opacity-40" />
          <div className="h-2 sm:h-3 md:h-4 bg-gray-300 rounded w-1/2 mt-1 sm:mt-2 opacity-40" />
          <div className="h-6 sm:h-8 md:h-10 bg-gray-300 rounded-xl w-full mt-2 sm:mt-3 md:mt-4 opacity-40" />
        </div>
      ))}
    </div>
  );
}