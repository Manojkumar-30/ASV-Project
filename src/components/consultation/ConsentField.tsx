import { Link } from 'react-router-dom';

interface ConsentFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export function ConsentField({ checked, onChange, error }: ConsentFieldProps) {
  return (
    <div className="pt-1">
      <label
        htmlFor="consult-privacyConsent"
        className="flex items-start gap-3 cursor-pointer select-none"
      >
        <input
          id="consult-privacyConsent"
          name="privacyConsent"
          type="checkbox"
          required
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'consult-privacyConsent-error' : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#E5E7EB] accent-[#ED1C24] text-[#ED1C24] focus:ring-2 focus:ring-[#ED1C24]/30"
        />
        <span className="text-xs sm:text-[13px] leading-relaxed text-[#626262]">
          I agree to ASV Property Management using my submitted details to respond to this
          consultation enquiry in accordance with the{' '}
          <Link
            to="/privacy-policy"
            className="font-semibold text-[#101010] underline underline-offset-2 hover:text-[#ED1C24] transition-colors"
          >
            Privacy Policy
          </Link>
          . <span className="text-[#ED1C24]">*</span>
        </span>
      </label>

      {error && (
        <p id="consult-privacyConsent-error" className="mt-1.5 text-xs font-medium text-[#ED1C24]">
          {error}
        </p>
      )}
    </div>
  );
}
