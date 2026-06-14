import { getPokemonCards } from "@/src/services/getPokemonCards";
import dynamic from "next/dynamic";
import { CardSkeleton } from "../CardSkeleton";

const ShowCaseCards = dynamic(() => import("./ShowCaseCards"), {
  loading: () => <CardSkeleton />, 
});

export default async function ShowCaseWrapper() {
  const cards = await getPokemonCards();

  const cardsWithPrice = cards.map((card) => ({
    ...card,
    marketPrice: 0, 
  }));

  return <ShowCaseCards cards={cardsWithPrice} />;
}