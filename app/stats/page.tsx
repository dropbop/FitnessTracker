'use client';

import { useState, useEffect } from 'react';
import { ExerciseEntry } from '@/lib/types';
import { DEMO_ENTRIES } from '@/lib/demoData';
import Heatmap from '@/components/Heatmap';

const YEAR = 2026;

type AppMode = 'demo' | 'real';

export default function StatsPage() {
  const [mode, setMode] = useState<AppMode>('demo');
  const [entries, setEntries] = useState<ExerciseEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    try {
      const authRes = await fetch('/api/auth/check');
      const authData = await authRes.json();
      const currentMode = authData.mode as AppMode;
      setMode(currentMode);

      if (currentMode === 'real') {
        const entriesRes = await fetch(`/api/entries?year=${YEAR}`);
        if (entriesRes.ok) {
          const data = await entriesRes.json();
          setEntries(data);
        }
      } else {
        // Demo mode - use demo entries
        setEntries(DEMO_ENTRIES);
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      // Fall back to demo mode
      setMode('demo');
      setEntries(DEMO_ENTRIES);
    } finally {
      setLoading(false);
    }
  };

  const liftingCount = entries.filter((e) => e.category === 'lifting').length;
  const cardioCount = entries.filter((e) => e.category === 'cardio').length;

  return (
    <div>
      {/* Demo Mode Banner */}
      {mode === 'demo' && (
        <div className="demo-banner mb-4 p-3 text-center">
          DEMO MODE — SHOWING SAMPLE DATA
        </div>
      )}

      <h1
        className="text-3xl md:text-4xl mb-6"
        style={{ color: 'var(--color-accent)', letterSpacing: '0.08em' }}
      >
        {YEAR} STATS
      </h1>

      {loading ? (
        <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
      ) : (
        <>
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="panel p-4 text-center" style={{ borderTop: '3px solid #cc0000' }}>
              <div
                className="text-4xl"
                style={{ color: '#cc0000', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}
              >
                {liftingCount}
              </div>
              <div
                className="uppercase tracking-wider text-sm mt-1"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}
              >
                Lifting Entries
              </div>
            </div>
            <div className="panel p-4 text-center" style={{ borderTop: '3px solid #ffcc00' }}>
              <div
                className="text-4xl"
                style={{ color: '#ffcc00', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}
              >
                {cardioCount}
              </div>
              <div
                className="uppercase tracking-wider text-sm mt-1"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}
              >
                Cardio Entries
              </div>
            </div>
          </div>

          {/* Heatmaps */}
          <div className="space-y-6">
            <Heatmap entries={entries} category="lifting" year={YEAR} />
            <Heatmap entries={entries} category="cardio" year={YEAR} />
          </div>
        </>
      )}
    </div>
  );
}
