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
      <div className="modal-content">
        {/* Modal Header - Forum login style */}
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔐</span>
            Member Login
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
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: '10px' }}>
              <label
                className="form-label"
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-sm)' }}
              >
                Username:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                autoComplete="username"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--size-md)',
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '10px' }}>
              <label
                className="form-label"
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-sm)' }}
              >
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--size-md)',
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

            {/* Login Button - Glossy primary style */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              {loading ? 'Checking...' : 'Log In'}
            </button>
          </form>

          {/* Footer links - Forum style */}
          <div
            style={{
              marginTop: '12px',
              paddingTop: '10px',
              borderTop: '1px solid var(--color-border)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--size-xs)',
            }}
          >
            <span style={{ color: 'var(--color-text-dark)' }}>
              No account? This is a personal tracker - credentials are set via environment variables.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
