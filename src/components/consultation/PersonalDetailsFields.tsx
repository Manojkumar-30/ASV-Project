import type { ConsultationPayload } from '../../services/consultation';
import { InternationalPhoneInput } from './InternationalPhoneInput';

const RESIDENCE_COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'United Arab Emirates',
  'Singapore',
  'Australia',
  'Canada',
  'Germany',
  'Switzerland',
  'Saudi Arabia',
  'Qatar',
  'Oman',
  'Netherlands',
  'France',
  'Japan',
] as const;

interface PersonalDetailsFieldsProps {
  form: ConsultationPayload;
  errors: Record<string, string>;
  onUpdateField: <K extends keyof ConsultationPayload>(field: K, value: ConsultationPayload[K]) => void;
}

const INPUT_BASE_CLASS =
  'min-h-[48px] w-full rounded-xl border bg-white px-4 py-2.5 text-base sm:text-[15px] text-[#101010] placeholder:text-[#858585] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20';

export function PersonalDetailsFields({
  form,
  errors,
  onUpdateField,
}: PersonalDetailsFieldsProps) {
  const getBorderClass = (hasError: boolean) =>
    hasError
      ? 'border-[#ED1C24] ring-1 ring-[#ED1C24]/25'
      : 'border-[#E5E7EB] hover:border-[#101010]/40 focus:border-[#101010]';

  return (
    <fieldset className="space-y-4">
      <legend className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#626262]">
        <span className="font-mono-nums text-[#ED1C24]">01</span>
        <span>Your Details</span>
      </legend>

      {/* Row 1: Full name | Email address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label htmlFor="consult-fullName" className="block text-sm font-medium text-[#101010] mb-1.5">
            Full name <span className="text-[#ED1C24]">*</span>
          </label>
          <input
            id="consult-fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. Rajesh Nair"
            value={form.fullName}
            onChange={(e) => onUpdateField('fullName', e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'consult-fullName-error' : undefined}
            className={`${INPUT_BASE_CLASS} ${getBorderClass(Boolean(errors.fullName))}`}
          />
          {errors.fullName && (
            <p id="consult-fullName-error" className="mt-1.5 text-xs font-medium text-[#ED1C24]">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="consult-email" className="block text-sm font-medium text-[#101010] mb-1.5">
            Email address <span className="text-[#ED1C24]">*</span>
          </label>
          <input
            id="consult-email"
            name="email"
            type="email"
            inputMode="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => onUpdateField('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'consult-email-error' : undefined}
            className={`${INPUT_BASE_CLASS} ${getBorderClass(Boolean(errors.email))}`}
          />
          {errors.email && (
            <p id="consult-email-error" className="mt-1.5 text-xs font-medium text-[#ED1C24]">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: International phone | Country of residence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <InternationalPhoneInput
          id="consult-phone"
          value={form.phone}
          onChange={(val) => onUpdateField('phone', val)}
          error={errors.phone}
        />

        <div>
          <label htmlFor="consult-country" className="block text-sm font-medium text-[#101010] mb-1.5">
            Country of residence <span className="text-[#ED1C24]">*</span>
          </label>
          <input
            id="consult-country"
            name="country"
            type="text"
            list="asv-residence-countries"
            required
            autoComplete="country-name"
            placeholder="e.g. United States, India, UAE, UK"
            value={form.country}
            onChange={(e) => onUpdateField('country', e.target.value)}
            aria-invalid={Boolean(errors.country)}
            aria-describedby={errors.country ? 'consult-country-error' : undefined}
            className={`${INPUT_BASE_CLASS} ${getBorderClass(Boolean(errors.country))}`}
          />
          <datalist id="asv-residence-countries">
            {RESIDENCE_COUNTRIES.map((countryName) => (
              <option key={countryName} value={countryName} />
            ))}
          </datalist>
          {errors.country && (
            <p id="consult-country-error" className="mt-1.5 text-xs font-medium text-[#ED1C24]">
              {errors.country}
            </p>
          )}
        </div>
      </div>
    </fieldset>
  );
}
