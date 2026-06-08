import type { PokemonCard, CardWithPrice } from "@/types/pokemon";

/**
 * Extract market price from card's tcgplayer prices
 * Returns the highest market price available or 0
 */
export const getCardMarketPrice = (card: PokemonCard): number => {
  const prices = card.tcgplayer?.prices;

  if (!prices) return 0;

  const values = Object.values(prices);

  const marketPrices = values.map((p) => p?.market ?? 0).filter((v) => v > 0);

  return marketPrices.length > 0 ? Math.max(...marketPrices) : 0;
};

/**
 * Filter cards that have a rarity value
 */
export const filterCardsByRarity = (cards: PokemonCard[]): PokemonCard[] => {
  return cards.filter((card) => card.rarity);
};

/**
 * Sort cards by market price in descending order and return top N cards
 */
export const getTopCardsByPrice = (
  cards: PokemonCard[],
  limit: number,
): CardWithPrice[] => {
  return cards
    .map((card) => ({
      ...card,
      marketPrice: getCardMarketPrice(card),
    }))
    .sort((a, b) => b.marketPrice - a.marketPrice)
    .slice(0, limit);
};

/**
 * Process pokemon cards: filter by rarity and get top by price
 */
export const processPokemonCards = (
  cards: PokemonCard[],
  topCount: number,
): CardWithPrice[] => {
  const cardsWithRarity = filterCardsByRarity(cards);
  return getTopCardsByPrice(cardsWithRarity, topCount);
};
