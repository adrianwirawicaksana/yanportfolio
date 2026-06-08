import MarketplaceCardGrid from "./MarketplaceCardGrid";
import { getPokemonCards } from "@/services/getPokemonCards";
import type { CardWithPrice, PokemonCard } from "@/types/pokemon";

const MAX_MARKETPLACE_CARDS = 50;

function getMarketPrice(card: PokemonCard): number {
  const prices = card.tcgplayer?.prices;
  const marketValues = prices
    ? Object.values(prices)
        .map((item) => item?.market)
        .filter((value): value is number => typeof value === "number")
    : [];

  return Math.max(Math.ceil(marketValues[0] ?? 129), 129);
}

export default async function MarketplaceGrid() {
  const cards: PokemonCard[] = await getPokemonCards();

  const marketplaceCards: CardWithPrice[] = cards
    .filter((card) => card.images?.large)
    .slice(0, MAX_MARKETPLACE_CARDS)
    .map((card) => ({
      ...card,
      marketPrice: getMarketPrice(card),
    }));

  return (
    /* Perubahan pada kelas pembungkus di bawah ini */
    <div className="grid gap-12 justify-center justify-items-center w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {marketplaceCards.map((card) => (
        <MarketplaceCardGrid key={card.id} card={card} />
      ))}
    </div>
  );
}