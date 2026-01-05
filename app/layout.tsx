import type { Metadata } from "next";
import { Oswald, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "FitnessTracker",
  description: "Track your lifting and cardio workouts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${robotoCondensed.variable}`}>
        <header className="panel border-b-2 border-t-0 border-x-0" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-2xl font-bold tracking-wide" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent-yellow)' }}>
                FITNESSTRACKER
              </span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm uppercase tracking-wider hover:text-[var(--color-accent-yellow)] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Calendar
              </Link>
              <Link
                href="/stats"
                className="text-sm uppercase tracking-wider hover:text-[var(--color-accent-yellow)] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Stats
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
