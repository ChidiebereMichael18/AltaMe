'use client';

import { useState } from 'react';
import { Identity, CountryCode } from '../lib/generate';
import { PassportPhoto } from './PassportPhoto';


interface IDCardModalProps {
  identity: Identity;
  onClose: () => void;
}

interface CountryTheme {
  headerBg: string;
  headerTitle: string;
  docTitle: string;
  emblemText: string;
  accentColor: string;
  idLabel: string;
}

const COUNTRY_THEMES: Record<CountryCode, CountryTheme> = {
  US: {
    headerBg: 'linear-gradient(90deg, #0A192F 0%, #1E3A8A 60%, #D63A1A 100%)',
    headerTitle: 'UNITED STATES OF AMERICA',
    docTitle: 'STATE DRIVER LICENSE / IDENTIFICATION CARD',
    emblemText: '★ REAL ID',
    accentColor: '#D63A1A',
    idLabel: 'DL / SSN NO.',
  },
  GB: {
    headerBg: 'linear-gradient(90deg, #00382B 0%, #005F52 60%, #0288D1 100%)',
    headerTitle: 'GREAT BRITAIN · UNITED KINGDOM',
    docTitle: 'DRIVING LICENCE / PERMIS DE CONDUIRE',
    emblemText: '👑 UK',
    accentColor: '#00796B',
    idLabel: 'LICENCE NO.',
  },
  CA: {
    headerBg: 'linear-gradient(90deg, #7A0000 0%, #C41230 65%, #1A365D 100%)',
    headerTitle: 'CANADA',
    docTitle: "PERMIS DE CONDUIRE / DRIVER'S LICENCE",
    emblemText: '🍁 CAN',
    accentColor: '#C41230',
    idLabel: 'LICENCE NO.',
  },
  AU: {
    headerBg: 'linear-gradient(90deg, #001F54 0%, #003366 60%, #D4AF37 100%)',
    headerTitle: 'COMMONWEALTH OF AUSTRALIA',
    docTitle: 'DRIVER LICENCE / KEYPASS IDENTITY',
    emblemText: '🦘 AUS',
    accentColor: '#001F54',
    idLabel: 'LICENCE / TFN NO.',
  },
  DE: {
    headerBg: 'linear-gradient(90deg, #002B49 0%, #004070 60%, #B89230 100%)',
    headerTitle: 'BUNDESREPUBLIK DEUTSCHLAND',
    docTitle: 'PERSONALAUSWEIS / NATIONAL IDENTITY CARD',
    emblemText: '🦅 DEU',
    accentColor: '#002B49',
    idLabel: 'AUSWEIS NR.',
  },
  FR: {
    headerBg: 'linear-gradient(90deg, #002654 0%, #154380 50%, #ED2939 100%)',
    headerTitle: 'RÉPUBLIQUE FRANÇAISE',
    docTitle: "CARTE NATIONALE D'IDENTITÉ / NATIONAL ID",
    emblemText: '🇫🇷 FRA',
    accentColor: '#002654',
    idLabel: 'N° DE CARTE / PERMIS',
  },
  NG: {
    headerBg: 'linear-gradient(90deg, #004D2E 0%, #008751 70%, #003B23 100%)',
    headerTitle: 'FEDERAL REPUBLIC OF NIGERIA',
    docTitle: 'NATIONAL IDENTITY CARD (NIN)',
    emblemText: '🇳🇬 NGA',
    accentColor: '#008751',
    idLabel: 'NIN / LICENCE NO.',
  },
  IN: {
    headerBg: 'linear-gradient(90deg, #E65100 0%, #FF9933 45%, #138808 100%)',
    headerTitle: 'REPUBLIC OF INDIA / भारत गणराज्य',
    docTitle: 'UNIQUE IDENTIFICATION AUTHORITY / AADHAAR',
    emblemText: '☸️ IND',
    accentColor: '#E65100',
    idLabel: 'AADHAAR / DL NO.',
  },
};

