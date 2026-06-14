import { platforms } from "@/src/constants/platformConstants";
import Image from "next/image";

const SourceHeader = () => {
  return (
    // OPTIMASI 1: Menyederhanakan padding dan margin agar kalkulasi CSS lebih cepat
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 max-w-7xl mx-auto">
      {platforms.map((items, index) => (
        <div
          key={index}
          className="flex items-center justify-start rounded-xl overflow-hidden bg-black p-2 gap-4 text-white"
        >
          {/* OPTIMASI 2: Menghapus div relatif pembungkus fill yang berat */}
          <div className="shrink-0">
            <Image
              src={items.logo}
              alt={items.name}
              width={56}   // Menentukan lebar statis 56px
              height={56}  // Menentukan tinggi statis 56px
              priority={index < 5} // Memberi tahu browser untuk memuat ikon baris pertama ini lebih awal tanpa nunggu antrean
              style={{ width: "auto", height: "auto" }}
              className="object-contain rounded"
            />
          </div>

          <div className="min-w-0"> {/* Mencegah teks meluap jika terlalu panjang */}
            <p className="text-sm text-gray-400 truncate">{items.subject}</p>
            <h2 className="font-bold text-base truncate">{items.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SourceHeader;