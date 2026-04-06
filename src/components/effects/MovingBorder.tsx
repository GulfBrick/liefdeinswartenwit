'use client';
import React from 'react';

interface MovingBorderProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  duration?: number;
  colors?: string[];
}

export default function MovingBorder({
  children,
  className = '',
  borderRadius = '1.5rem',
  duration = 4,
  colors = ['#E8336D', '#A855F7', '#4ECDC4', '#FFD23F'],
}: MovingBorderProps) {
  const gradientColors = colors.join(', ');

  return (
    <div className={`relative ${className}`} style={{ borderRadius }}>
      {/* Moving gradient border — animation via global CSS */}
      <div className="absolute -inset-[2px] overflow-hidden" style={{ borderRadius }}>
        <div
          className="absolute inset-0 moving-border-gradient"
          style={{
            background: `conic-gradient(from 0deg, ${gradientColors}, ${colors[0]})`,
            animationDuration: `${duration}s`,
          }}
        />
      </div>

      {/* Inner content */}
      <div className="relative z-10 h-full" style={{ borderRadius }}>
        {children}
      </div>
    </div>
  );
}
