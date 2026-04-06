'use client';

import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-6">
      <div
        className="mx-auto max-w-7xl rounded-full border transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10, 10, 13, 0.78)' : 'rgba(10, 10, 13, 0.36)',
          backdropFilter: 'blur(18px)',
          borderColor: scrolled ? 'rgba(245, 239, 231, 0.1)' : 'rgba(245, 239, 231, 0.08)',
          boxShadow: scrolled ? '0 18px 44px rgba(0, 0, 0, 0.18)' : 'none',
        }}
      >
        <div className="flex items-center justify-between gap-5 px-4 py-3 md:px-6">
          <a href="#hero" className="min-w-0 flex items-center gap-4">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-display text-ivory-deep"
              style={{
                borderColor: 'rgba(245, 239, 231, 0.14)',
                background: 'rgba(245, 239, 231, 0.04)',
              }}
            >
              N&amp;D
            </span>

            <div className="min-w-0">
              <p className="truncate text-[0.68rem] uppercase tracking-[0.22em] text-[#c7ab78]">
                By invitation only
              </p>
              <p className="truncate text-lg font-display text-ivory-deep">Nikita &amp; Daniel</p>
            </div>
          </a>

          <div className="hidden xl:flex items-center gap-6">
            {primaryLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-light transition-colors duration-200 hover:text-ivory-deep"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {guest && (
              <div className="hidden lg:flex items-center gap-4">
                <span
                  className="rounded-full px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-ivory-deep"
                  style={{
                    background: 'rgba(245, 239, 231, 0.04)',
                    border: '1px solid rgba(245, 239, 231, 0.1)',
                  }}
                >
                  For {guest.name}
                </span>
                <button
                  onClick={logout}
                  className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-light transition-colors hover:text-ivory-deep"
                >
                  Exit
                </button>
              </div>
            )}

            <a
              href="#rsvp"
              className="hidden md:inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.2em] text-ivory-deep transition-colors duration-200 hover:text-white"
            >
              <span className="h-px w-8 bg-white/14" />
              RSVP
            </a>

            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
                style={{ background: '#F5EFE7' }}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
                style={{ background: '#F5EFE7' }}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
                style={{ background: '#F5EFE7' }}
              />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="mx-auto mt-3 max-w-7xl px-1 lg:hidden">
          <div
            className="rounded-[1.75rem] border px-6 py-6"
            style={{
              background: 'rgba(10, 10, 13, 0.94)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(245, 239, 231, 0.08)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            {guest && (
              <div className="mb-6 border-b border-white/10 pb-5">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c7ab78]">
                  Invitation for
                </p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <p className="text-2xl font-display text-ivory-deep">{guest.name}</p>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-light transition-colors hover:text-ivory-deep"
                  >
                    Exit
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {[...primaryLinks, ...secondaryLinks].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-white/10 py-3 text-[0.92rem] uppercase tracking-[0.14em] text-ivory-deep"
                >
                  {link.label}
                  <span className="text-muted-light">/</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
