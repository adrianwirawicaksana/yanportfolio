import { getPokemonCards } from "@/src/services/getPokemonCards";
import dynamic from "next/dynamic";

const PokemonCardGrid = dynamic(() => import("./PokemonCardGrid"), {
  ssr: true, 
});

export default async function PokemonGridWrapper() {
  const cards = await getPokemonCards();

  const cardsWithPrice = cards.map((card) => ({
    ...card,
    marketPrice: 0,
  }));

  return <PokemonCardGrid cards={cardsWithPrice} />;
}