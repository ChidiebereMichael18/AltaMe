'use client';

import { COUNTRIES, CountryCode } from '../lib/generate';

interface CountryPickerProps {
  value: CountryCode;
  onChange: (code: CountryCode) => void;
  disabled?: boolean;
}

export function CountryPicker({ value, onChange, disabled = false }: CountryPickerProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="country-select" className="text-[11px] font-bold uppercase tracking-widest text-[#7a7870]">
        Country:
      </label>
      <select
        id="country-select"
        value={value}
        onChange={e => onChange(e.target.value as CountryCode)}
        disabled={disabled}
        className="bg-white border-2 border-[#111110] text-[#111110] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 focus:outline-none focus:border-[#d63a1a] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_0px_#111110]"
      >
        {COUNTRIES.map(c => (
          <option key={c.code} value={c.code}>
            {c.name} ({c.code})
          </option>
        ))}
      </select>
    </div>
  );
}
