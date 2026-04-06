'use client';
import React from 'react';

interface LampEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export default function LampEffect({
  children,
  className = '',
  color = '#E8336D',
}: LampEffectProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Lamp beam — animation via global CSS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl">
        <div
          className="mx-auto"
          style={{
            width: '2px',
            height: '80px',
            background: `linear-gradient(180deg, ${color}, transparent)`,
          }}
        />
        <div
          className="lamp-glow mx-auto -mt-4"
          style={{
            width: '400px',
            height: '250px',
            background: `conic-gradient(from 180deg at 50% 0%, transparent 25%, ${color}30 50%, transparent 75%)`,
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-12">{children}</div>
    </div>
  );
}
