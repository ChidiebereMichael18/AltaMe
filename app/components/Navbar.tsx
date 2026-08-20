'use client';

import { Logo } from './Logo';

interface NavbarProps {
  user: { name: string; email: string } | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export function Navbar({ user, onSignIn, onSignOut }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 h-14 bg-[#16140f] border-b-4 border-[#d63a1a]">
      <Logo />

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-xs text-[#8a8880] tracking-wider font-mono">
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
            Sign in to save
          </button>
        )}
      </div>
    </nav>
  );
}
