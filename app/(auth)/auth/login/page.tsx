"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authService } from "@/src/services";
import { useAuth } from "@/src/context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const BACKEND_URL = (typeof window !== 'undefined' ? window.__BACKEND_URL__ || null : null) || process.env.NEXT_PUBLIC_BACKEND_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000') || "http://localhost:8080";

  const { refreshProfile } = useAuth();
  const router = useRouter();

  const handleManualLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await authService.login({ email, password });

      if (response.error || !response.data?.token) {
        return toast.error(response.error || "Login gagal. Periksa email dan password Anda.");
      }

      const token = response.data.token;
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
      try {
        await refreshProfile();
      } catch (error) {
        console.error("Failed to refresh profile:", error);
      }
      toast.success("Login Sukses! 🎉");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Ada masalah saat login. Pastikan koneksi internet Anda stabil.");
    }
  };

  const handleGoogleLogin = () => {
    const target = `${BACKEND_URL.replace(/\/$/, '')}/api/auth/google`;
    window.location.href = target;
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-6 bg-yellow-300">
      
      <div className="w-full min-h-screen bg-white flex justify-center items-center p-8 md:col-span-3 lg:col-span-2 md:border-r-2 md:border-gray-300">
        <div className="w-full max-w-md transform transition-all">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight font-title">
              Selamat Datang
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Silahkan masuk ke dashboard PokemonTCG
            </p>
          </div>

          <form onSubmit={handleManualLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800 bg-gray-50 transition-all text-sm"
                placeholder="prabowo@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800 bg-gray-50 transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer transition-colors"
                >
                  {showPassword ? (
                    <HiEyeOff className="text-xl" />
                  ) : (
                    <HiEye className="text-xl" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-linear-to-t from-blue-600 to-blue-500 border border-blue-700 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 ease-in-out shadow-md hover:scale-105 active:scale-95 cursor-pointer hover:shadow-lg text-sm"
            >
              Sign In
            </button>
          </form>

          <div className="relative flex py-5 items-center">
            <div className="grow border-t border-gray-200"></div>
            <span className="shrink mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">
              atau
            </span>
            <div className="grow border-t border-gray-200"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 flex items-center justify-center gap-3 bg-linear-to-t from-black to-gray-700 hover:bg-gray-900 text-white font-semibold rounded-xl hover:scale-105 active:scale-95 duration-300 ease-in-out cursor-pointer transition-all shadow-sm text-sm"
          >
            <FcGoogle className="text-xl" />
            <span>Sign in with Google</span>
          </button>

          <div className="text-center mt-6 text-sm">
            <p className="text-gray-500">
              Belum punya akun?{" "}
              <a
                href="/auth/register"
                className="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-all"
              >
                Daftar sekarang
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex min-h-screen relative overflow-hidden md:col-span-3 lg:col-span-4">
        <Image
          src="/Pokemon.svg"
          alt="Pokemon Keren"
          fill
          priority
          sizes="(max-width: 768px) 0vw, (max-width: 1024px) 50vw, 66vw"
          className="object-cover"
        />
      </div>

    </div>
  );
}