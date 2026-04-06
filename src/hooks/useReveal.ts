'use client';
import { useEffect, useRef } from 'react';

const REVEAL_SELECTORS = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade';

export function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(REVEAL_SELECTORS)
              .forEach((child) => child.classList.add('visible'));
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
