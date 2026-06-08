export const CardHeader = () => {
  return (
    <>
    <div className="hidden sm:flex items-center justify-center whitespace-nowrap p-4 px-2 md:px-8 rounded-t-2xl md:shadow-[12px_12px_0_0_#000] border-4 md:border-6 border-blue-600 bg-linear-to-t text-white from-red-700 to-red-500">
      <h1 className="text-2xl md:text-5xl font-bold font-title">Top 5 Rare PokémonTcg Cards</h1>
    </div>
    <div className="sm:hidden flex items-center justify-center whitespace-nowrap p-4 px-2 md:px-8 rounded-t-2xl md:shadow-[12px_12px_0_0_#000] border-4 md:border-6 border-blue-600 bg-linear-to-t text-white from-red-700 to-red-500">
      <h1 className="text-2xl sm:text-5xl font-bold font-title">Top 3 Rare PokémonTcg Cards</h1>
    </div>
    </>
  );
};
