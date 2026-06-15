"use client";

import Image from "next/image";
import { useState } from "react";
import { MarketplaceCardSkeleton } from "../../../_components/CardSkeleton";

type MarketplaceCardImageWithSkeletonProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
};

export default function MarketplaceCardImageWithSkeleton({
  src,
  alt,
  sizes,
  priority = false,
}: MarketplaceCardImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const showSkeleton = !isLoaded && !isError;

  if (showSkeleton) {
    return <MarketplaceCardSkeleton />;
  }

  return (
    <div className="w-60 xl:w-64 overflow-hidden rounded border-2 border-black bg-slate-200 flex flex-col">
      <div className="relative aspect-16/23 w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
        />
      </div>
    </div>
  );
}
