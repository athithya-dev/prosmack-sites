"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, getAssetPath } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}
export interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
export interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
export interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  if (width < 640) return 25;
  if (width < 1024) return 40;
  return 55;
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  const colorName = colors.name ?? "#ffffff";
  const colorDesignation = colors.designation ?? "#ea0d23";
  const colorTestimony = colors.testimony ?? "#b0b0b0";
  const colorArrowBg = colors.arrowBackground ?? "rgba(255,255,255,0.06)";
  const colorArrowFg = colors.arrowForeground ?? "#ffffff";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#ea0d23";
  const fontSizeName = fontSizes.name ?? "1.85rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.85rem";
  const fontSizeQuote = fontSizes.quote ?? "1.05rem";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex] || testimonials[0],
    [activeIndex, testimonials]
  );

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5500);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.7s cubic-bezier(.34,1.56,.64,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) scale(0.85) rotateY(12deg)`,
        transition: "all 0.7s cubic-bezier(.34,1.56,.64,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) scale(0.85) rotateY(-12deg)`,
        transition: "all 0.7s cubic-bezier(.34,1.56,.64,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: `translateX(0px) scale(0.6)`,
      transition: "all 0.7s cubic-bezier(.34,1.56,.64,1)",
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center w-full">
        
        {/* Images Column */}
        <div 
          className="md:col-span-6 relative w-full h-[17rem] xs:h-[19rem] sm:h-[22rem] md:h-[25rem] flex items-center justify-center" 
          ref={imageContainerRef}
        >
          {testimonials.map((testimonial, index) => (
            <img
              key={`${testimonial.src}-${index}`}
              src={getAssetPath(testimonial.src)}
              alt={testimonial.name}
              className="absolute w-[80%] xs:w-[82%] h-[90%] object-cover rounded-3xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
              data-index={index}
              style={getImageStyle(index)}
            />
          ))}
        </div>

        {/* Content Column (Centered on Mobile, Left-aligned on Desktop) */}
        <div className="md:col-span-6 flex flex-col items-center md:items-start justify-between text-center md:text-left px-2 sm:px-4 w-full min-h-full">
          {/* Animated Text Body */}
          <div className="w-full min-h-[140px] xs:min-h-[150px] sm:min-h-[160px] md:min-h-0 flex flex-col items-center md:items-start justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-3 sm:space-y-3.5 flex flex-col items-center md:items-start text-center md:text-left w-full"
              >
                {/* Designation Badge */}
                <div className="inline-flex items-center justify-center md:justify-start gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span
                    className="font-mono text-xs uppercase tracking-widest font-bold text-accent"
                    style={{ fontSize: fontSizeDesignation }}
                  >
                    {activeTestimonial.designation}
                  </span>
                </div>

                {/* Client Title */}
                <h3
                  className="font-satoshi font-black tracking-tight text-white leading-tight text-center md:text-left w-full"
                  style={{ fontSize: fontSizeName }}
                >
                  {activeTestimonial.name}
                </h3>

                {/* Quote */}
                <p
                  className="font-general-sans leading-relaxed text-secondary text-sm sm:text-base pt-1 text-center md:text-left max-w-lg md:max-w-none mx-auto md:mx-0"
                  style={{ color: colorTestimony, fontSize: fontSizeQuote }}
                >
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls: Centered on Mobile (Stacked symmetrically), Side-by-side on Desktop */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 sm:gap-3.5 md:gap-4 mt-6 sm:mt-8 md:mt-6 pt-2 w-full md:w-auto">
            {/* Arrow Buttons (Centered on mobile) */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
                onClick={handlePrev}
                style={{
                  backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
                }}
                onMouseEnter={() => setHoverPrev(true)}
                onMouseLeave={() => setHoverPrev(false)}
                aria-label="Previous case study"
              >
                <ArrowLeft size={14} color={colorArrowFg} />
              </button>
              <button
                type="button"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
                onClick={handleNext}
                style={{
                  backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
                }}
                onMouseEnter={() => setHoverNext(true)}
                onMouseLeave={() => setHoverNext(false)}
                aria-label="Next case study"
              >
                <ArrowRight size={14} color={colorArrowFg} />
              </button>
            </div>

            {/* Visibility / Pagination Progress Loadbar (Centered below buttons on mobile) */}
            <div className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 shadow-inner">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActiveIndex(i);
                    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
                  }}
                  aria-label={`Go to case study ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    i === activeIndex
                      ? "w-6 bg-accent shadow-[0_0_8px_rgba(234,13,35,0.8)]"
                      : "w-1.5 bg-white/30 hover:bg-white/50"
                  )}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;
