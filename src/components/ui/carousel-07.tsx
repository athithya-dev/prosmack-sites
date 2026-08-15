"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, getAssetPath } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface Slide {
  image: string;
  title: string;
  description: string;
  badge: string;
}

export const defaultSlides: Slide[] = [
  {
    image: "/philosophy_portrait.jpg",
    title: "Personal Branding",
    description: "Sculpting executive authority, thought leadership dialects, and high-status digital personas.",
    badge: "Authority",
  },
  {
    image: "/services_branding.jpg",
    title: "Brand Identity Design",
    description: "Designing bespoke visual identities, typography architectures, and brand systems.",
    badge: "Identity",
  },
  {
    image: "/services_video.jpg",
    title: "Cinematic 4K Production",
    description: "High-end commercial films, cinematic story reels, and documentary-style brand narratives.",
    badge: "Cinema",
  },
  {
    image: "/services_strategy.jpg",
    title: "Integrated Marketing (IMC)",
    description: "End-to-end strategic campaign orchestration, public relations, and media dialect coordination.",
    badge: "Strategy",
  },
  {
    image: "/services_advertising.jpg",
    title: "Digital Advertising & Ads",
    description: "Targeted multi-channel ad scaling, high-intent performance funnels, and conversion architecture.",
    badge: "Growth",
  },
  {
    image: "/services_social.jpg",
    title: "Viral Social Media Systems",
    description: "Algorithm-optimized content engines, community gravity, and exponential organic reach.",
    badge: "Virality",
  },
];

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width === 0) {
    return {
      distanceDivisor: 100,
      velocityDivisor: 450,
      sensitivity: 150,
      xMultiplier: 55,
      yMultiplier: 12,
      rotationMultiplier: 5,
      scaleReduction: 0.07,
    };
  }
  if (width < 390) {
    // Ultra compact mobile (iPhone SE, small Androids)
    return {
      distanceDivisor: 90,
      velocityDivisor: 400,
      sensitivity: 140,
      xMultiplier: 42,
      yMultiplier: 10,
      rotationMultiplier: 4,
      scaleReduction: 0.07,
    };
  }
  if (width < 640) {
    // Standard Mobile (iPhone 12/13/14/15/16, Galaxy S, Pixel)
    return {
      distanceDivisor: 110,
      velocityDivisor: 480,
      sensitivity: 160,
      xMultiplier: 60,
      yMultiplier: 14,
      rotationMultiplier: 6,
      scaleReduction: 0.08,
    };
  }
  if (width < 1024) {
    // Tablet
    return {
      distanceDivisor: 150,
      velocityDivisor: 600,
      sensitivity: 200,
      xMultiplier: 115,
      yMultiplier: 22,
      rotationMultiplier: 8,
      scaleReduction: 0.09,
    };
  }
  // Desktop
  return {
    distanceDivisor: 190,
    velocityDivisor: 750,
    sensitivity: 240,
    xMultiplier: 160,
    yMultiplier: 30,
    rotationMultiplier: 10,
    scaleReduction: 0.11,
  };
};

