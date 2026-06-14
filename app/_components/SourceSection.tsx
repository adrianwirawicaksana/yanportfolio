"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import SourceHeader from "./HeaderSource";

// PEMBARUAN: Ubah import biasa menjadi Dynamic Import dengan Skeleton Loading
const MediaSource = dynamic(() => import("./MediaSource"), {
  ssr: true, // Matikan Server-Side Rendering untuk komponen media interaktif ini
  loading: () => (
    // Skeleton Loader agar tata letak tidak melompat saat video selesai dimuat (mencegah CLS)
    <div className="w-full grid md:grid-cols-2 px-5 py-8 gap-4 animate-pulse">
      <div className="w-full bg-gray-200 rounded-xl aspect-video" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full bg-gray-200 rounded-xl aspect-video" />
        <div className="w-full bg-gray-200 rounded-xl aspect-video" />
      </div>
    </div>
  ),
});

type Props = {
  children?: ReactNode; // Diubah ke opsional jika saat ini belum digunakan di dalam return
};

const SourceSection = ({ children }: Props) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center mt-12">
      <SourceHeader />
      
      {/* Komponen ini sekarang dimuat secara asinkron (tidak memblokir render halaman utama) */}
      <MediaSource />
      
      {children}
    </div>
  );
};

export default SourceSection;