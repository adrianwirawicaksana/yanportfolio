"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc"; 
import { HiEye, HiEyeOff } from "react-icons/hi"; 
import Image from "next/image";
import { authService } from "@/src/services";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const BACKEND_URL = (typeof window !== 'undefined' ? window.__BACKEND_URL__ || null : null) || process.env.NEXT_PUBLIC_BACKEND_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000') || "http://localhost:8080";

  const handleManualRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Nama tidak boleh kosong. Silakan isi nama Anda.");
    }

    if (!email.trim()) {
      return toast.error("Email tidak boleh kosong. Silakan isi email Anda.");
    }

    if (password.length < 6) {
      return toast.error("Password minimal 6 karakter. Gunakan kombinasi huruf dan angka.");
    }

    if (password !== confirmPassword) {
      return toast.error("Password dan konfirmasi password tidak cocok. Silakan periksa kembali.");
    }

    setLoading(true);

    try {
      const payload = { 
        name: name.trim(), 
        email: email.trim().toLowerCase(), 
        password 
      };
      
      console.log("Register payload:", payload);
      
      const response = await authService.register(payload);

      if (response.error) {
        console.error("Register error:", response);
        const errorMsg = response.error || "Pendaftaran gagal. Mohon coba lagi.";
        return toast.error(errorMsg);
      }

      if (!response.data) {
        return toast.error("Terjadi kesalahan. Silakan coba lagi beberapa saat lagi.");
      }

      toast.success("Registrasi Berhasil! 🎉 Silahkan cek email Anda untuk kode OTP.");
      window.location.href = `/auth/verify-otp?email=${encodeURIComponent(email)}`;
    } catch (err) {
      console.error("Register catch error:", err);
      const errorMessage = err instanceof Error ? err.message : "Oops! Ada masalah. Coba lagi dalam beberapa saat.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    const target = `${BACKEND_URL.replace(/\/$/, '')}/api/auth/google`;
    window.location.href = target;
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-6 bg-yellow-300">
      
      <div className="w-full min-h-screen bg-white flex justify-center items-center p-8 md:col-span-3 lg:col-span-2 md:border-r-2 md:border-gray-300">
        <div className="w-full max-w-md transform transition-all">
          
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight font-title">
              Buat Akun
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Daftar untuk mulai mengelola koleksi PokemonTCG
            </p>
          </div>

          <form onSubmit={handleManualRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800 bg-gray-50 transition-all text-sm"
                placeholder="Nama Anda"
                required
                disabled={loading}
              />
            </div>

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
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800 bg-gray-50 transition-all text-sm"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  disabled={loading}
                >
                  {showPassword ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800 bg-gray-50 transition-all text-sm"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  disabled={loading}
                >
                  {showConfirmPassword ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-linear-to-t from-blue-600 to-blue-500 border border-blue-700 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 ease-in-out shadow-md hover:scale-105 active:scale-95 cursor-pointer hover:shadow-lg text-sm disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? "Memproses..." : "Sign Up"}
            </button>
          </form>

          <div className="relative flex py-4 items-center">
            <div className="grow border-t border-gray-200"></div>
            <span className="shrink mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">
              atau
            </span>
            <div className="grow border-t border-gray-200"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={loading}
            className="w-full py-3 flex items-center justify-center gap-3 bg-linear-to-t from-black to-gray-700 hover:bg-gray-900 text-white font-semibold rounded-xl hover:scale-105 active:scale-95 duration-300 ease-in-out cursor-pointer transition-all shadow-sm text-sm disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
          >
            <FcGoogle className="text-xl" />
            <span>Sign in with Google</span>
          </button>

          <div className="text-center mt-6 text-sm">
            <p className="text-gray-500">
              Sudah punya akun?{" "}
              <a
                href="/auth/login"
                className="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-all"
              >
                Masuk di sini
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