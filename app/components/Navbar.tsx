'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

interface NavbarProps {
  user: { name: string; email: string } | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export function Navbar({ user, onSignIn, onSignOut }: NavbarProps) {
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    try {
      const s = localStorage.getItem('altame_saved');
      if (s) setSavedCount(JSON.parse(s).length);
    } catch { /* ignore */ }
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 h-14 bg-[#16140f] border-b-4 border-[#d63a1a]">
      <Link href="/">
        <Logo />
      </Link>

      <div className="flex items-center gap-3">
        {/* Prominent High-Visibility Vault Link */}
        <Link
          href="/saved"
          className="text-xs uppercase font-extrabold tracking-wider text-white bg-[#d63a1a] hover:bg-[#b82e12] px-3.5 py-1.5 transition-colors flex items-center gap-2 shadow-[2px_2px_0px_#ffffff]"
        >
          <span>Saved Vault</span>
          <span className="bg-white text-[#111110] text-[11px] font-extrabold px-1.5 py-0.2 rounded-xs font-mono">
            {savedCount}
          </span>
        </Link>

        {user ? (
          <>
            <span className="text-xs text-[#8a8880] tracking-wider font-mono hidden sm:inline">
              {user.name}
            </span>
            <button
              onClick={onSignOut}
              className="text-xs uppercase tracking-widest text-[#8a8880] hover:text-white transition-colors cursor-pointer px-2 py-1"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={onSignIn}
            className="text-xs uppercase tracking-wider font-semibold text-[#d63a1a] border border-[#3a3830] hover:border-[#d63a1a] hover:bg-[#d63a1a]/10 px-3.5 py-1.5 transition-colors cursor-pointer"
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}
