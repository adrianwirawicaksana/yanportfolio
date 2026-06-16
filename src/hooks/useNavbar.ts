"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import { useCart, useAuth } from "@/src/context";
import { marketplaceService } from "@/src/services";

export function useNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);

  const pathname = usePathname();
  const cartRef = useRef<HTMLDivElement>(null);

  const { cartItems, removeFromCart, totalItems, totalPrice, clearCart } =
    useCart();
  const { user, loading, refreshProfile } = useAuth();

  const isMarketplacePage = pathname === "/marketplace";
  const isDashboardPage = pathname?.startsWith("/dashboard");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileCartOpen) setIsMenuOpen(false);
  }, [isMobileCartOpen]);

  const handleCheckout = async () => {
    if (
      cartItems.length === 0 ||
      !user?.coins ||
      user.coins < totalPrice ||
      isCheckingOut
    )
      return;

    setIsCheckingOut(true);
    try {
      const response = await marketplaceService.checkout(cartItems, totalPrice);

      if (!response.error) {
        toast.success(
          "Pembayaran berhasil. Saldo koin Anda telah berhasil terpotong.",
        );
        clearCart();
        await refreshProfile();
        setIsCartDropdownOpen(false);
        setIsMobileCartOpen(false);
      } else {
        toast.error(`❌ Gagal bayar: ${response.error}`);
      }
    } catch (error) {
      console.error("Error pas checkout:", error);
      toast.error("❌ Terjadi kendala koneksi ke server saat pembayaran.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const coins = user?.coins ?? 0;
  const isLoggedIn = Boolean(user);
  const userCoins = coins;
  const isCoinEnough = userCoins >= totalPrice;

  return {
    isMenuOpen,
    setIsMenuOpen,
    isTopUpOpen,
    setIsTopUpOpen,
    isCartDropdownOpen,
    setIsCartDropdownOpen,
    isMobileCartOpen,
    setIsMobileCartOpen,
    coins,
    isLoading: loading,
    isCheckingOut,
    isLoggedIn,
    pathname,
    cartRef,
    cartItems,
    removeFromCart,
    totalItems,
    totalPrice,
    clearCart,
    isMarketplacePage,
    isDashboardPage,
    handleCheckout,
    userCoins,
    isCoinEnough,
  } as const;
}
