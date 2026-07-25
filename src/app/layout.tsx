import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'ProSmack — Branding Redefined',
  description: 'Handcrafted premium digital experiences, cinematic branding, and strategic advertising solutions that command attention and scale authority.',
  keywords: [
    'ProSmack',
    'Branding Agency',
    'Advertising Agency',
    'Personal Branding',
    'Creative Production',
    'Social Media Marketing',
    'Video Production',
    'Interactive Website Design',
  ],
  authors: [{ name: 'ProSmack Studio' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-accent selection:text-foreground">
        {children}
      </body>
    </html>
  );
}
