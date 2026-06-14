"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="hidden fixed bottom-5 left-5 bg-linear-to-t from-blue-600 to-blue-500 py-4 px-4 border-3
      border-blue-600 rounded lg:flex flex-col gap-1 cursor-pointer active:scale-95
      hover:scale-105 duration-300 ease-in-out z-80 text-2xl font-bold text-white font-title"
    >
      🡄 Back
    </button>
  );
}