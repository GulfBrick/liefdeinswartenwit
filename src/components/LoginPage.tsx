'use client';

import React, { useEffect, useState } from 'react';

import { useAuth } from '@/context/AuthContext';

import AppImage from './ui/AppImage';

export default function LoginPage() {
  const { login } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
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
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-0 top-0 h-[26rem] w-[26rem] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201, 123, 134, 0.14), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(183, 146, 81, 0.1), transparent 68%)',
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div
          className={`w-full max-w-6xl overflow-hidden rounded-[2rem] border transition-all duration-1000 ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{
            borderColor: 'rgba(245, 239, 231, 0.1)',
            background: 'rgba(10, 10, 13, 0.3)',
            boxShadow: '0 36px 96px rgba(0, 0, 0, 0.32)',
          }}
        >
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[320px] lg:min-h-[760px]">
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
                    'linear-gradient(180deg, rgba(8, 8, 11, 0.14) 0%, rgba(8, 8, 11, 0.6) 100%)',
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#08080b] to-transparent lg:hidden" />

              <div className="absolute bottom-8 left-8 right-8 lg:bottom-10 lg:left-10 lg:right-10 editorial-outline p-6 md:p-7">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#c7ab78]">
                  3 October 2026 · Rayton
                </p>
                <p className="mt-3 text-3xl font-display text-ivory-deep md:text-4xl">
                  Featherwood Farm
                </p>
                <p className="mt-2 text-base leading-relaxed text-muted-light">
                  Ceremony at 16:00. Dinner and dancing to follow.
                </p>
              </div>
            </div>

            <div
              className="flex flex-col justify-center p-8 md:p-12 lg:p-16"
              style={{
                background:
                  'linear-gradient(180deg, rgba(249, 243, 234, 0.98) 0%, rgba(240, 232, 220, 0.96) 100%)',
                color: '#1d1819',
              }}
            >
              <span className="section-kicker">Private invitation</span>
              <h1 className="mt-6 text-5xl font-display leading-[0.86] text-[#1d1819] md:text-6xl lg:text-7xl">
                Nikita
                <span className="my-3 block font-script text-4xl text-shimmer md:text-5xl">
                  &amp;
                </span>
                Daniel
              </h1>

              <p className="mt-6 max-w-xl text-xl leading-relaxed text-[#3f3832] md:text-2xl">
                Enter the code printed on your invitation card to open your page.
              </p>

              <p className="mt-5 border-t border-black/10 pt-5 text-[0.78rem] uppercase tracking-[0.18em] text-[#7c6659]">
                Featherwood Farm · 3 October 2026 · By invitation only
              </p>

              <form onSubmit={handleSubmit} className="mt-10 max-w-md space-y-5">
                <div>
                  <label className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-[#7c6659]">
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
                    className="rounded-[1.1rem] px-4 py-3 text-base text-[#5b2d34]"
                    style={{
                      background: 'rgba(201, 123, 134, 0.14)',
                      border: '1px solid rgba(201, 123, 134, 0.22)',
                    }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !code.trim()}
                  className="w-full rounded-full px-6 py-4 text-[0.72rem] uppercase tracking-[0.18em] text-ivory-deep transition-transform duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(23, 20, 23, 0.96), rgba(157, 98, 108, 0.96))',
                    boxShadow: '0 18px 38px rgba(0, 0, 0, 0.14)',
                  }}
                >
                  {isLoading ? 'Verifying invitation' : 'Open invitation'}
                </button>

                <p className="text-sm leading-relaxed text-[#6f5f54]">
                  The code is printed on your card.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
