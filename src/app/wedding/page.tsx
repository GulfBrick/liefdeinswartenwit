'use client';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginPage from '@/components/LoginPage';
import SplashAnimation from '@/components/SplashAnimation';
import HeroSection from './components/HeroSection';
import DetailsSection from './components/DetailsSection';
import GalleryMoodSection from './components/GalleryMoodSection';
import ProgrammeSection from './components/ProgrammeSection';
import AccommodationSection from './components/AccommodationSection';
import RSVPSection from './components/RSVPSection';
import DotsSection from './components/DotsSection';

export default function WeddingPage() {
  const { isAuthenticated, isLoading, showSplash } = useAuth();

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#0A0A0F' }}
      >
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#9CA3AF' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <>
      <SplashAnimation />
      {!showSplash && (
        <div className="grain-overlay">
          <Header />
          <main>
            <HeroSection />
            <DetailsSection />
            <ProgrammeSection />
            <AccommodationSection />
            <GalleryMoodSection />
            <DotsSection />
            <RSVPSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
