"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useCart } from "@/src/context";
import { authService } from "@/src/services";
import { DashboardCardsSkeleton } from "./_components/DashboardCardsSkeleton";
import { TrainerProfileCard } from "./_components/TrainerProfileCard";
import { TrainerActions } from "./_components/TrainerActions";
import { DeckDisplay } from "./_components/DeckDisplay";
import { EmptyDeckMessage } from "./_components/EmptyDeckMessage";
import { CardDetailModal } from "./_components/CardDetailModal";

interface CardItem {
  id: string;
  name: string;
  price: number;
  image: string;
  purchasedAt?: string;
}

const Page = () => {
  const router = useRouter();
  const { user, loading, clearUser } = useAuth();
  const { clearCart } = useCart();
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const profileData = useMemo(
    () => ({
      name: user?.name || "Trainer",
      email: user?.email || "No Email Set",
      bio: user?.bio || "Belum ada bio trainer.",
      avatar: user?.avatar_url || "/User.svg",
    }),
    [user?.name, user?.email, user?.bio, user?.avatar_url]
  );

  const cards = useMemo(() => {
    return (
      user?.owned_cards ||
      user?.cards ||
      user?.inventory ||
      user?.inventories ||
      user?.card ||
      []
    );
  }, [user?.owned_cards, user?.cards, user?.inventory, user?.inventories, user?.card]);

  const handleSelectCard = useCallback((card: CardItem | null) => {
    setSelectedCard(card);
  }, []);

  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      authService.clearAllCache();
      document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
      clearUser();
      clearCart();
      router.push("/");
    }
  }, [router, clearUser, clearCart]);

  return (
    <div className="min-h-screen w-full bg-yellow-300 text-gray-800 pt-24 flex flex-col">
      <div className="flex-1 min-h-screen md:h-[calc(100vh-6rem)] w-full flex flex-col md:flex-row border-t-3 md:border-t-6 border-yellow-500">
        
        <div className="h-auto md:h-full w-full flex flex-col md:max-w-md border-yellow-500 border-b-3 md:border-b-0 border-r-0 md:border-r-6 shrink-0 py-6 md:py-0 md:overflow-y-auto">
          <div className="flex-1 flex items-center justify-center">
            <TrainerProfileCard
              name={profileData.name}
              email={profileData.email}
              bio={profileData.bio}
              avatarUrl={profileData.avatar}
              isLoading={loading}
            />
          </div>

          <TrainerActions onLogout={handleLogout} isLoggingOut={isLoggingOut} />
        </div>

        <div className="flex-1 min-h-screen md:h-full p-6 md:p-8 bg-yellow-300 md:overflow-y-auto flex flex-col justify-center">
          {loading ? (
            <DashboardCardsSkeleton />
          ) : cards.length === 0 ? (
            <EmptyDeckMessage />
          ) : (
            <DeckDisplay cards={cards} onCardSelect={handleSelectCard} />
          )}
        </div>
      </div>

      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          onClose={() => handleSelectCard(null)}
        />
      )}
    </div>
  );
};

export default Page;