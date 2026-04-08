'use client';

import React, { useEffect, useRef } from 'react';

import { useAuth } from '@/context/AuthContext';

export default function SplashAnimation() {
  const { guest, showSplash, setShowSplash } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showSplash) return;

    let dismissTimer: ReturnType<typeof setTimeout> | null = null;

    const run = async () => {
      const { createTimeline } = await import('animejs');

      if (!containerRef.current) return;

      // Set initial states via inline style — anime will animate from here
      [ring1Ref.current, ring2Ref.current, ring3Ref.current].forEach((ring) => {
        if (!ring) return;
        ring.style.opacity = '0';
        ring.style.transform = 'translate(-50%, -50%) scale(0.4)';
      });

      [kickerRef.current, titleRef.current, lineRef.current].forEach((el) => {
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
      });

      // Build timeline
      const tl = createTimeline({ autoplay: true, defaults: { ease: 'outExpo' } });

      if (ring1Ref.current) {
        tl.add(ring1Ref.current, { opacity: [0, 0.35], scale: [0.4, 1], duration: 900 }, 0);
      }
      if (ring2Ref.current) {
        tl.add(ring2Ref.current, { opacity: [0, 0.25], scale: [0.4, 1], duration: 1000 }, 120);
      }
      if (ring3Ref.current) {
        tl.add(ring3Ref.current, { opacity: [0, 0.15], scale: [0.4, 1], duration: 1100 }, 240);
      }
      if (kickerRef.current) {
        tl.add(
          kickerRef.current,
          { opacity: [0, 1], translateY: [24, 0], duration: 700, ease: 'outQuart' },
          200
        );
      }
      if (titleRef.current) {
        tl.add(
          titleRef.current,
          { opacity: [0, 1], translateY: [32, 0], duration: 800, ease: 'outQuart' },
          420
        );
      }
      if (lineRef.current) {
        tl.add(
          lineRef.current,
          { opacity: [0, 1], translateY: [16, 0], duration: 600, ease: 'outQuart' },
          780
        );
      }

      // Dismiss after 2800ms with fade-out
      dismissTimer = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = 'opacity 0.5s ease';
          containerRef.current.style.opacity = '0';
        }
        setTimeout(() => {
          setShowSplash(false);
        }, 500);
      }, 2800);
    };

    run();

    return () => {
      if (dismissTimer) clearTimeout(dismissTimer);
    };
  }, [showSplash, setShowSplash]);

  if (!showSplash) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: '#0A0A0D' }}
    >
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 38% 42%, rgba(212, 160, 160, 0.2), transparent 32%), radial-gradient(circle at 65% 60%, rgba(168, 197, 176, 0.14), transparent 28%)',
        }}
      />

      {/* Animated concentric rings */}
      <div
        ref={ring1Ref}
        className="pointer-events-none absolute rounded-full border"
        style={{
          width: '420px',
          height: '420px',
          borderColor: 'rgba(212, 160, 160, 0.22)',
          top: '50%',
          left: '50%',
          opacity: 0,
        }}
      />
      <div
        ref={ring2Ref}
        className="pointer-events-none absolute rounded-full border"
        style={{
          width: '640px',
          height: '640px',
          borderColor: 'rgba(201, 184, 212, 0.14)',
          top: '50%',
          left: '50%',
          opacity: 0,
        }}
      />
      <div
        ref={ring3Ref}
        className="pointer-events-none absolute rounded-full border"
        style={{
          width: '860px',
          height: '860px',
          borderColor: 'rgba(168, 197, 176, 0.08)',
          top: '50%',
          left: '50%',
          opacity: 0,
        }}
      />

      <div className="relative z-10 px-6 text-center">
        <p
          ref={kickerRef}
          style={{ opacity: 0 }}
          className="text-xs uppercase tracking-[0.32em] text-muted-light"
        >
          Welcome, {guest?.name || 'dear guest'}
        </p>

        <div ref={titleRef} style={{ opacity: 0 }} className="mt-6">
          <span className="block font-display text-4xl text-ivory-deep md:text-5xl lg:text-6xl">
            Liefde in
          </span>
          <span className="mt-3 block font-script text-5xl text-shimmer md:text-7xl lg:text-8xl">
            Swart en Wit
          </span>
        </div>

        <div ref={lineRef} style={{ opacity: 0 }} className="mx-auto mt-10" aria-hidden="true">
          <div
            style={{
              height: '1px',
              width: '200px',
              margin: '0 auto',
              background:
                'linear-gradient(90deg, transparent, rgba(212, 160, 160, 0.8), rgba(201, 184, 212, 0.6), transparent)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
