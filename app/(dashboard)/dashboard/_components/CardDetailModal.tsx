import Image from "next/image";
import { memo, useCallback, useState, useMemo } from "react";

interface CardDetailModalProps {
  card: {
    name: string;
    image: string;
    price: number;
  };
  onClose: () => void;
}

function CardDetailModalComponent({ card, onClose }: CardDetailModalProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setIsImageLoaded(true); // Still mark as loaded to prevent stuck state
  }, []);

  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const memoizedCard = useMemo(
    () => ({
      name: card.name,
      image: card.image,
      price: card.price,
    }),
    [card.name, card.image, card.price]
  );

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-99 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick} 
    >
      <div 
        className="relative bg-white border-6 border-gray-900 p-4 md:p-6 rounded-2xl max-w-sm md:max-w-md w-full flex flex-col items-center gap-4 shadow-[8px_8px_0_0_#000] animate-scale-up"
        onClick={handleModalClick} 
      >
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-red-500 text-white font-bold border-4 border-gray-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors active:scale-95 shadow-md"
        >
          ✕
        </button>

        <div className="relative aspect-3/4 w-64 md:w-80 max-w-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl overflow-hidden">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer flex items-center justify-center" />
          )}
          <Image
            src={memoizedCard.image || "/Logo.svg"}
            alt={memoizedCard.name}
            fill
            priority
            className={`object-contain transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>

        <div className="w-full bg-linear-to-t from-blue-600 to-blue-500 border-4 border-blue-700 rounded-xl p-3 text-center mt-2">
          <h3 className="font-title font-bold text-xl md:text-2xl text-white tracking-wide uppercase">
            {memoizedCard.name}
          </h3>
          
          <div className="flex items-center justify-between border-t-2 border-gray-300 mt-2 pt-2 px-4 font-bold text-sm md:text-base">
            <span className="text-white">Card Value:</span>
            <span className="bg-red-500 border-2 border-red-600 text-white px-3 py-0.5 rounded-lg shadow-sm">
              {memoizedCard.price} Coin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const CardDetailModal = memo(CardDetailModalComponent);
