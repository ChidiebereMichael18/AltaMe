'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Identity } from '../lib/generate';
import { Navbar } from '../components/Navbar';
import { IDCardModal } from '../components/IDCardModal';
import { PassportPhoto } from '../components/PassportPhoto';
import { copyToClipboard, formatIdentityAsText } from '../lib/copy';


const STORAGE_USER = 'altame_user';
const STORAGE_SAVED = 'altame_saved';

export default function SavedVaultPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [savedIdentities, setSavedIdentities] = useState<Identity[]>([]);
  const [search, setSearch] = useState('');
  const [activeIDModalIdentity, setActiveIDModalIdentity] = useState<Identity | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem(STORAGE_USER);
      if (u) setUser(JSON.parse(u));
      const s = localStorage.getItem(STORAGE_SAVED);
      if (s) setSavedIdentities(JSON.parse(s));
    } catch { /* ignore */ }
  }, []);

  const handleSignOut = () => {
    setUser(null);
    try { localStorage.removeItem(STORAGE_USER); } catch { /* ignore */ }
  };

  const handleDelete = (id: string) => {
    const next = savedIdentities.filter(s => s.id !== id);
    setSavedIdentities(next);
    try { localStorage.setItem(STORAGE_SAVED, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const handleCopyAll = async (identity: Identity) => {
    const ok = await copyToClipboard(formatIdentityAsText(identity));
    if (ok) {
      setCopiedId(identity.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filtered = savedIdentities.filter(s => {
    const q = search.toLowerCase();
    return (
      s.fullName.toLowerCase().includes(q) ||
      s.country.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.nationalId.toLowerCase().includes(q) ||
      s.occupation.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <Navbar user={user} onSignIn={() => {}} onSignOut={handleSignOut} />

      <main className="max-w-[1100px] mx-auto px-4 md:px-8 py-8 pb-24">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b-2 border-[#111110] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d63a1a] mb-1">
              <span>Saved Vault</span>
              <span>·</span>
              <span>{savedIdentities.length} Saved Records</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#111110]">
              Identity Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs uppercase font-bold tracking-wider text-white bg-[#d63a1a] hover:bg-[#b82e12] px-4 py-2 transition-colors shadow-[2px_2px_0px_#111110]"
            >
              + Generate New Identity
            </Link>
          </div>
        </div>

        {/* Search Filter */}
        {savedIdentities.length > 0 && (
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search saved vault by name, country, city, or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border-2 border-[#111110] text-[#111110] text-sm p-3 outline-none focus:border-[#d63a1a] shadow-[2px_2px_0px_#111110]"
            />
          </div>
        )}

        {/* Dashboard Grid Array */}
        {savedIdentities.length === 0 ? (
          <div className="bg-[#faf9f6] border-2 border-dashed border-[#c8c4bc] p-12 text-center my-12">
            <h3 className="font-serif text-2xl font-bold text-[#111110] mb-2">
              Your Identity Vault is Empty
            </h3>
            <p className="text-sm text-[#7a7870] max-w-md mx-auto mb-6">
              Sign in and save generated identities to build your permanent dashboard collection.
            </p>
            <Link
              href="/"
              className="inline-block text-xs uppercase font-bold tracking-wider text-white bg-[#d63a1a] hover:bg-[#b82e12] px-5 py-2.5 transition-colors shadow-[2px_2px_0px_#111110]"
            >
              Go to Generator
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-[#faf9f6] border border-[#e0ddd8] p-8 text-center text-[#7a7870] text-sm">
            No saved identities match "{search}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <div
                key={item.id}
                className="bg-white border-2 border-[#111110] shadow-[4px_4px_0px_#111110] flex flex-col justify-between overflow-hidden hover:border-[#d63a1a] transition-colors"
              >
                {/* Card Top */}
                <div>
                  <div className="flex items-center justify-between px-4 py-2 bg-[#16140f] text-white border-b border-[#111110]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#d63a1a]">
                      {item.country}
                    </span>
                    <span className="font-mono text-[10px] text-[#b8b6b0]">
                      {item.countryCode}
                    </span>
                  </div>

                  <div className="p-4 border-b border-[#e0ddd8] flex items-center gap-4 bg-[#faf9f6]">
                    <PassportPhoto gender={item.gender} className="w-[50px] h-[64px] shrink-0" />


                    <div className="min-w-0">
                      <h3 className="font-serif text-xl font-bold text-[#111110] truncate">
                        {item.fullName}
                      </h3>
                      <div className="text-xs text-[#7a7870] truncate mt-0.5">
                        {item.occupation}
                      </div>
                      <div className="font-mono text-[11px] text-[#d63a1a] font-semibold mt-1">
                        {item.nationalId}
                      </div>
                    </div>
                  </div>

                  {/* Specs Fields */}
                  <div className="p-4 text-xs space-y-2">
                    <div className="flex justify-between border-b border-[#f5f4f2] pb-1">
                      <span className="text-[#7a7870] font-bold text-[10px] uppercase tracking-wider">DOB / Age</span>
                      <span className="font-semibold text-[#111110]">{item.dateOfBirth} ({item.age}y)</span>
                    </div>
                    <div className="flex justify-between border-b border-[#f5f4f2] pb-1">
                      <span className="text-[#7a7870] font-bold text-[10px] uppercase tracking-wider">City</span>
                      <span className="font-semibold text-[#111110]">{item.city}, {item.regionAbbr}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#f5f4f2] pb-1">
                      <span className="text-[#7a7870] font-bold text-[10px] uppercase tracking-wider">Phone</span>
                      <span className="font-mono text-[#111110]">{item.phone}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-[#7a7870] font-bold text-[10px] uppercase tracking-wider">Email</span>
                      <span className="font-mono text-[#111110] truncate max-w-[140px]">{item.email}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-3 bg-[#f5f4f2] border-t border-[#e0ddd8] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveIDModalIdentity(item)}
                    className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#111110] hover:bg-[#d63a1a] px-3 py-1.5 transition-colors cursor-pointer"
                  >
                    View ID Card
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopyAll(item)}
                      className="text-[10px] font-bold uppercase tracking-wider text-[#3a3830] hover:text-[#d63a1a] px-2 py-1 transition-colors cursor-pointer"
                    >
                      {copiedId === item.id ? 'Copied' : 'Copy'}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-[10px] font-bold uppercase tracking-wider text-rose-600 hover:text-rose-800 px-2 py-1 transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {activeIDModalIdentity && (
        <IDCardModal
          identity={activeIDModalIdentity}
          onClose={() => setActiveIDModalIdentity(null)}
        />
      )}
    </>
  );
}
