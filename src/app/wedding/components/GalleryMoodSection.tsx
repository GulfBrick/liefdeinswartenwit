'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import TextReveal from '@/components/effects/TextReveal';
import AppImage from '@/components/ui/AppImage';
import { useReveal } from '@/hooks/useReveal';

const galleryImages = [
  {
    src: '/assets/images/wedding/DSC08721.jpg',
    alt: 'Nikita and Daniel portrait',
    col: 'col-span-2',
    row: 'row-span-2',
  },
  {
    src: '/assets/images/wedding/DSC_0174.jpeg',
    alt: 'Nikita and Daniel in an embrace',
    col: '',
    row: 'row-span-2',
  },
  {
    src: '/assets/images/wedding/DSC08661.jpg',
    alt: 'Nikita smiling with Daniel',
    col: '',
    row: '',
  },
  {
    src: '/assets/images/wedding/IMG-20251110-WA0018.jpg',
    alt: 'A candid moment',
    col: '',
    row: '',
  },
  {
    src: '/assets/images/wedding/DSC_0573.jpeg',
    alt: 'A romantic candid',
    col: 'col-span-2',
    row: '',
  },
  {
    src: '/assets/images/wedding/IMG-20251109-WA0068.jpg',
    alt: 'Together',
    col: '',
    row: '',
  },
  {
    src: '/assets/images/wedding/DSC_0657.jpeg',
    alt: 'Nikita and Daniel walking together',
    col: '',
    row: 'row-span-2',
  },
  {
    src: '/assets/images/wedding/IMG-20260322-WA0138.jpg',
    alt: 'A recent moment',
    col: 'col-span-2',
    row: '',
  },
  {
    src: '/assets/images/wedding/IMG-20241228-WA0009.jpg',
    alt: 'December 2024',
    col: '',
    row: '',
  },
  {
    src: '/assets/images/wedding/IMG-20241228-WA0090.jpg',
    alt: 'December celebration',
    col: '',
    row: '',
  },
  {
    src: '/assets/images/wedding/IMG-20251109-WA0042.jpg',
    alt: 'November 2025',
    col: '',
    row: '',
  },
  {
    src: '/assets/images/wedding/IMG-20251109-WA0049.jpg',
    alt: 'A tender moment',
    col: 'col-span-2',
    row: '',
  },
  {
    src: '/assets/images/wedding/IMG-20251110-WA0012.jpg',
    alt: 'November evening',
    col: '',
    row: '',
  },
  {
    src: '/assets/images/wedding/IMG-20251110-WA0013.jpg',
    alt: 'Together in November',
    col: '',
    row: '',
  },
  {
    src: '/assets/images/wedding/IMG-20251110-WA0019.jpg',
    alt: 'A quiet moment',
    col: '',
    row: '',
  },
  {
    src: '/assets/images/wedding/IMG-20260103-WA0158.jpg',
    alt: 'New year together',
    col: 'col-span-2',
    row: '',
  },
  {
    src: '/assets/images/wedding/20241201_121835.jpg',
    alt: 'December afternoon',
    col: '',
    row: '',
  },
  {
    src: '/assets/images/wedding/20240713_165159(0).jpg',
    alt: 'July 2024',
    col: '',
    row: '',
  },
  {
    src: '/assets/images/wedding/IMG-20240120-WA0062.jpg',
    alt: 'January 2024',
    col: '',
    row: '',
  },
  {
    src: '/assets/images/wedding/IMG-20231204-WA0079.jpg',
    alt: 'December 2023',
    col: 'col-span-2',
    row: '',
  },
  {
    src: '/assets/images/wedding/DSC08489.jpg',
    alt: 'Nikita and Daniel at sunset',
    col: '',
    row: '',
  },
];

