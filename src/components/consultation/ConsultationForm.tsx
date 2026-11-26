import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AlertCircle, ArrowUpRight, CheckCircle2, MessagesSquare } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import { submitConsultation, type ConsultationPayload } from '../../services/consultation';
import { ConsentField } from './ConsentField';
import { ConsultationSubmitButton } from './ConsultationSubmitButton';
import { PersonalDetailsFields } from './PersonalDetailsFields';
import { PropertyDetailsFields } from './PropertyDetailsFields';

const INITIAL_FORM: ConsultationPayload = {
  fullName: '',
  email: '',
  phone: '',
  country: '',
  propertyLocation: '',
  propertyType: 'Apartment / Flat',
  requiredService: 'End-to-End Property Management',
  preferredContact: 'WhatsApp',
  message: '',
  privacyConsent: false,
  website: '',
};

export function ConsultationForm() {
  const reduced = useReducedMotion();
  const [form, setForm] = useState<ConsultationPayload>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{
    referenceId: string;
    message: string;
    mode?: 'crm' | 'local_intake';
  } | null>(null);

  const handleUpdateField = <K extends keyof ConsultationPayload>(
    field: K,
    value: ConsultationPayload[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateClient = (): Record<string, string> => {
    const next: Record<string, string> = {};
    if (form.fullName.trim().length < 2) {
      next.fullName = 'Please enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    const trimmedPhone = form.phone.trim();
    const digitCount = trimmedPhone.replace(/\D/g, '').length;
    if (!/^[+\d\s().-]{7,28}$/.test(trimmedPhone) || digitCount < 7) {
      next.phone =
        'Enter a valid international phone or WhatsApp number (e.g. +1 415 555 0198 or +91 98...).';
    }
    if (form.country.trim().length < 2) {
      next.country = 'Please enter your country of residence.';
    }
    if (form.propertyLocation.trim().length < 2) {
      next.propertyLocation = 'Please enter your property location or community name.';
    }
    if (!form.privacyConsent) {
      next.privacyConsent = 'Please agree to the privacy consent to submit your enquiry.';
    }
    return next;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitError(null);
    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await submitConsultation(form);
      if (!response.ok) {
        setSubmitError(response.error || 'Unable to submit your request.');
        if (response.fieldErrors) {
          const mapped: Record<string, string> = {};
          for (const [key, msgs] of Object.entries(response.fieldErrors)) {
            if (msgs?.[0]) mapped[key] = msgs[0];
          }
          setErrors(mapped);
        }
        return;
      }

      setConfirmation({
        referenceId: response.referenceId || 'ASV-INQUIRY',
        message: response.message || 'Your consultation request has been received.',
        mode: response.mode,
      });
      setForm(INITIAL_FORM);
    } catch {
      setSubmitError(
        `Network error while submitting your request. Please try again or call ${COMPANY_INFO.phoneDisplay}.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.slow, delay: 0.1, ease: EASE_PREMIUM }}
      className="rounded-[24px] sm:rounded-[28px] border border-white/10 bg-white p-5 sm:p-8 lg:p-10 text-[#101010] shadow-[0_28px_70px_rgba(0,0,0,0.3)]"
    >
      {confirmation ? (
        <div className="py-6 sm:py-8 space-y-5" role="status" aria-live="polite">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ED1C24]/20 bg-[#FFF0F0] text-[#ED1C24]">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </div>

          <div>
            <p className="font-mono-nums text-xs font-semibold tracking-wider uppercase text-[#ED1C24]">
              Reference: {confirmation.referenceId}
            </p>
            <h3 className="mt-1.5 font-display text-2xl sm:text-[26px] font-bold text-[#101010]">
              Consultation enquiry received
            </h3>
          </div>

          <p className="text-sm sm:text-[15px] leading-relaxed text-[#626262]">
            {confirmation.message}
          </p>

          <div className="pt-3 flex flex-col sm:flex-row flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setConfirmation(null)}
              className="btn-press inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#E5E7EB] px-5 py-2.5 text-sm font-semibold text-[#101010] hover:border-[#101010]"
            >
              Submit another enquiry
            </button>
            <a
              href={COMPANY_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#101010] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#ED1C24]"
            >
              <span>Continue on WhatsApp</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Card Header */}
          <div className="pb-5 border-b border-[#E5E7EB]">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#ED1C24]/20 bg-[#FFF0F0] text-[#ED1C24] mb-3.5">
              <MessagesSquare className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl sm:text-[26px] font-bold tracking-tight text-[#101010]">
              Let&apos;s talk about your property.
            </h3>
            <p className="mt-2 text-sm text-[#626262] leading-relaxed">
              Tell us a little about yourself. Our team will help you find the right property
              management solution.
            </p>
            <p className="mt-2 text-xs text-[#626262]">
              Fields marked with <span className="font-semibold text-[#ED1C24]">*</span> are
              required.
            </p>
          </div>

          {/* Honeypot anti-spam field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="consult-website">Website</label>
            <input
              id="consult-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website || ''}
              onChange={(e) => handleUpdateField('website', e.target.value)}
            />
          </div>

          {submitError && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-[#ED1C24]/30 bg-[#FFF1F1] p-4 text-sm text-[#101010]"
            >
              <AlertCircle className="h-5 w-5 text-[#ED1C24] shrink-0 mt-0.5" aria-hidden="true" />
              <span>{submitError}</span>
            </div>
          )}

          <PersonalDetailsFields
            form={form}
            errors={errors}
            onUpdateField={handleUpdateField}
          />

          <PropertyDetailsFields
            form={form}
            errors={errors}
            onUpdateField={handleUpdateField}
          />

          <ConsentField
            checked={form.privacyConsent}
            onChange={(checked) => handleUpdateField('privacyConsent', checked)}
            error={errors.privacyConsent}
          />

          <ConsultationSubmitButton submitting={submitting} />
        </form>
      )}
    </motion.div>
  );
}
