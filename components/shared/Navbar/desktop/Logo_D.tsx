"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link 
      href="/" 
      className="flex items-center cursor-pointer active:scale-95 hover:scale-105 duration-300 transition-all ease-in-out"
    >
      <Image 
        src="/Logo.svg" 
        alt="Logo PokemonTCG" 
        width={190}         
        height={60}         
        className="h-14 sm:h-16 w-auto object-contain" 
        priority 
      />
    </Link>
  );
}