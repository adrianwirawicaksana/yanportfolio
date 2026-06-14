"use client";

import Link from "next/link";

type Props = {
  isLoading: boolean;
  isDashboardPage: boolean;
  isLoggedIn: boolean;
};

export default function AuthLink({ isLoading, isDashboardPage, isLoggedIn }: Props) {
  if (isDashboardPage) return null;

  if (isLoading) {
    return (
      <div className="hidden sm:flex relative gap-2 text-xl sm:text-3xl font-bold font-title items-center justify-center p-2 px-8 h-16 min-w-25 border-6 rounded-xl transition-all duration-300 ease-in-out bg-linear-to-t from-blue-600 to-blue-500 border-blue-600 md:shadow-[8px_8px_0_0_#000] cursor-wait opacity-90 overflow-hidden">
        <div className="absolute inset-0 rounded-xl bg-linear-to-t from-blue-600/85 to-blue-500/85 animate-pulse" />
        <div className="relative flex flex-col gap-2 items-end justify-center">
          <span className="block h-4 w-30 rounded-full bg-white/20 animate-pulse" />
          <span className="block h-2 w-20 rounded-full bg-white/15 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <Link href={isLoggedIn ? "/dashboard" : "/auth/login"} className="hidden sm:flex text-white text-xl sm:text-3xl font-bold font-title items-center justify-center p-2 px-8 h-16 min-w-25 border-6 rounded-xl cursor-pointer active:bg-blue-600 hover:bg-blue-600 hover:scale-105 duration-300 transition-all ease-in-out bg-linear-to-t from-blue-600 to-blue-500 border-blue-600 md:shadow-[8px_8px_0_0_#000] hover:shadow-[0px_0px_0_0_#000]">
      {isLoggedIn ? "Dashboard" : "Login"}
    </Link>
  );
}
