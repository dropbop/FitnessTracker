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
    <form onSubmit={handleSubmit}>
      {/* Category Select */}
      <div style={{ marginBottom: '10px' }}>
        <label
          className="form-label"
          style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-sm)' }}
        >
          Category:
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ExerciseCategory)}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--size-md)',
          }}
        >
          <option value="lifting">Lifting</option>
          <option value="cardio">Cardio</option>
        </select>
      </div>

      {/* Exercise Name */}
      <div style={{ marginBottom: '10px' }}>
        <label
          className="form-label"
          style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-sm)' }}
        >
          Exercise:
        </label>
        <input
          type="text"
          value={subExercise}
          onChange={(e) => setSubExercise(e.target.value)}
          placeholder="e.g., Bench Press, Treadmill, Push Ups"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--size-md)',
          }}
        />
      </div>

      {/* Quantitative Notes */}
      <div style={{ marginBottom: '10px' }}>
        <label
          className="form-label"
          style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-sm)' }}
        >
          Quantitative Notes:
        </label>
        <input
          type="text"
          value={notesQuantitative}
          onChange={(e) => setNotesQuantitative(e.target.value)}
          placeholder="e.g., 3x10 @ 135lbs, 30 min, 50 reps"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--size-md)',
          }}
        />
      </div>

      {/* Qualitative Notes */}
      <div style={{ marginBottom: '10px' }}>
        <label
          className="form-label"
          style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-sm)' }}
        >
          Qualitative Notes:
        </label>
        <textarea
          value={notesQualitative}
          onChange={(e) => setNotesQualitative(e.target.value)}
          placeholder="e.g., Felt strong today, need to work on form"
          rows={2}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--size-md)',
            resize: 'vertical',
          }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p
          style={{
            color: 'var(--color-accent-red)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--size-sm)',
            marginBottom: '10px',
          }}
        >
          {error}
        </p>
      )}

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ flex: 1 }}
        >
          {loading ? 'Saving...' : entry ? 'Update' : 'Add Entry'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
