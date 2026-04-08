'use client';
import { useEffect, useRef } from 'react';

export type AnimationPreset =
  | 'fadeUp'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scaleIn'
  | 'staggerChildren'
  | 'slideLeft'
  | 'slideRight';

interface AnimeRevealOptions {
  preset?: AnimationPreset;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  threshold?: number;
  childSelector?: string;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const presetMap: Record<
  AnimationPreset,
  { translateY?: number[]; translateX?: number[]; scale?: number[]; opacity?: number[] }
> = {
  fadeUp: { opacity: [0, 1], translateY: [64, 0] },
  fadeLeft: { opacity: [0, 1], translateX: [-64, 0] },
  fadeRight: { opacity: [0, 1], translateX: [64, 0] },
  scaleIn: { opacity: [0, 1], scale: [0.82, 1] },
  staggerChildren: { opacity: [0, 1], translateY: [48, 0] },
  slideLeft: { opacity: [0, 1], translateX: [-80, 0] },
  slideRight: { opacity: [0, 1], translateX: [80, 0] },
};

/**
 * useAnimeReveal — triggers anime.js animations when elements enter viewport.
 * Each element only animates once; respects prefers-reduced-motion.
 */
export function useAnimeReveal(options: AnimeRevealOptions = {}) {
  const {
    preset = 'fadeUp',
    delay = 0,
    duration = 900,
    staggerDelay = 80,
    threshold = 0.12,
    childSelector,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      // Immediately show without animation
      el.style.opacity = '1';
      if (childSelector) {
        el.querySelectorAll<HTMLElement>(childSelector).forEach((child) => {
          child.style.opacity = '1';
        });
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            observer.disconnect();

            const run = async () => {
              const { animate } = await import('animejs');
              const props = presetMap[preset];

              if (preset === 'staggerChildren' && childSelector) {
                const children = Array.from(el.querySelectorAll<HTMLElement>(childSelector));
                if (children.length === 0) return;
                children.forEach((child) => {
                  child.style.opacity = '0';
                });
                animate(children, {
                  ...props,
                  duration,
                  ease: 'outExpo',
                  delay: (_, i) => delay + i * staggerDelay,
                });
              } else {
                el.style.opacity = '0';
                animate(el, {
                  ...props,
                  duration,
                  ease: 'outExpo',
                  delay,
                });
              }
            };

            run();
          }
        });
      },
      { threshold }
    );

    // Set initial hidden state
    if (preset === 'staggerChildren' && childSelector) {
      el.querySelectorAll<HTMLElement>(childSelector).forEach((child) => {
        child.style.opacity = '0';
      });
    } else {
      el.style.opacity = '0';
    }

    observer.observe(el);
    return () => observer.disconnect();
  }, [preset, delay, duration, staggerDelay, threshold, childSelector]);

  return ref;
}
