import { useEffect, useState } from 'react';

const DIAL_CODE_OPTIONS = [
  { code: '+91', label: 'IN +91' },
  { code: '+1', label: 'US/CA +1' },
  { code: '+44', label: 'UK +44' },
  { code: '+971', label: 'UAE +971' },
  { code: '+65', label: 'SG +65' },
  { code: '+61', label: 'AU +61' },
  { code: '+49', label: 'DE +49' },
  { code: '+41', label: 'CH +41' },
  { code: '+966', label: 'SA +966' },
  { code: '+974', label: 'QA +974' },
  { code: '+968', label: 'OM +968' },
  { code: '+33', label: 'FR +33' },
  { code: '+31', label: 'NL +31' },
  { code: '+81', label: 'JP +81' },
  { code: 'custom', label: 'Other (+)' },
] as const;

interface InternationalPhoneInputProps {
  id: string;
  value: string;
  onChange: (combinedPhone: string) => void;
  error?: string;
}

export function InternationalPhoneInput({
  id,
  value,
  onChange,
  error,
}: InternationalPhoneInputProps) {
  const [dialCode, setDialCode] = useState<string>('+91');
  const [localNumber, setLocalNumber] = useState<string>('');

  // Sync reset when parent clears form value after successful submission
  useEffect(() => {
    if (!value) {
      setLocalNumber('');
    }
  }, [value]);

  const handleDialCodeChange = (nextCode: string) => {
    setDialCode(nextCode);
    if (nextCode === 'custom') {
      const cleaned = localNumber.trim();
      onChange(cleaned.startsWith('+') ? cleaned : cleaned ? `+${cleaned}` : '');
      return;
    }
    const cleaned = localNumber.replace(/^\+[\d-]*\s*/, '').trim();
    setLocalNumber(cleaned);
    onChange(cleaned ? `${nextCode} ${cleaned}`.slice(0, 28) : '');
  };

  const handleNumberChange = (raw: string) => {
    // Strip characters disallowed by backend regex (/^[+\d\s().-]{7,28}$/)
    const sanitized = raw.replace(/[^+\d\s().-]/g, '');

    // If user pastes or types a full international number starting with +, switch seamlessly to custom
    if (sanitized.trimStart().startsWith('+') && dialCode !== 'custom') {
      const normalized = sanitized.trimStart().slice(0, 28);
      setDialCode('custom');
      setLocalNumber(normalized);
      onChange(normalized);
      return;
    }

    if (dialCode === 'custom') {
      const trimmed = sanitized.slice(0, 28);
      setLocalNumber(trimmed);
      onChange(trimmed.trim());
      return;
    }

    const maxLocal = Math.max(8, 28 - dialCode.length - 1);
    const clipped = sanitized.slice(0, maxLocal);
    setLocalNumber(clipped);
    const trimmedLocal = clipped.trim();
    onChange(trimmedLocal ? `${dialCode} ${trimmedLocal}` : '');
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#101010] mb-1.5">
        International phone or WhatsApp <span className="text-[#ED1C24]">*</span>
      </label>

      <div
        className={`flex min-h-[48px] w-full items-stretch overflow-hidden rounded-xl border bg-white transition-colors duration-200 ${
          error
            ? 'border-[#ED1C24] ring-1 ring-[#ED1C24]/25'
            : 'border-[#E5E7EB] hover:border-[#101010]/40 focus-within:border-[#101010] focus-within:ring-2 focus-within:ring-[#ED1C24]/20'
        }`}
      >
        <select
          aria-label="Country dialing code"
          value={dialCode}
          onChange={(e) => handleDialCodeChange(e.target.value)}
          className="w-[92px] sm:w-[112px] shrink-0 border-r border-[#E5E7EB] bg-[#F8F8F8] px-2 sm:px-2.5 py-2.5 font-mono-nums text-base sm:text-sm font-medium text-[#101010] focus:outline-none"
        >
          {DIAL_CODE_OPTIONS.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.label}
            </option>
          ))}
        </select>

        <input
          id={id}
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel-national"
          placeholder={dialCode === 'custom' ? '+44 7700 900077' : 'Phone number'}
          value={localNumber}
          onChange={(e) => handleNumberChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="min-w-0 flex-1 bg-white px-3 sm:px-3.5 py-2.5 text-base sm:text-[15px] text-[#101010] placeholder:text-[#858585] focus:outline-none"
        />
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-[#ED1C24]">
          {error}
        </p>
      )}
    </div>
  );
}
