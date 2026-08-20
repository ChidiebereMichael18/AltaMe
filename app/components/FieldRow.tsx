'use client';

import { useState } from 'react';
import { copyToClipboard } from '../lib/copy';

interface FieldRowProps {
  label: string;
  value: string;
  fading?: boolean;
}

export function FieldRow({ label, value, fading = false }: FieldRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="field-row">
      <div className="field-label">{label}</div>
      <div className="field-value-row">
        <span className={`field-value${fading ? ' fading' : ''}`}>{value}</span>
        <button
          className={`copy-field-btn${copied ? ' copied' : ''}`}
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
          title={`Copy ${label}`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
