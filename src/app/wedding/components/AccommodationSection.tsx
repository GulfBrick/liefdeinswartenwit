'use client';

import React, { useEffect, useRef } from 'react';

import { useReveal } from '@/hooks/useReveal';

interface AccommodationOption {
  name: string;
  description: string;
  features: string[];
  priceSharing: string;
  priceSingle: string;
  roomCount: number;
  mood: string;
  accent: string;
}

const accommodations: AccommodationOption[] = [
  {
    name: 'Unit Type A',
    description: 'En-suite rooms close to the heart of the celebration.',
    features: ['Two guests per room', 'En-suite bathroom', 'Close to the boma and after-party'],
    priceSharing: 'R600 pp',
    priceSingle: 'R900 single',
    roomCount: 6,
    mood: 'Close to the celebration',
    accent: '#D4A0A0',
  },
  {
    name: 'Unit Type B',
    description: 'A comfortable on-site option with easy access to everything.',
    features: ['Two guests per room', 'En-suite bathroom', 'On-site at Featherwood Farm'],
    priceSharing: 'R500 pp',
    priceSingle: 'R800 single',
    roomCount: 4,
    mood: 'Best value',
    accent: '#A8C5B0',
  },
  {
    name: 'Guest House',
    description: 'The lively house for groups who want to stay close to the energy.',
    features: ['Sleeps up to 10 guests', 'Shared bathrooms', 'Whole house option available'],
    priceSharing: 'R600 pp',
    priceSingle: 'R5500 whole house',
    roomCount: 4,
    mood: 'Best for groups',
    accent: '#C9B8D4',
  },
  {
    name: 'Nyala Lodge',
    description: 'A quieter, more private retreat once the evening slows down.',
    features: ['Seven rooms', 'Quiet location on the property', 'Ideal for an early night'],
    priceSharing: 'R650 pp',
    priceSingle: 'R900 single',
    roomCount: 7,
    mood: 'Peaceful retreat',
    accent: '#A8C5B0',
  },
];

export default function AccommodationSection() {
  const sectionRef = useReveal();
  const tableRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rows = Array.from(table.querySelectorAll<HTMLElement>('[data-accom-row]'));

    if (reduced) {
      rows.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    rows.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(48px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            observer.disconnect();

            const run = async () => {
              const { animate } = await import('animejs');

              animate(rows, {
                opacity: [0, 1],
                translateY: [48, 0],
                duration: 800,
                ease: 'outExpo',
                delay: (_, i) => i * 120,
              });
            };

            run();
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(table);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="accommodation"
      ref={sectionRef}
      className="relative overflow-hidden section-bg-dark px-6 py-20 md:px-12"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 90% 30%, rgba(168,197,176,0.07) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="reveal">
          <span className="section-kicker">If you are staying over</span>
          <h2 className="mt-5 font-display text-4xl leading-[0.94] text-ivory-deep md:text-5xl">
            Staying on the property
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-light md:text-xl">
            If you would like a room, tell us in your RSVP. We will confirm availability once
            replies are in.
          </p>
        </div>

        <div
          ref={tableRef}
          className="mt-10 overflow-hidden rounded-sm reveal reveal-delay-1"
          style={{
            background: 'rgba(17,17,22,0.72)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {accommodations.map((option, index) => (
            <div
              key={option.name}
              data-accom-row
              className="group grid gap-6 px-6 py-7 transition-all duration-400 hover:bg-white/[0.025] md:grid-cols-[1.1fr_0.9fr] md:px-8"
              style={{
                borderTop: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div>
                <p
                  className="text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-300"
                  style={{ color: option.accent }}
                >
                  {option.mood}
                </p>
                <h3 className="mt-3 font-display text-3xl text-ivory-deep transition-colors duration-300 group-hover:text-ivory-deep">
                  {option.name}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-light">
                  {option.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                  {option.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm leading-relaxed tracking-[0.02em] text-muted-light"
                    >
                      · {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                <div>
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.18em]"
                    style={{ color: option.accent }}
                  >
                    Sharing
                  </p>
                  <p className="mt-2 font-display text-2xl text-ivory-deep">
                    {option.priceSharing}
                  </p>
                </div>
                <div>
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.18em]"
                    style={{ color: option.accent }}
                  >
                    Single
                  </p>
                  <p className="mt-2 font-display text-2xl text-ivory-deep">{option.priceSingle}</p>
                </div>
                <div>
                  <p
                    className="text-[0.68rem] uppercase tracking-[0.18em]"
                    style={{ color: option.accent }}
                  >
                    Rooms
                  </p>
                  <p className="mt-2 font-display text-2xl text-ivory-deep">{option.roomCount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
