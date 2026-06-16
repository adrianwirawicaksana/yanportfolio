export function DashboardCardsSkeleton() {
  const dummyItems = Array.from({ length: 10 });

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center border-b-4 border-yellow-500 pb-3 shrink-0">
        <div className="h-8 w-48 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer rounded-lg" style={{ backgroundSize: '200% 100%' }} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-6 justify-items-center place-items-center px-2">
        {dummyItems.map((_, index) => (
          <div 
            key={index} 
            className="relative w-full min-w-32 max-w-64 aspect-3/4 border border-gray-300 sm:border-2 rounded overflow-hidden bg-slate-200"
          >
            <div
              className="absolute inset-0 z-10 p-4 flex flex-col justify-between bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
              style={{ backgroundSize: "200% 100%" }}
            >
              <div className="w-full h-24 sm:h-32 md:h-40 bg-gray-300 rounded opacity-40" />
              <div className="h-4 sm:h-5 md:h-6 bg-gray-300 rounded w-3/4 mt-2 sm:mt-3 md:mt-4 opacity-40" />
              <div className="h-2 sm:h-3 md:h-4 bg-gray-300 rounded w-1/2 mt-1 sm:mt-2 opacity-40" />
              <div className="h-6 sm:h-8 md:h-10 bg-gray-300 rounded-xl w-full mt-2 sm:mt-3 md:mt-4 opacity-40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
