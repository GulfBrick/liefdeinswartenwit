'use client';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useReveal } from '@/hooks/useReveal';

export default function BankingSection() {
  const sectionRef = useReveal();
  const { guest } = useAuth();
  const referenceCode = guest?.code || 'YOUR-CODE';

  return (
    <section id="banking" ref={sectionRef} className="section-bg-dark px-6 py-24 md:px-12">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Heading area */}
        <div className="reveal">
          <span className="section-kicker">Banking details</span>
          <h2 className="mt-5 text-4xl font-display leading-[0.94] text-ivory-deep md:text-5xl">
            Making payment
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-light md:text-xl">
            Whether you are paying for accommodation or contributing to our honeymoon, here are the
            details you need.
          </p>
        </div>

        {/* Two-card grid */}
        <div className="mt-10 grid gap-8 md:grid-cols-2 reveal reveal-delay-1">
          {/* Card 1: Accommodation Payment */}
          <div className="glass-card p-8">
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#D4A0A0]">
              Accommodation payment
            </p>
            <h3 className="mt-4 text-3xl font-display text-ivory-deep">Staying over</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-light">
              If you have reserved a room, please use the details below to make payment.
            </p>

            <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
              <div className="flex justify-between">
                <span className="text-sm text-muted">Account holder</span>
                <span className="text-ivory-deep font-display">Mr Daniel Harrison Swart</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Bank</span>
                <span className="text-ivory-deep font-display">Nedbank</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Account number</span>
                <span className="text-ivory-deep font-display">1338961527</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Branch code</span>
                <span className="text-ivory-deep font-display">198765</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Reference</span>
                <span className="text-ivory-deep font-display text-bloom-light">
                  {referenceCode}
                </span>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-light border-t border-white/10 pt-4">
              Please send proof of payment via WhatsApp to confirm your booking.
            </p>
          </div>

          {/* Card 2: Honeymoon Gift */}
          <div className="glass-card p-8">
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#D4A0A0]">
              Honeymoon gift
            </p>
            <h3 className="mt-4 text-3xl font-display text-ivory-deep">A gift of memories</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-light">
              Your presence is more than enough. But if you would like to give something, a
              contribution toward our honeymoon would mean the world to us.
            </p>

            <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
              <div className="flex justify-between">
                <span className="text-sm text-muted">Account holder</span>
                <span className="text-ivory-deep font-display">Mr Daniel Harrison Swart</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Bank</span>
                <span className="text-ivory-deep font-display">Nedbank</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Account number</span>
                <span className="text-ivory-deep font-display">1338961527</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Branch code</span>
                <span className="text-ivory-deep font-display">198765</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Reference</span>
                <span className="text-ivory-deep font-display text-bloom-light">
                  {referenceCode}
                </span>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-light border-t border-white/10 pt-4 italic">
              Your generosity means the world — every bit helps us build memories together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
