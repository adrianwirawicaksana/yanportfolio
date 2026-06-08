export type PokemonCard = {
  id: string;
  name: string;
  hp?: string;
  rarity?: string;
  images?: {
    small?: string;
    large?: string;
  };
  tcgplayer?: {
    prices?: Record<string, { market?: number }>;
  };
};

export type CardWithPrice = PokemonCard & {
  marketPrice: number;
};
