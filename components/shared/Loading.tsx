import Image from "next/image";

const Loading = () => {
  return (
    <div className="min-h-screen bg-yellow-300 flex flex-col items-center justify-center gap-4">
      
      {/* 1. WADAH UTAMA */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        
        {/* 2. LINGKARAN PINGGIR (Berputar di lapisan bawah) */}
        <div className="absolute inset-0 animate-spin rounded-full border-8 border-white border-t-blue-600 border-b-blue-600 shadow-md z-0"></div>
        
        {/* 3. WADAH GAMBAR (Diberi z-10 supaya maju ke depan/tidak tertutup) */}
        <div className="relative h-12 w-12 z-10 rounded-full"> 
          <Image
            src="/Loading.svg"
            alt="Proses memuat data"
            fill
            priority
            unoptimized
            className="object-cover rounded-full"
          />
        </div>

      </div>
      
      {/* Teks Indikator */}
      <span className="text-gray-800 font-extrabold tracking-wider animate-pulse text-sm uppercase">
        Mencari Sinyal Pokemon...
      </span>
    </div>
  );
};

export default Loading;