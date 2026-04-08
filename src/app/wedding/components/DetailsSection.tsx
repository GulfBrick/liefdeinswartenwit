'use client';

import React from 'react';

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

export default function DetailsSection() {
  const sectionRef = useReveal();

  return (
    <section
      id="details"
      ref={sectionRef}
      className="relative overflow-hidden section-bg-dark px-6 py-24 md:px-12"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.58fr_1.42fr] lg:gap-16">
          <div className="reveal">
            <span className="section-kicker">The invitation</span>
            <TextReveal
              as="h2"
              delay={100}
              className="mt-5 text-5xl font-display leading-[0.92] text-ivory-deep md:text-6xl lg:text-7xl"
            >
              The place, the time, and the shape of the evening
            </TextReveal>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-light md:text-xl">
              Saturday afternoon at Featherwood Farm, followed by dinner, speeches, and dancing into
              the night.
            </p>
          </div>

          <div className="editorial-card p-8 md:p-10 lg:p-12 reveal reveal-delay-1">
            <div className="grid gap-10 lg:grid-cols-3">
              <div
                className="p-6 -m-2 rounded-sm"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(201,123,134,0.10) 0%, transparent 100%)',
                }}
              >
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#D4A0A0]">
                  Ceremony
                </p>
                <h3 className="mt-4 text-3xl font-display text-ink md:text-4xl">The invitation</h3>
                <ul className="mt-6 space-y-3">
                  {ceremonyLines.map((line) => (
                    <li key={line} className="text-lg leading-relaxed text-[#4A4040]">
                      {line}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://maps.google.com/?q=Featherwood+Farm+44+Nooitgedacht+Rd+Rayton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] text-[#4A4040] transition-colors hover:text-black"
                >
                  <span className="h-px w-8 bg-black/20" />
                  Open maps
                </a>
              </div>

              <div
                className="p-6 -m-2 rounded-sm"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(113,142,132,0.07) 0%, transparent 100%)',
                }}
              >
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#D4A0A0]">
                  Celebration
                </p>
                <h3 className="mt-4 text-3xl font-display text-ink md:text-4xl">The evening</h3>
                <ul className="mt-6 space-y-3">
                  {celebrationLines.map((line) => (
                    <li key={line} className="text-lg leading-relaxed text-[#4A4040]">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="p-6 -m-2 rounded-sm"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(201,184,212,0.07) 0%, transparent 100%)',
                }}
              >
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#D4A0A0]">Dress</p>
                <h3 className="mt-4 text-3xl font-display text-ink md:text-4xl">
                  Colourful Semi-Formal
                </h3>
                <ul className="mt-6 space-y-3">
                  {dressLines.map((line) => (
                    <li key={line} className="text-lg leading-relaxed text-[#4A4040]">
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-black/10 pt-6">
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#C9B8D4]">
                    A gentle note
                  </p>
                  <p className="mt-3 text-lg leading-relaxed text-[#4A4040]">
                    Your presence is more than enough. If you would still like to give something, a
                    contribution toward our honeymoon would be deeply appreciated.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
