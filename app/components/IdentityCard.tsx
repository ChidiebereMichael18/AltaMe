'use client';

import { useState } from 'react';
import { Identity } from '../lib/generate';
import { FieldRow } from './FieldRow';
import { PassportPhoto } from './PassportPhoto';
import { copyToClipboard, formatIdentityAsText } from '../lib/copy';


interface IdentityCardProps {
  identity: Identity;
  isGenerating: boolean;
  user: { name: string; email: string } | null;
  onSave: () => void;
  onSignIn: () => void;
  onViewIDCard: (identity: Identity) => void;
}

export function IdentityCard({
  identity,
  isGenerating,
  user,
  onSave,
  onSignIn,
  onViewIDCard,
}: IdentityCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAll = async () => {
    const ok = await copyToClipboard(formatIdentityAsText(identity));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleGenerateIDCardClick = () => {
    if (!user) {
      onSignIn();
    } else {
      onSave();
      onViewIDCard(identity);
    }
  };

  const ts = new Date(identity.generatedAt).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false,
  });

  const f = (label: string, value: string) => (
    <FieldRow label={label} value={value} fading={isGenerating} />
  );

  return (
    <div className={`bg-white border-2 border-[#111110] border-t-4 border-t-[#d63a1a] relative shadow-[4px_4px_0px_#111110] transition-opacity duration-200 ${isGenerating ? 'pointer-events-none' : ''}`}>
      {isGenerating && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d63a1a]/10 to-transparent animate-shimmer z-10 pointer-events-none" />
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#f5f4f2] border-b border-[#e0ddd8]">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#d63a1a]">
            {identity.country} &nbsp;·&nbsp; Generated Identity
          </div>
          <div className="font-mono text-xs text-[#b8b6b0]">{ts}</div>
        </div>
        <button
          onClick={handleCopyAll}
          className={`text-[10px] font-bold uppercase tracking-widest border px-3 py-1.5 transition-colors cursor-pointer ${
            copied ? 'border-emerald-600 text-emerald-600 bg-emerald-50' : 'border-[#c8c4bc] text-[#7a7870] hover:border-[#d63a1a] hover:text-[#d63a1a]'
          }`}
        >
          {copied ? 'Copied' : 'Copy All'}
        </button>
      </div>

      {/* Body */}
      <div>
        {/* Name Block */}
        <div className="p-6 bg-[#faf9f6] border-b border-[#e0ddd8] flex items-center gap-6">
          {/* Photo Placeholder */}
          <div className="shrink-0 flex flex-col items-center gap-1.5">
            <PassportPhoto gender={identity.gender} className={`w-[76px] h-[96px] transition-opacity duration-200 ${isGenerating ? 'opacity-20' : 'opacity-100'}`} />

            <span className="text-[9px] font-extrabold tracking-widest text-[#7a7870] uppercase">
              BIOMETRIC PHOTO
            </span>
          </div>


          {/* Name Details */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="text-[10px] font-extrabold tracking-widest uppercase text-[#d63a1a] mb-1">
              PRIMARY NAME
            </div>
            <div className={`font-serif text-3xl md:text-4xl text-[#111110] tracking-tight leading-tight transition-opacity duration-200 ${isGenerating ? 'opacity-20' : 'opacity-100'}`}>
              {identity.fullName}
            </div>

            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="font-mono text-xs font-semibold text-[#3a3830] bg-[#e8e5df] px-2 py-0.5 tracking-wider">
                REF {identity.id.toUpperCase().slice(0, 14)}
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#d63a1a] border border-[#d63a1a] px-2 py-0.5">
                {identity.nationality.toUpperCase()}
              </span>
            </div>

            <div className="mt-3">
              <button
                onClick={handleGenerateIDCardClick}
                className="inline-flex items-center gap-1.5 bg-[#d63a1a] hover:bg-[#b82e12] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 transition-colors cursor-pointer shadow-[2px_2px_0px_#111110]"
              >
                {user ? 'View Physical ID Card' : ' Sign in to Generate Physical ID Card'}
              </button>
            </div>
          </div>
        </div>

        {/* PERSONAL */}
        <div className="bg-[#16140f] text-white text-[10px] font-extrabold uppercase tracking-widest px-6 py-1.5">
          Personal
        </div>
        <div className="border-b border-[#e0ddd8]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {f('Date of Birth', identity.dateOfBirth)}
            {f('Age', `${identity.age} yrs`)}
            {f('Gender', identity.gender)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {f('Zodiac Sign', identity.zodiacSign)}
            {f('Blood Type', identity.bloodType)}
            {f('Nationality', identity.nationality)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {f("Mother's Maiden Name", identity.mothersMaidenName)}
            {f('Location', `${identity.city}, ${identity.region}`)}
          </div>
        </div>

        {/* PHYSICAL */}
        <div className="bg-[#16140f] text-white text-[10px] font-extrabold uppercase tracking-widest px-6 py-1.5">
          Physical
        </div>
        <div className="border-b border-[#e0ddd8]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {f('Height', identity.height)}
            {f('Weight', identity.weight)}
            {f('Blood Type', identity.bloodType)}
          </div>
        </div>

        {/* OFFICIAL DOCUMENTS */}
        <div className="bg-[#16140f] text-white text-[10px] font-extrabold uppercase tracking-widest px-6 py-1.5">
          Official Documents
        </div>
        <div className="border-b border-[#e0ddd8]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {f(identity.nationalIdLabel, identity.nationalId)}
            {f(identity.licenseLabel, identity.licenseId)}
          </div>
        </div>

        {/* CONTACT */}
        <div className="bg-[#16140f] text-white text-[10px] font-extrabold uppercase tracking-widest px-6 py-1.5">
          Contact
        </div>
        <div className="border-b border-[#e0ddd8]">
          <div className="grid grid-cols-1">
            {f('Address', identity.fullAddress)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {f('Phone', identity.phone)}
            {f('Email', identity.email)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {f('Latitude', identity.latitude)}
            {f('Longitude', identity.longitude)}
          </div>
        </div>

        {/* ONLINE */}
        <div className="bg-[#16140f] text-white text-[10px] font-extrabold uppercase tracking-widest px-6 py-1.5">
          Online
        </div>
        <div className="border-b border-[#e0ddd8]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {f('Username', identity.username)}
            {f('Password', identity.password)}
            {f('Website', identity.website)}
            {f('First Name', identity.firstName)}
            {f('Last Name', identity.lastName)}
            {f('Middle Initial', `${identity.middleInitial}.`)}
          </div>
          <div className="grid grid-cols-1">
            {f('Browser User Agent', identity.userAgent)}
          </div>
          <div className="grid grid-cols-1">
            {f('GUID', identity.guid)}
          </div>
        </div>

        {/* FINANCE */}
        <div className="bg-[#16140f] text-white text-[10px] font-extrabold uppercase tracking-widest px-6 py-1.5">
          Finance
        </div>
        <div className="border-b border-[#e0ddd8]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {f('Card Type', identity.cardType)}
            {f('Expiry', identity.cardExpiry)}
            {f('CVV', identity.cardCVV)}
          </div>
          <div className="grid grid-cols-1">
            {f('Card Number', identity.cardNumber)}
          </div>
        </div>

        {/* EMPLOYMENT */}
        <div className="bg-[#16140f] text-white text-[10px] font-extrabold uppercase tracking-widest px-6 py-1.5">
          Employment
        </div>
        <div className="border-b border-[#e0ddd8]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {f('Company', identity.company)}
            {f('Occupation', identity.occupation)}
          </div>
        </div>

        {/* OTHER */}
        <div className="bg-[#16140f] text-white text-[10px] font-extrabold uppercase tracking-widest px-6 py-1.5">
          Other
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {f('Favourite Color', identity.favoriteColor)}
            {f('Vehicle', identity.vehicle)}
          </div>
        </div>
      </div>
    </div>
  );
}
