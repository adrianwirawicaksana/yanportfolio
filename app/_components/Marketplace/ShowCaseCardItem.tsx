"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

export default function ShowCaseCardItem({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const rectRef = useRef<DOMRect | null>(null);

  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    let rafId: number | null = null;

    if (!isHovered) {
      isAnimatingRef.current = false;
      const card = cardRef.current;
      if (card) {
        card.style.transition = "transform 0.4s ease-out";
        card.style.transform = `
          perspective(600px)
          rotateX(0deg)
          rotateY(0deg)
          translateZ(0px)
          scale(1)
        `;
        currentX.current = 0;
        currentY.current = 0;
      }
      return () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
      };
    }

    isAnimatingRef.current = true;

    const animate = () => {
      const card = cardRef.current;
      if (!card || !isAnimatingRef.current) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      currentX.current += (targetX.current - currentX.current) * 0.08;
      currentY.current += (targetY.current - currentY.current) * 0.08;

      card.style.transform = `
        perspective(600px)
        rotateX(${currentY.current}deg)
        rotateY(${currentX.current}deg)
        translateZ(20px)
        scale(1.05)
      `;

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
      cardRef.current.style.transition = "none";
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetX.current = 0;
    targetY.current = 0;
    rectRef.current = null;

    const card = cardRef.current;
    if (!card) return;

    const glow = card.querySelector(".card-glow") as HTMLElement;
    if (glow) {
      glow.style.opacity = "0";
    }
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const rect = rectRef.current;

    if (!card || !rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = x / rect.width;
    const percentY = y / rect.height;

    targetX.current = (percentX - 0.5) * 35;
    targetY.current = -(percentY - 0.5) * 35;

    const glow = card.querySelector(".card-glow") as HTMLElement;
    if (glow) {
      glow.style.opacity = "1";

      const lightX = rect.width / 2 + (0.5 - percentX) * rect.width * 0.8;
      const lightY = rect.height / 2 + (0.5 - percentY) * rect.height * 0.8;

      glow.style.background = `
        radial-gradient(
          circle at ${lightX}px ${lightY}px,
          rgba(255,255,255,0.15),
          rgba(255,255,255,0.06) 12%,
          transparent 38%
        )
      `;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        onClick={() => setIsOpen(true)}
        onMouseEnter={handleMouseEnter} 
        onMouseMove={handleMove}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0} 
        role="button"
        aria-label="View card details"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="relative aspect-16/23 w-full max-w-60 overflow-hidden cursor-pointer will-change-transform transform-3d border-2 border-black rounded focus:outline-3 focus:outline-blue-600 backface-hidden"
      >
        {children}

        <div className="card-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 z-20" />

        <div className="pointer-events-none absolute inset-0 z-10 opacity-20 mix-blend-overlay bg-[linear-gradient(120deg,#ff00ff,#00ffff,#ffff00,#ff00ff)] bg-size[300%_300%] animate-rainbow" />

        <div className="pointer-events-none absolute top-0 left-[-150%] h-full w-1/3 rotate-12 bg-white/50 blur-md animate-shine z-30" />
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fade-in"
        >
          <button 
            onClick={() => setIsOpen(false)} 
            className="absolute top-4 right-4 text-white text-xl font-bold bg-black/40 p-2 rounded-full z-1000 md:block hidden"
            aria-label="Close dialog"
          >
            ✕
          </button>
          
          <div onClick={(e) => e.stopPropagation()} className="animate-card-open">
            {children}
          </div>
        </div>
      )}
    </>
  );
}