'use client';

import React, { useState } from 'react';

import Icon from '@/components/ui/AppIcon';
import { useReveal } from '@/hooks/useReveal';

const DOTS_CODE = 'INsNCTej9EB7';
const DOTS_LINK =
  'https://web.dotstheapp.com/a?group=2403294&dlBy=holistictheatre&code=INsNCTej9EB7&utm_source=guest&utm_medium=share&utm_campaign=guest_event_album&force_app=1';

export default function DotsSection() {
  const sectionRef = useReveal();
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(DOTS_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="dots"
      ref={sectionRef}
      className="relative overflow-hidden section-bg-dark-alt px-6 py-16 md:px-12"
    >
      <div
        className="relative z-10 mx-auto max-w-4xl border-t pt-10"
        style={{ borderColor: 'rgba(212,160,160,0.12)' }}
      >
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal">
            <span className="section-kicker">Shared album</span>
            <h2 className="mt-5 font-display text-4xl leading-[0.94] text-ivory-deep md:text-5xl">
              If you take photographs,
              <span className="mt-1 block italic text-shimmer">we would love to have them</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-light">
              We are using Dots to gather the little moments from the day. The web album is the
              easiest route.
            </p>
          </div>

          <div className="glass-card p-8 reveal reveal-delay-1">
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-bloom">Album code</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <p className="font-display text-3xl tracking-[0.12em] text-ivory-deep md:text-4xl">
                {DOTS_CODE}
              </p>
              <button
                type="button"
                onClick={copyCode}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-ivory-deep transition-all duration-300 hover:border-bloom/40 hover:text-bloom"
                style={{
                  border: '1px solid rgba(245,239,231,0.12)',
                  background: 'rgba(245,239,231,0.04)',
                }}
              >
                <Icon name="ClipboardDocumentIcon" size={16} />
                {copied ? 'Copied!' : 'Copy code'}
              </button>
            </div>

            <a
              href={DOTS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow mt-8 inline-flex items-center justify-center rounded-sm px-6 py-4 text-[0.72rem] uppercase tracking-[0.18em] text-ivory-deep"
              style={{
                background:
                  'linear-gradient(135deg, rgba(168,197,176,0.85) 0%, rgba(120,160,140,0.92) 100%)',
                boxShadow: '0 10px 28px rgba(168,197,176,0.25)',
              }}
            >
              Open shared album
            </a>

            <p className="mt-4 text-sm leading-relaxed text-muted-light">
              Use the code only if you prefer joining from the Dots app later.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
