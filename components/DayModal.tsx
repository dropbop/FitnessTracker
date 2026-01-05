'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ExerciseEntry } from '@/lib/types';
import { CloseIcon, EditIcon, DeleteIcon, PlusIcon, LiftingIcon, CardioIcon } from './Icons';
import EntryForm from './EntryForm';

interface DayModalProps {
  date: Date;
  isAuthenticated: boolean;
  onClose: () => void;
  onAuthRequired: () => void;
  onEntriesChanged: () => void;
}

export default function DayModal({
  date,
  isAuthenticated,
  onClose,
  onAuthRequired,
  onEntriesChanged,
}: DayModalProps) {
  const [entries, setEntries] = useState<ExerciseEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ExerciseEntry | null>(null);

  const dateStr = format(date, 'yyyy-MM-dd');
  const displayDate = format(date, 'EEEE, MMMM d, yyyy');

  useEffect(() => {
    fetchEntries();
  }, [dateStr]);

  const fetchEntries = async () => {
    try {
      const res = await fetch(`/api/entries?date=${dateStr}`);
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

  const handleAddClick = () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }
    setEditingEntry(null);
    setShowForm(true);
  };

  const handleEditClick = (entry: ExerciseEntry) => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleDeleteClick = async (entry: ExerciseEntry) => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    if (!confirm('Delete this entry?')) return;

    try {
      const res = await fetch(`/api/entries/${entry.id}`, { method: 'DELETE' });
      if (res.ok) {
        setEntries(entries.filter((e) => e.id !== entry.id));
        onEntriesChanged();
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleSave = (savedEntry: ExerciseEntry) => {
    if (editingEntry) {
      setEntries(entries.map((e) => (e.id === savedEntry.id ? savedEntry : e)));
    } else {
      setEntries([savedEntry, ...entries]);
    }
    setShowForm(false);
    setEditingEntry(null);
    onEntriesChanged();
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content panel p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl" style={{ color: 'var(--color-accent-yellow)' }}>
            {displayDate}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:text-[var(--color-accent-red)] transition-colors"
          >
            <CloseIcon className="text-xl" />
          </button>
        </div>

        {showForm ? (
          <EntryForm
            date={dateStr}
            entry={editingEntry || undefined}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingEntry(null);
            }}
          />
        ) : (
          <>
            {loading ? (
              <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
            ) : entries.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)' }} className="mb-4">
                No entries for this day.
              </p>
            ) : (
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3 border-2"
                    style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {entry.category === 'lifting' ? (
                            <LiftingIcon className="text-[var(--color-lifting)]" />
                          ) : (
                            <CardioIcon className="text-[var(--color-cardio)]" />
                          )}
                          <span
                            className={entry.category === 'lifting' ? 'badge-lifting' : 'badge-cardio'}
                          >
                            {entry.category}
                          </span>
                        </div>
                        <p className="font-semibold">{entry.sub_exercise}</p>
                        {entry.notes_quantitative && (
                          <p className="text-sm" style={{ color: 'var(--color-accent-yellow)' }}>
                            {entry.notes_quantitative}
                          </p>
                        )}
                        {entry.notes_qualitative && (
                          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            {entry.notes_qualitative}
                          </p>
                        )}
                      </div>
                      {isAuthenticated && (
                        <div className="flex gap-1 flex-shrink-0">
                          <button
                            onClick={() => handleEditClick(entry)}
                            className="p-1 hover:text-[var(--color-accent-yellow)] transition-colors"
                            title="Edit"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(entry)}
                            className="p-1 hover:text-[var(--color-accent-red)] transition-colors"
                            title="Delete"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      )}
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
