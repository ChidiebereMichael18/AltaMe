'use client';

import { useState } from 'react';
import { Identity } from '../lib/generate';
import { FieldRow } from './FieldRow';
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
    <div className={`identity-card card-enter${isGenerating ? ' is-generating' : ''}`}>
      {isGenerating && <div className="card-shimmer" />}

      {/* ── Header ── */}
      <div className="card-header">
        <div className="card-header-left">
          <div className="card-eyebrow">{identity.country} &nbsp;·&nbsp; Generated Identity</div>
          <div className="card-timestamp">{ts}</div>
        </div>
        <button className={`btn-copy-all${copied ? ' copied' : ''}`} onClick={handleCopyAll}>
          {copied ? 'Copied' : 'Copy All'}
        </button>
      </div>

      <div className="card-body">

        {/* Name Block with Passport Photo on the Left */}
        <div className="identity-name-block">
          {/* Passport Photo Placeholder on Left */}
          <div className="passport-photo">
            <div className={`passport-photo-frame${isGenerating ? ' fading' : ''}`}>
              <svg
                width="90"
                height="115"
                viewBox="0 0 90 115"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="passport-placeholder-svg"
              >
                {/* Clean background */}
                <rect width="90" height="115" fill="#ECEAE4" />
                {/* Security grid lines */}
                <path
                  d="M0 23H90M0 46H90M0 69H90M0 92H90M22.5 0V115M45 0V115M67.5 0V115"
                  stroke="#D8D5CC"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                />
                {/* Biometric portrait silhouette */}
                <circle cx="45" cy="40" r="17" fill="#6B6960" />
                <path
                  d="M15 98C15 78 27 70 45 70C63 70 75 78 75 98V115H15V98Z"
                  fill="#6B6960"
                />
                {/* Biometric crosshair overlay */}
                <circle
                  cx="45"
                  cy="40"
                  r="23"
                  stroke="#D63A1A"
                  strokeWidth="0.75"
                  strokeDasharray="3 3"
                  opacity="0.45"
                />
                <path
                  d="M45 13V17M45 63V67M18 40H22M68 40H72"
                  stroke="#D63A1A"
                  strokeWidth="0.75"
                  opacity="0.45"
                />
              </svg>
              <div className="passport-watermark">PASSPORT</div>
            </div>
            <span className="passport-photo-label">PHOTO PLACEHOLDER</span>
          </div>

          {/* Name & Primary Info on Right */}
          <div className="identity-name-right">
            <div className="identity-surname-label">PRIMARY NAME</div>
            <div className={`identity-name${isGenerating ? ' fading' : ''}`}>
              {identity.fullName}
            </div>
            <div className="name-sub">
              <span className="name-id-badge">DOCUMENT NO. {identity.id.toUpperCase().slice(0, 14)}</span>
              <span className="name-nat-badge">{identity.nationality.toUpperCase()}</span>
            </div>
            <div className="name-action-row">
              <button
                className="name-generate-id-link"
                onClick={handleGenerateIDCardClick}
              >
                {user ? 'View Physical ID Card' : 'Sign in to Generate Physical ID Card'}
              </button>
            </div>
          </div>
        </div>



        {/* ── Section label helper ── */}
        {/* PERSONAL */}
        <div className="card-section-label">Personal</div>
        <div className="fields-section">
          <div className="fields-grid fields-grid-3">
            {f('Date of Birth', identity.dateOfBirth)}
            {f('Age', `${identity.age} yrs`)}
            {f('Gender', identity.gender)}
          </div>
          <div className="fields-grid fields-grid-3">
            {f('Zodiac Sign', identity.zodiacSign)}
            {f('Blood Type', identity.bloodType)}
            {f('Nationality', identity.nationality)}
          </div>
          <div className="fields-grid">
            {f("Mother's Maiden Name", identity.mothersMaidenName)}
            {f('Location', `${identity.city}, ${identity.region}`)}
          </div>
        </div>

        {/* PHYSICAL */}
        <div className="card-section-label">Physical</div>
        <div className="fields-section">
          <div className="fields-grid fields-grid-3">
            {f('Height', identity.height)}
            {f('Weight', identity.weight)}
            {f('Blood Type', identity.bloodType)}
          </div>
        </div>

        {/* OFFICIAL DOCUMENTS */}
        <div className="card-section-label">Official Documents</div>
        <div className="fields-section">
          <div className="fields-grid">
            {f(identity.nationalIdLabel, identity.nationalId)}
            {f(identity.licenseLabel, identity.licenseId)}
          </div>
        </div>

        {/* CONTACT */}
        <div className="card-section-label">Contact</div>
        <div className="fields-section">
          <div className="fields-grid fields-grid-1">
            {f('Address', identity.fullAddress)}
          </div>
          <div className="fields-grid">
            {f('Phone', identity.phone)}
            {f('Email', identity.email)}
          </div>
          <div className="fields-grid">
            {f('Latitude', identity.latitude)}
            {f('Longitude', identity.longitude)}
          </div>
        </div>

        {/* ONLINE */}
        <div className="card-section-label">Online</div>
        <div className="fields-section">
          <div className="fields-grid">
            {f('Username', identity.username)}
            {f('Password', identity.password)}
            {f('Website', identity.website)}
            {f('First Name', identity.firstName)}
            {f('Last Name', identity.lastName)}
            {f('Middle Initial', `${identity.middleInitial}.`)}
          </div>
          <div className="fields-grid fields-grid-1">
            {f('Browser User Agent', identity.userAgent)}
          </div>
          <div className="fields-grid fields-grid-1">
            {f('GUID', identity.guid)}
          </div>
        </div>

        {/* FINANCE */}
        <div className="card-section-label">Finance</div>
        <div className="fields-section">
          <div className="fields-grid fields-grid-3">
            {f('Card Type', identity.cardType)}
            {f('Expiry', identity.cardExpiry)}
            {f('CVV', identity.cardCVV)}
          </div>
          <div className="fields-grid fields-grid-1">
            {f('Card Number', identity.cardNumber)}
          </div>
        </div>

        {/* EMPLOYMENT */}
        <div className="card-section-label">Employment</div>
        <div className="fields-section">
          <div className="fields-grid">
            {f('Company', identity.company)}
            {f('Occupation', identity.occupation)}
          </div>
        </div>

        {/* OTHER */}
        <div className="card-section-label">Other</div>
        <div className="fields-section">
          <div className="fields-grid">
            {f('Favourite Color', identity.favoriteColor)}
            {f('Vehicle', identity.vehicle)}
          </div>
        </div>

      </div>
    </div>
  );
}
