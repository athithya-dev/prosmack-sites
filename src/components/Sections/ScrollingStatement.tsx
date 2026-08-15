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

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.0,
          pin: true,
          anticipatePin: 1,
        },
      });

      statements.forEach((_, index) => {
        const wordEl = wordsRef.current[index];
        if (!wordEl) return;

        const letters = wordEl.querySelectorAll('.statement-letter');
        const textEl = wordEl.querySelector('.statement-desc');

        if (index > 0) {
          gsap.set(letters, { opacity: 0, scale: 0.5, filter: 'blur(20px)', y: 80 });
          gsap.set(textEl, { opacity: 0, y: 30, filter: 'blur(5px)' });
        } else {
          gsap.set(letters, { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 });
          gsap.set(textEl, { opacity: 0.8, y: 0, filter: 'blur(0px)' });
        }

        if (index < statements.length - 1) {
          tl.to(letters, {
            opacity: 0,
            scale: 1.4,
            filter: 'blur(12px)',
            y: -80,
            stagger: { amount: 0.18, from: 'center' },
            ease: 'power2.inOut',
          }, `word-${index}`)
          .to(textEl, {
            opacity: 0,
            y: -25,
            filter: 'blur(4px)',
            duration: 0.5,
            ease: 'power2.inOut',
          }, `word-${index}`);

          const nextWordEl = wordsRef.current[index + 1];
          if (nextWordEl) {
            const nextLetters = nextWordEl.querySelectorAll('.statement-letter');
            const nextTextEl = nextWordEl.querySelector('.statement-desc');
            
            tl.to(nextLetters, {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              y: 0,
              stagger: { amount: 0.2, from: 'center' },
              ease: 'power3.out',
            }, `word-${index}+=0.3`)
            .to(nextTextEl, {
              opacity: 0.8,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.6,
              ease: 'power3.out',
            }, `word-${index}+=0.5`);
          }
        }
      });
    });

    mm.add('(max-width: 767px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
          pin: true,
          anticipatePin: 1,
        },
      });

      statements.forEach((_, index) => {
        const wordEl = wordsRef.current[index];
        if (!wordEl) return;

        const letters = wordEl.querySelectorAll('.statement-letter');
        const textEl = wordEl.querySelector('.statement-desc');

        if (index > 0) {
          gsap.set(letters, { opacity: 0, scale: 0.7, y: 50 });
          gsap.set(textEl, { opacity: 0, y: 20 });
        } else {
          gsap.set(letters, { opacity: 1, scale: 1, y: 0 });
          gsap.set(textEl, { opacity: 0.85, y: 0 });
        }

        if (index < statements.length - 1) {
          tl.to(letters, {
            opacity: 0,
            scale: 1.2,
            y: -50,
            stagger: 0.05,
            ease: 'power1.inOut',
          }, `word-mob-${index}`)
          .to(textEl, {
            opacity: 0,
            y: -15,
            duration: 0.35,
            ease: 'power1.inOut',
          }, `word-mob-${index}`);

          const nextWordEl = wordsRef.current[index + 1];
          if (nextWordEl) {
            const nextLetters = nextWordEl.querySelectorAll('.statement-letter');
            const nextTextEl = nextWordEl.querySelector('.statement-desc');
            
            tl.to(nextLetters, {
              opacity: 1,
              scale: 1,
              y: 0,
              stagger: 0.05,
              ease: 'power2.out',
            }, `word-mob-${index}+=0.25`)
            .to(nextTextEl, {
              opacity: 0.85,
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
            }, `word-mob-${index}+=0.4`);
          }
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[220vh] md:h-[380vh] bg-background z-10"
    >
      <div className="sticky top-0 w-full h-[100dvh] flex justify-center items-center overflow-hidden">

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
