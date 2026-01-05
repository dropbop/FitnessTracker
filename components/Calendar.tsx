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
import { getInitialDemoEntries, getNextDemoId } from '@/lib/demoData';
import { ChevronLeftIcon, ChevronRightIcon, LiftingIcon, CardioIcon } from './Icons';
import DayModal from './DayModal';
import AuthPrompt from './AuthPrompt';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type AppMode = 'demo' | 'real';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [mode, setMode] = useState<AppMode>('demo');
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [entries, setEntries] = useState<ExerciseEntry[]>([]);
  const [demoEntries, setDemoEntries] = useState<ExerciseEntry[]>(() => getInitialDemoEntries());
  const [today, setToday] = useState<Date | null>(null);

  // Set today on client side only (for correct timezone)
  useEffect(() => {
    setToday(new Date());
  }, []);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch entries when month changes (only in real mode)
  useEffect(() => {
    if (mode === 'real') {
      fetchMonthEntries();
    }
  }, [currentMonth, mode]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();
      setMode(data.mode as AppMode);
    } catch {
      setMode('demo');
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

  // Get the appropriate entries based on mode
  const activeEntries = mode === 'demo' ? demoEntries : entries;

  const getEntriesForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return activeEntries.filter((e) => e.exercise_date === dateStr);
  };

  // Demo mode CRUD handlers
  const handleDemoAdd = (entry: Omit<ExerciseEntry, 'id' | 'created_at'>) => {
    const newEntry: ExerciseEntry = {
      ...entry,
      id: getNextDemoId(),
      created_at: new Date().toISOString(),
    };
    setDemoEntries((prev) => [newEntry, ...prev]);
    return newEntry;
  };

  const handleDemoUpdate = (id: number, updates: Partial<ExerciseEntry>) => {
    setDemoEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const handleDemoDelete = (id: number) => {
    setDemoEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    setMode('demo');
    setEntries([]);
  };

  const handleLoginSuccess = () => {
    setMode('real');
    setShowAuthPrompt(false);
    fetchMonthEntries();
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
      {/* Demo Mode Banner */}
      {mode === 'demo' && (
        <div
          className="mb-4 p-3 text-center border-2"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-accent-orange)',
            color: 'var(--color-accent-orange)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          DEMO MODE - Changes are not saved
        </div>
      )}

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
        {mode === 'real' ? (
          <button
            onClick={handleLogout}
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
            Login
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
          mode={mode}
          entries={getEntriesForDate(selectedDate)}
          onClose={() => setSelectedDate(null)}
          onAuthRequired={() => setShowAuthPrompt(true)}
          onEntriesChanged={fetchMonthEntries}
          onDemoAdd={handleDemoAdd}
          onDemoUpdate={handleDemoUpdate}
          onDemoDelete={handleDemoDelete}
        />
      )}

      {/* Auth Prompt */}
      {showAuthPrompt && (
        <AuthPrompt
          onSuccess={handleLoginSuccess}
          onClose={() => setShowAuthPrompt(false)}
        />
      )}
    </div>
  );
}
