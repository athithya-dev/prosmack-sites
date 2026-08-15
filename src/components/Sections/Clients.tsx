'use client';

import React from 'react';
import { Logos3, Logo } from '@/components/ui/logos3';

const clientLogos: Logo[] = [
  {
    id: 'kms-hakkim',
    description: 'KMS Hakkim Kalyana Biriyani',
    image: '/clients/kms_hakkim.png',
    className: 'h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,200,0,0.15)]',
  },
  {
    id: 'homepreneur',
    description: 'Homepreneur Awards',
    image: '/clients/homepreneur_dark.png',
    className: 'h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]',
  },
  {
    id: 'st-brittos',
    description: "St. Britto's Academy CBSE",
    image: '/clients/st_brittos_dark.png',
    className: 'h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]',
  },
  {
    id: 'aiboc',
    description: "AIBOC - All India Bank Officers' Confederation",
    image: '/clients/aiboc_dark.png',
    className: 'h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_12px_rgba(96,165,250,0.2)]',
  },
  {
    id: 'sayara',
    description: 'Sayara Herbal Beauty Care',
    image: '/clients/sayara_dark.png',
    className: 'h-12 sm:h-14 w-auto object-contain drop-shadow-[0_0_12px_rgba(74,222,128,0.2)]',
  },
];

export default function Clients() {
  return (
    <div id="clients" className="w-full border-t border-white/5 bg-[#050505] z-20 relative">
      <Logos3
        heading="Trusted by Visionary Brands"
        subheading="Powering market leaders across gastronomy, executive awards, education, institutions, and lifestyle"
        logos={clientLogos}
        className="py-20 md:py-28"
      />
    </div>
  );
}
