"use client";

import type { CardWithPrice } from "@/src/types/pokemon";
import { useCart } from "@/src/context";
import { useAuth } from "@/src/context";
import CardImageWithSkeleton from "@/app/_components/CardImageWithSkeleton";

// 🔥 Import hook Auth lu di sini untuk tahu data profile & inventory kartu user
// Misal: import { useAuth } from "@/src/context"; 

type MarketplaceCardGridProps = {
  card: CardWithPrice;
};

type OwnedCard = {
  id?: string;
};

const MarketplaceCardGrid = ({ card }: MarketplaceCardGridProps) => {
  const { cartItems, addToCart } = useCart();
  const { user } = useAuth();
  
  // 🔥 Ambil data user dari hook Auth/Context lu. 
  // Pastikan isinya membawa field array `owned_cards` yang dikirim dari backend Go kita tadi.
  // const { user } = useAuth(); 
  
  // SEMENTARA BUAT TESTING: Kalau belum dipasang context auth, lu bisa hardcode dulu / mocking data array kosong
  const ownedCards: OwnedCard[] = Array.isArray(user?.owned_cards) ? user.owned_cards : [];

  if (!card?.images?.large) return null;

  const parsedPrice = Math.trunc(card.marketPrice ?? 0);

  // 1. Cek apakah kartu ini sudah dibeli (ada di inventory user)
  const isAlreadyOwned = ownedCards.some((ownedItem: any) => ownedItem.id === card.id);

  // 2. Cek apakah kartu ini sudah masuk ke keranjang belanja
  const isAlreadyInCart = cartItems.some((item) => item.id === card.id);

  const handleAddToCart = () => {
    // Kalau sudah punya atau sudah di keranjang, kunci fungsinya
    if (isAlreadyOwned || isAlreadyInCart) return;

    addToCart({
      id: card.id,
      name: card.name,
      price: parsedPrice,
      image: card.images?.large || "/Logo.svg",
    });
  };

  // Logika buat nentuin styling button secara dinamis
  const getButtonStyles = () => {
    if (isAlreadyOwned) {
      return "bg-green-500 border-green-700 cursor-not-allowed opacity-90 text-white";
    }
    if (isAlreadyInCart) {
      return "bg-gray-400 border-gray-500 cursor-not-allowed opacity-80 text-gray-700";
    }
    return "bg-yellow-300 border-orange-300 cursor-pointer hover:scale-105 active:scale-95 text-black";
  };

  // Logika buat nentuin teks di dalam button
  const getButtonText = () => {
    if (isAlreadyOwned) return "✓ Dimiliki";
    if (isAlreadyInCart) return "✓ In Cart";
    return "+ Add Cart";
  };

  return (
    <div className="w-[min(36vw,130px)] sm:w-56 md:w-60 lg:w-64 max-w-64 overflow-hidden rounded-xl border-2 border-black bg-slate-200 flex flex-col">
      {/* AREA GAMBAR */}
      <div className="relative aspect-16/23 w-full overflow-hidden">
        <CardImageWithSkeleton
          src={card.images.large}
          alt={card.name}
          sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 240px"
          wrapperClassName="rounded-xl scale-110"
        />
      </div>

      {/* BOTTOM BAR */}
      <div className="flex items-center justify-between bg-blue-600 px-2 py-2 border-t-2 border-black">
        {/* 🔥 DYNAMIC BUTTON: Menangani status Dimiliki, Di Keranjang, dan Tombol Beli */}
        <button
          onClick={handleAddToCart}
          disabled={isAlreadyOwned || isAlreadyInCart}
          className={`relative z-10 rounded px-2 py-1 text-base sm:text-sm font-bold border-2 duration-300 transition-all ease-in-out ${getButtonStyles()}`}
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