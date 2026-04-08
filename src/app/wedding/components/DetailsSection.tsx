'use client';

import React, { useEffect, useRef } from 'react';

import TextReveal from '@/components/effects/TextReveal';
import { useReveal } from '@/hooks/useReveal';

const ceremonyLines = [
  'Saturday, 3 October 2026',
  '15:30 for 16:00',
  'Featherwood Farm, Rayton',
  '44 Nooitgedacht Road',
];

const celebrationLines = [
  'Adults-only celebration',
  'Dinner and dancing',
  'Cash bar available on site',
  'A long table of family and friends',
];

const dressLines = [
  'Colourful Semi-Formal',
  'Please avoid white, cream, black, and grey',
  'No denim please',
  'Bring warmth for the evening air',
];

const columns = [
  {
    kicker: 'Ceremony',
    title: 'The invitation',
    lines: ceremonyLines,
    accent: '#D4A0A0',
    tint: 'rgba(212,160,160,0.09)',
    border: 'rgba(212,160,160,0.18)',
    glowColor: 'rgba(212,160,160,0.18)',
    cta: {
      href: 'https://maps.google.com/?q=Featherwood+Farm+44+Nooitgedacht+Rd+Rayton',
      label: 'Open maps',
    },
  },
  {
    kicker: 'Celebration',
    title: 'The evening',
    lines: celebrationLines,
    accent: '#A8C5B0',
    tint: 'rgba(168,197,176,0.08)',
    border: 'rgba(168,197,176,0.16)',
    glowColor: 'rgba(168,197,176,0.16)',
    cta: null,
  },
  {
    kicker: 'Dress',
    title: 'Colourful Semi-Formal',
    lines: dressLines,
    accent: '#C9B8D4',
    tint: 'rgba(201,184,212,0.08)',
    border: 'rgba(201,184,212,0.16)',
    glowColor: 'rgba(201,184,212,0.18)',
    cta: null,
    note: {
      label: 'A gentle note',
      text: 'Your presence is more than enough. If you would still like to give something, a contribution toward our honeymoon would be deeply appreciated.',
    },
  },
];

export default function DetailsSection() {
  const sectionRef = useReveal();
  const col0Ref = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const colRefs = [col0Ref.current, col1Ref.current, col2Ref.current];

    if (reduced) {
      colRefs.forEach((el) => {
        if (el) el.style.opacity = '1';
      });
      return;
    }

    // Set initial hidden state
    colRefs.forEach((el) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(72px) scale(0.96)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            observer.disconnect();

            const run = async () => {
              const { animate } = await import('animejs');

              colRefs.forEach((el, i) => {
                if (!el) return;
                animate(el, {
                  opacity: [0, 1],
                  translateY: [72, 0],
                  scale: [0.96, 1],
                  duration: 900,
                  ease: 'outExpo',
                  delay: i * 200,
                });
              });

              // Stagger list items inside each column after cards land
              colRefs.forEach((el, colIndex) => {
                if (!el) return;
                const items = Array.from(el.querySelectorAll<HTMLElement>('li'));
                if (items.length === 0) return;
                items.forEach((item) => {
                  item.style.opacity = '0';
                  item.style.transform = 'translateY(12px)';
                });
                animate(items, {
                  opacity: [0, 1],
                  translateY: [12, 0],
                  duration: 500,
                  ease: 'outQuart',
                  delay: (_, i) => colIndex * 200 + 600 + i * 80,
                });
              });

              // Brief glow pulse on each card after it lands
              colRefs.forEach((el, i) => {
                if (!el) return;
                setTimeout(
                  () => {
                    el.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
                    const col = columns[i];
                    el.style.boxShadow = `0 0 48px ${col.glowColor}, 0 0 96px ${col.glowColor.replace('0.18', '0.08')}`;
                    el.style.borderColor = col.accent + '55';
                    setTimeout(() => {
                      el.style.boxShadow = '';
                      el.style.borderColor = '';
                    }, 800);
                  },
                  800 + i * 200
                );
              });
            };

            run();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="details"
      ref={sectionRef}
      className="relative overflow-hidden section-bg-dark px-6 py-24 md:px-12"
    >
      {/* Subtle background accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 80% 50%, rgba(212,160,160,0.06) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.52fr_1.48fr] lg:gap-16">
          {/* Left — heading */}
          <div className="reveal">
            <span className="section-kicker">The invitation</span>
            <TextReveal
              as="h2"
              delay={100}
              className="mt-5 font-display text-4xl leading-[0.92] text-ivory-deep sm:text-5xl md:text-6xl lg:text-7xl"
            >
              The place, the time, and the shape of the evening
            </TextReveal>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-light md:text-xl">
              Saturday afternoon at Featherwood Farm, followed by dinner, speeches, and dancing into
              the night.
            </p>

            {/* Decorative line */}
            <div
              className="mt-10 h-px w-24"
              style={{
                background: 'linear-gradient(90deg, rgba(212,160,160,0.7), transparent)',
              }}
            />
          </div>

          {/* Right — three detail cards */}
          <div ref={containerRef} className="reveal reveal-delay-1">
            <div className="grid gap-5 lg:grid-cols-3">
              {columns.map((col, index) => {
                const colRef = [col0Ref, col1Ref, col2Ref][index];
                return (
                  <div
                    key={col.kicker}
                    ref={colRef}
                    className="group relative overflow-hidden rounded-sm p-6 card-lift"
                    style={{
                      background: `linear-gradient(160deg, ${col.tint} 0%, rgba(17,15,22,0.6) 100%)`,
                      border: `1px solid ${col.border}`,
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    {/* Top glow on hover */}
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${col.accent}, transparent)`,
                      }}
                    />

                    <p
                      className="text-[0.72rem] uppercase tracking-[0.18em]"
                      style={{ color: col.accent }}
                    >
                      {col.kicker}
                    </p>
                    <h3 className="mt-4 font-display text-2xl text-ivory-deep md:text-3xl">
                      {col.title}
                    </h3>
                    <ul className="mt-5 space-y-2.5">
                      {col.lines.map((line) => (
                        <li key={line} className="text-base leading-relaxed text-muted-light">
                          {line}
                        </li>
                      ))}
                    </ul>

                    {col.cta && (
                      <a
                        href={col.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 min-h-[44px] inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] text-muted-light transition-colors hover:text-ivory-deep"
                      >
                        <span
                          className="h-px w-8"
                          style={{ background: col.accent, opacity: 0.6 }}
                        />
                        {col.cta.label}
                      </a>
                    )}

                    {col.note && (
                      <div className="mt-8 border-t pt-5" style={{ borderColor: `${col.border}` }}>
                        <p
                          className="text-[0.72rem] uppercase tracking-[0.18em]"
                          style={{ color: col.accent }}
                        >
                          {col.note.label}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-light">
                          {col.note.text}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
