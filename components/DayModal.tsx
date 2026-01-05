'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ExerciseEntry } from '@/lib/types';
import { CloseIcon, EditIcon, DeleteIcon, PlusIcon, LiftingIcon, CardioIcon } from './Icons';
import EntryForm from './EntryForm';

type AppMode = 'demo' | 'real';

interface DayModalProps {
  date: Date;
  mode: AppMode;
  entries: ExerciseEntry[];
  onClose: () => void;
  onAuthRequired: () => void;
  onEntriesChanged: () => void;
  onDemoAdd: (entry: Omit<ExerciseEntry, 'id' | 'created_at'>) => ExerciseEntry;
  onDemoUpdate: (id: number, updates: Partial<ExerciseEntry>) => void;
  onDemoDelete: (id: number) => void;
}

export default function DayModal({
  date,
  mode,
  entries,
  onClose,
  onAuthRequired,
  onEntriesChanged,
  onDemoAdd,
  onDemoUpdate,
  onDemoDelete,
}: DayModalProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ExerciseEntry | null>(null);

  const dateStr = format(date, 'yyyy-MM-dd');
  const displayDate = format(date, 'EEEE, MMMM d, yyyy');

  const handleAddClick = () => {
    setEditingEntry(null);
    setShowForm(true);
  };

  const handleEditClick = (entry: ExerciseEntry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleDeleteClick = async (entry: ExerciseEntry) => {
    if (!confirm('Delete this entry?')) return;

    if (mode === 'demo') {
      onDemoDelete(entry.id);
    } else {
      // Real mode - call API
      try {
        const res = await fetch(`/api/entries/${entry.id}`, { method: 'DELETE' });
        if (res.ok) {
          onEntriesChanged();
        }
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  };

  const handleSave = (savedEntry: ExerciseEntry) => {
    // This is called from EntryForm after a successful save
    // In demo mode, we handle it here; in real mode, EntryForm handles API
    setShowForm(false);
    setEditingEntry(null);
    if (mode === 'real') {
      onEntriesChanged();
    }
  };

  const handleDemoSave = (formData: {
    exercise_date: string;
    category: 'lifting' | 'cardio';
    sub_exercise: string;
    notes_quantitative: string | null;
    notes_qualitative: string | null;
  }) => {
    if (editingEntry) {
      onDemoUpdate(editingEntry.id, formData);
    } else {
      onDemoAdd(formData);
    }
    setShowForm(false);
    setEditingEntry(null);
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content panel p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl" style={{ color: 'var(--color-accent)', letterSpacing: '0.05em' }}>
            {displayDate.toUpperCase()}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:text-[var(--color-accent)] transition-colors"
          >
            <CloseIcon className="text-xl" />
          </button>
        </div>

        {showForm ? (
          <EntryForm
            date={dateStr}
            entry={editingEntry || undefined}
            mode={mode}
            onSave={handleSave}
            onDemoSave={handleDemoSave}
            onCancel={() => {
              setShowForm(false);
              setEditingEntry(null);
            }}
          />
        ) : (
          <>
            {entries.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)' }} className="mb-4">
                No entries for this day.
              </p>
            ) : (
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3 border-2"
                    style={{
                      borderColor: 'var(--color-border)',
                      background: 'var(--color-bg)',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {entry.category === 'lifting' ? (
                            <LiftingIcon className="text-lg text-[var(--color-lifting)]" />
                          ) : (
                            <CardioIcon className="text-lg text-[var(--color-cardio)]" />
                          )}
                          <span
                            className={entry.category === 'lifting' ? 'badge-lifting' : 'badge-cardio'}
                          >
                            {entry.category}
                          </span>
                        </div>
                        <p className="font-semibold" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.03em' }}>
                          {entry.sub_exercise.toUpperCase()}
                        </p>
                        {entry.notes_quantitative && (
                          <p className="text-sm" style={{ color: 'var(--color-warning)' }}>
                            {entry.notes_quantitative}
                          </p>
                        )}
                        {entry.notes_qualitative && (
                          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            {entry.notes_qualitative}
                          </p>
                        )}
                      </div>
                      {/* Edit/delete buttons - same for both modes */}
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleEditClick(entry)}
                          className="p-1 hover:text-[var(--color-warning)] transition-colors"
                          title="Edit"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(entry)}
                          className="p-1 hover:text-[var(--color-accent)] transition-colors"
                          title="Delete"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button onClick={handleAddClick} className="btn btn-secondary w-full flex items-center justify-center gap-2">
              <PlusIcon />
              Add Entry
            </button>
          </>
        )}
      </div>
    </>
  );
}
