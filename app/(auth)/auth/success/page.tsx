"use client";

import { toast } from "react-hot-toast";
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from "@/components/shared/Loading";
import { useAuth } from "@/src/context";

function AuthSuccessHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshProfile } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Token is set as a secure httpOnly cookie by backend
      // Also store in localStorage for client-side access
      localStorage.setItem('token', token);
      // Store in regular cookie for middleware
      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
      // Refresh profile and redirect to dashboard
      refreshProfile().finally(() => router.push('/dashboard'));
    } else {
      toast.error('Login gagal. Silakan coba kembali.');
      router.push('/auth/login');
    }
  }, [searchParams, router, refreshProfile]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-amber-300 p-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-bold text-gray-800 font-title">Autentikasi Berhasil!</h2>
        <p className="text-gray-500 text-sm mt-2">Sedang mengalihkan ke dashboard anda</p>
      </div>
    </div>
  );
}

// Next.js App Router mewajibkan useSearchParams dibungkus Suspense saat build production
export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<Loading />
    }>
      <AuthSuccessHandler />
    </Suspense>
  );
}