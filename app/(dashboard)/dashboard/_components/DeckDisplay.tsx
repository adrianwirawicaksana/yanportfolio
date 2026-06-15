import CardImageWithSkeleton from "@/app/(marketplace)/marketplace/_components/CardImageWithSkeleton";
import { memo, useCallback } from "react";

interface Card {
  id: string;
  name: string;
  price: number;
  image: string;
  purchasedAt?: string;
}

interface DeckDisplayProps {
  cards: Card[];
  onCardSelect: (card: Card) => void;
}

function DeckDisplayComponent({ cards, onCardSelect }: DeckDisplayProps) {
  const handleCardClick = useCallback((card: Card) => {
    onCardSelect(card);
  }, [onCardSelect]);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center border-b-4 border-yellow-500 pb-3 shrink-0">
        <h2 className="font-title font-bold text-2xl md:text-3xl text-gray-900 tracking-wide">
          🎴 My Trainer Deck ({cards.length})
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-6">
        {cards.map((card, index) => (
          <div
            key={card.id || index}
            onClick={() => handleCardClick(card)}
            className="group relative aspect-3/4 w-full rounded-xl cursor-pointer overflow-hidden transition-all duration-300 active:scale-95 hover:scale-105"
          >
            <CardImageWithSkeleton
              src={card.image || "/Logo.svg"}
              alt={card.name}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
              wrapperClassName="rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export const DeckDisplay = memo(DeckDisplayComponent);
