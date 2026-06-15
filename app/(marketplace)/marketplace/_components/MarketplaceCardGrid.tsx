"use client";

import type { CardWithPrice } from "@/src/types/pokemon";
import { useCart } from "@/src/context";
import { useAuth } from "@/src/context";
import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import { CardImageSkeleton } from "@/app/_components/CardSkeleton";

type MarketplaceCardGridProps = {
  card: CardWithPrice;
  index: number; 
};

type OwnedCard = {
  id?: string;
};

const MarketplaceCardGrid = ({ card, index }: MarketplaceCardGridProps) => { 
  const { cartItems, addToCart } = useCart();
  const { user } = useAuth();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const ownedCards = useMemo(() => {
    return Array.isArray(user?.owned_cards) ? user.owned_cards : [];
  }, [user?.owned_cards]);

  if (!card?.images?.large) return null;

  const parsedPrice = Math.trunc(card.marketPrice ?? 0);
  
  const isAlreadyOwned = useMemo(() => {
    return ownedCards.some((ownedItem: any) => ownedItem.id === card.id);
  }, [ownedCards, card.id]);

  const isAlreadyInCart = useMemo(() => {
    return cartItems.some((item) => item.id === card.id);
  }, [cartItems, card.id]);

  const handleAddToCart = useCallback(() => {
    if (isAlreadyOwned || isAlreadyInCart) return;

    addToCart({
      id: card.id,
      name: card.name,
      price: parsedPrice,
      image: card.images?.large || "/Logo.svg",
    });
  }, [isAlreadyOwned, isAlreadyInCart, card, addToCart, parsedPrice]);

  const getButtonStyles = useCallback(() => {
    if (isAlreadyOwned) {
      return "bg-green-500 border-green-700 cursor-not-allowed opacity-90 text-white";
    }
    if (isAlreadyInCart) {
      return "bg-gray-400 border-gray-500 cursor-not-allowed opacity-80 text-gray-700";
    }
    return "bg-yellow-300 border-orange-300 cursor-pointer hover:scale-105 active:scale-95 text-black";
  }, [isAlreadyOwned, isAlreadyInCart]);

  const getButtonText = useCallback(() => {
    if (isAlreadyOwned) return "✓ Dimiliki";
    if (isAlreadyInCart) return "✓ In Cart";
    return "✚ Add Cart";
  }, [isAlreadyOwned, isAlreadyInCart]);

  return (
    <div className="w-60 xl:w-64 overflow-hidden rounded border-2 border-black bg-slate-200 flex flex-col">
      <div className="relative aspect-16/23 w-full overflow-hidden">
        {!isImageLoaded && <CardImageSkeleton className="absolute inset-0 z-10" />}
        <Image
          src={card.images.large}
          alt={card.name}
          fill
          priority={index < 4}
          sizes="(max-width: 640px) 144px, (max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
          className="object-contain scale-110"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)}
        />
      </div>

      <div className="flex justify-between items-center gap-1.5 bg-blue-600 px-2 py-2 border-t-2 border-black">
        <button
          onClick={handleAddToCart}
          disabled={isAlreadyOwned || isAlreadyInCart}
          className={`relative z-10 rounded px-2 py-1 text-lg font-bold border-2 duration-300 transition-all ease-in-out ${getButtonStyles()}`}
        >
          {getButtonText()}
        </button>

        <p className="text-xl font-extrabold text-white font-title whitespace-nowrap">
          {parsedPrice.toLocaleString("id-ID")}
          <span className="text-yellow-300 ml-0.5">C</span>
        </p>
      </div>
    </div>
  );
};

export default MarketplaceCardGrid;