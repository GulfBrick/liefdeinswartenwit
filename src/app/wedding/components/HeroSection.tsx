'use client';

import React, { useEffect, useRef, useState } from 'react';

import AppImage from '@/components/ui/AppImage';
import { useAuth } from '@/context/AuthContext';

const invitationMeta = [
  { label: 'Venue', value: 'Featherwood Farm, Rayton' },
  { label: 'Ceremony', value: '15:30 for 16:00' },
  { label: 'Dress', value: 'Colourful Semi-Formal' },
  { label: 'RSVP', value: '14 August 2026' },
];

const bokehDots = [
  {
    size: 6,
    left: '12%',
    top: '22%',
    delay: '0s',
    duration: '7s',
    color: 'rgba(212,160,160,0.55)',
  },
  {
    size: 4,
    left: '28%',
    top: '68%',
    delay: '1.4s',
    duration: '9s',
    color: 'rgba(201,184,212,0.45)',
  },
  {
    size: 8,
    left: '72%',
    top: '18%',
    delay: '0.6s',
    duration: '11s',
    color: 'rgba(168,197,176,0.4)',
  },
  {
    size: 5,
    left: '85%',
    top: '54%',
    delay: '2.1s',
    duration: '8s',
    color: 'rgba(212,160,160,0.35)',
  },
  {
    size: 3,
    left: '55%',
    top: '80%',
    delay: '0.9s',
    duration: '10s',
    color: 'rgba(201,184,212,0.5)',
  },
  {
    size: 7,
    left: '40%',
    top: '12%',
    delay: '1.8s',
    duration: '6.5s',
    color: 'rgba(168,197,176,0.38)',
  },
  {
    size: 4,
    left: '92%',
    top: '30%',
    delay: '3s',
    duration: '8.5s',
    color: 'rgba(212,160,160,0.42)',
  },
  {
    size: 6,
    left: '6%',
    top: '75%',
    delay: '2.4s',
    duration: '9.5s',
    color: 'rgba(212,160,160,0.3)',
  },
];

