'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CircularTestimonials, Testimonial } from '@/components/ui/circular-testimonials';

const featuredTestimonials: Testimonial[] = [
  {
    name: 'IRCTC',
    designation: 'Official Digital Promotion Partner',
    quote: 'We are an official digital promotion partner for IRCTC, managing digital media advertising, promotional campaigns, and online brand communication to enhance audience reach and engagement.',
    src: '/IRCTC.jpg',
  },
  {
    name: 'Tamil Nadu Tourism (TTDC)',
    designation: 'Digital Promotions & Social Strategy',
    quote: 'We have partnered with TTDC to drive social media and digital promotions, strengthening tourism communication and creating engaging digital campaigns to reach wider audiences.',
    src: '/th.jpg',
  },
  {
    name: 'Tata Motors – Tata Hexa Launch',
    designation: 'Automotive Launch & Strategic Campaigns',
    quote: 'We supported Tata Motors during the launch of the Tata Hexa, managing digital promotions and strategic campaign initiatives to build awareness, engagement, and market visibility.',
    src: '/OIP (1).jpg',
  },
  {
    name: 'SBI Home Loans',
    designation: 'Campaigns Across 2019, 2021 & 2022',
    quote: 'We have successfully managed digital promotional campaigns for SBI Home Loans across 2019, 2021, and 2022, supporting their digital outreach and campaign communication.',
    src: '/sbi-1518665988.jpg',
  },
];

export default function FeaturedWork() {
  return (
    <section
      id="featured-work"
      className="relative w-full bg-[#050505] text-white pt-20 sm:pt-28 md:pt-36 lg:pt-44 pb-20 sm:pb-28 md:pb-36 overflow-hidden border-t border-white/5 z-20 select-none flex flex-col items-center justify-center"
    >
      {/* Centered Ambient Lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent/5 rounded-full blur-[160px] -z-10" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Perfectly Centered Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-accent uppercase">
              Featured Case Studies
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black font-satoshi uppercase tracking-tight text-white leading-tight text-center"
          >
            Client Impact & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-red-500 to-orange-400">
              Brand Dominance
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-secondary max-w-lg mx-auto font-normal leading-relaxed text-center"
          >
            Proven institutional campaigns and brand growth engineered for India&apos;s leading enterprises and public sector icons.
          </motion.p>
        </div>

        {/* Centered Circular Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full rounded-3xl border border-white/10 bg-[#0d0d0d]/90 backdrop-blur-xl p-5 sm:p-8 md:p-12 shadow-2xl flex items-center justify-center"
        >
          <CircularTestimonials
            testimonials={featuredTestimonials}
            autoplay={true}
            colors={{
              name: "#ffffff",
              designation: "#ea0d23",
              testimony: "#e4e4e7",
              arrowBackground: "rgba(255, 255, 255, 0.08)",
              arrowForeground: "#ffffff",
              arrowHoverBackground: "#ea0d23",
            }}
            fontSizes={{
              name: "clamp(1.35rem, 3.5vw, 2rem)",
              designation: "0.85rem",
              quote: "clamp(0.95rem, 2vw, 1.15rem)",
            }}
          />
        </motion.div>


      </div>
    </section>
  );
}
