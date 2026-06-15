"use client";

import Image from "next/image";
import { useState } from "react";
import { CardImageSkeleton } from "../../../_components/CardSkeleton";

type CardImageWithSkeletonProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  showFullSkeleton?: boolean;
};

export default function CardImageWithSkeleton({
  src,
  alt,
  sizes,
  className = "",
  wrapperClassName = "",
  priority = false,
  showFullSkeleton = false,
}: CardImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const showSkeleton = !isLoaded && !isError;

  return (
    <div className={`relative overflow-hidden h-full w-full ${wrapperClassName}`}>
      {showSkeleton && !showFullSkeleton && <CardImageSkeleton className="absolute inset-0 z-10" />}

      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-contain transition-opacity duration-500 ${
          isLoaded && !isError ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />
    </div>
  );
}
