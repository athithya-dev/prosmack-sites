'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetPath } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxLayer {
  layer: string;
  yPercent: number;
}

export function ParallaxComponent({
  title = "Personal Branding",
  subtitle = "Influence & Authority",
  layers = [
    { layer: "1", yPercent: 40 },
    { layer: "2", yPercent: -25 },
    { layer: "3", yPercent: 15 },
    { layer: "4", yPercent: -45 }
  ],
  className = "",
}: {
  title?: string;
  subtitle?: string;
  layers?: ParallaxLayer[];
  className?: string;
}) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggerElement = parallaxRef.current;
    if (!triggerElement) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    layers.forEach((layerObj, idx) => {
      const targets = triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);
      if (targets.length > 0) {
        tl.to(
          targets,
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === triggerElement) {
          st.kill();
        }
      });
    };
  }, [layers]);

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden ${className}`} ref={parallaxRef}>
      <div data-parallax-layers className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] flex items-center justify-center bg-[#0d0d0d]">
        <div data-parallax-layer="1" className="absolute inset-0 w-full h-full opacity-20">
          <img src={getAssetPath("/services_social.jpg")} alt="Parallax Background" className="w-full h-full object-cover" />
        </div>
        <div data-parallax-layer="3" className="relative z-10 text-center px-4">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold block mb-2">{subtitle}</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-satoshi text-white uppercase">{title}</h2>
        </div>
      </div>
    </div>
  );
}

export default ParallaxComponent;
