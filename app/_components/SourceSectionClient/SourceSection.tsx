"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import SourceHeader from "./HeaderSource";

function MediaSourceSkeleton() {
  const shimmerClass = "bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer";
  const shimmerStyle = { backgroundSize: "200% 100%" };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 px-5 py-8 gap-6 bg-white">
      
      <div className="w-full flex flex-col gap-3">
        <div className="w-full rounded-xl aspect-video border-2 border-gray-300 bg-slate-200 overflow-hidden">
          <div className={`h-full ${shimmerClass}`} style={shimmerStyle} />
        </div>

        <div className="space-y-2 px-1">
          <div className={`h-5 w-5/6 rounded ${shimmerClass}`} style={shimmerStyle} />
          <div className={`h-4 w-1/2 rounded ${shimmerClass}`} style={shimmerStyle} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="w-full flex flex-col gap-3">
          <div className="w-full rounded-xl aspect-video border-2 border-gray-300 bg-slate-200 overflow-hidden">
            <div className={`h-full ${shimmerClass}`} style={shimmerStyle} />
          </div>

          <div className="space-y-2 px-0.5">
            <div className={`h-4 w-full rounded ${shimmerClass}`} style={shimmerStyle} />
            <div className={`h-3 w-2/3 rounded ${shimmerClass}`} style={shimmerStyle} />
          </div>
        </div>
        
        <div className="w-full flex flex-col gap-3">
          <div className="w-full rounded-xl aspect-video border-2 border-gray-300 bg-slate-200 overflow-hidden">
            <div className={`h-full ${shimmerClass}`} style={shimmerStyle} />
          </div>

          <div className="space-y-2 px-0.5">
            <div className={`h-4 w-full rounded ${shimmerClass}`} style={shimmerStyle} />
            <div className={`h-3 w-2/3 rounded ${shimmerClass}`} style={shimmerStyle} />
          </div>
        </div>

      </div>
    </div>
  );
}

const MediaSource = dynamic(
  () => import("./MediaSource"),
  {
    ssr: true,
    loading: () => <MediaSourceSkeleton />,
  }
);

type Props = {
  children?: ReactNode; 
};

const SourceSection = ({ children }: Props) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center mt-12">
      <SourceHeader />
      
      <MediaSource />
      
      {children}
    </div>
  );
};

export default SourceSection;