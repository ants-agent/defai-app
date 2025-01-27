import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';


import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import AuthProviders from '@/components/provider-auth';
import { ThemeProvider } from '@/components/provider-theme';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import GoogleAnalytics from '@/components/google-analytics'

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | DEFAI @Ants AI',
    default: 'DEFAI @Ants AI - Decentralize the Bridge between AI and Blockchain World',
  },
  description: 'Decentralize the Bridge between AI and Blockchain World',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable}`,
          'overflow-x-hidden antialiased',
        )}
      >
        <AuthProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="overflow-hidden md:overflow-visible">
              {children}
              <Toaster /> 
            </main>
          </ThemeProvider>
        </AuthProviders>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

// https://ui.shadcn.com/docs/components/sonner 