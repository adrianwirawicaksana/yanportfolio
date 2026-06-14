"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

type Props = {
  isMenuOpen: boolean;
  isMarketplacePage: boolean;
};

export default function MarketplaceButton({
  isMenuOpen,
  isMarketplacePage,
}: Props) {
  if (isMarketplacePage) return null;

  return (
    <Button
      asChild
      className={`flex md:hidden h-16 w-16 delay-150 ${
        isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
      }`}
    >
      <Link href="/marketplace" aria-label="Go to marketplace">
        <Image src="/Market.svg" alt="Marketplace" width={40} height={40} />
      </Link>
    </Button>
  );
}
