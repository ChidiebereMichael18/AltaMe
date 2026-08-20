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
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <div className="group flex flex-col gap-1 p-3 border-b border-r border-[#e0ddd8] hover:bg-[#d63a1a]/[0.025] transition-colors relative min-w-0">
      <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#d63a1a]">
        {label}
      </div>
      <div className="flex items-baseline justify-between gap-2 min-w-0">
        <span
          className={`font-mono text-sm text-[#111110] tracking-wide truncate transition-opacity duration-200 ${
            fading ? 'opacity-20' : 'opacity-100'
          }`}
          title={value}
        >
          {value}
        </span>
        <button
          onClick={handleCopy}
          className={`shrink-0 text-[10px] font-bold uppercase tracking-wider transition-opacity cursor-pointer ${
            copied ? 'opacity-100 text-emerald-600' : 'opacity-0 group-hover:opacity-100 text-[#b8b6b0] hover:text-[#d63a1a]'
          }`}
          aria-label={`Copy ${label}`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