export function IDCardModal({ identity, onClose }: IDCardModalProps) {
  const [copied, setCopied] = useState(false);
  const [savedStatus, setSavedStatus] = useState(false);

  const theme = COUNTRY_THEMES[identity.countryCode] || COUNTRY_THEMES.US;

  const handleSaveCardData = () => {
    const cardData = JSON.stringify(identity, null, 2);
    const blob = new Blob([cardData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${identity.fullName.replace(/\s+/g, '_')}_${identity.countryCode}_ID.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const handleCopyNo = async () => {
    try {
      await navigator.clipboard.writeText(identity.nationalId || identity.licenseId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const issueYear = new Date().getFullYear() - 1;
  const expYear = issueYear + 8;
  const expDate = `${identity.dateOfBirth.slice(0, 6)} ${expYear}`;

  return (
    <div
      className="fixed inset-0 bg-[#0a0908]/70 backdrop-blur-xs z-[100] flex items-center justify-center p-4 overflow-y-auto"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white border-2 border-[#111110] border-t-4 border-t-[#d63a1a] w-full max-w-[640px] p-6 shadow-[8px_8px_0px_#111110] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-[#b8b6b0] hover:text-[#111110] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          Close
        </button>

        <div className="mb-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: theme.accentColor }}>
            {identity.country.toUpperCase()} · Official Physical ID Preview
          </span>
          <h2 className="font-serif text-2xl text-[#111110] font-bold">{identity.fullName}</h2>
        </div>

        {/* Realistic Physical Driver License Container */}
        <div
          id="printable-id-card"
          className="w-full min-h-[340px] bg-[#fbfbfa] border-2 border-[#111110] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.25)] relative overflow-hidden flex flex-col justify-between mb-6 select-none"
        >
          {/* Hologram Shimmer Layer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none z-10" />

          {/* Top Header Banner */}
          <div
            className="text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-[#d63a1a] gap-2"
            style={{ background: theme.headerBg }}
          >
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-sm font-semibold tracking-wide truncate text-white">
                {identity.region.toUpperCase() ? `${identity.region.toUpperCase()} · ` : ''}
                {theme.headerTitle}
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-white/85">
                {theme.docTitle}
              </span>
            </div>
            <div className="bg-white/15 border border-white/30 px-2 py-1 rounded-sm shrink-0">
              <span className="font-mono font-extrabold text-xs text-white tracking-wider">
                {theme.emblemText}
              </span>
            </div>
          </div>

          {/* Main Card Body */}
          <div className="flex-1 p-3.5 flex gap-3.5 relative">
            {/* Left Side: Photo, EMV Chip, Signature */}
            <div className="w-[76px] shrink-0 flex flex-col items-center gap-1.5 z-10">
              {/* Photo Frame */}
              <PassportPhoto gender={identity.gender} className="w-[72px] h-[90px]" />




              {/* EMV Chip */}
              <div className="w-[30px] h-[22px] bg-gradient-to-br from-[#e6c875] via-[#d4af37] to-[#997819] border border-[#775c0c] rounded-xs relative overflow-hidden">
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#775c0c]" />
                <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-[#775c0c]" />
              </div>

              {/* Signature Line */}
              <div className="w-full flex flex-col items-center">
                <span className="font-serif italic text-sm text-[#1a365d] leading-none -rotate-2 whitespace-nowrap">
                  {identity.firstName} {identity.lastName}
                </span>
                <span className="text-[7px] font-bold tracking-widest text-[#8a8880] mt-0.5">
                  SIGNATURE
                </span>
              </div>
            </div>

            {/* Right Side: Primary Fields */}
            <div className="flex-1 flex flex-col gap-1 min-w-0 z-10">
              {/* ID Row */}
              <div className="flex gap-4 bg-[#d63a1a]/5 p-1 border-l-2" style={{ borderLeftColor: theme.accentColor }}>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: theme.accentColor }}>
                    {theme.idLabel}
                  </span>
                  <span className="font-mono text-sm font-extrabold" style={{ color: theme.accentColor }}>
                    {identity.licenseId || identity.nationalId}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: theme.accentColor }}>EXP</span>
                  <span className="font-mono text-xs font-bold text-[#111110]">{expDate}</span>
                </div>
              </div>

              {/* Surname */}
              <div className="flex flex-col">
                <span className="text-[8px] font-extrabold uppercase tracking-wider" style={{ color: theme.accentColor }}>
                  1 SURNAME / LAST NAME
                </span>
                <span className="text-sm font-extrabold text-[#111110] tracking-tight">
                  {identity.lastName.toUpperCase()}
                </span>
              </div>

              {/* Given Names */}
              <div className="flex flex-col">
                <span className="text-[8px] font-extrabold uppercase tracking-wider" style={{ color: theme.accentColor }}>
                  2 GIVEN NAMES
                </span>
                <span className="text-xs font-bold text-[#111110]">
                  {identity.firstName.toUpperCase()} {identity.middleInitial ? `${identity.middleInitial}.` : ''}
                </span>
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <span className="text-[8px] font-extrabold uppercase tracking-wider" style={{ color: theme.accentColor }}>
                  8 ADDRESS
                </span>
                <span className="text-[11px] font-semibold text-[#3a3830] leading-tight truncate">
                  {identity.fullAddress}
                </span>
              </div>

              {/* Specs Grid */}
              <div className="flex gap-3 pt-0.5">
                <div className="flex flex-col">
                  <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: theme.accentColor }}>DOB</span>
                  <span className="text-[11px] font-semibold text-[#111110]">{identity.dateOfBirth}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: theme.accentColor }}>SEX</span>
                  <span className="text-[11px] font-semibold text-[#111110]">{identity.gender === 'Male' ? 'M' : 'F'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: theme.accentColor }}>HGT</span>
                  <span className="text-[11px] font-semibold text-[#111110]">{identity.height.split(' ')[0]}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: theme.accentColor }}>NAT</span>
                  <span className="text-[11px] font-semibold text-[#111110]">{identity.nationality.slice(0, 3).toUpperCase()}</span>
                </div>
              </div>

              {/* Class & Restrictions */}
              <div className="flex gap-3">
                <div className="flex flex-col">
                  <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: theme.accentColor }}>CLASS</span>
                  <span className="text-[11px] font-semibold text-[#111110]">C</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: theme.accentColor }}>REST</span>
                  <span className="text-[11px] font-semibold text-[#111110]">NONE</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: theme.accentColor }}>ISS</span>
                  <span className="text-[11px] font-semibold text-[#111110]">{issueYear}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Barcode */}
          <div className="bg-white border-t border-[#e0ddd8] px-4 py-1.5 z-10">
            <div className="flex flex-col gap-0.5">
              <div className="h-3.5 w-full bg-[repeating-linear-gradient(90deg,#111_0px,#111_2px,#fff_2px,#fff_4px,#111_4px,#111_5px,#fff_5px,#fff_8px)]" />
              <span className="font-mono text-[9px] tracking-widest text-[#7a7870] block truncate">
                {identity.countryCode}P&lt;{identity.lastName.toUpperCase()}&lt;&lt;{identity.firstName.toUpperCase()}&lt;&lt;{identity.id.toUpperCase().slice(0, 12)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={handleCopyNo}
            className="text-xs uppercase font-bold tracking-wider px-4 py-2 border border-[#c8c4bc] hover:border-[#111110] text-[#3a3830] transition-colors cursor-pointer"
          >
            {copied ? 'Copied Number' : 'Copy ID Number'}
          </button>
          <button
            onClick={handleSaveCardData}
            className="text-xs uppercase font-bold tracking-wider px-4 py-2 text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#111110]"
            style={{ background: theme.accentColor }}
          >
            {savedStatus ? 'Saved to Device!' : 'Save Card Document'}
          </button>
        </div>

        <p className="text-[10px] text-[#b8b6b0] text-center mt-3 uppercase tracking-wider font-semibold">
          For Development & Testing Simulation Only · Not an Official Document
        </p>
      </div>
    </div>

  );
}
