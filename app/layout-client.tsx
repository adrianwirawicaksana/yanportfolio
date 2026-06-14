"use client";

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

  // Memeriksa apakah URL mengandung kata 'login', 'register', atau diawali '/auth'
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/auth");

  return (
    <AuthProvider>
      <CartProvider>
        {/* Jika BUKAN halaman auth, munculkan Navbar */}
        {!isAuthPage && <Navbar />}

        <main className="grow">{children}</main>

        {/* Toast notif global */}
        <Toaster position="top-right" />

        {/* Jika BUKAN halaman auth, munculkan Footer */}
        {!isAuthPage && <Footer />}
      </CartProvider>
    </AuthProvider>
  );
}
