'use client';

import { useState } from 'react';

interface SignInModalProps {
  onSignIn: (name: string, email: string) => void;
  onClose: () => void;
}

export function SignInModal({ onSignIn, onClose }: SignInModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('Name is required.'); return; }
    if (!email.trim() || !email.includes('@')) { setError('Enter a valid email address.'); return; }
    onSignIn(name.trim(), email.trim().toLowerCase());
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">

        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          Close
        </button>

        <h2 className="modal-title" id="modal-title">
          Save your identities.
        </h2>
        <p className="modal-subtitle">
          Sign in to keep a permanent record of every identity you generate.
          Your data stays on this device.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="signin-name">Your name</label>
            <input
              id="signin-name"
              type="text"
              className="form-input"
              placeholder="e.g. Jordan"
              value={name}
              onChange={e => { setName(e.target.value); setError(''); }}
              autoFocus
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signin-email">Email address</label>
            <input
              id="signin-email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              autoComplete="email"
            />
          </div>

          {error && (
            <p style={{ fontSize: '0.8125rem', color: '#d63a1a', marginBottom: '0.75rem', fontWeight: 500 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.25rem' }}
          >
            Continue
          </button>
        </form>

        <p className="modal-note">
          No password needed. Saved locally on your device.
          Full cloud sync coming soon.
        </p>
      </div>
    </div>
  );
}
