'use client';

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import DockNavbar from '@/components/DockNavbar';
import Hero from '@/components/Sections/Hero';
import ScrollingStatement from '@/components/Sections/ScrollingStatement';
import Services from '@/components/Sections/Services';
import FeaturedWork from '@/components/Sections/FeaturedWork';
import HorizontalExperience from '@/components/Sections/HorizontalExperience';
import BrandPhilosophy from '@/components/Sections/BrandPhilosophy';
import Process from '@/components/Sections/Process';
import Testimonials from '@/components/Sections/Testimonials';
import FAQ from '@/components/Sections/FAQ';
import Contact from '@/components/Sections/Contact';
import Footer from '@/components/Sections/Footer';

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Recalculate ScrollTrigger offsets once the loading screen wipes up and height unlocks
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400); // Wait for the upward slide transition to finish
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <>
      {/* Custom Cursor morphs and follows mouse */}
      <CustomCursor />

      {/* Cinematic Loader shows on initial mount */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* Layout wraps inside Lenis SmoothScroll */}
      <SmoothScroll>
        <div id="page-wrapper" className={`relative w-full min-h-screen bg-background text-white flex flex-col transition-opacity duration-700 ${
          isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'
        }`}>
          {/* Subtle global aesthetic filters */}
          <div className="noise-overlay" />
          <div className="soft-vignette" />

          {/* Navigation */}
          {!isLoading && <Navbar />}
          {!isLoading && <DockNavbar />}

          {/* Main Cinematic Sections */}
          <main className="flex-1 w-full flex flex-col">
            <Hero />
            <ScrollingStatement />
            <Services />
            <FeaturedWork />
            <HorizontalExperience />
            <BrandPhilosophy />
            <Process />
            <Testimonials />
            <FAQ />
            <Contact />
          </main>

          {/* Animated PROSMACK Footer */}
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
