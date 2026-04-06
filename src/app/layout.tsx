import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import { AuthProvider } from '@/context/AuthContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Nikita & Daniel — 3 October 2026',
  description:
    'You are invited to celebrate the wedding of Nikita & Daniel at Featherwood Farm on 3 October 2026. RSVP, accommodation info, and more.',
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: [{ url: '/assets/images/app_logo.png', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="af">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
