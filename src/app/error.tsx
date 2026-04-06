'use client';
import React from 'react';

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: '#0A0A0F' }}
    >
      <div className="text-center max-w-md">
        <svg className="w-16 h-16 mx-auto mb-6 text-bloom" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <h2 className="font-display text-3xl text-ivory-deep mb-4 font-light">
          Something went wrong
        </h2>
        <p className="font-body text-muted mb-8">
          We hit a small bump. Please try refreshing the page.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white transition-all hover:scale-105 bg-bloom-gradient"
          style={{
            background: 'linear-gradient(135deg, #E8336D 0%, #A855F7 100%)',
            boxShadow: '0 10px 40px rgba(232, 51, 109, 0.3)',
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
