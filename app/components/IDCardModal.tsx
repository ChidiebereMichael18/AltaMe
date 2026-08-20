'use client';

import { useState } from 'react';
import { Identity, CountryCode } from '../lib/generate';

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
  cardClass: string;
}

const COUNTRY_THEMES: Record<CountryCode, CountryTheme> = {
  US: {
    headerBg: 'linear-gradient(90deg, #0A192F 0%, #1E3A8A 60%, #D63A1A 100%)',
    headerTitle: 'UNITED STATES OF AMERICA',
    docTitle: 'STATE DRIVER LICENSE / IDENTIFICATION CARD',
    emblemText: '★ REAL ID',
    accentColor: '#D63A1A',
    idLabel: 'DL / SSN NO.',
    cardClass: 'theme-us',
  },
  GB: {
    headerBg: 'linear-gradient(90deg, #00382B 0%, #005F52 60%, #0288D1 100%)',
    headerTitle: 'GREAT BRITAIN · UNITED KINGDOM',
    docTitle: 'DRIVING LICENCE / PERMIS DE CONDUIRE',
    emblemText: '👑 UK',
    accentColor: '#00796B',
    idLabel: 'LICENCE NO.',
    cardClass: 'theme-gb',
  },
  CA: {
    headerBg: 'linear-gradient(90deg, #7A0000 0%, #C41230 65%, #1A365D 100%)',
    headerTitle: 'CANADA',
    docTitle: "PERMIS DE CONDUIRE / DRIVER'S LICENCE",
    emblemText: '🍁 CAN',
    accentColor: '#C41230',
    idLabel: 'LICENCE NO.',
    cardClass: 'theme-ca',
  },
  AU: {
    headerBg: 'linear-gradient(90deg, #001F54 0%, #003366 60%, #D4AF37 100%)',
    headerTitle: 'COMMONWEALTH OF AUSTRALIA',
    docTitle: 'DRIVER LICENCE / KEYPASS IDENTITY',
    emblemText: '🦘 AUS',
    accentColor: '#001F54',
    idLabel: 'LICENCE / TFN NO.',
    cardClass: 'theme-au',
  },
  DE: {
    headerBg: 'linear-gradient(90deg, #002B49 0%, #004070 60%, #B89230 100%)',
    headerTitle: 'BUNDESREPUBLIK DEUTSCHLAND',
    docTitle: 'PERSONALAUSWEIS / NATIONAL IDENTITY CARD',
    emblemText: '🦅 DEU',
    accentColor: '#002B49',
    idLabel: 'AUSWEIS NR.',
    cardClass: 'theme-de',
  },
  FR: {
    headerBg: 'linear-gradient(90deg, #002654 0%, #154380 50%, #ED2939 100%)',
    headerTitle: 'RÉPUBLIQUE FRANÇAISE',
    docTitle: "CARTE NATIONALE D'IDENTITÉ / NATIONAL ID",
    emblemText: '🇫🇷 FRA',
    accentColor: '#002654',
    idLabel: 'N° DE CARTE / PERMIS',
    cardClass: 'theme-fr',
  },
  NG: {
    headerBg: 'linear-gradient(90deg, #004D2E 0%, #008751 70%, #003B23 100%)',
    headerTitle: 'FEDERAL REPUBLIC OF NIGERIA',
    docTitle: 'NATIONAL IDENTITY CARD (NIN)',
    emblemText: '🇳🇬 NGA',
    accentColor: '#008751',
    idLabel: 'NIN / LICENCE NO.',
    cardClass: 'theme-ng',
  },
  IN: {
    headerBg: 'linear-gradient(90deg, #E65100 0%, #FF9933 45%, #138808 100%)',
    headerTitle: 'REPUBLIC OF INDIA / भारत गणराज्य',
    docTitle: 'UNIQUE IDENTIFICATION AUTHORITY / AADHAAR',
    emblemText: '☸️ IND',
    accentColor: '#E65100',
    idLabel: 'AADHAAR / DL NO.',
    cardClass: 'theme-in',
  },
};

