'use client';
import React from 'react';

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function AuroraBackground({
  children,
  className = '',
  intensity = 1,
}: AuroraBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Aurora blobs — animated via global CSS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute aurora-blob-1"
          style={{
            width: '70vw',
            height: '70vw',
            maxWidth: '900px',
            maxHeight: '900px',
            top: '-25%',
            right: '-15%',
            background: `radial-gradient(ellipse, rgba(232, 51, 109, ${0.25 * intensity}) 0%, transparent 65%)`,
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute aurora-blob-2"
          style={{
            width: '60vw',
            height: '60vw',
            maxWidth: '800px',
            maxHeight: '800px',
            bottom: '-20%',
            left: '-15%',
            background: `radial-gradient(ellipse, rgba(168, 85, 247, ${0.2 * intensity}) 0%, transparent 65%)`,
            filter: 'blur(70px)',
          }}
        />
        <div
          className="absolute aurora-blob-3"
          style={{
            width: '50vw',
            height: '50vw',
            maxWidth: '700px',
            maxHeight: '700px',
            top: '25%',
            left: '15%',
            background: `radial-gradient(ellipse, rgba(78, 205, 196, ${0.18 * intensity}) 0%, transparent 65%)`,
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute aurora-blob-4"
          style={{
            width: '45vw',
            height: '45vw',
            maxWidth: '600px',
            maxHeight: '600px',
            top: '55%',
            right: '10%',
            background: `radial-gradient(ellipse, rgba(255, 210, 63, ${0.12 * intensity}) 0%, transparent 65%)`,
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
