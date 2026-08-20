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

  return (
    <div
      className="fixed inset-0 bg-[#0a0908]/60 z-[100] flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white border-2 border-[#111110] border-t-4 border-t-[#d63a1a] w-full max-w-[400px] p-8 shadow-[8px_8px_0px_#111110] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-[#b8b6b0] hover:text-[#111110] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          Close
        </button>

        <h2 className="font-serif text-2xl text-[#111110] font-bold tracking-tight mb-2">
          Save your identities.
        </h2>
        <p className="text-sm text-[#7a7870] leading-relaxed mb-6">
          Sign in to keep a permanent record of every identity you generate.
          Your data stays on this device.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#7a7870] mb-1.5" htmlFor="signin-name">
              Your Name
            </label>
            <input
              id="signin-name"
              type="text"
              className="w-full bg-white border-2 border-[#c8c4bc] focus:border-[#d63a1a] text-[#111110] text-sm p-3 outline-none transition-colors"
              placeholder="e.g. Jordan"
              value={name}
              onChange={e => { setName(e.target.value); setError(''); }}
              autoFocus
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#7a7870] mb-1.5" htmlFor="signin-email">
              Email Address
            </label>
            <input
              id="signin-email"
              type="email"
              className="w-full bg-white border-2 border-[#c8c4bc] focus:border-[#d63a1a] text-[#111110] text-sm p-3 outline-none transition-colors"
              placeholder="you@example.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              autoComplete="email"
            />
          </div>

          {error && (
            <p className="text-xs font-semibold text-[#d63a1a]">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#d63a1a] hover:bg-[#b82e12] text-white font-bold uppercase text-xs tracking-widest py-3 transition-colors cursor-pointer shadow-[2px_2px_0px_#111110]"
          >
            Continue
          </button>
        </form>

        <p className="text-xs text-[#b8b6b0] text-center leading-relaxed mt-4">
          No password needed. Saved locally on your device.
        </p>
      </div>
    </div>
  );
}
