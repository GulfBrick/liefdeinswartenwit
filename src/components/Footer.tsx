'use client';

import React from 'react';

const footerLinks = [
  { label: 'Story', id: 'gallery' },
  { label: 'Invitation', id: 'details' },
  { label: 'Day', id: 'programme' },
  { label: 'RSVP', id: 'rsvp' },
  { label: 'Stay', id: 'accommodation' },
  { label: 'Photos', id: 'dots' },
];

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden section-bg-dark px-6 py-24 md:px-12">
      {/* Top ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(212,160,160,0.08) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="border-t pt-12" style={{ borderColor: 'rgba(212,160,160,0.14)' }}>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <span className="section-kicker">With love</span>
              <h3 className="mt-6 max-w-3xl font-display text-4xl leading-[0.95] text-ivory-deep md:text-5xl lg:text-6xl glow-heading">
                Thank you for being part of it.
              </h3>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-light">
                Swart gave the frame. She brought the colour. We cannot wait to welcome you to
                Featherwood Farm.
              </p>
            </div>

            <div className="lg:text-right">
              <p className="font-script text-4xl text-shimmer md:text-5xl">Nikita &amp; Daniel</p>
              <p className="mt-4 text-[0.78rem] uppercase tracking-[0.18em] text-muted-light">
                3 October 2026 · Featherwood Farm · Rayton
              </p>

              <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-3 lg:justify-end">
                {footerLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-light transition-colors hover:text-bloom"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-light/60">
              Liefde in Swart en Wit
            </p>
            <div
              className="h-px w-24"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(212,160,160,0.4), transparent)',
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
