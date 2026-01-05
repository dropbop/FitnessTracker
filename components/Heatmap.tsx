'use client';

import { useMemo } from 'react';
import {
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  format,
  getDay,
  startOfWeek,
  addDays,
} from 'date-fns';
import { ExerciseEntry, ExerciseCategory } from '@/lib/types';

interface HeatmapProps {
  entries: ExerciseEntry[];
  category: ExerciseCategory;
  year: number;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// Day labels - show only Mon, Wed, Fri to avoid crowding
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const SQUARE_SIZE = 11;
const SQUARE_GAP = 3;

function getColorForCount(count: number, category: ExerciseCategory): string {
  if (count === 0) return '#1a1a1a';

  if (category === 'lifting') {
    if (count === 1) return '#1e3a5f';
    if (count === 2) return '#1d4ed8';
    if (count === 3) return '#2563eb';
    return '#3b82f6';
  } else {
    if (count === 1) return '#14532d';
    if (count === 2) return '#15803d';
    if (count === 3) return '#16a34a';
    return '#22c55e';
  }
}

export default function Heatmap({ entries, category, year }: HeatmapProps) {
  const yearStart = startOfYear(new Date(year, 0, 1));
  const yearEnd = endOfYear(new Date(year, 0, 1));

  // Build map of date -> count for this category
  const countByDate = useMemo(() => {
    const map: Record<string, number> = {};
    entries
      .filter((e) => e.category === category)
      .forEach((e) => {
        const date = e.exercise_date;
        map[date] = (map[date] || 0) + 1;
      });
    return map;
  }, [entries, category]);

  // Get the first day to display (Sunday of the week containing Jan 1)
  const firstSunday = startOfWeek(yearStart, { weekStartsOn: 0 });

  // Generate all days from first Sunday through end of year
  const allDays = useMemo(() => {
    return eachDayOfInterval({ start: firstSunday, end: yearEnd });
  }, [firstSunday, yearEnd]);

  // Calculate total weeks
  const totalWeeks = Math.ceil(allDays.length / 7);

  // Build the grid data: array of days in column-first order
  // CSS Grid with grid-auto-flow: column will place them correctly
  const gridDays = useMemo(() => {
    const days: (Date | null)[] = [];

    for (let weekIndex = 0; weekIndex < totalWeeks; weekIndex++) {
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const dayIndex = weekIndex * 7 + dayOfWeek;
        const day = allDays[dayIndex];

        // Only include days that are in the target year
        if (day && day.getFullYear() === year) {
          days.push(day);
        } else if (day && day < yearStart) {
          // Days before Jan 1 - show as empty
          days.push(null);
        } else {
          days.push(null);
        }
      }
    }

    return days;
  }, [allDays, totalWeeks, year, yearStart]);

  // Calculate which week index each month starts at
  const monthLabels = useMemo(() => {
    const labels: (string | null)[] = Array(totalWeeks).fill(null);
    let currentMonth = -1;

    for (let weekIndex = 0; weekIndex < totalWeeks; weekIndex++) {
      // Check the first day of this week that's in our year
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const dayIndex = weekIndex * 7 + dayOfWeek;
        const day = allDays[dayIndex];

        if (day && day.getFullYear() === year) {
          const month = day.getMonth();
          if (month !== currentMonth) {
            labels[weekIndex] = MONTHS[month];
            currentMonth = month;
          }
          break;
        }
      }
    }

    return labels;
  }, [allDays, totalWeeks, year]);

  const categoryLabel = category === 'lifting' ? 'LIFTING' : 'CARDIO';
  const categoryColor = category === 'lifting' ? 'var(--color-lifting)' : 'var(--color-cardio)';

  // Calculate grid dimensions for inline styles
  const gridWidth = totalWeeks * SQUARE_SIZE + (totalWeeks - 1) * SQUARE_GAP;

  return (
    <div className="panel p-4">
      <h3
        className="text-lg mb-4"
        style={{ fontFamily: 'var(--font-heading)', color: categoryColor }}
      >
        {categoryLabel} - {year}
      </h3>

      <div className="overflow-x-auto pb-2">
        {/* Main grid container */}
        <div
          style={{
            display: 'inline-grid',
            gridTemplateAreas: `"empty months" "days squares"`,
            gridTemplateColumns: 'auto 1fr',
            gap: '4px',
          }}
        >
          {/* Empty top-left cell */}
          <div style={{ gridArea: 'empty' }} />

          {/* Month labels */}
          <div
            style={{
              gridArea: 'months',
              display: 'grid',
              gridTemplateColumns: `repeat(${totalWeeks}, ${SQUARE_SIZE}px)`,
              gap: `${SQUARE_GAP}px`,
              fontSize: '10px',
              color: 'var(--color-text-muted)',
            }}
          >
            {monthLabels.map((label, i) => (
              <div key={i} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>
                {label || ''}
              </div>
            ))}
          </div>

          {/* Day labels (Sun-Sat, but only show Mon, Wed, Fri) */}
          <div
            style={{
              gridArea: 'days',
              display: 'grid',
              gridTemplateRows: `repeat(7, ${SQUARE_SIZE}px)`,
              gap: `${SQUARE_GAP}px`,
              fontSize: '10px',
              color: 'var(--color-text-muted)',
              paddingRight: '4px',
            }}
          >
            {DAY_LABELS.map((label, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  height: `${SQUARE_SIZE}px`,
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Squares grid - THE KEY: grid-auto-flow: column */}
          <div
            style={{
              gridArea: 'squares',
              display: 'grid',
              gridAutoFlow: 'column',
              gridAutoColumns: `${SQUARE_SIZE}px`,
              gridTemplateRows: `repeat(7, ${SQUARE_SIZE}px)`,
              gap: `${SQUARE_GAP}px`,
            }}
          >
            {gridDays.map((day, i) => {
              if (!day) {
                return (
                  <div
                    key={i}
                    style={{
                      width: SQUARE_SIZE,
                      height: SQUARE_SIZE,
                      background: 'transparent',
                    }}
                  />
                );
              }

              const dateStr = format(day, 'yyyy-MM-dd');
              const count = countByDate[dateStr] || 0;
              const color = getColorForCount(count, category);

              return (
                <div
                  key={i}
                  style={{
                    width: SQUARE_SIZE,
                    height: SQUARE_SIZE,
                    background: color,
                    borderRadius: '2px',
                  }}
                  title={`${format(day, 'MMM d, yyyy')}: ${count} ${category} ${count === 1 ? 'entry' : 'entries'}`}
                />
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '12px',
            fontSize: '11px',
            color: 'var(--color-text-muted)',
          }}
        >
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              style={{
                width: SQUARE_SIZE,
                height: SQUARE_SIZE,
                background: getColorForCount(level, category),
                borderRadius: '2px',
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
