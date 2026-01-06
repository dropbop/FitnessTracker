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
        <div className="demo-banner mb-3 p-2 text-center">
          <span style={{ marginRight: '8px' }}>⚠️</span>
          DEMO MODE — SHOWING SAMPLE DATA
        </div>
      )}

      {/* Page Header - Forum style */}
      <div
        className="panel"
        style={{ marginBottom: '16px' }}
      >
        <div
          className="panel-header"
          style={{
            borderTop: '3px solid var(--color-vb-blue)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '14px' }}>📊</span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--size-2xl)',
              color: 'var(--color-accent-orange)',
              letterSpacing: '2px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,102,0,0.3)',
            }}
          >
            {YEAR} STATS
          </span>
        </div>

        <div className="panel-body">
          {loading ? (
            <p
              style={{
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--size-md)',
              }}
            >
              Loading stats...
            </p>
          ) : (
            /* Summary Stats - Forum widget style */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {/* Lifting Stats */}
              <div
                style={{
                  backgroundColor: 'var(--color-bg-light)',
                  border: '1px solid var(--color-border)',
                  borderTop: '3px solid var(--color-lifting)',
                  borderRadius: '3px',
                  padding: '12px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--size-3xl)',
                    color: 'var(--color-lifting)',
                    letterSpacing: '2px',
                  }}
                >
                  {liftingCount}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--size-xs)',
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                  }}
                >
                  Lifting Entries
                </div>
              </div>

              {/* Cardio Stats */}
              <div
                style={{
                  backgroundColor: 'var(--color-bg-light)',
                  border: '1px solid var(--color-border)',
                  borderTop: '3px solid var(--color-cardio)',
                  borderRadius: '3px',
                  padding: '12px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--size-3xl)',
                    color: 'var(--color-cardio)',
                    letterSpacing: '2px',
                  }}
                >
                  {cardioCount}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--size-xs)',
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                  }}
                >
                  Cardio Entries
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Heatmaps */}
      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Heatmap entries={entries} category="lifting" year={YEAR} />
          <Heatmap entries={entries} category="cardio" year={YEAR} />
        </div>
      )}
    </div>
  );
}
