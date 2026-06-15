"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context";
import { authService } from "@/src/services";
import CardImageWithSkeleton from "@/app/(marketplace)/marketplace/_components/CardImageWithSkeleton";
import { DashboardCardsSkeleton } from "./_components/DashboardCardsSkeleton";

interface CardItem {
  id: string;
  name: string;
  price: number;
  image: string;
  purchasedAt?: string;
}

const Page = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

  const profileName = user?.name || "Trainer";
  const profileEmail = user?.email || "No Email Set";
  const profileBio = user?.bio || "Belum ada bio trainer.";
  const profileAvatar = user?.avatar_url || "/User.svg";

  const cards =
    user?.owned_cards ||
    user?.cards ||
    user?.inventory ||
    user?.inventories ||
    user?.card ||
    [];

  const currentAvatar = profileAvatar;

  const isLoading = loading;

  const handleLogout = async () => {
    try {
      await authService.logout();
      authService.clearToken();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Tetap redirect meski API gagal, karena token sudah dihapus
      authService.clearToken();
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen w-full bg-yellow-300 text-gray-800 pt-24 flex flex-col">
      {/* Container utama kanan-kiri */}
      <div className="h-auto md:h-[calc(100vh-6rem)] w-full flex flex-col md:flex-row border-t-3 md:border-t-6 border-yellow-500">
        
        {/* ================= SIDEBAR LAYOUT (KIRI) ================= */}
        <div className="h-auto md:h-full w-full flex flex-col md:max-w-md border-yellow-500 border-b-3 md:border-b-0 border-r-0 md:border-r-6 shrink-0 py-6 md:py-0">
          {/* Info Trainer */}
          <div className="md:h-[70%] flex flex-col gap-4 lg:gap-6 items-center justify-center p-4">
            <div className="h-36 w-36 md:h-44 md:w-44 lg:h-50 lg:w-50 relative bg-linear-to-t from-gray-200 to-white border-3 lg:border-6 border-yellow-500 rounded-full overflow-hidden shrink-0 shadow-sm">
              <Image
                src={currentAvatar}
                alt="Trainer Avatar"
                fill
                sizes="(max-width: 768px) 144px, (max-width: 1024px) 176px, 200px"
                priority
                className="object-cover object-center"
              />
            </div>

            <div className="flex flex-col items-center gap-1 text-center px-4">
              <h1 className="text-lg md:text-xl leading-snug">
                Welcome!
                <br />
                <span className={`font-title font-bold text-3xl lg:text-4xl text-blue-600 ${isLoading ? "animate-pulse" : ""}`}>
                  {profileName}
                </span>
              </h1>
              <p className={`text-base text-red-500 font-bold ${isLoading ? "animate-pulse" : ""}`}>
                {profileEmail}
              </p>
              <p className="text-xs md:text-sm text-gray-600 max-w-xs mt-1 leading-relaxed">
                {profileBio}
              </p>
            </div>
          </div>

          {/* Navigasi Menu */}
          <div className="md:h-[30%] border-t border-yellow-500 md:border-t-3 flex flex-col items-center justify-center gap-3 px-6 mt-4 md:mt-0 pt-4 md:pt-0">
            <Link
              href="/dashboard/setting/profile"
              className="w-full text-center font-title font-bold text-xl py-3 px-4 bg-linear-to-t from-gray-200 to-white border-3 border-yellow-500 text-yellow-600 rounded-xl hover:scale-105 active:scale-95 duration-300 transition-all ease-in-out shadow-xs"
            >
              Edit Profile
            </Link>
            <Link
              href="/"
              className="w-full text-center font-title font-bold text-xl py-3 px-4 bg-linear-to-t from-blue-700 to-blue-500 border-3 border-blue-700 text-white rounded-xl hover:scale-105 active:scale-95 duration-300 transition-all ease-in-out shadow-xs"
            >
              Back to Home
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-center font-title font-bold text-xl py-3 px-4 bg-linear-to-t from-red-600 to-red-500 border-3 border-red-700 text-white rounded-xl hover:scale-105 active:scale-95 duration-300 transition-all ease-in-out shadow-xs"
            >
              Logout
            </button>
          </div>
        </div>

        {/* ================= AREA KONTEN UTAMA INVENTORY (KANAN) ================= */}
        <div className="flex-1 min-h-100 md:h-full p-6 md:p-8 bg-yellow-300 md:overflow-y-auto">
          
          {isLoading ? (
            <DashboardCardsSkeleton />
          ) : cards.length === 0 ? (
            <div className="h-full w-full flex flex-col justify-center items-center gap-4 text-center">
              <div className="text-6xl md:text-7xl lg:text-8xl animate-bounce duration-1000">
                🃏
              </div>
              <h1 className="text-2xl md:text-3xl font-bold font-title text-gray-800 max-w-md leading-tight">
                You don't have a card yet.
              </h1>
              <p className="text-sm text-gray-500 max-w-xs">
                Mulai kumpulkan atau daftarkan kartu Pokemon andalan lo sekarang juga, Trainer!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 h-full">
              <div className="flex justify-between items-center border-b-4 border-yellow-500 pb-3 shrink-0">
                <h2 className="font-title font-bold text-2xl md:text-3xl text-gray-900 tracking-wide">
                  🎴 My Trainer Deck ({cards.length})
                </h2>
              </div>

              {/* Grid Koleksi Kartu - 🔥 MURNI TAMPILAN KARTU FULL TANPA TEXT ATAU EFEK */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-6">
                {cards.map((card, index) => (
                  <div
                    key={card.id || index}
                    onClick={() => setSelectedCard(card)}
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
          )}
        </div>
      </div>

      {/* ================= 🔥 MODAL ZOOM IN EXPAND & DETAIL INFO KARTU ================= */}
      {selectedCard && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-99 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedCard(null)} // Klik area hitam luar untuk nutup modal
        >
          {/* Card Detail Container */}
          <div 
            className="relative bg-white border-6 border-gray-900 p-4 md:p-6 rounded-2xl max-w-sm md:max-w-md w-full flex flex-col items-center gap-4 shadow-[8px_8px_0_0_#000] animate-scale-up"
            onClick={(e) => e.stopPropagation()} // Biar kalau diklik isi dalemnya gak auto close
          >
            {/* Tombol Close Pojok Kanan Atas */}
            <button 
              onClick={() => setSelectedCard(null)}
              className="absolute -top-4 -right-4 bg-red-500 text-white font-bold border-4 border-gray-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors active:scale-95 shadow-md"
            >
              ✕
            </button>

            {/* Gambar Kartu Zoomed Gede */}
            <div className="relative aspect-3/4 w-64 md:w-80 max-w-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
              <Image
                src={selectedCard.image || "/Logo.svg"}
                alt={selectedCard.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Info Kartu Pop-up */}
            <div className="w-full bg-yellow-100 border-4 border-gray-900 rounded-xl p-3 text-center mt-2">
              <h3 className="font-title font-bold text-xl md:text-2xl text-gray-900 tracking-wide uppercase">
                {selectedCard.name}
              </h3>
              
              <div className="flex items-center justify-between border-t-2 border-gray-300 mt-2 pt-2 px-4 font-bold text-sm md:text-base">
                <span className="text-gray-600">Card Value:</span>
                <span className="bg-red-500 border-2 border-gray-900 text-white px-3 py-0.5 rounded-lg shadow-sm">
                  {selectedCard.price} Coin
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;