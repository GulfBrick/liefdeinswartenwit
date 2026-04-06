'use client';

import React from 'react';

import { useReveal } from '@/hooks/useReveal';

interface AccommodationOption {
  name: string;
  description: string;
  features: string[];
  priceSharing: string;
  priceSingle: string;
  roomCount: number;
  mood: string;
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
  },
  {
    name: 'Unit Type B',
    description: 'A comfortable on-site option with easy access to everything.',
    features: ['Two guests per room', 'En-suite bathroom', 'On-site at Featherwood Farm'],
    priceSharing: 'R500 pp',
    priceSingle: 'R800 single',
    roomCount: 4,
    mood: 'Best value',
  },
  {
    name: 'Guest House',
    description: 'The lively house for groups who want to stay close to the energy.',
    features: ['Sleeps up to 10 guests', 'Shared bathrooms', 'Whole house option available'],
    priceSharing: 'R600 pp',
    priceSingle: 'R5500 whole house',
    roomCount: 4,
    mood: 'Best for groups',
  },
  {
    name: 'Nyala Lodge',
    description: 'A quieter, more private retreat once the evening slows down.',
    features: ['Seven rooms', 'Quiet location on the property', 'Ideal for an early night'],
    priceSharing: 'R650 pp',
    priceSingle: 'R900 single',
    roomCount: 7,
    mood: 'Peaceful retreat',
  },
];

export default function AccommodationSection() {
  const sectionRef = useReveal();

  return (
    <section
      id="accommodation"
      ref={sectionRef}
      className="relative overflow-hidden section-bg-dark px-6 py-[4.5rem] md:px-12"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="reveal">
          <span className="section-kicker">If you are staying over</span>
          <h2 className="mt-5 text-4xl font-display leading-[0.94] text-ivory-deep md:text-5xl">
            Staying on the property
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-light md:text-xl">
            If you would like a room, tell us in your RSVP. We will confirm availability once
            replies are in.
          </p>
        </div>

        <div className="mt-10 glass-card overflow-hidden reveal reveal-delay-1">
          {accommodations.map((option, index) => (
            <div
              key={option.name}
              className={`grid gap-6 px-6 py-7 md:grid-cols-[1.1fr_0.9fr] md:px-8 ${
                index === 0 ? '' : 'border-t border-white/10'
              }`}
            >
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#c7ab78]">
                  {option.mood}
                </p>
                <h3 className="mt-3 text-3xl font-display text-ivory-deep">{option.name}</h3>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-light">
                  {option.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {option.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-[0.98rem] leading-relaxed tracking-[0.02em] text-muted-light"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#c7ab78]">
                    Sharing
                  </p>
                  <p className="mt-2 text-2xl font-display text-ivory-deep">
                    {option.priceSharing}
                  </p>
                </div>
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#c7ab78]">
                    Single
                  </p>
                  <p className="mt-2 text-2xl font-display text-ivory-deep">{option.priceSingle}</p>
                </div>
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#c7ab78]">Rooms</p>
                  <p className="mt-2 text-2xl font-display text-ivory-deep">{option.roomCount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
