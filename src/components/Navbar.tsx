'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { getAssetPath } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);

    // Clear GSAP inline styles to let the theme classes take over
    const wrapper = document.getElementById('page-wrapper');
    if (wrapper) {
      wrapper.style.backgroundColor = '';
      wrapper.style.color = '';
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: -80, duration: 1.5 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex items-center ${
        isScrolled
          ? 'h-14 sm:h-16 bg-background/80 backdrop-blur-xl border-b border-foreground/10 shadow-lg shadow-black/20'
          : 'h-16 sm:h-20 bg-transparent'
      }`}
    >
      <div className="w-full px-5 sm:px-8 md:px-12 flex items-center justify-between relative h-full">
        {/* Left Spacer */}
        <div className="w-9 sm:w-10 h-9 sm:h-10 invisible" />

        {/* Absolute Centered Logo on ALL Devices */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto">
          <Magnetic range={40}>
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, 'hero')}
              className="flex items-center outline-none"
              aria-label="ProSmack Home"
            >
              <Image
                src={getAssetPath("/logo.png")}
                alt="ProSmack Logo"
                width={140}
                height={32}
                priority
                className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 active:scale-95"
                style={{ width: 'auto', height: 'auto' }}
              />
            </a>
          </Magnetic>
        </div>

        {/* Right-aligned Theme Toggler */}
        <div className="flex items-center justify-end z-20 pointer-events-auto">
          <Magnetic range={30}>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-foreground/10 bg-foreground/[0.03] backdrop-blur-md cursor-pointer outline-none select-none hover:bg-foreground/[0.08] active:scale-90 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -8, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 8, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex items-center justify-center"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  ) : (
                    <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}

