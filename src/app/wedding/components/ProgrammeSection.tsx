'use client';

import React from 'react';

import { useReveal } from '@/hooks/useReveal';

type ProgrammeEntry =
  | { separator: true; label: string }
  | { separator?: false; time: string; event: string; desc: string };

const programme: ProgrammeEntry[] = [
  { separator: true, label: 'Arrival' },
  {
    time: '15:30',
    event: 'Guests arrive',
    desc: 'Welcome drinks and greetings at Featherwood Farm.',
  },
  {
    time: '16:00',
    event: 'Ceremony begins',
    desc: 'Please be seated and settled before the processional.',
  },
  {
    time: '16:45',
    event: 'Confetti and group portrait',
    desc: 'One large photograph together before the evening opens up.',
  },
  { separator: true, label: 'Golden hour' },
  {
    time: '17:05',
    event: 'Canapés and family photos',
    desc: 'Drinks, snacks, and time to settle in while portraits are taken.',
  },
  {
    time: '17:30',
    event: 'Cake and couple portraits',
    desc: 'A little breathing room while we disappear for a moment.',
  },
  { separator: true, label: 'Reception' },
  {
    time: '19:00',
    event: 'Reception room opens',
    desc: 'Please take your seats as the evening begins.',
  },
  {
    time: '19:30',
    event: 'Entrance',
    desc: 'We enter together as husband and wife.',
  },
  {
    time: '20:00',
    event: 'Dinner and speeches',
    desc: 'Food, toasts, and the people who know us best.',
  },
  { separator: true, label: 'After dark' },
  {
    time: '21:00',
    event: 'Dance floor opens',
    desc: 'The formalities soften and the party begins.',
  },
  {
    time: 'Late',
    event: 'The night continues',
    desc: 'Stay, celebrate, and enjoy the evening with us.',
  },
];

export default function ProgrammeSection() {
  const sectionRef = useReveal();

  return (
    <section
      id="programme"
      ref={sectionRef}
      className="relative overflow-hidden section-bg-dark-alt px-6 py-24 md:px-12"
    >
      {/* Ambient accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 10% 60%, rgba(201,184,212,0.07) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.46fr_1.54fr] lg:gap-16">
          {/* Left */}
          <div className="reveal">
            <span className="section-kicker">Programme</span>
            <h2 className="mt-5 font-display text-5xl leading-[0.92] text-ivory-deep md:text-6xl lg:text-7xl">
              The rhythm
              <span className="mt-1 block italic text-shimmer">of the day</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-light md:text-xl">
              Enough structure to know where the day is going, while leaving room for the feeling of
              it.
            </p>

            {/* Decorative bar */}
            <div
              className="mt-10 h-20 w-px"
              style={{
                background: 'linear-gradient(to bottom, rgba(212,160,160,0.6), transparent)',
              }}
            />
          </div>

          {/* Right — timeline */}
          <div className="reveal reveal-delay-1">
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {programme.map((entry, index) => {
                if ('separator' in entry && entry.separator) {
                  return (
                    <div
                      key={`${entry.label}-${index}`}
                      className="py-4"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <p className="text-[0.7rem] uppercase tracking-[0.24em] text-bloom">
                        {entry.label}
                      </p>
                    </div>
                  );
                }

                return (
                  <div
                    key={`${entry.time}-${entry.event}`}
                    className="group grid gap-4 py-6 transition-all duration-300 hover:pl-2 md:grid-cols-[96px_1fr]"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <p
                      className="font-display text-3xl leading-none tabular-nums text-ivory-deep transition-colors duration-300 group-hover:text-bloom"
                      style={{ opacity: 0.9 }}
                    >
                      {entry.time}
                    </p>
                    <div>
                      <h3 className="font-display text-2xl text-ivory-deep md:text-3xl">
                        {entry.event}
                      </h3>
                      <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-light">
                        {entry.desc}
                      </p>
                    </div>
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
