'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import {
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  format,
  startOfWeek,
} from 'date-fns';
import { ExerciseEntry, ExerciseCategory } from '@/lib/types';
import { LiftingIcon, CardioIcon } from './Icons';

interface HeatmapProps {
  entries: ExerciseEntry[];
  category: ExerciseCategory;
  year: number;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// Day labels - show only Mon, Wed, Fri to avoid crowding
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

// Responsive sizing constraints
const MIN_SQUARE_SIZE = 5;
const MAX_SQUARE_SIZE = 14;
const SQUARE_GAP = 2;
const DAY_LABEL_WIDTH = 30; // Space for "Mon", "Wed", "Fri" labels

function getColorForCount(count: number, category: ExerciseCategory): string {
  if (count === 0) return 'var(--color-bg-deepest)';

  if (category === 'lifting') {
    // Red shades for lifting
    if (count === 1) return '#4a1515';
    if (count === 2) return '#7a2020';
    if (count === 3) return '#aa2b2b';
    return '#cc3333';
  } else {
    // Yellow/gold shades for cardio
    if (count === 1) return '#4a3d15';
    if (count === 2) return '#7a6620';
    if (count === 3) return '#aa8f2b';
    return '#cc9900';
  }
}

export default function Heatmap({ entries, category, year }: HeatmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [squareSize, setSquareSize] = useState(MIN_SQUARE_SIZE);

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

  // Calculate responsive square size based on container width
  useEffect(() => {
    const calculateSize = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      // Available width = container - day labels - padding - gaps between weeks
      const availableWidth = containerWidth - DAY_LABEL_WIDTH - 16 - (totalWeeks - 1) * SQUARE_GAP;
      const calculatedSize = Math.floor(availableWidth / totalWeeks);

      // Clamp between min and max
      const clampedSize = Math.max(MIN_SQUARE_SIZE, Math.min(MAX_SQUARE_SIZE, calculatedSize));
      setSquareSize(clampedSize);
    };

    calculateSize();

    // Recalculate on resize
    const resizeObserver = new ResizeObserver(calculateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [totalWeeks]);

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

  return (
    <div className="panel">
      {/* Panel Header - Forum style with category accent */}
      <div
        className="panel-header"
        style={{
          borderTop: `3px solid ${categoryColor}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {category === 'lifting'
          ? <LiftingIcon style={{ fontSize: '14px', color: categoryColor }} />
          : <CardioIcon style={{ fontSize: '14px', color: categoryColor }} />
        }
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--size-xl)',
            color: categoryColor,
            letterSpacing: '2px',
          }}
        >
          {categoryLabel} — {year}
        </span>
      </div>

      {/* Panel Body */}
      <div ref={containerRef} className="panel-body" style={{ paddingBottom: '8px' }}>
        {/* Main grid container - centered */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-grid',
              gridTemplateAreas: `"empty months" "days squares"`,
              gridTemplateColumns: `${DAY_LABEL_WIDTH}px 1fr`,
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
                gridTemplateColumns: `repeat(${totalWeeks}, ${squareSize}px)`,
                gap: `${SQUARE_GAP}px`,
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--size-xs)',
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
                gridTemplateRows: `repeat(7, ${squareSize}px)`,
                gap: `${SQUARE_GAP}px`,
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--size-xs)',
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
                    height: `${squareSize}px`,
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
                gridAutoColumns: `${squareSize}px`,
                gridTemplateRows: `repeat(7, ${squareSize}px)`,
                gap: `${SQUARE_GAP}px`,
              }}
            >
              {gridDays.map((day, i) => {
                if (!day) {
                  return (
                    <div
                      key={i}
                      style={{
                        width: squareSize,
                        height: squareSize,
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
                      width: squareSize,
                      height: squareSize,
                      background: color,
                      borderRadius: '2px',
                      border: '1px solid rgba(0,0,0,0.3)',
                    }}
                    title={`${format(day, 'MMM d, yyyy')}: ${count} ${category} ${count === 1 ? 'entry' : 'entries'}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend - centered */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '12px',
            paddingTop: '8px',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--size-xs)',
              color: 'var(--color-text-muted)',
            }}
          >
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                style={{
                  width: squareSize,
                  height: squareSize,
                  background: getColorForCount(level, category),
                  borderRadius: '2px',
                  border: '1px solid rgba(0,0,0,0.3)',
                }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
