import { useState } from "react";
import { platforms } from "@/src/constants/platformConstants";
import Image from "next/image";

const SourceHeader = () => {
  const [loaded, setLoaded] = useState<boolean[]>(
    Array.from({ length: platforms.length }).map(() => false),
  );

  const handleLoaded = (index: number) => {
    setLoaded((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });
  };

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 max-w-7xl mx-auto">
      {platforms.map((items, index) => (
        <div
          key={index}
          className="flex items-center justify-start rounded-xl overflow-hidden border-2 border-gray-300 bg-slate-200 p-2 gap-4"
        >
          <div className="shrink-0 w-14 h-14 relative rounded overflow-hidden">
            {!loaded[index] && (
              <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
            )}

            <Image
              src={items.logo}
              alt={items.name}
              width={56}
              height={56}
              priority={index < 5}
              style={{ width: "auto", height: "auto" }}
              className="object-contain rounded relative z-10"
              onLoadingComplete={() => handleLoaded(index)}
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm text-gray-500 truncate">{items.subject}</p>
            <h2 className="font-bold text-base truncate text-black">{items.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SourceHeader;