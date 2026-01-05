import type { Metadata } from "next";
import { Bebas_Neue, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const bebasNeue = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "FITNESSTRACKER",
  description: "Track your lifting and cardio workouts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${robotoCondensed.variable}`}>
        <header
          className="border-b-[6px] relative"
          style={{
            background: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)',
            borderColor: 'var(--color-accent)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          {/* Hazard stripe overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,204,0,0.02) 10px, rgba(255,204,0,0.02) 20px)',
            }}
          />
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between relative">
            <Link href="/" className="flex items-center gap-3">
              <span
                className="text-3xl tracking-wider"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-accent)',
                  letterSpacing: '0.1em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(204,0,0,0.3)',
                }}
              >
                FITNESSTRACKER
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-lg tracking-wider transition-colors hover:text-[var(--color-accent)]"
                style={{
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.08em',
                }}
              >
                CALENDAR
              </Link>
              <Link
                href="/stats"
                className="text-lg tracking-wider transition-colors hover:text-[var(--color-accent)]"
                style={{
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.08em',
                }}
              >
                STATS
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
