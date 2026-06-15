"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import { paymentService } from "@/src/services";
import { useAuth } from "@/src/context";

declare global {
  interface Window {
    snap: {
      pay: (token: string, options: Record<string, unknown>) => void;
    };
  }
}

const COIN_PACKAGES = [
  { id: "pkg-100", name: "100x Booster Coins", price: 50000, coins: 100, desc: "Koin untuk gacha & trade kartu" },
  { id: "pkg-300", name: "300x Booster Coins", price: 135000, coins: 300, desc: "Paket hemat kolektor pemula" },
  { id: "pkg-500", name: "500x Booster Coins", price: 210000, coins: 500, desc: "Paket Master, bonus kuota harian" },
];

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TopUpModal = ({ isOpen, onClose }: TopUpModalProps) => {
  const { refreshProfile } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState(COIN_PACKAGES[0]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await paymentService.createSnapToken({
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        price: selectedPackage.price,
        coinAmount: selectedPackage.coins,
      });

      if (response.error || !response.data?.token) {
        return toast.error(response.error || "Gagal mendapatkan token pembayaran.");
      }

      const token = response.data.token;

      if (!window.snap?.pay) {
        toast.error("Midtrans Snap belum siap. Silakan muat ulang halaman dan coba lagi.");
        return;
      }

      window.snap.pay(token, {
        onSuccess: async function () {
          toast.success("Pembayaran Sukses! Koin akan segera ditambahkan.");
          onClose();
          await refreshProfile();
        },
        onPending: function () {
          toast.loading("Menunggu pembayaran Anda.");
        },
        onError: function () {
          toast.error("Pembayaran gagal, silakan coba lagi.");
        },
        onClose: function () {
          toast.dismiss();
          toast("Anda menutup halaman pembayaran sebelum selesai.");
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan koneksi ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-100 p-4">
      <div className="bg-white border-4 border-black w-full max-w-md rounded-2xl p-6 shadow-[10px_10px_0px_0px_#000] relative animate-in fade-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute -top-3 -right-3 h-10 w-10 bg-red-500 text-white font-black border-3 border-black rounded-lg hover:bg-red-600 hover:scale-105 active:scale-95 duration-200 shadow-[2px_2px_0px_0px_#000]"
        >
          ✕
        </button>

        <h2 className="text-2xl font-title text-white font-black mb-6 text-center uppercase tracking-widest bg-linear-to-t from-blue-600 to-blue-500 rounded py-2 border-3 border-blue-600 shadow-[4px_4px_0px_0px_#000]">
          Top Up Coins
        </h2>

        <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
          {COIN_PACKAGES.map((pkg) => (
            <label 
              key={pkg.id} 
              className="flex items-center justify-between p-3.5 border-3 border-black rounded-xl bg-gray-50 cursor-pointer has-checked:bg-blue-50 has-checked:border-blue-600 transition-all group"
            >
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="modal-package" 
                  checked={selectedPackage.id === pkg.id}
                  onChange={() => setSelectedPackage(pkg)}
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                />
                <div className="text-left">
                  <p className="font-black text-gray-900 text-sm sm:text-base">{pkg.name}</p>
                  <p className="text-[11px] text-gray-500 leading-tight">{pkg.desc}</p>
                </div>
              </div>
              <span className="font-title font-black text-base text-blue-600 group-has-checked:scale-105 duration-200 shrink-0 ml-2">
                Rp {pkg.price.toLocaleString("id-ID")}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handlePayment}
            disabled={isLoading}
            className={`w-full mt-2 text-center font-title font-bold py-3.5 rounded-xl text-white transition duration-300 ease-in-out border-3 border-green-800 border-b-4 ${!isLoading ? "bg-linear-to-t from-green-600 to-green-500 hover:bg-green-700 active:scale-95 cursor-pointer" : "bg-gray-400 border-gray-500 cursor-not-allowed opacity-80"}`}
          >
            {isLoading ? "Processing..." : "Pay via Midtrans"}
          </button>
          <p className="text-[9px] text-center text-gray-400 mt-2 font-medium">
            Secured by Midtrans • QRIS, E-Wallet, VA, & Credit Card
          </p>
        </div>

      </div>
    </div>
  );
};

export default TopUpModal;