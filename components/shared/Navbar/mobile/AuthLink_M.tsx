"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

type Props = {
  isLoading: boolean;
  isDashboardPage: boolean;
  isLoggedIn: boolean;
  isMenuOpen: boolean;
};

export default function AuthLink_M({
  isLoading,
  isDashboardPage,
  isLoggedIn,
  isMenuOpen,
}: Props) {
  if (isDashboardPage) return null;

  return (
    <Button
      asChild
      className={`flex md:hidden h-16 w-16 delay-200 ${
        isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
      }`}
    >
      <Link
        href={isLoggedIn ? "/dashboard" : "/auth/login"}
        aria-label={isLoggedIn ? "Go to dashboard" : "Go to login"}
      >
        <Image
          src={isLoggedIn ? "/Dashboard.svg" : "/Login.svg"}
          alt={isLoggedIn ? "Dashboard" : "Login"}
          width={40}
          height={40}
        />
      </Link>
    </Button>
  );
}
