"use client";

import Button from "@/components/ui/Button";

type Props = {
  isMenuOpen: boolean;
  hasCartItems: boolean;
  totalItems: number;
  onToggle: () => void;
};

export default function MenuToggle({
  isMenuOpen,
  hasCartItems,
  totalItems,
  onToggle,
}: Props) {
  return (
    <Button
      onClick={onToggle}
      className="h-16 w-16"
      aria-label="Toggle menu"
      aria-expanded={isMenuOpen}
    >
      {isMenuOpen ? (
        <span className="text-white text-3xl leading-none">✕</span>
      ) : (
        <div className="flex flex-col gap-1">
          <span className="w-7 h-1 bg-white rounded"></span>
          <span className="w-7 h-1 bg-white rounded"></span>
          <span className="w-7 h-1 bg-white rounded"></span>
        </div>
      )}
      {!isMenuOpen && hasCartItems && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white font-bold text-xs h-6 w-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
          {totalItems}
        </span>
      )}
    </Button>
  );
}
