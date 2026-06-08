"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);

return (
<>
  <nav
    className="fixed flex items-center justify-between backdrop-blur-md gap-2 top-0 h-22 md:h-24 w-screen px-4 md:px-8 z-70">
    {/* Logo */}
    <Link href="/"
      className="relative h-14 sm:h-16 w-auto aspect-19/6 cursor-pointer active:scale-95 hover:scale-105 duration-300 transition-all ease-in-out">
    <Image src="/Logo.svg" alt="Logo PokemonTCG" fill sizes="(max-width: 768px) 160px, 200px" className="object-cover"
      priority loading="eager" />
    </Link>
    <div className="flex gap-4 items-center">
      {/* Cart */}
      <Link href="/cart"
        className="hidden lg:flex gap-2 text-xl sm:text-3xl font-bold font-title items-center justify-center p-2 px-4 h-16 min-w-25 border-3 sm:border-6 text-white rounded-xl cursor-pointer active:bg-blue-600 hover:bg-blue-600 hover:scale-105 duration-300 transition-all ease-in-out bg-linear-to-t from-blue-600 to-blue-500 border-blue-600 md:shadow-[8px_8px_0_0_#000] hover:shadow-[0px_0px_0_0_#000] z-80">
        <div className="relative h-10 w-10 rounded-full">
          <Image src="/Cart.svg" alt="Cart Icon" fill sizes="40px" className="absolute object-cover" />
        </div>
      </Link>
      {/* Marketplace */}
      <Link href="/marketplace"
        className="hidden md:flex gap-2 text-xl sm:text-3xl font-bold font-title items-center justify-center p-2 px-4 h-16 min-w-25 border-3 sm:border-6 text-white rounded-xl cursor-pointer active:bg-blue-600 hover:bg-blue-600 hover:scale-105 duration-300 transition-all ease-in-out bg-linear-to-t from-blue-600 to-blue-500 border-blue-600 md:shadow-[8px_8px_0_0_#000] hover:shadow-[0px_0px_0_0_#000] z-80">
        <div className="relative h-10 w-10 rounded-full">
          <Image src="/Market.svg" alt="Marketplace Icon" fill sizes="40px" className="absolute object-cover" />
        </div>
      </Link>
      {/* Coin */}
      <div
        className="flex gap-2 text-xl sm:text-3xl font-bold font-title items-center justify-center p-2 px-4 h-16 min-w-25 border-3 sm:border-6 text-white rounded-xl cursor-pointer active:bg-blue-600 hover:bg-blue-600 hover:scale-105 duration-300 transition-all ease-in-out bg-linear-to-t from-blue-600 to-blue-500 border-blue-600 md:shadow-[8px_8px_0_0_#000] hover:shadow-[0px_0px_0_0_#000]">
        <span
          className="px-2.5 py-1 text-center rounded-full text-blue-600 text-xl border-3 active:scale-105 duration-300 transition-all ease-in-out border-yellow-500 bg-yellow-300">
          ✚
        </span>
        <h1 className="text-white text-3xl">100<span className="text-yellow-300">C</span></h1>
      </div>

      {/* Desktop Login */}
      <Link href="/login"
        className="hidden sm:flex text-white text-xl sm:text-3xl font-bold font-title items-center justify-center p-2 px-8 h-16 min-w-25 border-6 rounded-xl cursor-pointer active:bg-blue-600 hover:bg-blue-600 hover:scale-105 duration-300 transition-all ease-in-out bg-linear-to-t from-blue-600 to-blue-500 border-blue-600 md:shadow-[8px_8px_0_0_#000] hover:shadow-[0px_0px_0_0_#000]">
        Login
      </Link>
    </div>
  </nav>

  {/* Floating Mobile Menu */}
  <div className="lg:hidden fixed bottom-5 left-5 flex flex-col-reverse gap-3 z-80">

    {/* Main Button */}
    <button onClick={()=> setIsMenuOpen(!isMenuOpen)}
      className="
      bg-linear-to-t from-blue-600 to-blue-500
      border-3 border-blue-600
      rounded-xl
      h-16
      w-16
      flex
      items-center
      justify-center
      active:scale-95
      transition-all duration-300
      "
      >
      {isMenuOpen ? (
      <span className="text-white text-3xl leading-none">✕</span>
      ) : (
      <div className="flex flex-col gap-1">
        <span className="w-7 h-1 bg-white rounded"></span>
        <span className="w-7 h-1 bg-white rounded"></span>
        <span className="w-7 h-1 bg-white rounded"></span>
      </div>
      )}
    </button>

    {/* Cart */}
    <Link href="/cart" className={` flex items-center justify-center h-16 w-16 rounded-xl border-3 border-blue-600 bg-linear-to-t
      from-blue-600 to-blue-500 transition-all duration-300 delay-75 ${isMenuOpen ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-5 pointer-events-none" } `}>
      <Image src="/Cart.svg" alt="Cart" width={40} height={40} />
    </Link>

    {/* Marketplace */}
    <Link href="/marketplace" className={` flex md:hidden items-center justify-center h-16 w-16 rounded-xl border-3 border-blue-600 bg-linear-to-t
      from-blue-600 to-blue-500 transition-all duration-300 delay-150 ${isMenuOpen ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-5 pointer-events-none" } `}>
      <Image src="/Market.svg" alt="Marketplace" width={40} height={40} />
    </Link>

    {/* Login */}
    <Link href="/login" className={` flex sm:hidden items-center justify-center h-16 w-16 rounded-xl border-3 border-blue-600 bg-linear-to-t
      from-blue-600 to-blue-500 transition-all duration-300 delay-200 ${isMenuOpen ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-5 pointer-events-none" } `}>
     <Image src="/Login.svg" alt="Login" width={40} height={40} />
    </Link>

  </div>
</>
);
};

export default Navbar;