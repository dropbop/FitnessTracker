import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import TimeDisplay from "@/components/TimeDisplay";

export const metadata: Metadata = {
  title: "IRONTRACK",
  description: "Track your lifting and cardio workouts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Forum-style header with gradient and blue accent */}
        <header
          style={{
            background: 'linear-gradient(180deg, #2a3a5a 0%, #1a2540 50%, #0f1525 100%)',
            borderBottom: '2px solid var(--color-vb-blue)',
          }}
        >
          <div className="desktop-container" style={{ maxWidth: '1024px', margin: '0 auto', padding: '12px 16px' }}>
            {/* Logo and user area */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--size-3xl)',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,102,0,0.3)',
                  }}
                >
                  <span style={{ color: 'var(--color-accent-orange)' }}>IRON</span>
                  <span style={{ color: 'var(--color-text-primary)' }}>TRACK</span>
                </div>
              </Link>

              {/* User status placeholder */}
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--size-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ color: 'var(--color-text-muted)' }}>Fitness Tracker v1.0</span>
              </div>
            </div>

            {/* Navigation bar - forum style tabs */}
            <nav
              style={{
                display: 'flex',
                gap: '2px',
                backgroundColor: 'rgba(0,0,0,0.3)',
                padding: '0 8px',
                borderRadius: '3px',
              }}
            >
              <NavTab href="/" label="Calendar" />
              <NavTab href="/stats" label="Stats" />
            </nav>
          </div>
        </header>

        <main className="desktop-container" style={{ maxWidth: '1024px', margin: '0 auto', padding: '16px' }}>
          {children}
        </main>

        {/* Forum-style footer */}
        <footer
          style={{
            backgroundColor: 'var(--color-bg-deepest)',
            borderTop: '1px solid var(--color-border)',
            padding: '12px',
            marginTop: '32px',
          }}
        >
          <div
            style={{
              maxWidth: '1024px',
              margin: '0 auto',
              textAlign: 'center',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--size-xs)',
              color: 'var(--color-text-darkest)',
            }}
            className="desktop-container"
          >
            All times are CST. The time now is{' '}
            <TimeDisplay />
          </div>
        </footer>
      </body>
    </html>
  );
}

// Navigation tab component with forum styling
function NavTab({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        padding: '8px 16px',
        color: 'var(--color-vb-blue-light)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--size-md)',
        textDecoration: 'none',
        transition: 'background 0.1s, color 0.1s',
      }}
      className="nav-tab"
    >
      {label}
    </Link>
  );
}

