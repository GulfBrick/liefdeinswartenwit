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
      <div className="relative z-10 mx-auto max-w-4xl border-t border-white/10 pt-10">
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal">
            <span className="section-kicker">Shared album</span>
            <h2 className="mt-5 text-4xl font-display leading-[0.94] text-ivory-deep md:text-5xl">
              If you take photographs,
              <span className="block italic text-shimmer">we would love to have them</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-light">
              We are using Dots to gather the little moments from the day. The web album is the
              easiest route.
            </p>
          </div>

          <div className="glass-card p-8 reveal reveal-delay-1">
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[#c7ab78]">Album code</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <p className="text-3xl font-display tracking-[0.12em] text-ivory-deep md:text-4xl">
                {DOTS_CODE}
              </p>
              <button
                type="button"
                onClick={copyCode}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-ivory-deep"
                style={{
                  border: '1px solid rgba(245, 239, 231, 0.12)',
                  background: 'rgba(245, 239, 231, 0.04)',
                }}
              >
                <Icon name="ClipboardDocumentIcon" size={16} />
                {copied ? 'Copied' : 'Copy code'}
              </button>
            </div>

            <a
              href={DOTS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-full px-6 py-4 text-[0.72rem] uppercase tracking-[0.18em] text-ivory-deep"
              style={{
                background:
                  'linear-gradient(135deg, rgba(23, 20, 23, 0.96), rgba(113, 142, 132, 0.88))',
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
