'use client';

import { useState, useEffect, useMemo } from 'react';
import { Compound, CompoundDose, CalculatedDoseRow, CreateCompoundInput } from '@/lib/types';
import { eachDayOfInterval, parseISO, format } from 'date-fns';
import DoseChart from '@/components/DoseChart';
import CompoundTable from '@/components/CompoundTable';
import { EditIcon, DeleteIcon, PlusIcon, CloseIcon } from '@/components/Icons';

type AppMode = 'demo' | 'real';

function calculateDoses(
  startDate: string,
  halfLife: number,
  doses: CompoundDose[],
  endDate: string
): CalculatedDoseRow[] {
  const doseMap = new Map(doses.map(d => [d.dose_date, d.dose_amount]));
  const rows: CalculatedDoseRow[] = [];

  const start = parseISO(startDate);
  const end = parseISO(endDate);

  if (start > end) return rows;

  const days = eachDayOfInterval({ start, end });
  let activeDose = 0;

  days.forEach((day, index) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const addedDose = doseMap.get(dateStr) || 0;

    // Add new dose to the decayed amount from previous day
    activeDose = activeDose + addedDose;

    // Calculate what the dose will decay to by next day
    const calculatedNext = activeDose * Math.pow(0.5, 1 / halfLife);

    rows.push({
      date: dateStr,
      index: index + 1,
      activeDose,
      calculatedNext,
      addedDose,
    });

    // Carry forward the decayed dose for the next iteration
    activeDose = calculatedNext;
  });

  return rows;
}

