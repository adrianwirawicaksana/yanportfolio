import { getPokemonCards } from "@/services/getPokemonCards";
import dynamic from "next/dynamic";

const PokemonCardGrid = dynamic(() => import("./PokemonCardGrid"), {
  ssr: true, // Biarkan true agar SEO tetap terjaga namun di-stream via Suspense
});

export default async function PokemonGridWrapper() {
  const cards = await getPokemonCards();

  // Optimasi mapping seminimal mungkin
  const cardsWithPrice = cards.map((card) => ({
    ...card,
    marketPrice: 0,
  }));

  return <PokemonCardGrid cards={cardsWithPrice} />;
}