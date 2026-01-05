'use client';

import { useState, useEffect } from 'react';
import { ExerciseEntry } from '@/lib/types';
import Heatmap from '@/components/Heatmap';

const YEAR = 2026;

export default function StatsPage() {
  const [entries, setEntries] = useState<ExerciseEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchYearEntries();
  }, []);

  const fetchYearEntries = async () => {
    try {
      const res = await fetch(`/api/entries?year=${YEAR}`);
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (error) {
      console.error('Failed to fetch entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const liftingCount = entries.filter((e) => e.category === 'lifting').length;
  const cardioCount = entries.filter((e) => e.category === 'cardio').length;

  return (
    <div>
      <h1
        className="text-2xl md:text-3xl mb-6"
        style={{ color: 'var(--color-accent-yellow)' }}
      >
        {YEAR} Stats
      </h1>

      {loading ? (
        <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
      ) : (
        <>
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="panel p-4 text-center">
              <div
                className="text-3xl font-bold"
                style={{ color: 'var(--color-lifting)', fontFamily: 'var(--font-heading)' }}
              >
                {liftingCount}
              </div>
              <div style={{ color: 'var(--color-text-muted)' }}>Lifting Entries</div>
            </div>
            <div className="panel p-4 text-center">
              <div
                className="text-3xl font-bold"
                style={{ color: 'var(--color-cardio)', fontFamily: 'var(--font-heading)' }}
              >
                {cardioCount}
              </div>
              <div style={{ color: 'var(--color-text-muted)' }}>Cardio Entries</div>
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
