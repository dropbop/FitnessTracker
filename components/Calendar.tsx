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
    let dayIndex = 0;

    while (day <= endDate) {
      const currentDay = day;
      const isCurrentMonth = isSameMonth(day, currentMonth);
      const isToday = today ? isSameDay(day, today) : false;
      const dayEntries = getEntriesForDate(day);
      const hasLifting = dayEntries.some((e) => e.category === 'lifting');
      const hasCardio = dayEntries.some((e) => e.category === 'cardio');
      const isWeekend = day.getDay() === 0 || day.getDay() === 6;

      days.push(
        <button
          key={day.toISOString()}
          onClick={() => setSelectedDate(currentDay)}
          className="calendar-day"
          style={{
            position: 'relative',
            padding: '6px',
            minHeight: '72px',
            border: '1px solid var(--color-border)',
            borderRadius: '2px',
            cursor: 'pointer',
            textAlign: 'left',
            verticalAlign: 'top',
            // Zebra striping based on row
            backgroundColor: isToday
              ? 'var(--color-vb-blue)'
              : dayIndex % 2 === 0
                ? 'var(--color-bg-lighter)'
                : 'var(--color-bg-light)',
            opacity: isCurrentMonth ? 1 : 0.3,
            transition: 'background 0.1s',
          }}
          onMouseEnter={(e) => {
            if (!isToday) {
              e.currentTarget.style.backgroundColor = 'var(--color-bg-lightest)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isToday) {
              e.currentTarget.style.backgroundColor = dayIndex % 2 === 0
                ? 'var(--color-bg-lighter)'
                : 'var(--color-bg-light)';
            }
          }}
        >
          {/* Day number */}
          <span
            style={{
              position: 'absolute',
              top: '2px',
              left: '4px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--size-sm)',
              fontWeight: isToday ? 'bold' : 'normal',
              color: isToday
                ? 'var(--color-text-primary)'
                : isWeekend
                  ? 'var(--color-accent-red)'
                  : 'var(--color-text-secondary)',
            }}
          >
            {format(day, 'd')}
          </span>

          {/* Activity indicators */}
          <div style={{ position: 'absolute', bottom: '4px', left: '6px', display: 'flex', gap: '4px' }}>
            {hasLifting && (
              <LiftingIcon style={{ fontSize: '24px', color: 'var(--color-lifting-light)' }} />
            )}
            {hasCardio && (
              <CardioIcon style={{ fontSize: '24px', color: 'var(--color-cardio-light)' }} />
            )}
          </div>
        </button>
      );

      day = addDays(day, 1);
      dayIndex++;
    }

    return days;
  };

  return (
    <div {...swipeHandlers}>
      {/* Demo Mode Banner - Forum warning style */}
      {mode === 'demo' && (
        <div className="demo-banner mb-3 p-2 text-center">
          <span style={{ marginRight: '8px' }}>⚠️</span>
          DEMO MODE — CHANGES NOT SAVED
        </div>
      )}

      {/* Month Navigation - Forum panel style */}
      <div
        className="panel"
        style={{ marginBottom: '12px' }}
      >
        <div
          className="panel-header"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {/* Previous month button */}
          <button
            onClick={goToPreviousMonth}
            className="btn"
            style={{ padding: '4px 10px' }}
            aria-label="Previous month"
          >
            <ChevronLeftIcon style={{ fontSize: '14px' }} />
          </button>

          {/* Month/Year title */}
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--size-2xl)',
              color: 'var(--color-accent-orange)',
              letterSpacing: '2px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,102,0,0.3)',
            }}
          >
            {format(currentMonth, 'MMMM yyyy').toUpperCase()}
          </span>

          {/* Next month button */}
          <button
            onClick={goToNextMonth}
            className="btn"
            style={{ padding: '4px 10px' }}
            aria-label="Next month"
          >
            <ChevronRightIcon style={{ fontSize: '14px' }} />
          </button>
        </div>

        <div className="panel-body" style={{ padding: '8px' }}>
          {/* Auth Status */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
            {mode === 'real' ? (
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-vb-blue-light)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--size-sm)',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setShowAuthPrompt(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-vb-blue-light)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--size-sm)',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Login
              </button>
            )}
          </div>

          {/* Weekday Headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '2px' }}>
            {WEEKDAYS.map((day, i) => (
              <div
                key={day}
                style={{
                  textAlign: 'center',
                  padding: '4px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--size-xs)',
                  fontWeight: 'bold',
                  color: i === 0 || i === 6 ? 'var(--color-accent-red)' : 'var(--color-text-muted)',
                  backgroundColor: 'var(--color-bg-deepest)',
                  borderRadius: '2px',
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {renderCalendarDays()}
          </div>

          {/* Legend */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              marginTop: '12px',
              paddingTop: '8px',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'var(--color-vb-blue)',
                  marginRight: '4px',
                }}
              />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-xs)', color: 'var(--color-text-dark)' }}>
                Today
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <LiftingIcon style={{ fontSize: '12px', color: 'var(--color-lifting-light)' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-xs)', color: 'var(--color-text-dark)' }}>
                Lifting
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CardioIcon style={{ fontSize: '12px', color: 'var(--color-cardio-light)' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-xs)', color: 'var(--color-text-dark)' }}>
                Cardio
              </span>
            </div>
          </div>
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
