'use client';

import React, { useEffect, useState } from 'react';

import TextReveal from '@/components/effects/TextReveal';
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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden section-bg-dark"
    >
      {/* Background image */}
      <div className="absolute inset-0">
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

      {/* Bokeh particles */}
      {bokehDots.map((dot, i) => (
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
          <div
            className={`transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            {guest && (
              <span
                className="mb-8 inline-flex items-center rounded-sm px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-ivory-deep"
                style={{
                  background: 'rgba(212,160,160,0.08)',
                  border: '1px solid rgba(212,160,160,0.2)',
                }}
              >
                For {guest.name}
              </span>
            )}

            <div className="flex flex-wrap items-center gap-4 text-[0.72rem] uppercase tracking-[0.2em] text-muted-light">
              <span className="section-kicker">Private invitation</span>
              <span className="h-px w-14 bg-white/10" />
              <span>3 October 2026 · Rayton</span>
            </div>

            <h1 className="mt-7 font-display leading-[0.84] text-ivory-deep glow-heading">
              <span className="block text-6xl md:text-7xl lg:text-[7.5rem]">Nikita</span>
              <span className="my-4 block font-script text-5xl text-shimmer md:text-6xl">
                &amp;
              </span>
              <span className="block text-6xl md:text-7xl lg:text-[7.5rem]">Daniel</span>
            </h1>

            <TextReveal
              as="p"
              delay={120}
              className="mt-8 max-w-2xl font-display text-2xl leading-tight text-ivory-deep/90 md:text-3xl"
            >
              Swart gave the frame. She brought the colour.
            </TextReveal>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-light md:text-xl">
              Join us for a ceremony at Featherwood Farm, dinner at one long table, and dancing well
              into the evening.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
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
          <div
            className={`transition-all duration-1000 delay-200 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
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