export const CarouselStacked = ({ slides = defaultSlides }: { slides?: Slide[] }) => {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const total = slides.length;

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Synchronize activeIndex for indicators
  React.useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest) => {
      const raw = Math.round(latest);
      const normalized = ((raw % total) + total) % total;
      setActiveIndex(normalized);
    });
    return () => unsubscribe();
  }, [scrollProgress, total]);

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth],
  );

  const handleDragStart = () => {
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-2, Math.min(2, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 220,
      damping: 28,
      mass: 0.9,
    });
  };

  const goToIndex = (targetIndex: number) => {
    const current = scrollProgress.get();
    const currentNormalized = ((Math.round(current) % total) + total) % total;
    let diff = targetIndex - currentNormalized;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const target = Math.round(current) + diff;
    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 220,
      damping: 28,
      mass: 0.9,
    });
  };

  const handleNext = () => {
    const current = scrollProgress.get();
    animate(scrollProgress, Math.round(current) + 1, {
      type: "spring",
      stiffness: 220,
      damping: 28,
      mass: 0.9,
    });
  };

  const handlePrev = () => {
    const current = scrollProgress.get();
    animate(scrollProgress, Math.round(current) - 1, {
      type: "spring",
      stiffness: 220,
      damping: 28,
      mass: 0.9,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-4 sm:py-8 bg-transparent overflow-hidden select-none">
      {/* 3D Stack Stage */}
      <div className="relative w-full max-w-7xl h-[390px] xs:h-[420px] sm:h-[460px] md:h-[500px] lg:h-[530px] flex items-center justify-center">
        {/* Transparent Drag Surface for intuitive gesture control with vertical scroll pass-through */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragStart={handleDragStart}
          onDrag={(_, info) => {
            const delta = -info.delta.x / config.sensitivity;
            scrollProgress.set(scrollProgress.get() + delta);
          }}
          onDragEnd={handleDragEnd}
          style={{ touchAction: "pan-y" }}
          className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
        />

        {slides.map((slide, i) => (
          <Card
            key={i}
            slide={slide}
            index={i}
            total={total}
            progress={scrollProgress}
            config={config}
            onSelect={() => goToIndex(i)}
          />
        ))}
      </div>

      {/* Navigation, Progress & Pagination Controls (Centered on Mobile, Balanced on Desktop) */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between w-full max-w-xs sm:max-w-md md:max-w-lg mt-5 sm:mt-8 px-4 gap-3.5 sm:gap-4 z-40">
        {/* Active Index Counter (Desktop view) */}
        <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-secondary tracking-widest">
          <span className="text-accent font-bold">0{activeIndex + 1}</span>
          <span className="text-white/30">/</span>
          <span className="text-white/60">0{total}</span>
        </div>

        {/* Interactive Pagination Indicators */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToIndex(i)}
              aria-label={`Jump to service ${i + 1}`}
              className={cn(
                "h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer",
                i === activeIndex
                  ? "w-6 sm:w-8 bg-accent shadow-[0_0_12px_rgba(234,13,35,0.7)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>

        {/* Quick Prev / Next Arrows */}
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous service"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/15 bg-white/5 hover:bg-accent hover:border-accent text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg active:scale-90"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next service"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/15 bg-white/5 hover:bg-accent hover:border-accent text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg active:scale-90"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
  onSelect: () => void;
}

const Card = ({ slide, index, total, progress, config, onSelect }: CardProps) => {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return o * config.rotationMultiplier;
  });
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return absO * config.yMultiplier;
  });
  const scale = useTransform(
    offset,
    (o) => Math.max(0.65, 1 - Math.abs(o) * config.scaleReduction),
  );
  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0],
  );
  const zIndex = useTransform(offset, (o) =>
    Math.round(100 - Math.abs(o) * 10),
  );

  return (
    <motion.div
      style={{ zIndex }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <motion.div
        style={{
          x,
          rotate,
          y,
          scale,
          opacity,
        }}
        onClick={onSelect}
        className={cn(
          "relative rounded-3xl overflow-hidden bg-[#0d0d0d] group border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] transition-all duration-300",
          "w-[260px] h-[360px] xs:w-[280px] xs:h-[390px] sm:w-[310px] sm:h-[430px] md:w-[340px] md:h-[470px] lg:w-[360px] lg:h-[490px]",
          "pointer-events-auto cursor-pointer"
        )}
      >
        {/* Background Image */}
        <img
          src={getAssetPath(slide.image)}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
        />

        {/* Dynamic Darkening for background / inactive cards */}
        <motion.div
          style={{
            opacity: useTransform(
              offset,
              [-2, -0.6, 0, 0.6, 2],
              [0.65, 0.35, 0, 0.35, 0.65],
            ),
          }}
          className="absolute inset-0 bg-black pointer-events-none transition-opacity"
        />

        {/* Multi-layered cinematic gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Top Bar: Slide Index & Category Badge */}
        <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between z-10 pointer-events-none">
          <span className="text-xs sm:text-xs font-mono font-bold tracking-widest text-white/90 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
            0{index + 1}
          </span>
          <Badge className="px-3 sm:px-3.5 py-1 sm:py-1 rounded-full bg-accent/95 backdrop-blur-md text-xs sm:text-xs font-mono font-bold uppercase tracking-wider text-white border-none shadow-lg shadow-accent/30">
            {slide.badge}
          </Badge>
        </div>

        {/* Bottom Content: Title & Description (Centred ONLY on Mobile, Left-aligned on Desktop) */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-5 sm:right-5 text-white text-center sm:text-left flex flex-col items-center sm:items-start z-10 pointer-events-none">
          <motion.p
            style={{
              opacity: useTransform(offset, [-0.6, 0, 0.6], [0.4, 1, 0.4]),
            }}
            className="text-lg sm:text-xl md:text-2xl font-satoshi font-black leading-tight mb-2 sm:mb-2 uppercase tracking-tight text-white drop-shadow-lg text-center sm:text-left w-full"
          >
            {slide.title}
          </motion.p>
          <motion.p
            style={{
              opacity: useTransform(offset, [-0.6, 0, 0.6], [0.2, 1, 0.2]),
            }}
            className="text-sm sm:text-sm md:text-base text-white/90 line-clamp-3 font-normal leading-relaxed text-center sm:text-left w-full"
          >
            {slide.description}
          </motion.p>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default CarouselStacked;
