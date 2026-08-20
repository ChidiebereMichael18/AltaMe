'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateIdentity, Identity, CountryCode } from './lib/generate';
import { Navbar } from './components/Navbar';
import { IdentityCard } from './components/IdentityCard';
import { CountryPicker } from './components/CountryPicker';
import { SignInModal } from './components/SignInModal';
import { IDCardModal } from './components/IDCardModal';

const STORAGE_USER   = 'altame_user';
const STORAGE_SAVED  = 'altame_saved';
const DEFAULT_COUNTRY: CountryCode = 'US';

export default function Home() {
  const [country, setCountry]           = useState<CountryCode>(DEFAULT_COUNTRY);
  const [identity, setIdentity]         = useState<Identity | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSignIn, setShowSignIn]     = useState(false);
  const [activeIDModalIdentity, setActiveIDModalIdentity] = useState<Identity | null>(null);
  const [user, setUser]                 = useState<{ name: string; email: string } | null>(null);
  const [savedIdentities, setSavedIdentities] = useState<Identity[]>([]);
  const [savedFlash, setSavedFlash]     = useState(false);


  useEffect(() => {
    setIdentity(generateIdentity(DEFAULT_COUNTRY));
    try {
      const u = localStorage.getItem(STORAGE_USER);
      if (u) setUser(JSON.parse(u));
      const s = localStorage.getItem(STORAGE_SAVED);
      if (s) setSavedIdentities(JSON.parse(s));
    } catch { /* ignore */ }
  }, []);

  const doGenerate = useCallback(async (c: CountryCode) => {
    if (isGenerating) return;
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 350));
    setIdentity(generateIdentity(c));
    setIsGenerating(false);
  }, [isGenerating]);

  const handleCountryChange = useCallback((c: CountryCode) => {
    setCountry(c);
    doGenerate(c);
  }, [doGenerate]);

  const handleGenerate = useCallback(() => doGenerate(country), [doGenerate, country]);

  const handleSave = useCallback(() => {
    if (!user) { setShowSignIn(true); return; }
    if (!identity) return;
    if (savedIdentities.some(s => s.id === identity.id)) return;
    const next = [identity, ...savedIdentities].slice(0, 25);
    setSavedIdentities(next);
    try { localStorage.setItem(STORAGE_SAVED, JSON.stringify(next)); } catch { /* ignore */ }
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  }, [user, identity, savedIdentities]);

  const handleSignIn = useCallback((name: string, email: string) => {
    const u = { name, email };
    setUser(u);
    try { localStorage.setItem(STORAGE_USER, JSON.stringify(u)); } catch { /* ignore */ }
    setShowSignIn(false);
    if (identity) {
      const next = [identity, ...savedIdentities].slice(0, 25);
      setSavedIdentities(next);
      try { localStorage.setItem(STORAGE_SAVED, JSON.stringify(next)); } catch { /* ignore */ }
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1800);
    }
  }, [identity, savedIdentities]);

  const handleSignOut = useCallback(() => {
    setUser(null);
    try { localStorage.removeItem(STORAGE_USER); } catch { /* ignore */ }
  }, []);

  const handleDeleteSaved = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = savedIdentities.filter(s => s.id !== id);
    setSavedIdentities(next);
    try { localStorage.setItem(STORAGE_SAVED, JSON.stringify(next)); } catch { /* ignore */ }
  }, [savedIdentities]);

  const handleLoadSaved = useCallback((saved: Identity) => {
    setIdentity(saved);
    setCountry(saved.countryCode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const isSaved = identity ? savedIdentities.some(s => s.id === identity.id) : false;

  return (
    <>
      <Navbar user={user} onSignIn={() => setShowSignIn(true)} onSignOut={handleSignOut} />

      <main className="page-inner">

        {/* ── Toolbar ── */}
        <div className="toolbar">
          <div className="toolbar-label">
            <span className="toolbar-brand">altame.</span>
            <span className="toolbar-sep">/</span>
            <CountryPicker
              value={country}
              onChange={handleCountryChange}
              disabled={isGenerating}
            />
          </div>
          <div className="toolbar-actions">
            {user ? (
              <button
                id="save-btn"
                className="btn btn-secondary"
                onClick={handleSave}
                disabled={isSaved || isGenerating}
              >
                {savedFlash ? 'Saved' : isSaved ? 'Already saved' : 'Save'}
              </button>
            ) : (
              <button
                id="save-btn"
                className="btn btn-secondary"
                onClick={() => setShowSignIn(true)}
              >
                Sign in to save
              </button>
            )}
            <button
              id="generate-btn"
              className="btn btn-primary"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate New'}
            </button>
          </div>
        </div>

        {/* ── Identity Card ── */}
        {identity && (
          <IdentityCard
            identity={identity}
            isGenerating={isGenerating}
            user={user}
            onSave={handleSave}
            onSignIn={() => setShowSignIn(true)}
            onViewIDCard={setActiveIDModalIdentity}
          />
        )}

        {/* ── Saved Identities ── */}
        {user && savedIdentities.length > 0 && (
          <section className="saved-section" aria-label="Saved identities">
            <div className="saved-header">
              <span className="saved-header-label">Saved Identities ({savedIdentities.length})</span>
              <span className="saved-count">Permanent Storage</span>
            </div>
            {savedIdentities.map(saved => (
              <div
                key={saved.id}
                className="saved-item"
                onClick={() => handleLoadSaved(saved)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && handleLoadSaved(saved)}
              >
                <div>
                  <div className="saved-item-name">{saved.fullName}</div>
                  <div className="saved-item-meta">
                    {saved.country}&nbsp;&nbsp;·&nbsp;&nbsp;{saved.nationalId}&nbsp;&nbsp;·&nbsp;&nbsp;{saved.city}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button
                    className="saved-item-view-card"
                    onClick={e => {
                      e.stopPropagation();
                      setActiveIDModalIdentity(saved);
                    }}
                  >
                    View ID Card
                  </button>
                  <button
                    className="saved-item-delete"
                    onClick={e => handleDeleteSaved(saved.id, e)}
                    aria-label={`Remove ${saved.fullName}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      {showSignIn && (
        <SignInModal onSignIn={handleSignIn} onClose={() => setShowSignIn(false)} />
      )}

      {activeIDModalIdentity && (
        <IDCardModal
          identity={activeIDModalIdentity}
          onClose={() => setActiveIDModalIdentity(null)}
        />
      )}
    </>
  );
}

