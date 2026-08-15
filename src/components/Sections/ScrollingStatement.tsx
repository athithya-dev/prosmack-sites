'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statements = [
  {
    word: 'ATTENTION',
    desc: 'If you are invisible, you do not exist. We capture interest instantly and command market gravity.',
  },
  {
    word: 'AUTHORITY',
    desc: 'Validating your industry standing and trust through calculated visual and editorial excellence.',
  },
  {
    word: 'INFLUENCE',
    desc: 'Translating passive traffic into organic brand loyalty and scaling your community alignment.',
  },
  {
    word: 'IDENTITY',
    desc: 'Redefining your voice, aesthetics, and digital presence to establish long-term market equity.',
  },
];

export default function ScrollingStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create GSAP Master timeline with ScrollTrigger pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate each word container in sequence
    statements.forEach((_, index) => {
      const wordEl = wordsRef.current[index];
      if (!wordEl) return;

      const letters = wordEl.querySelectorAll('.statement-letter');
      const textEl = wordEl.querySelector('.statement-desc');

      // Set initial states for all letters and descs except the first one
      if (index > 0) {
        gsap.set(letters, { opacity: 0, scale: 0.5, filter: 'blur(20px)', y: 80 });
        gsap.set(textEl, { opacity: 0, y: 30, filter: 'blur(5px)' });
      } else {
        gsap.set(letters, { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 });
        gsap.set(textEl, { opacity: 0.6, y: 0, filter: 'blur(0px)' });
      }

      // Transition out the current word (unless it's the last word)
      if (index < statements.length - 1) {
        tl.to(letters, {
          opacity: 0,
          scale: 1.5,
          filter: 'blur(15px)',
          y: -100,
          stagger: { amount: 0.2, from: 'center' },
          ease: 'power2.inOut',
        }, `word-${index}`)
        .to(textEl, {
          opacity: 0,
          y: -30,
          filter: 'blur(5px)',
          duration: 0.6,
          ease: 'power2.inOut',
        }, `word-${index}`);
      }

      // Transition in the next word (starts as the previous word leaves)
      if (index < statements.length - 1) {
        const nextWordEl = wordsRef.current[index + 1];
        if (nextWordEl) {
          const nextLetters = nextWordEl.querySelectorAll('.statement-letter');
          const nextTextEl = nextWordEl.querySelector('.statement-desc');
          
          tl.to(nextLetters, {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            y: 0,
            stagger: { amount: 0.25, from: 'center' },
            ease: 'power3.out',
          }, `word-${index}+=0.35`)
          .to(nextTextEl, {
            opacity: 0.6,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
          }, `word-${index}+=0.65`);
        }
      }
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
      className="relative w-full h-[400vh] bg-background z-10"
    >
      <div className="sticky top-0 w-full h-screen flex justify-center items-center overflow-hidden">
        {/* Animated flow background details */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/1 rounded-full blur-[140px] pointer-events-none" />

        {statements.map((item, wordIndex) => (
          <div
            key={item.word}
            ref={(el) => {
              if (el) wordsRef.current[wordIndex] = el;
            }}
            className={`absolute inset-0 flex flex-col justify-center items-center px-6 text-center transition-all duration-300 ${
              wordIndex === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-100 pointer-events-none'
            }`}
          >


            {/* Huge Word */}
            <h2 className="font-satoshi font-black text-4xl xs:text-5xl sm:text-7xl md:text-[12vw] lg:text-[14vw] tracking-tighter leading-none text-foreground text-center select-none uppercase flex flex-nowrap justify-center">
              {item.word.split('').map((char, charIndex) => (
                <span
                  key={`${char}-${charIndex}`}
                  className="statement-letter inline-block transform-gpu origin-bottom"
                >
                  {char}
                </span>
              ))}
            </h2>

            {/* Subtext description */}
            <p className="statement-desc text-secondary text-base sm:text-lg md:text-xl font-medium tracking-normal sm:tracking-wide max-w-xl mt-5 sm:mt-6 opacity-80 leading-relaxed px-2">
              {item.desc}
            </p>

            {/* Decorative arrow down */}
            {wordIndex < statements.length - 1 && (
              <div className="absolute bottom-10 sm:bottom-12 flex flex-col items-center gap-1.5 text-secondary opacity-60 text-xs font-mono tracking-[0.2em]">
                <span>SCROLL</span>
                <span className="animate-bounce">↓</span>
              </div>
            )}

          </div>
        ))}
      </div>
    </section>
  );
}
