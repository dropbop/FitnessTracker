'use client';

import { useState } from 'react';
import { CloseIcon } from './Icons';

interface AuthPromptProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function AuthPrompt({ onSuccess, onClose }: AuthPromptProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content panel p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl" style={{ color: 'var(--color-accent-yellow)' }}>
            Enter Password
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:text-[var(--color-accent-red)] transition-colors"
          >
            <CloseIcon className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-4"
            autoFocus
          />

          {error && (
            <p className="text-[var(--color-accent-red)] mb-4 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? 'Checking...' : 'Unlock'}
          </button>
        </form>
      </div>
    </>
  );
}
