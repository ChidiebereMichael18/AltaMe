'use client';

interface NavbarProps {
  user: { name: string; email: string } | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export function Navbar({ user, onSignIn, onSignOut }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-wordmark">
        altame<span className="navbar-wordmark-dot">.</span>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user">{user.name}</span>
            <button className="btn btn-ghost" onClick={onSignOut}>
              Sign out
            </button>
          </>
        ) : (
          <button className="btn btn-nav-accent" onClick={onSignIn}>
            Sign in to save
          </button>
        )}
      </div>
    </nav>
  );
}
