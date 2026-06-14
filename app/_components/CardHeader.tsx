export const CardHeader = () => {
  return (
    <div className="flex items-center justify-center whitespace-nowrap p-4 px-4 md:px-8 rounded-t-2xl md:shadow-[12px_12px_0_0_#000] border-4 md:border-6 border-blue-600 bg-linear-to-t text-white from-red-700 to-red-500">
      <h1 className="text-xl sm:text-3xl md:text-5xl font-bold font-title tracking-wide">
        {/* Trik Pintar: Mengubah angka secara responsif tanpa menduplikasi tag h1 */}
        Top <span className="sm:hidden">3</span><span className="hidden sm:inline">5</span> Rare PokémonTcg Cards
      </h1>
    </div>
  );
};