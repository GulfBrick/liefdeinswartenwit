'use client';

import React, { useEffect, useRef } from 'react';

import { useAuth } from '@/context/AuthContext';
import { useReveal } from '@/hooks/useReveal';

export default function BankingSection() {
  const sectionRef = useReveal();
  const { guest } = useAuth();
  const referenceCode = guest?.code || 'YOUR-CODE';

  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const left = leftCardRef.current;
    const right = rightCardRef.current;
    if (!container || !left || !right) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      left.style.opacity = '1';
      right.style.opacity = '1';
      return;
    }

    const slideDistance = typeof window !== 'undefined' && window.innerWidth < 640 ? 40 : 72;

    left.style.opacity = '0';
    left.style.transform = `translateX(-${slideDistance}px)`;
    right.style.opacity = '0';
    right.style.transform = `translateX(${slideDistance}px)`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            observer.disconnect();

            const run = async () => {
              const { animate } = await import('animejs');

              // Both cards meet in the middle simultaneously
              animate(left, {
                opacity: [0, 1],
                translateX: [-slideDistance, 0],
                duration: 1000,
                ease: 'outExpo',
              });

              animate(right, {
                opacity: [0, 1],
                translateX: [slideDistance, 0],
                duration: 1000,
                ease: 'outExpo',
              });

              // After cards settle, stagger in the bank detail rows
              const allRows = [
                ...Array.from(left.querySelectorAll<HTMLElement>('[data-bank-row]')),
                ...Array.from(right.querySelectorAll<HTMLElement>('[data-bank-row]')),
              ];

              allRows.forEach((el) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(10px)';
              });

              animate(allRows, {
                opacity: [0, 1],
                translateY: [10, 0],
                duration: 500,
                ease: 'outQuart',
                delay: (_, i) => 700 + i * 60,
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

  const bankRows = [
    { label: 'Account holder', value: 'Mr Daniel Harrison Swart' },
    { label: 'Bank', value: 'Nedbank' },
    { label: 'Account number', value: '1338961527' },
    { label: 'Branch code', value: '198765' },
    { label: 'Reference', value: referenceCode, highlight: true },
  ];

  return (
    <section id="banking" ref={sectionRef} className="section-bg-dark px-6 py-24 md:px-12">
      {/* Ambient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 80%, rgba(201,184,212,0.07) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="reveal">
          <span className="section-kicker">Banking details</span>
          <h2 className="mt-5 font-display text-4xl leading-[0.94] text-ivory-deep md:text-5xl">
            Making payment
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-light md:text-xl">
            Whether you are paying for accommodation or contributing to our honeymoon, here are the
            details you need.
          </p>
        </div>

        <div ref={containerRef} className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Card 1: Accommodation — slides in from left */}
          <div ref={leftCardRef} className="glass-card p-8">
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-bloom">
              Accommodation payment
            </p>
            <h3 className="mt-4 font-display text-3xl text-ivory-deep">Staying over</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-light">
              If you have reserved a room, please use the details below to make payment.
            </p>

            <div
              className="mt-6 space-y-4 border-t pt-6"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {bankRows.map(({ label, value, highlight }) => (
                <div
                  key={label}
                  data-bank-row
                  className="flex items-center justify-between gap-2 sm:gap-4"
                >
                  <span className="shrink-0 text-sm text-muted">{label}</span>
                  <span
                    className="min-w-0 truncate text-right font-display text-base"
                    style={{ color: highlight ? '#D4A0A0' : '#F5EFE7' }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <p
              className="mt-6 border-t pt-4 text-sm leading-relaxed text-muted-light"
              style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            >
              Please send proof of payment via WhatsApp to confirm your booking.
            </p>
          </div>

          {/* Card 2: Honeymoon — slides in from right */}
          <div ref={rightCardRef} className="glass-card p-8">
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-coral">Honeymoon gift</p>
            <h3 className="mt-4 font-display text-3xl text-ivory-deep">A gift of memories</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-light">
              Your presence is more than enough. But if you would like to give something, a
              contribution toward our honeymoon would mean the world to us.
            </p>

            <div
              className="mt-6 space-y-4 border-t pt-6"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {bankRows.map(({ label, value, highlight }) => (
                <div
                  key={label}
                  data-bank-row
                  className="flex items-center justify-between gap-2 sm:gap-4"
                >
                  <span className="shrink-0 text-sm text-muted">{label}</span>
                  <span
                    className="min-w-0 truncate text-right font-display text-base"
                    style={{ color: highlight ? '#C9B8D4' : '#F5EFE7' }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <p
              className="mt-6 border-t pt-4 text-sm italic leading-relaxed text-muted-light"
              style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            >
              Your generosity means the world — every bit helps us build memories together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
