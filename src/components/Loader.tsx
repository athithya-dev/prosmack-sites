'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ChevronRight } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasCompletedRef = useRef(false);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    if (video) {
      tl.to(video, {
        opacity: 0,
        scale: 0.98,
        duration: 0.45,
        ease: 'power2.inOut',
      });
    }

    tl.to(
      container,
      {
        yPercent: -100,
        duration: 0.85,
        ease: 'power4.inOut',
      },
      video ? '-=0.2' : 0
    );
  }, [onComplete]);

  // Handle video playback, metadata loading, and safe fallback timeouts
  useEffect(() => {
    // Generous fallback only in case network completely freezes (20s)
    safetyTimerRef.current = setTimeout(() => {
      handleComplete();
    }, 20000);

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser strictly blocks un-gestured autoplay, transition after short grace period
          if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
          safetyTimerRef.current = setTimeout(() => {
            handleComplete();
          }, 2500);
        });
      }
    }

    return () => {
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
      }
    };
  }, [handleComplete]);

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const duration = e.currentTarget.duration;
    if (duration && !isNaN(duration) && duration > 0) {
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      // Give full duration + 1.5s grace before safety fallback
      safetyTimerRef.current = setTimeout(() => {
        handleComplete();
      }, (duration + 1.5) * 1000);
    }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration && video.currentTime >= video.duration - 0.05) {
      handleComplete();
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleComplete}
      className="fixed inset-0 bg-[#050505] z-[99999] flex justify-center items-center select-none overflow-hidden cursor-pointer"
      title="Click or tap anywhere to skip"
    >
      {/* Edge-to-edge adaptive video player */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleComplete}
        onError={handleComplete}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src={getAssetPath("/mob-loader.mp4")} media="(max-width: 767px)" type="video/mp4" />
        <source src={getAssetPath("/preloader.mp4")} media="(min-width: 768px)" type="video/mp4" />
        <source src={getAssetPath("/preloader.mp4")} type="video/mp4" />
      </video>


      {/* Prominent Touch-Friendly Skip Button */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30 pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleComplete();
          }}
          className="flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 rounded-full bg-black/85 hover:bg-[#ea0d23] text-white border border-white/30 hover:border-[#ea0d23] shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none"
          aria-label="Skip Intro Video"
        >
          <span className="text-xs sm:text-xs font-mono font-bold tracking-widest uppercase leading-none">
            Skip Intro
          </span>
          <ChevronRight className="w-4 h-4 shrink-0 text-white" />
        </button>
      </div>

      {/* Mobile Tap hint */}
      <div className="absolute bottom-7 left-6 z-20 pointer-events-none text-white/50 text-[11px] font-mono sm:hidden">
        Tap anywhere to enter
      </div>
    </div>
  );
}
