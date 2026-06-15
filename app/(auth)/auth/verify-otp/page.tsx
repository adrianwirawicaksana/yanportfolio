"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Loading from "@/components/shared/Loading";
import { authService } from "@/src/services";

function VerifyOTPContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleChange = (value: string, index: number) => {
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasteData.length === 6) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const otpString = otp.join("");
    if (otpString.length < 6) {
      toast.error("Silakan masukkan kode OTP 6 digit lengkap.");
      return;
    }

    try {
      const response = await authService.verifyOTP({ email, otp: otpString });

      if (response.error) {
        return toast.error(response.error || "Kode OTP salah atau tidak valid. Coba lagi.");
      }

      toast.success("Akun berhasil diverifikasi! 🎉 Silakan masuk.");
      window.location.href = "/auth/login";
    } catch (err) {
      console.error(err);
      toast.error("Ada masalah saat verifikasi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-6 bg-yellow-300">
      <div className="w-full min-h-screen bg-white flex flex-col justify-center items-center p-8 md:col-span-3 lg:col-span-2 md:border-r-2 md:border-gray-300">
        <div className="w-full flex flex-col justify-center items-center max-w-md transform transition-all mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight font-title">
            Verifikasi Akun
          </h1>
          <p className="text-sm text-center text-gray-500 mt-2">
            Kode OTP telah dikirim ke <span className="font-semibold text-gray-700">{email || "email Anda"}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="w-full max-w-md space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 bg-gray-100 text-sm focus:outline-none opacity-70"
              placeholder="nama@email.com"
              required
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
              Kode OTP (6 Digit)
            </label>
            <div className="flex justify-center gap-2" onPaste={handlePaste}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  value={data}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 text-center text-xl font-bold text-gray-800 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50 transition-all"
                  required
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-linear-to-t from-blue-600 to-blue-500 border border-blue-700 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 ease-in-out shadow-md hover:scale-105 active:scale-95 cursor-pointer text-sm disabled:opacity-50 disabled:scale-100"
          >
            {loading ? "Memverifikasi..." : "Verifikasi Sekarang"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <p className="text-gray-500">
            Salah memasukkan email?{" "}
            <a href="/auth/register" className="font-semibold text-blue-600 hover:underline">
              Kembali ke Daftar
            </a>
          </p>
        </div>
      </div>

      <div className="hidden md:flex min-h-screen relative overflow-hidden md:col-span-3 lg:col-span-4">
        <Image
          src="/pokemon.svg"
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

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<Loading />
}>
      <VerifyOTPContent />
    </Suspense>
  );
}