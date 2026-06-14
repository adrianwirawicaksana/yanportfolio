"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";

type Props = {
  isMenuOpen: boolean;
  onOpenCart: () => void;
  hasCartItems: boolean;
  totalItems: number;
};

export default function CartButton({
  isMenuOpen,
  onOpenCart,
  hasCartItems,
  totalItems,
}: Props) {
  return (
    <Button
      onClick={onOpenCart}
      className={`relative h-16 w-16 delay-75 ${
        isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
      }`}
      aria-label="Open shopping cart"
    >
      <Image src="/Cart.svg" alt="Cart" width={40} height={40} />
      {hasCartItems && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-xs h-5 w-5 rounded-full flex items-center justify-center border border-white">
          {totalItems}
        </span>
      )}
    </Button>
  );
}
