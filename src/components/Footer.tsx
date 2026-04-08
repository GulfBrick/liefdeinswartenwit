'use client';

import React, { useEffect, useRef } from 'react';

const footerLinks = [
  { label: 'Story', id: 'gallery' },
  { label: 'Invitation', id: 'details' },
  { label: 'Day', id: 'programme' },
  { label: 'RSVP', id: 'rsvp' },
  { label: 'Stay', id: 'accommodation' },
  { label: 'Photos', id: 'dots' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const monogramRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const decorLineRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const monogram = monogramRef.current;
    const linksNav = linksRef.current;
    const decorLine = decorLineRef.current;

    if (reduced) {
      if (monogram) monogram.style.opacity = '1';
      if (decorLine) decorLine.style.opacity = '1';
      if (linksNav) {
        Array.from(linksNav.querySelectorAll<HTMLElement>('button')).forEach(
          (el) => (el.style.opacity = '1')
        );
      }
      return;
    }

    // Set initial states
    if (monogram) {
      monogram.style.opacity = '0';
      monogram.style.transform = 'scale(0.88)';
    }
    if (decorLine) {
      decorLine.style.opacity = '0';
      decorLine.style.width = '0px';
    }
    const linkBtns = linksNav ? Array.from(linksNav.querySelectorAll<HTMLElement>('button')) : [];
    linkBtns.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            observer.disconnect();

            const run = async () => {
              const { animate } = await import('animejs');

              // Monogram fades in with scale
              if (monogram) {
                animate(monogram, {
                  opacity: [0, 1],
                  scale: [0.88, 1],
                  duration: 900,
                  ease: 'outExpo',
                });
              }

              // Footer links stagger in
              if (linkBtns.length > 0) {
                animate(linkBtns, {
                  opacity: [0, 1],
                  translateY: [8, 0],
                  duration: 600,
                  ease: 'outExpo',
                  delay: (_, i) => 200 + i * 70,
                });
              }

              // Decorative line draws itself
              if (decorLine) {
                animate(decorLine, {
                  opacity: [0, 1],
                  width: ['0px', '96px'],
                  duration: 800,
                  ease: 'outExpo',
                  delay: 500,
                });
              }
            };

            run();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden section-bg-dark px-6 py-24 md:px-12"
    >
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
              <h3 className="mt-6 max-w-3xl font-display text-3xl leading-[0.95] text-ivory-deep sm:text-4xl md:text-5xl lg:text-6xl glow-heading">
                Thank you for being part of it.
              </h3>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-light">
                Swart gave the frame. She brought the colour. We cannot wait to welcome you to
                Featherwood Farm.
              </p>
            </div>

            <div className="lg:text-right">
              {/* Monogram — fades in with scale */}
              <p
                ref={monogramRef}
                className="font-script text-4xl text-shimmer md:text-5xl"
                style={{ opacity: 0 }}
              >
                Nikita &amp; Daniel
              </p>
              <p className="mt-4 text-[0.78rem] uppercase tracking-[0.18em] text-muted-light">
                3 October 2026 · Featherwood Farm · Rayton
              </p>

              <nav ref={linksRef} className="mt-8 flex flex-wrap gap-x-4 gap-y-3 sm:gap-x-6 lg:justify-end">
                {footerLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="py-1 text-[0.72rem] uppercase tracking-[0.18em] text-muted-light transition-colors hover:text-bloom"
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
            {/* Decorative line draws itself */}
            <div
              ref={decorLineRef}
              style={{
                height: '1px',
                width: '96px',
                opacity: 0,
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
