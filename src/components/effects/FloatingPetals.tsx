'use client';
import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  sway: number;
  rotation: number;
  opacity: number;
  color: string;
}

interface FloatingPetalsProps {
  count?: number;
  className?: string;
}

const petalColors = ['#E8336D', '#F472B6', '#A855F7', '#C084FC'];

export default function FloatingPetals({ count = 18, className = '' }: FloatingPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 8 + 6,
        delay: Math.random() * 20,
        duration: Math.random() * 12 + 16,
        sway: Math.random() * 60 - 30,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.12 + 0.04,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      }))
    );
  }, [count]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-[1] overflow-hidden ${className}`}>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute petal-fall"
          style={
            {
              left: `${petal.x}%`,
              top: '-5%',
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              '--sway': `${petal.sway}px`,
            } as React.CSSProperties
          }
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            style={{
              opacity: petal.opacity,
              transform: `rotate(${petal.rotation}deg)`,
            }}
          >
            <path
              d="M12 2C12 2 4 8 4 14C4 18 8 22 12 22C16 22 20 18 20 14C20 8 12 2 12 2Z"
              fill={petal.color}
              opacity="0.7"
            />
            <path d="M12 2C12 2 6 9 6 14C6 17 9 20 12 20" fill="#F472B6" opacity="0.3" />
          </svg>
        </div>
      ))}
    </div>
  );
}