export default function HeroSection() {
  const { guest } = useAuth();
  const [bokehVisible, setBokehVisible] = useState(false);

  // Refs for cinematic timeline
  const bgRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const nikitaRef = useRef<HTMLSpanElement>(null);
  const ampRef = useRef<HTMLSpanElement>(null);
  const danielRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      // Instantly show everything
      [
        bgRef,
        kickerRef,
        nikitaRef,
        ampRef,
        danielRef,
        taglineRef,
        descRef,
        cardRef,
        ctaRef,
      ].forEach((r) => {
        if (r.current) {
          r.current.style.opacity = '1';
          r.current.style.transform = 'none';
        }
      });
      setBokehVisible(true);
      return;
    }

    // Set initial hidden states
    const hiddenEls = [
      bgRef.current,
      kickerRef.current,
      nikitaRef.current,
      ampRef.current,
      danielRef.current,
      taglineRef.current,
      descRef.current,
      cardRef.current,
      ctaRef.current,
    ];

    hiddenEls.forEach((el) => {
      if (!el) return;
      el.style.opacity = '0';
    });

    if (nikitaRef.current) {
      nikitaRef.current.style.transform = 'translateY(40px) scale(0.92)';
    }
    if (danielRef.current) {
      danielRef.current.style.transform = 'translateY(40px) scale(0.92)';
    }
    if (ampRef.current) {
      ampRef.current.style.transform = 'scale(0.6)';
    }
    if (kickerRef.current) {
      kickerRef.current.style.transform = 'translateX(-32px)';
    }
    if (cardRef.current) {
      cardRef.current.style.transform = 'translateY(56px)';
    }
    if (ctaRef.current) {
      ctaRef.current.style.transform = 'translateY(24px)';
    }
    if (taglineRef.current) {
      taglineRef.current.style.transform = 'translateY(20px)';
    }
    if (descRef.current) {
      descRef.current.style.transform = 'translateY(16px)';
    }

    const run = async () => {
      const { createTimeline } = await import('animejs');

      const tl = createTimeline({
        autoplay: true,
        defaults: { ease: 'outExpo' },
      });

      // 1. Background fades in
      if (bgRef.current) {
        tl.add(bgRef.current, { opacity: [0, 1], duration: 1200 }, 0);
      }

      // 2. Kicker slides in from left
      if (kickerRef.current) {
        tl.add(kickerRef.current, { opacity: [0, 1], translateX: [-32, 0], duration: 700 }, 200);
      }

      // 3. "Nikita" scales and fades in
      if (nikitaRef.current) {
        tl.add(
          nikitaRef.current,
          {
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.92, 1],
            duration: 900,
          },
          450
        );
      }

      // 4. "&" fades in between names
      if (ampRef.current) {
        tl.add(
          ampRef.current,
          {
            opacity: [0, 1],
            scale: [0.6, 1],
            duration: 600,
          },
          800
        );
      }

      // 5. "Daniel" scales and fades in, staggered after Nikita
      if (danielRef.current) {
        tl.add(
          danielRef.current,
          {
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.92, 1],
            duration: 900,
          },
          650
        );
      }

      // 6. Tagline reveals
      if (taglineRef.current) {
        tl.add(taglineRef.current, { opacity: [0, 1], translateY: [20, 0], duration: 700 }, 1050);
      }

      // 7. Description paragraph
      if (descRef.current) {
        tl.add(descRef.current, { opacity: [0, 1], translateY: [16, 0], duration: 600 }, 1200);
      }

      // 8. CTA buttons fade in last
      if (ctaRef.current) {
        tl.add(ctaRef.current, { opacity: [0, 1], translateY: [24, 0], duration: 700 }, 1350);
      }

      // 9. Invitation card slides up from bottom
      if (cardRef.current) {
        tl.add(
          cardRef.current,
          { opacity: [0, 1], translateY: [56, 0], duration: 1000, ease: 'outExpo' },
          600
        );
      }

      // 10. After everything settles, start bokeh
      setTimeout(() => setBokehVisible(true), 1800);
    };

    // Small delay to let splash finish
    const timer = setTimeout(run, 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden section-bg-dark"
    >
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0" style={{ opacity: 0 }}>
        <AppImage
          src="/assets/images/wedding/DSC08489.jpg"
          alt="Nikita and Daniel at sunset"
          className="h-full w-full object-cover"
          fill
          priority
          quality={84}
          sizes="100vw"
        />
        {/* Directional gradient — heavier on the left for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(8,8,11,0.97) 0%, rgba(8,8,11,0.88) 38%, rgba(8,8,11,0.48) 70%, rgba(8,8,11,0.22) 100%)',
          }}
        />
        {/* Pastel rose overlay to tint the image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 20% 30%, rgba(212,160,160,0.22) 0%, transparent 52%), radial-gradient(ellipse at 78% 18%, rgba(168,197,176,0.14) 0%, transparent 38%)',
          }}
        />
        {/* Bottom fade to section */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0a0a0d] to-transparent" />
      </div>

      {/* Bokeh particles — only rendered once animation settles */}
      {bokehVisible &&
        bokehDots.map((dot, i) => (
          <div
            key={i}
            className="bokeh"
            style={{
              width: dot.size,
              height: dot.size,
              left: dot.left,
              top: dot.top,
              animationDelay: dot.delay,
              animationDuration: dot.duration,
              background: dot.color,
              boxShadow: `0 0 ${dot.size * 3}px ${dot.color}`,
              filter: `blur(${dot.size * 0.5}px)`,
            }}
          />
        ))}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 md:pb-28 md:pt-44">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left — headline */}
          <div>
            {guest && (
              <div ref={kickerRef} style={{ opacity: 0 }}>
                <span
                  className="mb-8 inline-flex items-center rounded-sm px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-ivory-deep"
                  style={{
                    background: 'rgba(212,160,160,0.08)',
                    border: '1px solid rgba(212,160,160,0.2)',
                  }}
                >
                  For {guest.name}
                </span>
              </div>
            )}

            {!guest && (
              <div ref={kickerRef} style={{ opacity: 0 }}>
                <div className="flex flex-wrap items-center gap-4 text-[0.72rem] uppercase tracking-[0.2em] text-muted-light">
                  <span className="section-kicker">Private invitation</span>
                  <span className="h-px w-14 bg-white/10" />
                  <span>3 October 2026 · Rayton</span>
                </div>
              </div>
            )}

            {guest && (
              <div className="mb-4 flex flex-wrap items-center gap-4 text-[0.72rem] uppercase tracking-[0.2em] text-muted-light">
                <span className="section-kicker">Private invitation</span>
                <span className="h-px w-14 bg-white/10" />
                <span>3 October 2026 · Rayton</span>
              </div>
            )}

            <h1 className="mt-7 font-display leading-[0.84] text-ivory-deep glow-heading">
              <span
                ref={nikitaRef}
                className="block text-6xl md:text-7xl lg:text-[7.5rem]"
                style={{ opacity: 0 }}
              >
                Nikita
              </span>
              <span
                ref={ampRef}
                className="my-4 block font-script text-5xl text-shimmer md:text-6xl"
                style={{ opacity: 0 }}
              >
                &amp;
              </span>
              <span
                ref={danielRef}
                className="block text-6xl md:text-7xl lg:text-[7.5rem]"
                style={{ opacity: 0 }}
              >
                Daniel
              </span>
            </h1>

            <p
              ref={taglineRef}
              className="mt-8 max-w-2xl font-display text-2xl leading-tight text-ivory-deep/90 md:text-3xl"
              style={{ opacity: 0 }}
            >
              Swart gave the frame. She brought the colour.
            </p>

            <p
              ref={descRef}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-light md:text-xl"
              style={{ opacity: 0 }}
            >
              Join us for a ceremony at Featherwood Farm, dinner at one long table, and dancing well
              into the evening.
            </p>

            <div
              ref={ctaRef}
              className="mt-10 flex flex-wrap items-center gap-6"
              style={{ opacity: 0 }}
            >
              <a
                href="#rsvp"
                className="btn-glow inline-flex items-center justify-center rounded-sm px-8 py-4 text-[0.72rem] uppercase tracking-[0.18em] text-ivory-deep"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(212,160,160,0.9) 0%, rgba(180,120,128,0.95) 100%)',
                  boxShadow: '0 12px 36px rgba(212,160,160,0.3)',
                }}
              >
                Reply to invitation
              </a>
              <a
                href="#details"
                className="inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] text-ivory-deep transition-colors duration-200 hover:text-bloom"
              >
                <span className="h-px w-10 bg-white/20" />
                See details
              </a>
            </div>
          </div>

          {/* Right — glassmorphism invitation card */}
          <div ref={cardRef} style={{ opacity: 0 }}>
            <div className="max-w-[28rem] lg:ml-auto">
              {/* Main invitation card — glassmorphism */}
              <div
                className="glass-panel p-8 md:p-10"
                style={{
                  background: 'rgba(10,8,12,0.58)',
                  borderColor: 'rgba(212,160,160,0.18)',
                }}
              >
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-bloom">
                  Invitation details
                </p>
                <h2 className="mt-5 font-display text-3xl leading-[0.94] text-ivory-deep md:text-[2.6rem]">
                  Saturday, <span className="text-shimmer">3 October</span> 2026
                </h2>

                <div
                  className="mt-8 border-t pt-6"
                  style={{ borderColor: 'rgba(212,160,160,0.15)' }}
                >
                  <div className="space-y-5">
                    {invitationMeta.map((item) => (
                      <div key={item.label} className="flex items-start justify-between gap-6">
                        <p className="text-[0.72rem] uppercase tracking-[0.16em] text-bloom">
                          {item.label}
                        </p>
                        <p className="max-w-[15rem] text-right font-display text-xl leading-snug text-ivory-deep">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <p
                  className="mt-8 border-t pt-5 text-[0.74rem] uppercase tracking-[0.18em] text-muted-light"
                  style={{ borderColor: 'rgba(212,160,160,0.12)' }}
                >
                  Adults-only celebration · Dinner and dancing to follow
                </p>
              </div>

              {/* Dress note card */}
              <div
                className="editorial-outline ml-auto mt-4 max-w-[20rem] p-5"
                style={{
                  borderColor: 'rgba(201,184,212,0.2)',
                  background: 'rgba(15,13,20,0.7)',
                }}
              >
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-coral">A dress note</p>
                <p className="mt-2 font-display text-2xl text-ivory-deep">Colourful Semi-Formal</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-light">
                  Think rich colour, elegant tailoring, and a little warmth for the evening.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
