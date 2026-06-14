"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

type Props = {
  isMarketplacePage: boolean;
};

export default function MarketplaceButton_D({ isMarketplacePage }: Props) {
  if (isMarketplacePage) return null;

  return (
    <Button
      asChild
      className="hidden md:flex gap-2 text-xl sm:text-3xl border-3 sm:border-6 h-16 min-w-25 md:shadow-[8px_8px_0_0_#000] hover:shadow-[0px_0px_0_0_#000] hover:scale-105 ease-in-out z-80"
    >
      <Link href="/marketplace" aria-label="Go to marketplace">
        <div className="relative h-10 w-10 rounded-full">
          <Image src="/Market.svg" alt="Marketplace" fill sizes="40px" className="absolute object-cover" />
        </div>
      </Link>
    </Button>
  );
}
