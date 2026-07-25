'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '../Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Trigger page-wide color inversion to white theme
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom bottom',
      onEnter: () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const bg = currentTheme === 'dark' ? '#ffffff' : '#fbfbfb';
        const fg = '#050505';
        gsap.to('#page-wrapper', { backgroundColor: bg, color: fg, duration: 1.2, ease: 'power2.out' });
        const cursorRing = document.querySelector('.fixed.top-0.left-0.w-7.h-7') as HTMLElement;
        if (cursorRing) {
          gsap.to(cursorRing, { borderColor: 'rgba(0, 0, 0, 0.4)', duration: 1 });
        }
      },
      onLeaveBack: () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const bg = currentTheme === 'dark' ? '#050505' : '#fbfbfb';
        const fg = currentTheme === 'dark' ? '#ffffff' : '#050505';
        gsap.to('#page-wrapper', { backgroundColor: bg, color: fg, duration: 1.2, ease: 'power2.out' });
        const cursorRing = document.querySelector('.fixed.top-0.left-0.w-7.h-7') as HTMLElement;
        if (cursorRing) {
          const border = currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';
          gsap.to(cursorRing, { borderColor: border, duration: 1 });
        }
      },
    });

    // Animate text reveal
    gsap.fromTo(
      textRef.current,
      { y: 80, opacity: 0, filter: 'blur(10px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        },
      }
    );

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-32 px-6 md:px-16 overflow-hidden transition-colors duration-1000"
    >
      <div className="max-w-5xl w-full flex flex-col items-center justify-center text-center z-10">
        <span className="text-accent font-satoshi text-xs md:text-sm tracking-[0.4em] uppercase font-bold block mb-6">
          Next Phase
        </span>

        {/* Large Typography */}
        <h2
          ref={textRef}
          className="font-satoshi font-black text-3xl sm:text-5xl md:text-[6.5vw] leading-none uppercase tracking-tighter max-w-4xl"
        >
          Ready to build something unforgettable?
        </h2>

        {/* Minimal Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-3xl mt-16 md:mt-24 border-t border-current/10 pt-12">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[10px] tracking-widest uppercase font-semibold mb-2 opacity-50">
              Start a Conversation
            </span>
            <Magnetic range={30}>
              <a
                href="mailto:hello@prosmack.com"
                className="font-satoshi text-base font-bold underline decoration-accent hover:text-accent transition-colors duration-300"
              >
                hello@prosmack.com
              </a>
            </Magnetic>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <span className="text-[10px] tracking-widest uppercase font-semibold mb-2 opacity-50">
              Call Direct
            </span>
            <Magnetic range={30}>
              <a
                href="tel:+15550199239"
                className="font-satoshi text-base font-bold underline decoration-accent hover:text-accent transition-colors duration-300"
              >
                +1 (555) 019 9239
              </a>
            </Magnetic>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <span className="text-[10px] tracking-widest uppercase font-semibold mb-2 opacity-50">
              Studio Location
            </span>
            <span className="font-satoshi text-base font-bold">
              New York City / Remote
            </span>
          </div>
        </div>

        {/* Call To Action button */}
        <div className="mt-16 md:mt-20">
          <Magnetic range={50}>
            <a
              href="mailto:hello@prosmack.com"
              className="px-10 py-5 bg-accent text-white font-satoshi text-xs font-bold uppercase tracking-widest rounded-full hover:bg-background hover:text-foreground transition-all duration-300 hover:shadow-2xl"
            >
              Secure Agency Call
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
