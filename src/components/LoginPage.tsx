'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/context/AuthContext';

import AppImage from './ui/AppImage';

export default function LoginPage() {
  const { login } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  // Subtle parallax on mouse move for background blobs + card glare
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate(${x * 30}px, ${y * 20}px)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate(${-x * 25}px, ${-y * 18}px)`;
      }
      // Pastel glare follows cursor over the card
      if (glareRef.current && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const inside = cx >= 0 && cy >= 0 && cx <= rect.width && cy <= rect.height;
        if (inside) {
          glareRef.current.style.opacity = '1';
          glareRef.current.style.background = `radial-gradient(600px circle at ${cx}px ${cy}px, rgba(212,160,160,0.12) 0%, rgba(168,197,176,0.08) 30%, rgba(201,184,212,0.06) 50%, transparent 70%)`;
        } else {
          glareRef.current.style.opacity = '0';
        }
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(code);
    if (!result.success) {
      setError(result.error || 'That invitation code could not be verified.');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden section-bg-dark">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          ref={blob1Ref}
          className="absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            top: '-10%',
            left: '-12%',
            background: 'radial-gradient(circle, rgba(212,160,160,0.16) 0%, transparent 68%)',
            transition: 'transform 0.8s ease',
          }}
        />
        <div
          ref={blob2Ref}
          className="absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            bottom: '-8%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(168,197,176,0.13) 0%, transparent 65%)',
            transition: 'transform 0.8s ease',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '320px',
            height: '320px',
            top: '40%',
            left: '45%',
            background: 'radial-gradient(circle, rgba(201,184,212,0.09) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div
          ref={cardRef}
          className={`relative w-full max-w-6xl overflow-hidden rounded-sm border transition-all duration-1000 ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{
            borderColor: 'rgba(212,160,160,0.14)',
            background: 'rgba(10,10,13,0.32)',
            backdropFilter: 'blur(2px)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 0 80px rgba(212,160,160,0.06)',
          }}
        >
          {/* Pastel glare overlay — follows mouse */}
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
            style={{ opacity: 0 }}
          />
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            {/* Photo side */}
            <div className="relative min-h-[320px] lg:min-h-[780px]">
              <AppImage
                src="/assets/images/wedding/DSC_0174.jpeg"
                alt="Nikita and Daniel"
                className="h-full w-full object-cover"
                fill
                priority
                quality={84}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(8,8,11,0.1) 0%, rgba(8,8,11,0.65) 100%)',
                }}
              />
              {/* Rose tint overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 70%, rgba(212,160,160,0.18), transparent 55%)',
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#08080b] to-transparent lg:hidden" />

              <div className="editorial-outline absolute bottom-8 left-8 right-8 p-6 md:p-7 lg:bottom-10 lg:left-10 lg:right-10">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-coral">
                  3 October 2026 · Rayton
                </p>
                <p className="mt-3 font-display text-3xl text-ivory-deep md:text-4xl">
                  Featherwood Farm
                </p>
                <p className="mt-2 text-base leading-relaxed text-muted-light">
                  Ceremony at 16:00. Dinner and dancing to follow.
                </p>
              </div>
            </div>

            {/* Form side — glassmorphism on dark */}
            <div
              className="flex flex-col justify-center p-8 md:p-12 lg:p-16"
              style={{
                background:
                  'linear-gradient(160deg, rgba(249,243,234,0.99) 0%, rgba(238,228,214,0.98) 100%)',
                color: '#1d1819',
              }}
            >
              <span className="section-kicker" style={{ color: '#D4A0A0' }}>
                Private invitation
              </span>
              <h1 className="mt-6 font-display text-5xl leading-[0.86] text-[#1d1819] md:text-6xl lg:text-7xl">
                Nikita
                <span className="my-3 block font-script text-4xl text-shimmer md:text-5xl">
                  &amp;
                </span>
                Daniel
              </h1>

              <p className="mt-6 max-w-xl text-xl leading-relaxed text-[#4A4040] md:text-2xl">
                Enter your personal invitation code to open your page.
              </p>

              <p className="mt-5 border-t border-black/10 pt-5 text-[0.78rem] uppercase tracking-[0.18em] text-[#8A7F7F]">
                Featherwood Farm · 3 October 2026 · By invitation only
              </p>

              <form onSubmit={handleSubmit} className="mt-10 max-w-md space-y-5">
                <div>
                  <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-[#8A7F7F]">
                    Invitation code
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(event) => setCode(event.target.value.toUpperCase())}
                    placeholder="NIKDAN-XXXX-XXXX"
                    autoComplete="off"
                    className="form-input text-center tracking-[0.12em]"
                  />
                </div>

                {error && (
                  <p
                    className="rounded-sm px-4 py-3 text-base text-[#5b2d34]"
                    style={{
                      background: 'rgba(212,160,160,0.16)',
                      border: '1px solid rgba(212,160,160,0.28)',
                    }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !code.trim()}
                  className="btn-glow w-full rounded-sm px-6 py-4 text-[0.72rem] uppercase tracking-[0.18em] text-ivory-deep disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(212,160,160,0.95) 0%, rgba(180,120,128,0.98) 100%)',
                    boxShadow: '0 12px 32px rgba(212,160,160,0.3)',
                  }}
                >
                  {isLoading ? 'Verifying invitation' : 'Open invitation'}
                </button>

                <p className="text-sm leading-relaxed text-[#8A7F7F]">
                  Your code was sent with your invitation.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
