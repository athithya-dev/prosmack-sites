'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'How does ProSmack differ from standard branding agencies?',
    a: 'We operate at the intersection of cinematic production, luxury positioning, and bespoke technology. We do not use templates or cookie-cutter strategies. Every visual identity, campaign, and digital interface is custom-designed and coded to command maximum brand gravity and attention.',
  },
  {
    q: 'Which industries do you partner with?',
    a: 'We work primarily with high-growth technology companies, luxury brands, investment funds, executive leaders, and high-impact visionaries who require an elite digital footprint to build trust, command premiums, and scale influence.',
  },
  {
    q: 'How long does a branding and production project take?',
    a: 'A typical engagement runs between 6 to 12 weeks. This includes the initial research audit, core brand positioning strategy, design system drafting, copy/asset creation, and final launch verification. We prioritize precision and polish above all else.',
  },
  {
    q: 'Do you handle the actual production of brand assets?',
    a: 'Yes, we are a full-service creative engine. We manage the entire pipeline from design drafts and copywriting to professional 4K anamorphic video shooting, interactive WebGL/React development, and technical launch configurations.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative w-full bg-background py-24 md:py-32 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 md:px-16">
        
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-accent font-satoshi text-xs md:text-sm tracking-[0.4em] uppercase font-bold block mb-4">
            Information
          </span>
          <h2 className="font-satoshi font-black text-4xl md:text-7xl text-foreground uppercase tracking-tight">
            FAQs.
          </h2>
        </div>

        {/* Accordion Group */}
        <div className="flex flex-col border-t border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={faq.q}
                className="border-b border-white/10 py-6 md:py-8 flex flex-col"
              >
                {/* Accordion Button trigger */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left text-foreground group outline-none cursor-default"
                >
                  <h3 className="font-satoshi text-lg md:text-xl font-bold uppercase tracking-wide group-hover:text-accent transition-colors duration-300">
                    {faq.q}
                  </h3>

                  {/* Rotatable plus/minus icon */}
                  <div className="ml-4 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                    <motion.svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      <path
                        d="M6 1V11M1 6H11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </div>
                </button>

                {/* Smooth Expandable Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 0.7,
                        marginTop: 16,
                        transition: { height: { duration: 0.4, ease: 'easeOut' }, opacity: { duration: 0.3 } },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        marginTop: 0,
                        transition: { height: { duration: 0.3, ease: 'easeIn' }, opacity: { duration: 0.2 } },
                      }}
                      className="overflow-hidden pr-8 text-secondary text-sm md:text-base leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
