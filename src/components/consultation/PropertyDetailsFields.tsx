import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ConsultationPayload } from '../../services/consultation';

interface PropertyDetailsFieldsProps {
  form: ConsultationPayload;
  errors: Record<string, string>;
  onUpdateField: <K extends keyof ConsultationPayload>(field: K, value: ConsultationPayload[K]) => void;
}

const INPUT_BASE_CLASS =
  'min-h-[48px] w-full rounded-xl border bg-white px-4 py-2.5 text-base sm:text-[15px] text-[#101010] placeholder:text-[#858585] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20';

export function PropertyDetailsFields({
  form,
  errors,
  onUpdateField,
}: PropertyDetailsFieldsProps) {
  const [mobileOptionalOpen, setMobileOptionalOpen] = useState(false);

  // Automatically reveal optional details on mobile if any optional field receives a validation error
  useEffect(() => {
    if (
      errors.propertyType ||
      errors.requiredService ||
      errors.preferredContact ||
      errors.message
    ) {
      setMobileOptionalOpen(true);
    }
  }, [errors]);

  const getBorderClass = (hasError: boolean) =>
    hasError
      ? 'border-[#ED1C24] ring-1 ring-[#ED1C24]/25'
      : 'border-[#E5E7EB] hover:border-[#101010]/40 focus:border-[#101010]';

  return (
    <fieldset className="space-y-4 pt-2 border-t border-[#F0F0F2]">
      <legend className="flex items-center gap-2.5 pt-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#626262]">
        <span className="font-mono-nums text-[#ED1C24]">02</span>
        <span>Your Property</span>
      </legend>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Row 3 Left (Always Visible Required): Property location / community */}
        <div>
          <label
            htmlFor="consult-propertyLocation"
            className="block text-sm font-medium text-[#101010] mb-1.5"
          >
            Property location / community <span className="text-[#ED1C24]">*</span>
          </label>
          <input
            id="consult-propertyLocation"
            name="propertyLocation"
            type="text"
            required
            placeholder="e.g. Whitefield, Prestige Tranquillity"
            value={form.propertyLocation}
            onChange={(e) => onUpdateField('propertyLocation', e.target.value)}
            aria-invalid={Boolean(errors.propertyLocation)}
            aria-describedby={
              errors.propertyLocation ? 'consult-propertyLocation-error' : undefined
            }
            className={`${INPUT_BASE_CLASS} ${getBorderClass(Boolean(errors.propertyLocation))}`}
          />
          {errors.propertyLocation && (
            <p
              id="consult-propertyLocation-error"
              className="mt-1.5 text-xs font-medium text-[#ED1C24]"
            >
              {errors.propertyLocation}
            </p>
          )}
        </div>

        {/* Mobile Expandable Toggle for Optional Property Details (<768px only) */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileOptionalOpen((prev) => !prev)}
            aria-expanded={mobileOptionalOpen}
            className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] px-4 py-2.5 text-left transition-colors hover:border-[#101010]/30"
          >
            <div className="min-w-0">
              <div className="text-xs font-semibold text-[#101010]">
                Optional property &amp; service details
              </div>
              <div className="text-[11px] text-[#626262] truncate">
                {form.propertyType} · {form.preferredContact}
              </div>
            </div>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-[#626262] transition-transform duration-200 ${
                mobileOptionalOpen ? 'rotate-180 text-[#ED1C24]' : ''
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Row 3 Right: Property type */}
        <div className={mobileOptionalOpen ? 'block' : 'hidden md:block'}>
          <label
            htmlFor="consult-propertyType"
            className="block text-sm font-medium text-[#101010] mb-1.5"
          >
            Property type
          </label>
          <select
            id="consult-propertyType"
            name="propertyType"
            value={form.propertyType}
            onChange={(e) =>
              onUpdateField(
                'propertyType',
                e.target.value as ConsultationPayload['propertyType'],
              )
            }
            className={`${INPUT_BASE_CLASS} ${getBorderClass(Boolean(errors.propertyType))}`}
          >
            <option value="Apartment / Flat">Apartment / Flat</option>
            <option value="Villa / Independent House">Villa / Independent House</option>
            <option value="Gated Community Home">Gated Community Home</option>
            <option value="Commercial / Other">Commercial / Other</option>
          </select>
        </div>

        {/* Row 4 Left: Required service */}
        <div className={mobileOptionalOpen ? 'block' : 'hidden md:block'}>
          <label
            htmlFor="consult-requiredService"
            className="block text-sm font-medium text-[#101010] mb-1.5"
          >
            Required service
          </label>
          <select
            id="consult-requiredService"
            name="requiredService"
            value={form.requiredService}
            onChange={(e) =>
              onUpdateField(
                'requiredService',
                e.target.value as ConsultationPayload['requiredService'],
              )
            }
            className={`${INPUT_BASE_CLASS} ${getBorderClass(Boolean(errors.requiredService))}`}
          >
            <option value="End-to-End Property Management">
              End-to-End Property Management
            </option>
            <option value="NRI Property Management">NRI Property Management</option>
            <option value="Tenant Placement & Screening">Tenant Placement &amp; Screening</option>
            <option value="Rental & Maintenance Coordination">
              Rental &amp; Maintenance Coordination
            </option>
            <option value="Property Inspection & Documentation">
              Property Inspection &amp; Documentation
            </option>
            <option value="Plans & Commercial Proposal">Plans &amp; Commercial Proposal</option>
          </select>
        </div>

        {/* Row 4 Right: Preferred contact method */}
        <div className={mobileOptionalOpen ? 'block' : 'hidden md:block'}>
          <label
            htmlFor="consult-preferredContact"
            className="block text-sm font-medium text-[#101010] mb-1.5"
          >
            Preferred contact method
          </label>
          <select
            id="consult-preferredContact"
            name="preferredContact"
            value={form.preferredContact}
            onChange={(e) =>
              onUpdateField(
                'preferredContact',
                e.target.value as ConsultationPayload['preferredContact'],
              )
            }
            className={`${INPUT_BASE_CLASS} ${getBorderClass(Boolean(errors.preferredContact))}`}
          >
            <option value="WhatsApp">WhatsApp</option>
            <option value="Phone Call">Phone Call</option>
            <option value="Email">Email</option>
            <option value="Video Consultation">Video Consultation</option>
          </select>
        </div>

        {/* Row 5 Full-Width: Additional message */}
        <div className={`md:col-span-2 ${mobileOptionalOpen ? 'block' : 'hidden md:block'}`}>
          <label htmlFor="consult-message" className="block text-sm font-medium text-[#101010] mb-1.5">
            Additional message{' '}
            <span className="text-xs font-normal text-[#626262]">(optional)</span>
          </label>
          <textarea
            id="consult-message"
            name="message"
            rows={3}
            placeholder="Tell us about your property configuration, possession status or preferred contact time."
            value={form.message}
            onChange={(e) => onUpdateField('message', e.target.value)}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-base sm:text-[15px] text-[#101010] placeholder:text-[#858585] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ED1C24]/20 ${getBorderClass(
              Boolean(errors.message),
            )}`}
          />
        </div>
      </div>
    </fieldset>
  );
}
