'use client';

import React, { useEffect, useState } from 'react';

import { useAuth } from '@/context/AuthContext';

export default function SplashAnimation() {
  const { guest, showSplash, setShowSplash } = useAuth();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!showSplash) return;

    const t1 = setTimeout(() => setStage(1), 80);
    const t2 = setTimeout(() => setStage(2), 420);
    const t3 = setTimeout(() => setStage(3), 980);
    const t4 = setTimeout(() => {
      setShowSplash(false);
      setStage(0);
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [showSplash, setShowSplash]);

  if (!showSplash) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: '#0A0A0D' }}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(201, 123, 134, 0.22), transparent 28%), radial-gradient(circle at 62% 58%, rgba(113, 142, 132, 0.16), transparent 30%)',
        }}
      />

      <div className="relative z-10 text-center px-6">
        <p
          className={`text-xs uppercase tracking-[0.28em] text-muted-light transition-all duration-500 ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          Welcome, {guest?.name || 'dear guest'}
        </p>

        <h1
          className={`mt-5 transition-all duration-700 ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="block text-4xl md:text-5xl lg:text-6xl font-display text-ivory-deep">
            Liefde in
          </span>
          <span className="block text-6xl md:text-7xl lg:text-8xl font-script text-shimmer mt-2">
            Swart en Wit
          </span>
        </h1>

        <div
          className={`mx-auto mt-8 h-px transition-all duration-700 ${
            stage >= 3 ? 'opacity-100 w-40 md:w-56' : 'opacity-0 w-0'
          }`}
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(245, 239, 231, 0.65), rgba(201, 123, 134, 0.75), transparent)',
          }}
        />
      </div>
    </div>
  );
}
