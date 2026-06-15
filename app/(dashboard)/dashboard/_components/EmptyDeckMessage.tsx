import { memo } from "react";

function EmptyDeckMessageComponent() {
  return (
    <div className="min-h-full w-full flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-6 text-center px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl animate-bounce duration-1000">
        🃏
      </div>
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-title text-gray-800 max-w-sm sm:max-w-md leading-snug sm:leading-tight">
        You don&apos;t have a card yet.
      </h1>
      <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-xs sm:max-w-sm px-2">
        Mulai kumpulkan atau daftarkan kartu Pokemon Anda sekarang, Trainer!
      </p>
    </div>
  );
}

export const EmptyDeckMessage = memo(EmptyDeckMessageComponent);
