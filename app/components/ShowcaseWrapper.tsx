import { getPokemonCards } from "@/services/getPokemonCards";
import dynamic from "next/dynamic";
import { CardSkeleton } from "./CardSkeleton";

// Lakukan lazy load untuk komponen visual ShowCaseCards
const ShowCaseCards = dynamic(() => import("./ShowCaseCards"), {
  ssr: true, // Tetap gunakan SSR agar bersahabat dengan SEO
  loading: () => <CardSkeleton />, // Tampilan sementara saat komponen di-load
});

export default async function ShowCaseWrapper() {
  // 1. Ambil data dari API di sisi server
  const cards = await getPokemonCards();

  // 2. Format data sesuai dengan kebutuhan tipe data (CardWithPrice)
  const cardsWithPrice = cards.map((card) => ({
    ...card,
    marketPrice: 0, // Berikan nilai default atau kalkulasi harga di sini
  }));

  // 3. Oper data ke komponen anak
  return <ShowCaseCards cards={cardsWithPrice} />;
}