"use client";

import dynamic from "next/dynamic";

const SourceSection = dynamic(() => import("./SourceSection"), {
  ssr: false,
  loading: () => <div className="min-h-100 w-full bg-yellow-300 animate-pulse" />,
});

export default function SourceSectionClient() {
  return <SourceSection />;
}
