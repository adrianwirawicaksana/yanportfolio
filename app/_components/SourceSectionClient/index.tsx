"use client";

import dynamic from "next/dynamic";

export function SourceSectionSkeleton() {
  return (
    <div className="min-h-100 w-full bg-white py-16 px-4 sm:px-8 md:px-16 flex flex-col items-center justify-center gap-6">
      <div className="w-full max-w-md">
        <div
          className="h-8 sm:h-10 rounded-xl bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
          style={{ backgroundSize: "200% 100%" }}
        />
      </div>

      <div className="flex flex-col items-center gap-2 w-full max-w-2xl mt-2">
        <div
          className="h-4 rounded w-full bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
          style={{ backgroundSize: "200% 100%" }}
        />
        <div
          className="h-4 rounded w-5/6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
          style={{ backgroundSize: "200% 100%" }}
        />
        <div
          className="h-4 rounded w-2/3 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
          style={{ backgroundSize: "200% 100%" }}
        />
      </div>

      <div className="flex gap-4 items-center mt-6 w-full max-w-xs justify-center">
        <div className="h-14 w-full rounded-xl border-2 border-gray-300 overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
            style={{ backgroundSize: "200% 100%" }}
          />
        </div>
      </div>
    </div>
  );
}

const SourceSection = dynamic(
  () => import("./SourceSection"),
  {
    ssr: false, 
    loading: () => <SourceSectionSkeleton />, 
  }
);

export default function SourceSectionClient() {
  return <SourceSection />;
}