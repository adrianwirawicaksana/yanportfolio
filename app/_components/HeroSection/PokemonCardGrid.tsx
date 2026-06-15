"use client";

import { useLayoutEffect, useState } from "react";
import type { CardWithPrice } from "@/src/types/pokemon";
import CardPokemon from "../CardPokemon";
import { HeroCardSkeleton } from "../CardSkeleton";
import { processPokemonCards } from "@/src/utils/pokemonUtils";
import {
  CARD_ROTATIONS,
  CARD_Y_OFFSETS,
  CARD_MARGIN_OFFSET,
  TOP_CARDS_COUNT,
  TOP_CARDS_COUNT_IN_MOBILE,
  MOBILE_CARD_MARGIN_OFFSET,
  MOBILE_CARD_ROTATIONS,
  MOBILE_CARD_SCALES,
  MOBILE_CARD_Y_OFFSETS,
  CARD_SCALES,
} from "@/src/constants/cardConstants";

type Props = {
  cards: CardWithPrice[];
};

const PokemonCardGrid = ({ cards }: Props) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile === null) {
    const placeholders = Array.from({ length: TOP_CARDS_COUNT_IN_MOBILE });
    const rotationsPlaceholder = MOBILE_CARD_ROTATIONS;
    const yOffsetsPlaceholder = MOBILE_CARD_Y_OFFSETS;
    const scalesPlaceholder = MOBILE_CARD_SCALES;
    const marginOffsetPlaceholder = MOBILE_CARD_MARGIN_OFFSET;

    return (
      <div className="flex justify-center items-center mt-12 px-4 sm:px-6 md:px-8 w-full">
        {placeholders.map((_, index) => {
          let shadowClass = "md:shadow-[12px_12px_0_0_#000]";

          if (index === 0) {
            shadowClass = "md:shadow-[-12px_12px_0_0_#000]";
          } else if (index === 1) {
            shadowClass = "md:shadow-[0_12px_0_0_#000]";
          }

          return (
            <div
              key={index}
              className="
              group
              relative
              transition-all
              duration-300
              hover:-translate-y-8
              active:-translate-y-8
              hover:scale-105
              active:scale-105
              hover:z-50
              active:z-50
            "
              style={{
                transform: ` translateY(${yOffsetsPlaceholder[index]}px) rotate(${rotationsPlaceholder[index]}deg) scale(${scalesPlaceholder[index]}) `,
                marginLeft: index === 0 ? 0 : marginOffsetPlaceholder,
               zIndex: index === 1 ? 10 : index + 1,
              }}
            >
              <div className={`${shadowClass} rounded-xl`}>
                <div className="relative overflow-hidden border-2 border-black rounded">
                    <HeroCardSkeleton />
                  <div className="pointer-events-none absolute top-0 left-[-150%] h-full w-1/3 rotate-12 bg-white/40 blur-md animate-shine z-30" />

                  <div
                    className="
                    pointer-events-none
                    absolute
                    top-0
                    left-[-150%]
                    h-full
                    w-1/3
                    rotate-12
                    bg-white/40
                    blur-md
                    transition-all
                    duration-700
                    group-hover:left-[150%]
                    group-active:left-[150%]
                  "
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const mainCards = processPokemonCards(
    cards,
    isMobile ? TOP_CARDS_COUNT_IN_MOBILE : TOP_CARDS_COUNT,
  );

  const rotations = isMobile ? MOBILE_CARD_ROTATIONS : CARD_ROTATIONS;

  const yOffsets = isMobile ? MOBILE_CARD_Y_OFFSETS : CARD_Y_OFFSETS;

  const scales = isMobile ? MOBILE_CARD_SCALES : CARD_SCALES;

  const marginOffset = isMobile
    ? MOBILE_CARD_MARGIN_OFFSET
    : CARD_MARGIN_OFFSET;

  return (
    <div className="flex justify-center items-center mt-12 px-4 sm:px-6 md:px-8">
      {mainCards.map((card, index) => {
        let shadowClass = "md:shadow-[12px_12px_0_0_#000]";

        if (isMobile) {
          if (index === 0) {
            shadowClass = "md:shadow-[-12px_12px_0_0_#000]";
          } else if (index === 1) {
            shadowClass = "md:shadow-[0_12px_0_0_#000]";
          }
        }

        return (
          <div
            key={card.id}
            className="
            group
            relative
            transition-all
            duration-300
            hover:-translate-y-8
            active:-translate-y-8
            hover:scale-105
            active:scale-105
            hover:z-50
            active:z-50
          "
            style={{
              transform: ` translateY(${yOffsets[index]}px) rotate(${rotations[index]}deg)
        scale(${scales[index]}) `,
              marginLeft: index === 0 ? 0 : marginOffset,
              zIndex: isMobile && index === 1 ? 50 : index + 1,
            }}
          >
            <div className={`${shadowClass} rounded`}>
              <div className="relative overflow-hidden border-2 border-black rounded">
                <CardPokemon card={card} priority={index === 0} />

                <div className="pointer-events-none absolute top-0 left-[-150%] h-full w-1/3 rotate-12 bg-white/40 blur-md animate-shine z-30" />

                <div
                  className="
                  pointer-events-none
                  absolute
                  top-0
                  left-[-150%]
                  h-full
                  w-1/3
                  rotate-12
                  bg-white/40
                  blur-md
                  transition-all
                  duration-700
                  group-hover:left-[150%]
                  group-active:left-[150%]
                "
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonCardGrid;