export function IDCardModal({ identity, onClose }: IDCardModalProps) {
  const [copied, setCopied] = useState(false);

  const theme = COUNTRY_THEMES[identity.countryCode] || COUNTRY_THEMES.US;

  const [savedStatus, setSavedStatus] = useState(false);

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
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal id-card-modal-content" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close ID card">
          Close
        </button>

        <div className="id-modal-header">
          <span className="id-modal-tag" style={{ color: theme.accentColor }}>
            {identity.country.toUpperCase()} · Official Physical ID Preview
          </span>
          <h2 className="id-modal-title">{identity.fullName}</h2>
        </div>

        {/* Realistic Physical Driver License / ID Card Container */}
        <div className={`dl-card-container ${theme.cardClass}`} id="printable-id-card">
          {/* Hologram Shimmer Layer */}
          <div className="dl-card-hologram"></div>

          {/* Top Header Banner with Country Branding */}
          <div className="dl-card-header" style={{ background: theme.headerBg }}>
            <div className="dl-header-left">
              <span className="dl-state-name">
                {identity.region.toUpperCase() ? `${identity.region.toUpperCase()} · ` : ''}
                {theme.headerTitle}
              </span>
              <span className="dl-doc-title">{theme.docTitle}</span>
            </div>
            {/* Country Emblem Badge */}
            <div className="dl-emblem-badge" title={`${identity.country} Official Document`}>
              <span className="dl-emblem-icon">{theme.emblemText}</span>
            </div>
          </div>

          {/* Main Card Body */}
          <div className="dl-card-body">
            {/* Left Side: Photo, EMV Chip, Signature */}
            <div className="dl-left-col">
              {/* Photo Frame */}
              <div className="dl-photo-frame">
                <svg width="80" height="100" viewBox="0 0 90 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="90" height="115" fill="#E8E6E1" />
                  <path d="M0 23H90M0 46H90M0 69H90M0 92H90M22.5 0V115M45 0V115M67.5 0V115" stroke="#D8D5CC" strokeWidth="0.5" strokeDasharray="2 2" />
                  <circle cx="45" cy="40" r="17" fill="#4B4942" />
                  <path d="M15 98C15 78 27 70 45 70C63 70 75 78 75 98V115H15V98Z" fill="#4B4942" />
                  <circle cx="45" cy="40" r="23" stroke={theme.accentColor} strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
                </svg>
              </div>

              {/* Smart Card EMV Chip */}
              <div className="dl-emv-chip">
                <div className="dl-chip-line horiz"></div>
                <div className="dl-chip-line vert"></div>
              </div>

              {/* Signature Line */}
              <div className="dl-signature-box">
                <span className="dl-signature-text">{identity.firstName} {identity.lastName}</span>
                <span className="dl-signature-label">SIGNATURE</span>
              </div>
            </div>

            {/* Right Side: Primary License Fields */}
            <div className="dl-right-col">
              {/* License / ID Number Row */}
              <div className="dl-field-group highlight-row" style={{ borderLeftColor: theme.accentColor }}>
                <div className="dl-field">
                  <span className="dl-lbl" style={{ color: theme.accentColor }}>{theme.idLabel}</span>
                  <span className="dl-val dl-no" style={{ color: theme.accentColor }}>
                    {identity.licenseId || identity.nationalId}
                  </span>
                </div>
                <div className="dl-field">
                  <span className="dl-lbl" style={{ color: theme.accentColor }}>EXP</span>
                  <span className="dl-val exp">{expDate}</span>
                </div>
              </div>

              {/* Name Details */}
              <div className="dl-field">
                <span className="dl-lbl" style={{ color: theme.accentColor }}>1 SURNAME / LAST NAME</span>
                <span className="dl-val bold">{identity.lastName.toUpperCase()}</span>
              </div>
              <div className="dl-field">
                <span className="dl-lbl" style={{ color: theme.accentColor }}>2 GIVEN NAMES</span>
                <span className="dl-val bold">{identity.firstName.toUpperCase()} {identity.middleInitial ? `${identity.middleInitial}.` : ''}</span>
              </div>

              {/* Address */}
              <div className="dl-field">
                <span className="dl-lbl" style={{ color: theme.accentColor }}>8 ADDRESS</span>
                <span className="dl-val addr">{identity.fullAddress}</span>
              </div>

              {/* Specs Grid: DOB, SEX, HGT, WGT */}
              <div className="dl-specs-row">
                <div className="dl-field">
                  <span className="dl-lbl" style={{ color: theme.accentColor }}>4b DOB</span>
                  <span className="dl-val">{identity.dateOfBirth}</span>
                </div>
                <div className="dl-field">
                  <span className="dl-lbl" style={{ color: theme.accentColor }}>15 SEX</span>
                  <span className="dl-val">{identity.gender === 'Male' ? 'M' : 'F'}</span>
                </div>
                <div className="dl-field">
                  <span className="dl-lbl" style={{ color: theme.accentColor }}>16 HGT</span>
                  <span className="dl-val">{identity.height.split(' ')[0]}</span>
                </div>
                <div className="dl-field">
                  <span className="dl-lbl" style={{ color: theme.accentColor }}>17 NAT</span>
                  <span className="dl-val">{identity.nationality.slice(0, 3).toUpperCase()}</span>
                </div>
              </div>

              {/* Class & Restrictions */}
              <div className="dl-specs-row">
                <div className="dl-field">
                  <span className="dl-lbl" style={{ color: theme.accentColor }}>9 CLASS</span>
                  <span className="dl-val">C</span>
                </div>
                <div className="dl-field">
                  <span className="dl-lbl" style={{ color: theme.accentColor }}>12 REST</span>
                  <span className="dl-val">NONE</span>
                </div>
                <div className="dl-field">
                  <span className="dl-lbl" style={{ color: theme.accentColor }}>14 ISS</span>
                  <span className="dl-val">{issueYear}</span>
                </div>
              </div>
            </div>

            {/* Ghost Photo Watermark */}
            <div className="dl-ghost-photo">
              <svg width="45" height="55" viewBox="0 0 90 115" fill="none" opacity="0.2">
                <circle cx="45" cy="40" r="17" fill="#111" />
                <path d="M15 98C15 78 27 70 45 70C63 70 75 78 75 98V115H15V98Z" fill="#111" />
              </svg>
            </div>
          </div>

          {/* Bottom Barcode / MRZ Strip */}
          <div className="dl-card-footer">
            <div className="dl-barcode-strip">
              <div className="dl-barcode-lines"></div>
              <span className="dl-mrz-code">
                {identity.countryCode}P&lt;{identity.lastName.toUpperCase()}&lt;&lt;{identity.firstName.toUpperCase()}&lt;&lt;{identity.id.toUpperCase().slice(0, 12)}
              </span>
            </div>
          </div>
        </div>

        <div className="id-modal-actions">
          <button className="btn btn-secondary" onClick={handleCopyNo}>
            {copied ? 'Copied Number' : 'Copy ID Number'}
          </button>
          <button
            className="btn btn-primary"
            style={{ background: theme.accentColor, borderColor: theme.accentColor }}
            onClick={handleSaveCardData}
          >
            {savedStatus ? 'Saved to Device!' : 'Save Card Document'}
          </button>
        </div>
      </div>
    </div>
  );
}

