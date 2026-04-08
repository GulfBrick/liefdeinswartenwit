'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/context/AuthContext';

const primaryLinks = [
  { label: 'Story', href: '#gallery' },
  { label: 'Invitation', href: '#details' },
  { label: 'Day', href: '#programme' },
  { label: 'RSVP', href: '#rsvp' },
];

const secondaryLinks = [
  { label: 'Stay', href: '#accommodation' },
  { label: 'Photos', href: '#dots' },
];

export default function Header() {
  const { guest, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logo subtle scale on scroll
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;
    logo.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
    logo.style.transform = scrolled ? 'scale(0.9)' : 'scale(1)';
  }, [scrolled]);

  // Nav items fade in with stagger on page load
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || animated.current) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const links = Array.from(nav.querySelectorAll<HTMLElement>('a'));

    if (reduced || links.length === 0) return;

    links.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-8px)';
    });

    const run = async () => {
      animated.current = true;
      const { animate } = await import('animejs');
      animate(links, {
        opacity: [0, 1],
        translateY: [-8, 0],
        duration: 600,
        ease: 'outExpo',
        delay: (_, i) => 400 + i * 80,
      });
    };

    // Small delay to let page settle after splash
    const timer = setTimeout(run, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-6"
      style={{ paddingTop: 'env(safe-area-inset-top, 16px)' }}
    >
      <div
        className="mx-auto max-w-7xl rounded-sm border transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10,10,13,0.84)' : 'rgba(10,10,13,0.38)',
          backdropFilter: 'blur(20px) saturate(150%)',
          borderColor: scrolled ? 'rgba(212,160,160,0.14)' : 'rgba(245,239,231,0.07)',
          boxShadow: scrolled
            ? '0 16px 48px rgba(0,0,0,0.22), 0 0 40px rgba(212,160,160,0.06)'
            : 'none',
        }}
      >
        <div className="flex items-center justify-between gap-5 px-4 py-3 md:px-6">
          {/* Logo — subtly scales down when scrolled */}
          <a ref={logoRef} href="#hero" className="flex min-w-0 items-center gap-4">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-display text-sm text-ivory-deep transition-all duration-300"
              style={{
                borderColor: scrolled ? 'rgba(212,160,160,0.3)' : 'rgba(245,239,231,0.14)',
                background: scrolled ? 'rgba(212,160,160,0.08)' : 'rgba(245,239,231,0.04)',
                boxShadow: scrolled ? '0 0 16px rgba(212,160,160,0.18)' : 'none',
              }}
            >
              N&amp;D
            </span>

            <div className="min-w-0">
              <p className="truncate text-[0.68rem] uppercase tracking-[0.22em] text-bloom">
                By invitation only
              </p>
              <p className="truncate font-display text-lg text-ivory-deep">Nikita &amp; Daniel</p>
            </div>
          </a>

          {/* Desktop nav — stagger animated on load */}
          <div ref={navRef} className="hidden items-center gap-6 xl:flex">
            {primaryLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-light transition-colors duration-200 hover:text-bloom"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            {guest && (
              <div className="hidden items-center gap-4 lg:flex">
                <span
                  className="rounded-sm px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-ivory-deep"
                  style={{
                    background: 'rgba(212,160,160,0.06)',
                    border: '1px solid rgba(212,160,160,0.14)',
                  }}
                >
                  For {guest.name}
                </span>
                <button
                  onClick={logout}
                  className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-light transition-colors hover:text-bloom"
                >
                  Exit
                </button>
              </div>
            )}

            <a
              href="#rsvp"
              className="hidden items-center gap-3 text-[0.72rem] uppercase tracking-[0.2em] text-ivory-deep transition-colors duration-200 hover:text-bloom md:inline-flex"
            >
              <span className="h-px w-8 bg-white/14" />
              RSVP
            </a>

            {/* Hamburger */}
            <button
              className="flex flex-col gap-1.5 p-2.5 lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
                style={{ background: menuOpen ? '#D4A0A0' : '#F5EFE7' }}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
                style={{ background: '#F5EFE7' }}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
                style={{ background: menuOpen ? '#D4A0A0' : '#F5EFE7' }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mx-auto mt-3 max-w-7xl px-1 lg:hidden">
          <div
            className="rounded-sm border px-6 py-6"
            style={{
              background: 'rgba(10,10,13,0.96)',
              backdropFilter: 'blur(24px)',
              borderColor: 'rgba(212,160,160,0.12)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.36), 0 0 40px rgba(212,160,160,0.06)',
            }}
          >
            {guest && (
              <div className="mb-6 border-b border-white/10 pb-5">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-bloom">
                  Invitation for
                </p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <p className="font-display text-2xl text-ivory-deep">{guest.name}</p>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-light transition-colors hover:text-bloom"
                  >
                    Exit
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-1">
              {[...primaryLinks, ...secondaryLinks].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-white/08 py-3.5 text-[0.92rem] uppercase tracking-[0.14em] text-ivory-deep transition-colors hover:text-bloom"
                >
                  {link.label}
                  <span className="text-bloom/40">/</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
