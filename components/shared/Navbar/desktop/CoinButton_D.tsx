"use client";

type Props = {
  isLoading: boolean;
  coins: number | null;
  onOpenTopUp: () => void;
};

export default function CoinButton({ isLoading, coins, onOpenTopUp }: Props) {
  return (
    <div
      onClick={!isLoading ? onOpenTopUp : undefined}
      className={`flex gap-2 text-xl sm:text-3xl font-bold font-title items-center justify-center p-2 px-4 h-16 min-w-25 border-3 sm:border-6 text-white rounded-xl transition-all duration-300 ease-in-out bg-linear-to-t from-blue-600 to-blue-500 border-blue-600 md:shadow-[8px_8px_0_0_#000] ${isLoading ? "cursor-wait opacity-90" : "cursor-pointer active:bg-blue-600 hover:bg-blue-600 hover:scale-105 hover:shadow-[0px_0px_0_0_#000]"}`}
    >
      <span className="px-2.5 py-1 text-center rounded-full text-blue-600 text-xl border-3 border-yellow-500 bg-yellow-300">✚</span>
      {isLoading ? (
        <div className="flex flex-col gap-2">
          <span className="block h-4 w-16 rounded-full bg-white/20 animate-pulse" />
          <span className="block h-2 w-10 rounded-full bg-white/15 animate-pulse" />
        </div>
      ) : (
        <h1 className="text-white text-3xl">
          {coins}
          <span className="text-yellow-300 ml-0.5">C</span>
        </h1>
      )}
    </div>
  );
}
