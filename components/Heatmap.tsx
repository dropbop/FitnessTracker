'use client';

import { useMemo } from 'react';
import {
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  format,
  getDay,
  startOfWeek,
  differenceInWeeks,
} from 'date-fns';
import { ExerciseEntry, ExerciseCategory } from '@/lib/types';

interface HeatmapProps {
  entries: ExerciseEntry[];
  category: ExerciseCategory;
  year: number;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Mon', '', 'Wed', '', 'Fri', '', ''];

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

  // Generate all days for the year
  const allDays = useMemo(() => {
    return eachDayOfInterval({ start: yearStart, end: yearEnd });
  }, [yearStart, yearEnd]);

  // Get the first Sunday of the year (or before if year doesn't start on Sunday)
  const firstWeekStart = startOfWeek(yearStart, { weekStartsOn: 0 });

  // Calculate weeks
  const weeks = useMemo(() => {
    const weekMap: { weekIndex: number; day: Date; dayOfWeek: number }[] = [];

    allDays.forEach((day) => {
      const weekIndex = differenceInWeeks(startOfWeek(day, { weekStartsOn: 0 }), firstWeekStart);
      const dayOfWeek = getDay(day); // 0 = Sunday, 6 = Saturday
      weekMap.push({ weekIndex, day, dayOfWeek });
    });

    return weekMap;
  }, [allDays, firstWeekStart]);

  // Find max week index
  const maxWeek = Math.max(...weeks.map((w) => w.weekIndex));

  // Build grid: weekIndex -> dayOfWeek -> day
  const grid = useMemo(() => {
    const g: (Date | null)[][] = Array.from({ length: maxWeek + 1 }, () =>
      Array(7).fill(null)
    );

    weeks.forEach(({ weekIndex, day, dayOfWeek }) => {
      g[weekIndex][dayOfWeek] = day;
    });

    return g;
  }, [weeks, maxWeek]);

  // Calculate month label positions
  const monthLabels = useMemo(() => {
    const labels: { month: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach(({ weekIndex, day }) => {
      const month = day.getMonth();
      if (month !== lastMonth) {
        labels.push({ month: MONTHS[month], weekIndex });
        lastMonth = month;
      }
    });

    return labels;
  }, [weeks]);

  const categoryLabel = category === 'lifting' ? 'LIFTING' : 'CARDIO';
  const categoryColor = category === 'lifting' ? 'var(--color-lifting)' : 'var(--color-cardio)';

  return (
    <div className="panel p-4">
      <h3
        className="text-lg mb-4"
        style={{ fontFamily: 'var(--font-heading)', color: categoryColor }}
      >
        {categoryLabel} - {year}
      </h3>

      <div className="overflow-x-auto">
        <div style={{ minWidth: '750px' }}>
          {/* Month labels */}
          <div className="flex mb-1 ml-8">
            {monthLabels.map((m, i) => (
              <div
                key={i}
                className="text-xs"
                style={{
                  color: 'var(--color-text-muted)',
                  position: 'absolute',
                  left: `${m.weekIndex * 14 + 32}px`,
                }}
              >
                {m.month}
              </div>
            ))}
          </div>

          <div className="flex mt-6">
            {/* Day labels */}
            <div className="flex flex-col gap-[2px] mr-2">
              {DAYS.map((day, i) => (
                <div
                  key={i}
                  className="h-[12px] text-xs flex items-center justify-end pr-1"
                  style={{ color: 'var(--color-text-muted)', width: '24px' }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-[2px]">
              {grid.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px]">
                  {week.map((day, dayIndex) => {
                    if (!day) {
                      return (
                        <div
                          key={dayIndex}
                          className="w-[12px] h-[12px]"
                          style={{ background: 'transparent' }}
                        />
                      );
                    }

                    const dateStr = format(day, 'yyyy-MM-dd');
                    const count = countByDate[dateStr] || 0;
                    const color = getColorForCount(count, category);

                    return (
                      <div
                        key={dayIndex}
                        className="w-[12px] h-[12px]"
                        style={{ background: color }}
                        title={`${format(day, 'MMM d, yyyy')}: ${count} ${category} ${count === 1 ? 'entry' : 'entries'}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="w-[12px] h-[12px]"
                style={{ background: getColorForCount(level, category) }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
