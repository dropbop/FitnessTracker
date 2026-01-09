'use client';

import { useState } from 'react';
import { CalculatedDoseRow } from '@/lib/types';
import { format, parseISO } from 'date-fns';

interface CompoundTableProps {
  data: CalculatedDoseRow[];
  onDoseChange: (date: string, amount: number) => void;
}

export default function CompoundTable({ data, onDoseChange }: CompoundTableProps) {
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEditStart = (row: CalculatedDoseRow) => {
    setEditingDate(row.date);
    setEditValue(row.addedDose > 0 ? row.addedDose.toString() : '');
  };

  const handleEditSave = () => {
    if (editingDate) {
      const amount = parseFloat(editValue) || 0;
      onDoseChange(editingDate, amount);
      setEditingDate(null);
      setEditValue('');
    }
  };

  const handleEditCancel = () => {
    setEditingDate(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  if (data.length === 0) {
    return (
      <div
        style={{
          padding: '16px',
          textAlign: 'center',
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--size-sm)',
        }}
      >
        No data available.
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--size-sm)',
        }}
      >
        <thead>
          <tr
            style={{
              background: 'linear-gradient(180deg, var(--color-bg-lightest) 0%, var(--color-bg) 100%)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <th style={headerCellStyle}>Date</th>
            <th style={headerCellStyle}>Index</th>
            <th style={headerCellStyle}>Active Dose</th>
            <th style={headerCellStyle}>Calc N+1</th>
            <th style={headerCellStyle}>Add Dose</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.date}
              style={{
                background: idx % 2 === 0 ? 'var(--color-bg-lighter)' : 'var(--color-bg-light)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <td style={cellStyle}>
                {format(parseISO(row.date), 'EEE, MMM d')}
              </td>
              <td style={{ ...cellStyle, textAlign: 'center' }}>
                {row.index}
              </td>
              <td style={{ ...cellStyle, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                {row.activeDose.toFixed(2)}
              </td>
              <td style={{ ...cellStyle, textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                {row.calculatedNext.toFixed(2)}
              </td>
              <td style={{ ...cellStyle, textAlign: 'right' }} className="dose-input-cell">
                {editingDate === row.date ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      step="any"
                      min="0"
                      style={{
                        width: '60px',
                        padding: '2px 4px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--size-sm)',
                        textAlign: 'right',
                      }}
                    />
                    <button
                      onClick={handleEditSave}
                      title="Save (Enter)"
                      style={{
                        background: 'var(--color-accent-green)',
                        border: '1px solid #000',
                        borderRadius: '2px',
                        padding: '2px 6px',
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: 'var(--size-sm)',
                        cursor: 'pointer',
                        lineHeight: 1,
                      }}
                    >
                      ✓
                    </button>
                    <button
                      onClick={handleEditCancel}
                      title="Cancel (Esc)"
                      style={{
                        background: 'var(--color-accent-red)',
                        border: '1px solid #000',
                        borderRadius: '2px',
                        padding: '2px 6px',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 'var(--size-sm)',
                        cursor: 'pointer',
                        lineHeight: 1,
                      }}
                    >
                      ✗
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditStart(row)}
                    style={{
                      background: row.addedDose > 0 ? 'var(--color-bg-deepest)' : 'transparent',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      padding: '2px 8px',
                      color: row.addedDose > 0 ? 'var(--color-accent-green)' : 'var(--color-text-dark)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--size-sm)',
                      cursor: 'pointer',
                      minWidth: '60px',
                      textAlign: 'right',
                    }}
                  >
                    {row.addedDose > 0 ? `+${row.addedDose}` : '0'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const headerCellStyle: React.CSSProperties = {
  padding: '8px 10px',
  textAlign: 'left',
  fontWeight: 'bold',
  color: 'var(--color-text-primary)',
  whiteSpace: 'nowrap',
};

const cellStyle: React.CSSProperties = {
  padding: '6px 10px',
  color: 'var(--color-text-secondary)',
};
