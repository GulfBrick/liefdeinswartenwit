'use client';

import React, { useCallback, useEffect, useState } from 'react';

import TextReveal from '@/components/effects/TextReveal';
import AppImage from '@/components/ui/AppImage';
import { useReveal } from '@/hooks/useReveal';

const galleryImages = [
  {
    src: '/assets/images/wedding/DSC08721.jpg',
    alt: 'Nikita and Daniel portrait',
    span: 'col-span-2 row-span-2',
  },
  { src: '/assets/images/wedding/DSC08661.jpg', alt: 'Nikita smiling with Daniel', span: '' },
  {
    src: '/assets/images/wedding/DSC_0174.jpeg',
    alt: 'Nikita and Daniel in an embrace',
    span: 'row-span-2',
  },
  { src: '/assets/images/wedding/DSC_0573.jpeg', alt: 'A romantic candid', span: '' },
  {
    src: '/assets/images/wedding/DSC_0657.jpeg',
    alt: 'Nikita and Daniel walking together',
    span: 'col-span-2',
  },
  { src: '/assets/images/wedding/DSC08489.jpg', alt: 'Nikita and Daniel at sunset', span: '' },
];

export default function GalleryMoodSection() {
  const sectionRef = useReveal();
  const [lightbox, setLightbox] = useState<number | null>(null);

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

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="relative overflow-hidden section-bg-dark-alt px-6 py-24 md:px-12"
      >
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid items-start gap-12 lg:grid-cols-[0.64fr_1.36fr] lg:gap-16">
            <div className="reveal">
              <span className="section-kicker">Our story</span>
              <TextReveal
                as="h2"
                delay={120}
                className="mt-5 text-5xl font-display leading-[0.9] text-ivory-deep md:text-6xl lg:text-7xl"
              >
                How we arrived here
              </TextReveal>

              <div className="mt-8 border-t border-white/10 pt-8">
                <p className="text-xl leading-relaxed text-ivory-deep/92 md:text-2xl">
                  Swart was the surname. Colour was the gift.
                </p>
                <p className="mt-6 text-lg leading-relaxed text-muted-light">
                  These are a few of the photographs we kept returning to while planning the day.
                </p>
              </div>
            </div>

            <div className="reveal reveal-delay-2">
              <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-3">
                {galleryImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setLightbox(index)}
                    className={`${image.span} group relative overflow-hidden rounded-[1.35rem] text-left`}
                  >
                    <AppImage
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center px-6"
          style={{ background: 'rgba(10, 10, 13, 0.94)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white"
            style={{ background: 'rgba(245, 239, 231, 0.08)' }}
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
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full text-white/50 transition-colors hover:text-white md:left-8"
            style={{ background: 'rgba(245, 239, 231, 0.08)' }}
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
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full text-white/50 transition-colors hover:text-white md:right-8"
            style={{ background: 'rgba(245, 239, 231, 0.08)' }}
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

          <div className="max-h-[85vh] max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <AppImage
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-h-[85vh] max-w-full rounded-2xl object-contain"
              width={1200}
              height={800}
              quality={90}
            />
          </div>
        </div>
      )}
    </>
  );
}
