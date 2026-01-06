'use client';

import { useState, useEffect } from 'react';
import { ExerciseMetadata, ExerciseCategory } from '@/lib/types';
import { DEMO_EXERCISE_METADATA, getNextDemoMetadataId } from '@/lib/demoData';
import { LiftingIcon, CardioIcon, EditIcon, DeleteIcon, PlusIcon, CloseIcon } from '@/components/Icons';

type AppMode = 'demo' | 'real';

export default function ExercisesPage() {
  const [mode, setMode] = useState<AppMode>('demo');
  const [exercises, setExercises] = useState<ExerciseMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState<ExerciseMetadata | null>(null);

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    try {
      const authRes = await fetch('/api/auth/check');
      const authData = await authRes.json();
      const currentMode = authData.mode as AppMode;
      setMode(currentMode);

      if (currentMode === 'real') {
        const exercisesRes = await fetch('/api/exercises');
        if (exercisesRes.ok) {
          const data = await exercisesRes.json();
          setExercises(data);
        }
      } else {
        setExercises([...DEMO_EXERCISE_METADATA]);
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      setMode('demo');
      setExercises([...DEMO_EXERCISE_METADATA]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingExercise(null);
    setShowForm(true);
  };

  const handleEdit = (exercise: ExerciseMetadata) => {
    setEditingExercise(exercise);
    setShowForm(true);
  };

  const handleDelete = async (exercise: ExerciseMetadata) => {
    if (!confirm(`Delete "${exercise.exercise_name}"?`)) return;

    if (mode === 'demo') {
      setExercises(exercises.filter(e => e.id !== exercise.id));
      return;
    }

    try {
      const res = await fetch(`/api/exercises/${exercise.id}`, { method: 'DELETE' });
      if (res.ok) {
        setExercises(exercises.filter(e => e.id !== exercise.id));
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleSave = async (data: { exercise_name: string; category: ExerciseCategory; targets: string[] }) => {
    if (mode === 'demo') {
      if (editingExercise) {
        setExercises(exercises.map(e =>
          e.id === editingExercise.id
            ? { ...e, ...data, updated_at: new Date().toISOString() }
            : e
        ));
      } else {
        const newExercise: ExerciseMetadata = {
          id: getNextDemoMetadataId(),
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setExercises([...exercises, newExercise]);
      }
      setShowForm(false);
      setEditingExercise(null);
      return;
    }

    try {
      const url = editingExercise ? `/api/exercises/${editingExercise.id}` : '/api/exercises';
      const method = editingExercise ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const saved = await res.json();
        if (editingExercise) {
          setExercises(exercises.map(e => e.id === saved.id ? saved : e));
        } else {
          setExercises([...exercises, saved]);
        }
        setShowForm(false);
        setEditingExercise(null);
      }
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  const liftingExercises = exercises.filter(e => e.category === 'lifting');
  const cardioExercises = exercises.filter(e => e.category === 'cardio');

  return (
    <div>
      {/* Demo Mode Banner */}
      {mode === 'demo' && (
        <div className="demo-banner mb-3 p-2 text-center">
          <span style={{ marginRight: '8px' }}>⚠️</span>
          DEMO MODE — SHOWING SAMPLE DATA
        </div>
      )}

      {/* Page Header */}
      <div className="panel" style={{ marginBottom: '16px' }}>
        <div
          className="panel-header"
          style={{
            borderTop: '3px solid var(--color-vb-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px' }}>🏋️</span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--size-2xl)',
                color: 'var(--color-accent-orange)',
                letterSpacing: '2px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,102,0,0.3)',
              }}
            >
              EXERCISE LIBRARY
            </span>
          </div>
          <button
            onClick={handleAdd}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <PlusIcon style={{ fontSize: '12px' }} />
            Add Exercise
          </button>
        </div>

        <div className="panel-body">
          {loading ? (
            <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: 'var(--size-md)' }}>
              Loading exercises...
            </p>
          ) : (
            <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: 'var(--size-sm)' }}>
              Define target muscle groups for each exercise to enable advanced stats and heatmaps.
            </p>
          )}
        </div>
      </div>

      {/* Exercise Lists */}
      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Lifting Exercises */}
          <ExerciseList
            title="LIFTING"
            exercises={liftingExercises}
            category="lifting"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Cardio Exercises */}
          <ExerciseList
            title="CARDIO"
            exercises={cardioExercises}
            category="cardio"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <ExerciseForm
          exercise={editingExercise}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingExercise(null);
          }}
        />
      )}
    </div>
  );
}

