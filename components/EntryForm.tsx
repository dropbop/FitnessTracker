'use client';

import { useState } from 'react';
import { ExerciseEntry, CreateEntryInput, ExerciseCategory } from '@/lib/types';

type AppMode = 'demo' | 'real';

interface EntryFormProps {
  date: string;
  entry?: ExerciseEntry;
  mode: AppMode;
  onSave: (entry: ExerciseEntry) => void;
  onDemoSave: (formData: {
    exercise_date: string;
    category: ExerciseCategory;
    sub_exercise: string;
    notes_quantitative: string | null;
    notes_qualitative: string | null;
  }) => void;
  onCancel: () => void;
}

export default function EntryForm({
  date,
  entry,
  mode,
  onSave,
  onDemoSave,
  onCancel,
}: EntryFormProps) {
  const [category, setCategory] = useState<ExerciseCategory>(entry?.category || 'lifting');
  const [subExercise, setSubExercise] = useState(entry?.sub_exercise || '');
  const [notesQuantitative, setNotesQuantitative] = useState(entry?.notes_quantitative || '');
  const [notesQualitative, setNotesQualitative] = useState(entry?.notes_qualitative || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subExercise.trim()) {
      setError('Exercise name is required');
      return;
    }

    setError('');

    const formData = {
      exercise_date: date,
      category,
      sub_exercise: subExercise.trim(),
      notes_quantitative: notesQuantitative.trim() || null,
      notes_qualitative: notesQualitative.trim() || null,
    };

    // Demo mode - just call the callback, no API
    if (mode === 'demo') {
      onDemoSave(formData);
      return;
    }

    // Real mode - call API
    setLoading(true);

    try {
      const body: CreateEntryInput = formData;

      const url = entry ? `/api/entries/${entry.id}` : '/api/entries';
      const method = entry ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const savedEntry = await res.json();
        onSave(savedEntry);
      } else if (res.status === 401) {
        setError('Not authenticated');
      } else {
        setError('Failed to save entry');
      }
    } catch {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          className="block text-sm mb-1 uppercase tracking-wider"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}
        >
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ExerciseCategory)}
        >
          <option value="lifting">Lifting</option>
          <option value="cardio">Cardio</option>
        </select>
      </div>

      <div>
        <label
          className="block text-sm mb-1 uppercase tracking-wider"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}
        >
          Exercise
        </label>
        <input
          type="text"
          value={subExercise}
          onChange={(e) => setSubExercise(e.target.value)}
          placeholder="e.g., Bench Press, Treadmill, Push Ups"
        />
      </div>

      <div>
        <label
          className="block text-sm mb-1 uppercase tracking-wider"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}
        >
          Quantitative Notes
        </label>
        <input
          type="text"
          value={notesQuantitative}
          onChange={(e) => setNotesQuantitative(e.target.value)}
          placeholder="e.g., 3x10 @ 135lbs, 30 min, 50 reps"
        />
      </div>

      <div>
        <label
          className="block text-sm mb-1 uppercase tracking-wider"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}
        >
          Qualitative Notes
        </label>
        <textarea
          value={notesQualitative}
          onChange={(e) => setNotesQualitative(e.target.value)}
          placeholder="e.g., Felt strong today, need to work on form"
          rows={2}
        />
      </div>

      {error && (
        <p className="text-[var(--color-accent)] text-sm">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary flex-1"
        >
          {loading ? 'SAVING...' : entry ? 'UPDATE' : 'ADD ENTRY'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn"
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}
