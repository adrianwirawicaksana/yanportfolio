"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider, CartProvider } from "@/src/context";

export default function RootLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/auth");

  return (
    <AuthProvider>
      <CartProvider>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />

        {!isAuthPage && <Navbar />}

        <main className="grow">{children}</main>

        <Toaster position="top-right" />

        {!isAuthPage && <Footer />}
      </CartProvider>
    </AuthProvider>
  );
}
