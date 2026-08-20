'use client';

import { COUNTRIES, CountryCode } from '../lib/generate';

interface CountryPickerProps {
  value: CountryCode;
  onChange: (code: CountryCode) => void;
  disabled?: boolean;
}

export function CountryPicker({ value, onChange, disabled = false }: CountryPickerProps) {
  return (
    <div className="country-picker">
      <label className="country-picker-label" htmlFor="country-select">
        Country
      </label>
      <select
        id="country-select"
        className="country-picker-select"
        value={value}
        onChange={e => onChange(e.target.value as CountryCode)}
        disabled={disabled}
      >
        {COUNTRIES.map(c => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