// Exercise List Component
function ExerciseList({
  title,
  exercises,
  category,
  onEdit,
  onDelete,
}: {
  title: string;
  exercises: ExerciseMetadata[];
  category: ExerciseCategory;
  onEdit: (exercise: ExerciseMetadata) => void;
  onDelete: (exercise: ExerciseMetadata) => void;
}) {
  const categoryColor = category === 'lifting' ? 'var(--color-lifting)' : 'var(--color-cardio)';

  return (
    <div className="panel">
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
          {title}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--size-sm)',
            color: 'var(--color-text-muted)',
            marginLeft: 'auto',
          }}
        >
          {exercises.length} exercise{exercises.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="panel-body" style={{ padding: 0 }}>
        {exercises.length === 0 ? (
          <div style={{ padding: '12px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: 'var(--size-sm)' }}>
            No {category} exercises defined yet.
          </div>
        ) : (
          exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className={index % 2 === 0 ? '' : ''}
              style={{
                padding: '10px 12px',
                borderBottom: index < exercises.length - 1 ? '1px solid var(--color-border)' : 'none',
                background: index % 2 === 0 ? 'var(--color-bg-lighter)' : 'var(--color-bg-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--size-md)',
                    fontWeight: 'bold',
                    color: 'var(--color-text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {exercise.exercise_name}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {exercise.targets.map((target, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'var(--color-bg-deepest)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '2px',
                        padding: '1px 6px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--size-xs)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {target}
                    </span>
                  ))}
                  {exercise.targets.length === 0 && (
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--size-xs)',
                        color: 'var(--color-text-dark)',
                        fontStyle: 'italic',
                      }}
                    >
                      No targets defined
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                <button
                  onClick={() => onEdit(exercise)}
                  className="btn"
                  style={{ padding: '4px 8px' }}
                  title="Edit"
                >
                  <EditIcon style={{ fontSize: '12px' }} />
                </button>
                <button
                  onClick={() => onDelete(exercise)}
                  className="btn btn-danger"
                  style={{ padding: '4px 8px' }}
                  title="Delete"
                >
                  <DeleteIcon style={{ fontSize: '12px' }} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Exercise Form Modal
function ExerciseForm({
  exercise,
  onSave,
  onCancel,
}: {
  exercise: ExerciseMetadata | null;
  onSave: (data: { exercise_name: string; category: ExerciseCategory; targets: string[] }) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(exercise?.exercise_name || '');
  const [category, setCategory] = useState<ExerciseCategory>(exercise?.category || 'lifting');
  const [targets, setTargets] = useState<string[]>(exercise?.targets || []);
  const [newTarget, setNewTarget] = useState('');
  const [error, setError] = useState('');

  const handleAddTarget = () => {
    const trimmed = newTarget.trim().toLowerCase();
    if (trimmed && !targets.includes(trimmed)) {
      setTargets([...targets, trimmed]);
      setNewTarget('');
    }
  };

  const handleRemoveTarget = (target: string) => {
    setTargets(targets.filter(t => t !== target));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Exercise name is required');
      return;
    }
    onSave({ exercise_name: name.trim(), category, targets });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTarget();
    }
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onCancel} />
      <div className="modal-content">
        <div className="modal-header">
          <h2>{exercise ? 'Edit Exercise' : 'Add Exercise'}</h2>
          <button
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: '4px',
            }}
          >
            <CloseIcon style={{ fontSize: '16px' }} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {/* Exercise Name */}
            <div style={{ marginBottom: '12px' }}>
              <label className="form-label">Exercise Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Bench Press, Squats, Running"
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-md)' }}
              />
            </div>

            {/* Category */}
            <div style={{ marginBottom: '12px' }}>
              <label className="form-label">Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExerciseCategory)}
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-md)' }}
              >
                <option value="lifting">Lifting</option>
                <option value="cardio">Cardio</option>
              </select>
            </div>

            {/* Targets */}
            <div style={{ marginBottom: '12px' }}>
              <label className="form-label">Targets:</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., chest, legs, cardio"
                  style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: 'var(--size-md)' }}
                />
                <button
                  type="button"
                  onClick={handleAddTarget}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px' }}
                >
                  Add
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {targets.map((target, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'var(--color-bg-deepest)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      padding: '2px 8px',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--size-sm)',
                      color: 'var(--color-text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {target}
                    <button
                      type="button"
                      onClick={() => handleRemoveTarget(target)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-text-muted)',
                        padding: 0,
                        fontSize: '12px',
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
                {targets.length === 0 && (
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--size-xs)',
                      color: 'var(--color-text-dark)',
                      fontStyle: 'italic',
                    }}
                  >
                    No targets added yet
                  </span>
                )}
              </div>
            </div>

            {/* Error */}
            {error && (
              <p style={{
                color: 'var(--color-accent-red)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--size-sm)',
                marginBottom: '10px',
              }}>
                {error}
              </p>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                {exercise ? 'Update' : 'Add Exercise'}
              </button>
              <button type="button" onClick={onCancel} className="btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
