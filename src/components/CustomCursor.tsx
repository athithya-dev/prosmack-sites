'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(hover: none)').matches);
    };
    checkTouch();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0.1, opacity: 0 });
    gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 1, opacity: 0 });

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });
    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        setIsVisible(true);
        gsap.to([cursor, dot], { opacity: 1, duration: 0.2 });
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);
    };

    const onMouseLeaveWindow = () => {
      setIsVisible(false);
      gsap.to([cursor, dot], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeaveWindow);

    // Custom Hover Behaviors
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"], .interactive, .magnetic');
      const textHover = target.closest('[data-cursor="text"]');
      const accentHover = target.closest('[data-cursor="accent"]');

      if (interactive) {
        gsap.to(cursor, {
          width: 55,
          height: 55,
          backgroundColor: 'rgba(234, 13, 35, 0.12)',
          borderColor: 'var(--accent)',
          borderWidth: 2,
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.15 });
      } else if (textHover) {
        gsap.to(cursor, {
          width: 80,
          height: 80,
          backgroundColor: '#ffffff',
          borderColor: 'transparent',
          borderWidth: 0,
          mixBlendMode: 'difference',
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.15 });
      } else if (accentHover) {
        gsap.to(cursor, {
          width: 60,
          height: 60,
          backgroundColor: 'var(--accent)',
          borderColor: 'transparent',
          borderWidth: 0,
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.15 });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"], .interactive, .magnetic');
      const textHover = target.closest('[data-cursor="text"]');
      const accentHover = target.closest('[data-cursor="accent"]');

      if (!interactive && !textHover && !accentHover) {
        gsap.to(cursor, {
          width: 28,
          height: 28,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.4)',
          borderWidth: 1,
          mixBlendMode: 'normal',
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-7 h-7 border border-white/40 rounded-full pointer-events-none z-[99999] opacity-0"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[99999] opacity-0"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
