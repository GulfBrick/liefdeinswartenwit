'use client';
import React, { useEffect, useState, useCallback } from 'react';

interface Sparkle {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

interface SparklesProps {
  children?: React.ReactNode;
  className?: string;
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
}

export default function Sparkles({
  children,
  className = '',
  count = 14,
  colors = ['#E8336D', '#A855F7', '#4ECDC4', '#FFD23F', '#F472B6'],
  minSize = 2,
  maxSize = 5,
}: SparklesProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const generateSparkle = useCallback(
    (): Sparkle => ({
      id: Math.random().toString(36).slice(2),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 8,
      duration: Math.random() * 4 + 6,
    }),
    [colors, minSize, maxSize]
  );

  useEffect(() => {
    setSparkles(Array.from({ length: count }, generateSparkle));
  }, [count, generateSparkle]);

  return (
    <div className={`relative ${className}`}>
      {sparkles.map((sparkle) => (
        <svg
          key={sparkle.id}
          className="absolute pointer-events-none animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
          viewBox="0 0 24 24"
          fill={sparkle.color}
        >
          <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
        </svg>
      ))}
      {children}
    </div>
  );
}
