'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { ExerciseEntry } from '@/lib/types';
import { ChevronLeftIcon, ChevronRightIcon, LiftingIcon, CardioIcon } from './Icons';
import DayModal from './DayModal';
import AuthPrompt from './AuthPrompt';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [entries, setEntries] = useState<ExerciseEntry[]>([]);
  const [today, setToday] = useState<Date | null>(null);

  // Set today on client side only (for correct timezone)
  useEffect(() => {
    setToday(new Date());
  }, []);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch entries when month changes
  useEffect(() => {
    fetchMonthEntries();
  }, [currentMonth]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const fetchMonthEntries = async () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;

    try {
      const res = await fetch(`/api/entries?year=${year}&month=${month}`);
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (error) {
      console.error('Failed to fetch entries:', error);
    }
  };

  const goToPreviousMonth = useCallback(() => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNextMonth,
    onSwipedRight: goToPreviousMonth,
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  const getEntriesForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return entries.filter((e) => e.exercise_date === dateStr);
  };

  const renderCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days: React.ReactNode[] = [];
    let day = startDate;

    while (day <= endDate) {
      const currentDay = day;
      const isCurrentMonth = isSameMonth(day, currentMonth);
      const isToday = today ? isSameDay(day, today) : false;
      const dayEntries = getEntriesForDate(day);
      const hasLifting = dayEntries.some((e) => e.category === 'lifting');
      const hasCardio = dayEntries.some((e) => e.category === 'cardio');

      days.push(
        <button
          key={day.toISOString()}
          onClick={() => setSelectedDate(currentDay)}
          className={`
            relative p-2 min-h-[60px] md:min-h-[80px] border-2 transition-colors
            ${isCurrentMonth ? '' : 'opacity-30'}
            ${isToday ? 'border-[var(--color-accent-yellow)]' : 'border-[var(--color-border)]'}
            hover:border-[var(--color-border-light)] hover:bg-[var(--color-surface-hover)]
          `}
          style={{ background: 'var(--color-surface)' }}
        >
          <span
            className={`
              absolute top-1 left-2 text-sm font-bold
              ${isToday ? 'text-[var(--color-accent-yellow)]' : ''}
            `}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {format(day, 'd')}
          </span>
          <div className="absolute bottom-1 left-1 flex gap-1">
            {hasLifting && (
              <LiftingIcon className="text-lg text-[var(--color-lifting)]" />
            )}
            {hasCardio && (
              <CardioIcon className="text-lg text-[var(--color-cardio)]" />
            )}
          </div>
        </button>
      );

      day = addDays(day, 1);
    }

    return days;
  };

  return (
    <div {...swipeHandlers}>
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="btn p-3"
          aria-label="Previous month"
        >
          <ChevronLeftIcon className="text-xl" />
        </button>
        <h1
          className="text-2xl md:text-3xl"
          style={{ color: 'var(--color-accent-yellow)' }}
        >
          {format(currentMonth, 'MMMM yyyy')}
        </h1>
        <button
          onClick={goToNextMonth}
          className="btn p-3"
          aria-label="Next month"
        >
          <ChevronRightIcon className="text-xl" />
        </button>
      </div>

      {/* Auth Status */}
      <div className="flex justify-end mb-4">
        {isAuthenticated ? (
          <button
            onClick={async () => {
              await fetch('/api/auth', { method: 'DELETE' });
              setIsAuthenticated(false);
            }}
            className="text-sm hover:text-[var(--color-accent-red)] transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => setShowAuthPrompt(true)}
            className="text-sm hover:text-[var(--color-accent-yellow)] transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Login to Edit
          </button>
        )}
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-sm py-2 font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-muted)' }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>

      {/* Legend */}
      <div className="flex gap-6 mt-6 justify-center text-sm">
        <div className="flex items-center gap-2">
          <LiftingIcon className="text-lg text-[var(--color-lifting)]" />
          <span>Lifting</span>
        </div>
        <div className="flex items-center gap-2">
          <CardioIcon className="text-lg text-[var(--color-cardio)]" />
          <span>Cardio</span>
        </div>
      </div>

      {/* Day Modal */}
      {selectedDate && (
        <DayModal
          date={selectedDate}
          isAuthenticated={isAuthenticated}
          onClose={() => setSelectedDate(null)}
          onAuthRequired={() => setShowAuthPrompt(true)}
          onEntriesChanged={fetchMonthEntries}
        />
      )}

      {/* Auth Prompt */}
      {showAuthPrompt && (
        <AuthPrompt
          onSuccess={() => {
            setIsAuthenticated(true);
            setShowAuthPrompt(false);
          }}
          onClose={() => setShowAuthPrompt(false)}
        />
      )}
    </div>
  );
}
