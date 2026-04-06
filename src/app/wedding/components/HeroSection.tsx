'use client';

import React, { useEffect, useState } from 'react';

import TextReveal from '@/components/effects/TextReveal';
import AppImage from '@/components/ui/AppImage';
import { useAuth } from '@/context/AuthContext';

const invitationMeta = [
  { label: 'Venue', value: 'Featherwood Farm, Rayton' },
  { label: 'Ceremony', value: '15:30 for 16:00' },
  { label: 'Dress', value: 'Colourful formal' },
  { label: 'RSVP', value: '14 August 2026' },
];

export default function HeroSection() {
  const { guest } = useAuth();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden section-bg-dark"
    >
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
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(8, 8, 11, 0.98) 0%, rgba(8, 8, 11, 0.86) 42%, rgba(8, 8, 11, 0.42) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 18% 28%, rgba(201, 123, 134, 0.18), transparent 24%), radial-gradient(circle at 80% 22%, rgba(183, 146, 81, 0.12), transparent 18%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#08080b] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 md:pb-24 md:pt-40">
        <div className="grid items-end gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div
            className={`transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            {guest && (
              <span
                className="mb-8 inline-flex items-center rounded-full px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-ivory-deep"
                style={{
                  background: 'rgba(245, 239, 231, 0.05)',
                  border: '1px solid rgba(245, 239, 231, 0.1)',
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

            <h1 className="mt-7 font-display leading-[0.82] text-ivory-deep glow-heading">
              <span className="block text-6xl md:text-7xl lg:text-[7rem]">Nikita</span>
              <span className="my-4 block font-script text-5xl text-shimmer md:text-6xl">
                &amp;
              </span>
              <span className="block text-6xl md:text-7xl lg:text-[7rem]">Daniel</span>
            </h1>

            <TextReveal
              as="p"
              delay={120}
              className="mt-8 max-w-2xl text-2xl font-display leading-tight text-ivory-deep/92 md:text-3xl"
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
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-[0.72rem] uppercase tracking-[0.18em] text-ivory-deep transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(23, 20, 23, 0.96), rgba(201, 123, 134, 0.88))',
                  boxShadow: '0 18px 40px rgba(0, 0, 0, 0.22)',
                }}
              >
                Reply to invitation
              </a>
              <a
                href="#details"
                className="inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] text-ivory-deep transition-colors duration-200 hover:text-white"
              >
                <span className="h-px w-10 bg-white/12" />
                See details
              </a>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-150 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <div className="max-w-[26rem] lg:ml-auto">
              <div className="editorial-card p-8 md:p-10">
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#8A6F45]">
                  Invitation details
                </p>
                <h2 className="mt-5 text-4xl font-display leading-[0.94] text-ink md:text-[3.15rem]">
                  Saturday, 3 October 2026
                </h2>

                <div className="mt-8 border-t border-[#d9ccb9] pt-6">
                  <div className="space-y-5">
                    {invitationMeta.map((item) => (
                      <div key={item.label} className="flex items-start justify-between gap-6">
                        <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[#8A6F45]">
                          {item.label}
                        </p>
                        <p className="max-w-[15rem] text-right text-xl font-display leading-snug text-[#312b27]">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-8 border-t border-[#d9ccb9] pt-5 text-[0.74rem] uppercase tracking-[0.18em] text-[#6f5f54]">
                  Adults-only celebration · Dinner and dancing to follow
                </p>
              </div>

              <div className="ml-auto mt-4 max-w-[18rem] editorial-outline p-5">
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[#c7ab78]">
                  A dress note
                </p>
                <p className="mt-2 text-2xl font-display text-ivory-deep">Colourful formal</p>
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
