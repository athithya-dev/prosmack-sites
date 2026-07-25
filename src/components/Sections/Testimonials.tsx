'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "ProSmack redefined how we present our brand. Their creative production and positioning strategy generated unprecedented demand.",
    author: "Marcus Sterling",
    role: "CEO, Apex Tech Group",
  },
  {
    quote: "The cinematic brand film ProSmack produced wasn't just a video; it was an emotional experience. It sold out our inventory in minutes.",
    author: "Elena Rostova",
    role: "Founder, Luxe Chrono Group",
  },
  {
    quote: "Their personal branding system is flawless. They mapped my story and scaled my digital presence into an absolute authority asset.",
    author: "Dr. Aris Thorne",
    role: "Director, Futura Network",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const deck = deckRef.current;
    if (!container || !deck) return;

    const cards = cardsRef.current;
    
    // Set 3D perspective layouts on initial load
    cards.forEach((card, index) => {
      if (!card) return;
      
      const zIndex = cards.length - index;
      const yOffset = index * 20; // 20px stack offset
      const scale = 1 - index * 0.05; // nested scale down
      const rotateX = -index * 5; // nested tilting

      gsap.set(card, {
        zIndex,
        y: yOffset,
        scale,
        transformOrigin: 'bottom center',
        rotateX,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate peeling off cards one by one
    cards.forEach((card, index) => {
      if (index === cards.length - 1) return; // Last card stays pinned

      const nextCards = cards.slice(index + 1);

      tl.to(card, {
        xPercent: -120,
        rotateY: -35,
        rotateZ: -10,
        opacity: 0,
        filter: 'blur(5px)',
        duration: 1.5,
        ease: 'power1.inOut',
      }, `peel-${index}`)

      // Shift lower cards up into focus
      nextCards.forEach((nextCard, nextIdx) => {
        const targetScale = 1 - nextIdx * 0.05;
        const targetY = nextIdx * 20;
        const targetRotateX = -nextIdx * 5;

        tl.to(nextCard, {
          scale: targetScale,
          y: targetY,
          rotateX: targetRotateX,
          duration: 1.5,
          ease: 'power2.out',
        }, `peel-${index}`);
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative w-full h-[250vh] bg-background flex flex-col items-center justify-start py-24 md:py-32"
    >
      <div className="sticky top-20 w-full flex flex-col items-center justify-center min-h-[480px] h-[85vh] md:h-[80vh] overflow-hidden px-6">
        
        {/* Section Title Header */}
        <div className="text-center mb-8 md:mb-16">
          <span className="text-accent font-satoshi text-xs md:text-sm tracking-[0.4em] uppercase font-bold block mb-4">
            Endorsements
          </span>
          <h2 className="font-satoshi font-black text-4xl md:text-7xl text-foreground uppercase tracking-tight">
            Client Words.
          </h2>
        </div>

        {/* 3D Stack Card Deck Container */}
        <div
          ref={deckRef}
          className="relative w-full max-w-2xl h-[340px] md:h-[45vh]"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {testimonials.map((test, index) => (
            <div
              key={test.author}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="absolute inset-0 w-full h-full bg-surface border border-white/5 rounded-2xl p-6 md:p-12 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu"
            >
              {/* Quote icon detail */}
              <div className="text-accent text-5xl md:text-7xl font-serif leading-none h-4 opacity-50 select-none">
                “
              </div>

              {/* Text Quote */}
              <p className="font-satoshi text-base md:text-2xl text-foreground leading-relaxed italic mt-2 md:mt-4">
                {test.quote}
              </p>

              {/* Author Metadata */}
              <div className="flex flex-col mt-6 border-t border-white/5 pt-4">
                <span className="font-satoshi font-bold text-sm md:text-base text-foreground">
                  {test.author}
                </span>
                <span className="text-[10px] tracking-wider text-secondary uppercase mt-1">
                  {test.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