export default function GalleryMoodSection() {
  const sectionRef = useReveal();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  const previousImage = useCallback(() => {
    setLightbox((index) =>
      index !== null ? (index - 1 + galleryImages.length) % galleryImages.length : null
    );
  }, []);

  const nextImage = useCallback(() => {
    setLightbox((index) => (index !== null ? (index + 1) % galleryImages.length : null));
  }, []);

  useEffect(() => {
    if (lightbox === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null);
      if (event.key === 'ArrowLeft') previousImage();
      if (event.key === 'ArrowRight') nextImage();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightbox, nextImage, previousImage]);

  // Photo cascade animation on scroll
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const photos = Array.from(grid.querySelectorAll<HTMLElement>('[data-photo]'));

    if (reduced) {
      photos.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    // Set initial hidden state
    photos.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'scale(0.82) translateY(24px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            observer.disconnect();

            const run = async () => {
              const { animate } = await import('animejs');

              animate(photos, {
                opacity: [0, 1],
                scale: [0.82, 1],
                translateY: [24, 0],
                duration: 700,
                ease: 'outExpo',
                // Waterfall: delay increases per photo (50ms × index)
                delay: (_, i) => i * 50,
              });
            };

            run();
          }
        });
      },
      { threshold: 0.06 }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="relative overflow-hidden section-bg-dark-alt px-6 py-24 md:px-12"
      >
        {/* Section ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(212,160,160,0.07) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12 grid items-end gap-8 lg:grid-cols-[0.55fr_1.45fr]">
            <div className="reveal">
              <span className="section-kicker">Our story</span>
              <TextReveal
                as="h2"
                delay={120}
                className="mt-5 font-display text-4xl leading-[0.9] text-ivory-deep sm:text-5xl md:text-6xl lg:text-7xl"
              >
                How we arrived here
              </TextReveal>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="border-t border-white/10 pt-6">
                <p className="text-xl leading-relaxed text-ivory-deep/90 md:text-2xl">
                  Swart was the surname. Colour was the gift.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-muted-light">
                  These are a few of the photographs we kept returning to while planning the day.
                  {isTouchDevice
                    ? ' Tap to see them in full colour.'
                    : ' Hover to see them in full colour.'}
                </p>
              </div>
            </div>
          </div>

          {/* Masonry grid — grayscale by default, colour on hover */}
          <div ref={gridRef}>
            <div className="grid auto-rows-[140px] grid-cols-2 gap-2 sm:auto-rows-[160px] md:auto-rows-[190px] md:grid-cols-3 lg:auto-rows-[200px] lg:grid-cols-4">
              {galleryImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  data-photo
                  onClick={() => setLightbox(index)}
                  className={`${image.col} ${image.row} photo-mono-wrap group relative overflow-hidden rounded-sm text-left focus:outline-none`}
                  style={{ display: 'block' }}
                >
                  {/* Rose tint overlay on hover */}
                  <div
                    className="absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(212,160,160,0.28) 0%, transparent 60%)',
                    }}
                  />

                  <AppImage
                    src={image.src}
                    alt={image.alt}
                    className="photo-mono h-full w-full object-cover"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  />

                  {/* Caption on hover */}
                  <div className="absolute inset-x-0 bottom-0 z-20 translate-y-2 p-3 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-bloom/90">
                      {image.alt}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center px-6"
          style={{ background: 'rgba(8,8,11,0.96)' }}
          onClick={() => setLightbox(null)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const deltaX = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(deltaX) > 50) {
              if (deltaX > 0) previousImage();
              else nextImage();
            }
            touchStartX.current = null;
          }}
        >
          {/* Counter */}
          <div className="absolute left-6 top-6 text-[0.68rem] uppercase tracking-[0.2em] text-muted-light">
            {lightbox + 1} / {galleryImages.length}
          </div>

          <button
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-all hover:bg-white/10 hover:text-white"
            aria-label="Close gallery"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              previousImage();
            }}
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full text-white/40 transition-all hover:bg-white/08 hover:text-white md:left-8"
            style={{ background: 'rgba(245,239,231,0.06)' }}
            aria-label="Previous image"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full text-white/40 transition-all hover:bg-white/08 hover:text-white md:right-8"
            style={{ background: 'rgba(245,239,231,0.06)' }}
            aria-label="Next image"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="max-h-[88vh] max-w-[calc(100vw-3rem)] md:max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <AppImage
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-h-[88vh] max-w-full rounded-sm object-contain"
              width={1200}
              height={900}
              quality={92}
            />
            <p className="mt-4 text-center text-sm text-muted-light">
              {galleryImages[lightbox].alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
