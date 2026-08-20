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
    const next = [identity, ...savedIdentities].slice(0, 100);
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
      const next = [identity, ...savedIdentities].slice(0, 100);
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

      <main className="max-w-[840px] mx-auto px-4 md:px-8 pb-24">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between py-6 mb-2 border-b-2 border-[#111110] gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-[#111110]">altame.</span>
            <span className="text-[#c8c4bc] text-sm">/</span>
            <CountryPicker
              value={country}
              onChange={handleCountryChange}
              disabled={isGenerating}
            />
          </div>
          <div className="flex items-center gap-2.5">
            {user ? (
              <button
                id="save-btn"
                className="text-xs uppercase font-bold tracking-wider text-[#3a3830] border border-[#c8c4bc] hover:border-[#111110] px-4 py-2 transition-colors cursor-pointer disabled:opacity-50"
                onClick={handleSave}
                disabled={isSaved || isGenerating}
              >
                {savedFlash ? 'Saved' : isSaved ? 'Already saved' : 'Save'}
              </button>
            ) : (
              <button
                id="save-btn"
                className="text-xs uppercase font-bold tracking-wider text-[#3a3830] border border-[#c8c4bc] hover:border-[#111110] px-4 py-2 transition-colors cursor-pointer"
                onClick={() => setShowSignIn(true)}
              >
                Sign in to save
              </button>
            )}
            <button
              id="generate-btn"
              className="text-xs uppercase font-bold tracking-wider text-white bg-[#d63a1a] hover:bg-[#b82e12] px-5 py-2 transition-colors cursor-pointer disabled:opacity-50 shadow-[2px_2px_0px_#111110]"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate New'}
            </button>
          </div>
        </div>

        {/* Identity Card */}
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

        {/* Saved Identities */}
        {user && savedIdentities.length > 0 && (
          <section className="mt-12" aria-label="Saved identities">
            <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-[#111110]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#111110]">
                Saved Identities ({savedIdentities.length})
              </span>
              <span className="font-mono text-xs text-[#b8b6b0]">Permanent Storage</span>
            </div>
            <div className="divide-y divide-[#e0ddd8] border border-[#e0ddd8]">
              {savedIdentities.map(saved => (
                <div
                  key={saved.id}
                  className="flex items-center justify-between p-4 bg-white hover:bg-[#f5f4f2] transition-colors cursor-pointer"
                  onClick={() => handleLoadSaved(saved)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && handleLoadSaved(saved)}
                >
                  <div>
                    <div className="font-serif text-lg font-bold text-[#111110] leading-tight">
                      {saved.fullName}
                    </div>
                    <div className="font-mono text-xs text-[#b8b6b0] mt-0.5">
                      {saved.country}&nbsp;&nbsp;·&nbsp;&nbsp;{saved.nationalId}&nbsp;&nbsp;·&nbsp;&nbsp;{saved.city}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-[10px] uppercase font-bold tracking-wider text-[#d63a1a] border border-[#d63a1a] hover:bg-[#d63a1a] hover:text-white px-2.5 py-1 transition-colors cursor-pointer"
                      onClick={e => {
                        e.stopPropagation();
                        setActiveIDModalIdentity(saved);
                      }}
                    >
                      View ID Card
                    </button>
                    <button
                      className="text-[10px] uppercase font-bold tracking-wider text-[#c8c4bc] hover:text-[#d63a1a] p-1 transition-colors cursor-pointer"
                      onClick={e => handleDeleteSaved(saved.id, e)}
                      aria-label={`Remove ${saved.fullName}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
