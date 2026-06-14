"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/ui/Button"; 

type CartProps = {
  cartRef: React.RefObject<HTMLDivElement | null>;
  isCartDropdownOpen: boolean;
  setIsCartDropdownOpen: (v: boolean) => void;
  isMobileCartOpen: boolean;
  setIsMobileCartOpen: (v: boolean) => void;
  totalItems: number;
  cartItems: any[];
  removeFromCart: (id: string) => void;
  totalPrice: number;
  clearCart?: () => void;
  isLoading: boolean;
  userCoins: number;
  isCoinEnough: boolean;
  isCheckingOut: boolean;
  handleCheckout: () => void;
  isMarketplacePage: boolean;
};

export default function Cart({
  cartRef,
  isCartDropdownOpen,
  setIsCartDropdownOpen,
  isMobileCartOpen,
  setIsMobileCartOpen,
  totalItems,
  cartItems,
  removeFromCart,
  totalPrice,
  isLoading,
  userCoins,
  isCoinEnough,
  isCheckingOut,
  handleCheckout,
}: CartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <>
      <div ref={cartRef} className="relative hidden lg:block z-80">
        <Button 
          onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)} 
          className="relative flex gap-2 items-center justify-center p-2 px-4 h-16 min-w-25 border-6 md:shadow-[8px_8px_0_0_#000] hover:shadow-[0px_0px_0_0_#000] hover:scale-105 active:scale-95 ease-in-out"
        >
          <div className="relative h-12 w-12 overflow-hidden">
            <Image src="/Cart.svg" alt="Shopping Cart" fill sizes="48px" className="object-contain" />
          </div>

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white font-bold text-sm h-6 w-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              {totalItems}
            </span>
          )}
        </Button>

        {isCartDropdownOpen && (
          <div className="absolute right-0 mt-3 w-96 bg-white border-4 border-blue-600 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white animate-fade-in">
            <div className="bg-linear-to-tl from-blue-600 to-blue-500 p-3 font-title font-bold text-center text-lg border-b-4 border-blue-600 text-white">
              <div className="flex items-center justify-center gap-2">
                <div className="relative h-8 w-8">
                  <Image src="/Cart.svg" alt="Shopping Cart" fill className="object-cover" sizes="32px" />
                </div>
                <span>Shopping Cart ({totalItems} Item)</span>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto flex flex-col divide-y divide-gray-200">
              {cartItems.length === 0 ? (
                <div className="p-8 text-center text-gray-400 font-medium">Keranjang kosong, mari belanja bre!</div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="p-3 flex gap-3 items-center bg-gray-50 hover:bg-yellow-50/50 duration-150">
                    <div className="relative h-14 w-14 border-2 border-gray-300 rounded-lg overflow-hidden bg-white shrink-0">
                      <Image src={item.image || "/Logo.svg"} alt={item.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate text-gray-900">{item.name}</h4>
                      <p className="text-xs text-red-500 font-bold mt-0.5">{item.price} Coin</p>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="p-2 text-red-500 hover:text-red-700 font-bold active:scale-90 transition-transform" 
                      title="Hapus Kartu"
                    >
                      <div className="relative h-6 w-6 overflow-hidden rounded-sm">
                        <Image src="/Delete.svg" alt="Delete" fill sizes="24px" className="object-cover cursor-pointer" />
                      </div>
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 bg-gray-100 border-t-2 border-gray-200 flex flex-col gap-2 shrink-0">
                <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                  <span>Coin Lu Saat Ini:</span>
                  <span className="font-bold text-gray-900">{isLoading ? "..." : `${userCoins.toLocaleString("id-ID")} C`}</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-2 font-title font-bold text-base">
                  <span className="text-gray-700">Total Cart:</span>
                  <span className="text-xl text-blue-600">{totalPrice.toLocaleString("id-ID")} <span className="text-sm text-yellow-500">Coin</span></span>
                </div>

                {!isCoinEnough && !isLoading && (
                  <div className="text-[11px] text-center bg-red-100 text-red-600 py-1 rounded font-semibold mt-1">⚠️ Waduh bre, koin lu gak cukup buat bayar!</div>
                )}

                <Button 
                  onClick={handleCheckout} 
                  disabled={!isCoinEnough || isCheckingOut} 
                  className={`w-full mt-2 text-center font-title font-bold py-2 border-b-4 ${
                    isCoinEnough && !isCheckingOut 
                      ? "from-green-600 to-green-500 border-green-800 hover:bg-green-600 active:scale-95" 
                      : "from-gray-400 to-gray-400 border-gray-500 cursor-not-allowed opacity-80"
                  }`}
                >
                  {isCheckingOut ? "Memproses... ⏳" : isCoinEnough ? "Bayar Sekarang ➔" : "Koin Tidak Cukup"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {mounted && isMobileCartOpen && createPortal(
        <>
          <div onClick={() => setIsMobileCartOpen(false)} className="fixed inset-0 z-9999 bg-black/40 lg:hidden" />

          <div className="fixed left-0 right-0 bottom-0 z-10000 lg:hidden bg-white border-t-4 border-blue-600 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto animate-fade-in">
            <div className="bg-linear-to-tl from-blue-600 to-blue-500 p-3 font-title font-bold text-center text-lg border-b-4 border-blue-600 text-white">
              <div className="flex items-center justify-center gap-2">
                <div className="relative h-8 w-8">
                  <Image src="/Cart.svg" alt="Shopping Cart" fill className="object-cover" sizes="32px" />
                </div>
                <span>Shopping Cart ({totalItems} Item)</span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center text-gray-500 font-medium">
                  Keranjang kosong, bre! Tambahin kartu dulu ya.
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center rounded-2xl border border-gray-200 bg-gray-50 p-3">
                      <div className="relative h-14 w-14 border-2 border-gray-300 rounded-lg overflow-hidden bg-white shrink-0">
                        <Image src={item.image || "/Logo.svg"} alt={item.name} fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-red-500 font-bold mt-1">{item.price} Coin</p>
                      </div>
                      
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:text-red-700 font-bold active:scale-90 transition-transform" title="Hapus Kartu">
                        <div className="relative h-6 w-6 overflow-hidden rounded-sm">
                          <Image src="/Delete.svg" alt="Delete" fill sizes="24px" className="object-cover cursor-pointer" />
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {cartItems.length > 0 && (
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Coin Lu Saat Ini:</span>
                    <span className="font-bold text-gray-900">{isLoading ? "..." : `${userCoins.toLocaleString("id-ID")} C`}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-200 pt-3 font-title font-bold text-base">
                    <span className="text-gray-700">Total Cart:</span>
                    <span className="text-xl text-blue-600">{totalPrice.toLocaleString("id-ID")} <span className="text-sm text-yellow-500">Coin</span></span>
                  </div>
                  {!isCoinEnough && !isLoading && (
                    <div className="text-[11px] text-center bg-red-100 text-red-600 py-2 rounded font-semibold">⚠️ Koin belum cukup buat bayar.</div>
                  )}
                  
                  <Button 
                    onClick={handleCheckout} 
                    disabled={!isCoinEnough || isCheckingOut} 
                    className={`w-full py-3 rounded-2xl ${
                      isCoinEnough && !isCheckingOut 
                        ? "from-green-600 to-green-500 border-green-800 hover:bg-green-600 active:scale-95" 
                        : "from-gray-400 to-gray-400 border-gray-500 cursor-not-allowed opacity-80"
                    }`}
                  >
                    {isCheckingOut ? "Memproses... ⏳" : isCoinEnough ? "Bayar Sekarang ➔" : "Koin Tidak Cukup"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>,
        document.body as Element
      )}
    </>
  );
}