'use client';

import { useState } from 'react';
import { CloseIcon } from './Icons';

interface AuthPromptProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function AuthPrompt({ onSuccess, onClose }: AuthPromptProps) {
  const [username, setUsername] = useState('');
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
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        setError('Invalid credentials');
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
          <h2 className="text-2xl" style={{ color: 'var(--color-accent)', letterSpacing: '0.1em' }}>
            LOGIN
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:text-[var(--color-accent)] transition-colors"
          >
            <CloseIcon className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm mb-1 uppercase tracking-wider"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              autoComplete="username"
            />
          </div>

          <div>
            <label
              className="block text-sm mb-1 uppercase tracking-wider"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-[var(--color-accent)] text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? 'CHECKING...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </>
  );
}
