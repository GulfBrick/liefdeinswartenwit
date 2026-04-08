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
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.5fr_1.5fr] lg:gap-16">
          <div className="reveal">
            <span className="section-kicker">Programme</span>
            <h2 className="mt-5 text-5xl font-display leading-[0.92] text-ivory-deep md:text-6xl lg:text-7xl">
              The rhythm
              <span className="block italic text-shimmer">of the day</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-light md:text-xl">
              Enough structure to know where the day is going, while leaving room for the feeling of
              it.
            </p>
          </div>

          <div className="reveal reveal-delay-1">
            <div className="border-t border-white/10">
              {programme.map((entry, index) => {
                if ('separator' in entry && entry.separator) {
                  return (
                    <div key={`${entry.label}-${index}`} className="border-b border-white/10 py-4">
                      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[#D4A0A0]">
                        {entry.label}
                      </p>
                    </div>
                  );
                }

                return (
                  <div
                    key={`${entry.time}-${entry.event}`}
                    className="grid gap-4 border-b border-white/10 py-6 md:grid-cols-[96px_1fr]"
                  >
                    <p className="text-3xl font-display leading-none text-ivory-deep tabular-nums">
                      {entry.time}
                    </p>
                    <div>
                      <h3 className="text-2xl font-display text-ivory-deep md:text-3xl">
                        {entry.event}
                      </h3>
                      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-light">
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
