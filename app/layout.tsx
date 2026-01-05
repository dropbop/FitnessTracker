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
          className="border-b-4"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-accent)',
          }}
        >
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span
                className="text-3xl tracking-wider"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-accent)',
                  letterSpacing: '0.1em',
                }}
              >
                FITNESSTRACKER
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-lg tracking-wider transition-colors"
                style={{
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.08em',
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text)'}
              >
                CALENDAR
              </Link>
              <Link
                href="/stats"
                className="text-lg tracking-wider transition-colors"
                style={{
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.08em',
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text)'}
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
