"use client";

import CardPokemon from "./CardPokemon";
import ShowCaseCardItem from "./ShowCaseCardItem";
import type { CardWithPrice } from "@/types/pokemon";
import Link from "next/link";

type Props = {
  cards: CardWithPrice[];
};

const ShowCaseCards = ({ cards }: Props) => {
  return (
    // Mengubah div luar menjadi tag semantik <section> untuk meningkatkan skor Accessibility
    <section className="min-h-screen w-full py-10" aria-label="Showcase Pokemon Cards">
      <div className="mx-auto flex w-full flex-col gap-8">

        <div className="flex flex-wrap justify-around gap-16">
          {/* Slice 0-10 sudah tepat untuk menjaga kestabilan DOM size */}
          {cards.slice(0, 10).map((card) => (
            <ShowCaseCardItem key={card.id}>
              {/* PENTING: Pastikan di dalam CardPokemon ini Anda me-render `card.images.small`, BUKAN `large`! */}
              <CardPokemon card={card} />
            </ShowCaseCardItem>
          ))}
        </div>

        <Link 
          href="/marketplace"
          className="flex items-center justify-center bg-linear-to-t from-blue-700 to-blue-500 p-2 px-4 border-3 active:scale-95 hover:scale-105 duration-300 transition-all ease-in-out border-blue-700 mt-4 cursor-pointer mx-auto rounded"
        >
          <span className="text-2xl text-white text-center font-bold font-title">
            see all cards in the marketplace{" "}
            {/* Menyembunyikan simbol panah dari screen reader agar skor accessibility 100 */}
            <span aria-hidden="true">➜</span>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default ShowCaseCards;