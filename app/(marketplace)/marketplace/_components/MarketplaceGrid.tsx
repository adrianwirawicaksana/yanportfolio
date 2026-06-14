import MarketplaceCardGrid from "./MarketplaceCardGrid";
import { getPokemonCards } from "@/src/services/getPokemonCards";
import type { CardWithPrice, PokemonCard } from "@/src/types/pokemon";

const MAX_MARKETPLACE_CARDS = 100;

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
    .map((card) => ({
      ...card,
      marketPrice: getMarketPrice(card),
    }))
    .sort((a, b) => (b.marketPrice ?? 0) - (a.marketPrice ?? 0))
    .slice(0, MAX_MARKETPLACE_CARDS);

  return (
    /* Perubahan pada kelas pembungkus di bawah ini */
    <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-center justify-items-center w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-2">
      {marketplaceCards.map((card) => (
        <MarketplaceCardGrid key={card.id} card={card} />
      ))}
    </div>
  );
}