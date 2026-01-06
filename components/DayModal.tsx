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
      <div className="modal-content">
        {/* Modal Header - Forum style with gradient */}
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📅</span>
            {displayDate}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '2px 6px',
              fontSize: 'var(--size-lg)',
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
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
                <p
                  style={{
                    color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--size-md)',
                    marginBottom: '12px',
                    fontStyle: 'italic',
                  }}
                >
                  No entries for this day.
                </p>
              ) : (
                <div style={{ marginBottom: '12px', maxHeight: '240px', overflowY: 'auto' }}>
                  {entries.map((entry, index) => (
                    <div
                      key={entry.id}
                      style={{
                        padding: '8px 10px',
                        // Zebra striping
                        backgroundColor: index % 2 === 0 ? 'var(--color-bg-lighter)' : 'var(--color-bg-light)',
                        borderBottom: index < entries.length - 1 ? '1px solid var(--color-border)' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          {/* Category badge and icon */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            {entry.category === 'lifting' ? (
                              <LiftingIcon style={{ fontSize: '14px', color: 'var(--color-lifting-light)' }} />
                            ) : (
                              <CardioIcon style={{ fontSize: '14px', color: 'var(--color-cardio-light)' }} />
                            )}
                            <span className={entry.category === 'lifting' ? 'badge-lifting' : 'badge-cardio'}>
                              {entry.category}
                            </span>
                          </div>

                          {/* Exercise name */}
                          <p
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--size-md)',
                              fontWeight: 'bold',
                              color: 'var(--color-text-primary)',
                              marginBottom: '2px',
                            }}
                          >
                            {entry.sub_exercise}
                          </p>

                          {/* Quantitative notes */}
                          {entry.notes_quantitative && (
                            <p
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--size-sm)',
                                color: 'var(--color-accent-orange)',
                              }}
                            >
                              {entry.notes_quantitative}
                            </p>
                          )}

                          {/* Qualitative notes - quote box style */}
                          {entry.notes_qualitative && (
                            <div
                              style={{
                                marginTop: '4px',
                                paddingLeft: '8px',
                                borderLeft: '2px solid var(--color-vb-blue)',
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--size-sm)',
                                color: 'var(--color-text-muted)',
                                fontStyle: 'italic',
                              }}
                            >
                              {entry.notes_qualitative}
                            </div>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                          <button
                            onClick={() => handleEditClick(entry)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--color-vb-blue-light)',
                              cursor: 'pointer',
                              padding: '2px',
                              fontSize: 'var(--size-lg)',
                            }}
                            title="Edit"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(entry)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--color-accent-red)',
                              cursor: 'pointer',
                              padding: '2px',
                              fontSize: 'var(--size-lg)',
                            }}
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

              {/* Add Entry Button - Glossy secondary style */}
              <button
                onClick={handleAddClick}
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <PlusIcon style={{ fontSize: '14px' }} />
                Add Entry
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