export default function CompoundsPage() {
  const [mode, setMode] = useState<AppMode>('demo');
  const [loading, setLoading] = useState(true);
  const [compounds, setCompounds] = useState<Compound[]>([]);
  const [selectedCompound, setSelectedCompound] = useState<Compound | null>(null);
  const [doses, setDoses] = useState<CompoundDose[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCompound, setEditingCompound] = useState<Compound | null>(null);
  const [futureDays, setFutureDays] = useState(30);

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
        const compoundsRes = await fetch('/api/compounds');
        if (compoundsRes.ok) {
          const data = await compoundsRes.json();
          setCompounds(data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      setMode('demo');
    } finally {
      setLoading(false);
    }
  };

  const fetchDoses = async (compoundId: number) => {
    try {
      const res = await fetch(`/api/compounds/${compoundId}/doses`);
      if (res.ok) {
        const data = await res.json();
        setDoses(data);
      }
    } catch (error) {
      console.error('Failed to fetch doses:', error);
    }
  };

  const handleSelectCompound = (compound: Compound) => {
    setSelectedCompound(compound);
    fetchDoses(compound.id);
  };

  const handleAdd = () => {
    setEditingCompound(null);
    setShowForm(true);
  };

  const handleEdit = (compound: Compound) => {
    setEditingCompound(compound);
    setShowForm(true);
  };

  const handleDelete = async (compound: Compound) => {
    if (!confirm(`Delete "${compound.name}"? All dose data will be lost.`)) return;

    try {
      const res = await fetch(`/api/compounds/${compound.id}`, { method: 'DELETE' });
      if (res.ok) {
        setCompounds(compounds.filter(c => c.id !== compound.id));
        if (selectedCompound?.id === compound.id) {
          setSelectedCompound(null);
          setDoses([]);
        }
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleSave = async (data: CreateCompoundInput) => {
    try {
      const url = editingCompound ? `/api/compounds/${editingCompound.id}` : '/api/compounds';
      const method = editingCompound ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const saved = await res.json();
        if (editingCompound) {
          setCompounds(compounds.map(c => c.id === saved.id ? saved : c));
          if (selectedCompound?.id === saved.id) {
            setSelectedCompound(saved);
          }
        } else {
          setCompounds([saved, ...compounds]);
        }
        setShowForm(false);
        setEditingCompound(null);
      }
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  const handleDoseChange = async (date: string, amount: number) => {
    if (!selectedCompound) return;

    try {
      const res = await fetch(`/api/compounds/${selectedCompound.id}/doses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dose_date: date, dose_amount: amount }),
      });

      if (res.ok) {
        const saved = await res.json();
        setDoses(prev => {
          const existing = prev.findIndex(d => d.dose_date === saved.dose_date);
          if (existing >= 0) {
            const updated = [...prev];
            updated[existing] = saved;
            return updated;
          }
          return [...prev, saved].sort((a, b) => a.dose_date.localeCompare(b.dose_date));
        });
      }
    } catch (error) {
      console.error('Failed to save dose:', error);
    }
  };

  const endDate = useMemo(() => {
    const future = new Date();
    future.setDate(future.getDate() + futureDays);
    return format(future, 'yyyy-MM-dd');
  }, [futureDays]);

  const calculatedData = useMemo(() => {
    if (!selectedCompound) return [];
    return calculateDoses(selectedCompound.start_date, selectedCompound.half_life, doses, endDate);
  }, [selectedCompound, doses, endDate]);

  // Require login
  if (!loading && mode === 'demo') {
    return (
      <div className="panel">
        <div
          className="panel-header"
          style={{
            borderTop: '3px solid var(--color-vb-blue)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '14px' }}>🧪</span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--size-2xl)',
              color: 'var(--color-accent-orange)',
              letterSpacing: '2px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,102,0,0.3)',
            }}
          >
            COMPOUND TRACKER
          </span>
        </div>
        <div className="panel-body">
          <div className="alert alert-warning">
            <span>🔒</span>
            <span>Login required to access the Compound Tracker. This feature is not available in demo mode.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
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
            <span style={{ fontSize: '14px' }}>🧪</span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--size-2xl)',
                color: 'var(--color-accent-orange)',
                letterSpacing: '2px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,102,0,0.3)',
              }}
            >
              COMPOUND TRACKER
            </span>
          </div>
          <button
            onClick={handleAdd}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <PlusIcon style={{ fontSize: '12px' }} />
            Add Compound
          </button>
        </div>
        <div className="panel-body">
          {loading ? (
            <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: 'var(--size-md)' }}>
              Loading compounds...
            </p>
          ) : (
            <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: 'var(--size-sm)' }}>
              Track medication doses and visualize active amounts based on half-life decay.
            </p>
          )}
        </div>
      </div>

      {/* Compound List */}
      {!loading && (
        <div className="panel" style={{ marginBottom: '16px' }}>
          <div
            className="panel-header"
            style={{
              borderTop: '3px solid var(--color-accent-green)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--size-xl)',
                color: 'var(--color-accent-green)',
                letterSpacing: '2px',
              }}
            >
              COMPOUNDS
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--size-sm)',
                color: 'var(--color-text-muted)',
                marginLeft: 'auto',
              }}
            >
              {compounds.length} compound{compounds.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="panel-body" style={{ padding: 0 }}>
            {compounds.length === 0 ? (
              <div style={{ padding: '12px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: 'var(--size-sm)' }}>
                No compounds defined yet. Click &quot;Add Compound&quot; to get started.
              </div>
            ) : (
              compounds.map((compound, index) => (
                <div
                  key={compound.id}
                  onClick={() => handleSelectCompound(compound)}
                  style={{
                    padding: '10px 12px',
                    borderBottom: index < compounds.length - 1 ? '1px solid var(--color-border)' : 'none',
                    background: selectedCompound?.id === compound.id
                      ? 'var(--color-bg-lightest)'
                      : index % 2 === 0
                        ? 'var(--color-bg-lighter)'
                        : 'var(--color-bg-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    cursor: 'pointer',
                    borderLeft: selectedCompound?.id === compound.id
                      ? '3px solid var(--color-vb-blue)'
                      : '3px solid transparent',
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
                      {compound.name}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      <span
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
                        t½: {compound.half_life} days
                      </span>
                      <span
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
                        Start: {format(parseISO(compound.start_date), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleEdit(compound)}
                      className="btn"
                      style={{ padding: '4px 8px' }}
                      title="Edit"
                    >
                      <EditIcon style={{ fontSize: '12px' }} />
                    </button>
                    <button
                      onClick={() => handleDelete(compound)}
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
      )}

      {/* Selected Compound Details */}
      {selectedCompound && (
        <div className="panel">
          <div
            className="panel-header"
            style={{
              borderTop: '3px solid var(--color-vb-blue)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--size-xl)',
                color: 'var(--color-vb-blue-light)',
                letterSpacing: '2px',
              }}
            >
              {selectedCompound.name.toUpperCase()}
            </span>
            <div
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--size-sm)',
                  color: 'var(--color-text-muted)',
                }}
              >
                t½: {selectedCompound.half_life}d
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <label
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--size-xs)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Forecast:
                </label>
                <select
                  value={futureDays}
                  onChange={(e) => setFutureDays(parseInt(e.target.value))}
                  style={{
                    padding: '2px 6px',
                    fontSize: 'var(--size-xs)',
                    width: 'auto',
                  }}
                >
                  <option value={7}>7 days</option>
                  <option value={14}>14 days</option>
                  <option value={30}>30 days</option>
                  <option value={60}>60 days</option>
                  <option value={90}>90 days</option>
                </select>
              </div>
            </div>
          </div>
          <div className="panel-body">
            {/* Chart */}
            <div style={{ marginBottom: '16px' }}>
              <DoseChart data={calculatedData} compoundName={selectedCompound.name} />
            </div>

            {/* Table */}
            <div
              style={{
                borderTop: '1px solid var(--color-border)',
                paddingTop: '12px',
                maxHeight: '400px',
                overflowY: 'auto',
              }}
            >
              <CompoundTable data={calculatedData} onDoseChange={handleDoseChange} />
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <CompoundForm
          compound={editingCompound}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingCompound(null);
          }}
        />
      )}
    </div>
  );
}

// Compound Form Modal
function CompoundForm({
  compound,
  onSave,
  onCancel,
}: {
  compound: Compound | null;
  onSave: (data: CreateCompoundInput) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(compound?.name || '');
  const [halfLife, setHalfLife] = useState(compound?.half_life?.toString() || '');
  const [startDate, setStartDate] = useState(compound?.start_date || format(new Date(), 'yyyy-MM-dd'));
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Compound name is required');
      return;
    }
    const hl = parseFloat(halfLife);
    if (!hl || hl <= 0) {
      setError('Half-life must be a positive number');
      return;
    }
    if (!startDate) {
      setError('Start date is required');
      return;
    }
    onSave({ name: name.trim(), half_life: hl, start_date: startDate });
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onCancel} />
      <div className="modal-content">
        <div className="modal-header">
          <h2>{compound ? 'Edit Compound' : 'Add Compound'}</h2>
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
            {/* Compound Name */}
            <div style={{ marginBottom: '12px' }}>
              <label className="form-label">Compound Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Compound A, Caffeine, etc."
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-md)' }}
              />
            </div>

            {/* Half-life */}
            <div style={{ marginBottom: '12px' }}>
              <label className="form-label">Half-life (days):</label>
              <input
                type="number"
                value={halfLife}
                onChange={(e) => setHalfLife(e.target.value)}
                placeholder="e.g., 1.5"
                step="any"
                min="0.01"
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-md)' }}
              />
            </div>

            {/* Start Date */}
            <div style={{ marginBottom: '12px' }}>
              <label className="form-label">Start Date (Index 1):</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-md)' }}
              />
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
                {compound ? 'Update' : 'Add Compound'}
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
