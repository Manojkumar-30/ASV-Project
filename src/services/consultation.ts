export interface ConsultationPayload {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  propertyLocation: string;
  propertyType: 'Apartment / Flat' | 'Villa / Independent House' | 'Gated Community Home' | 'Commercial / Other';
  requiredService:
    | 'End-to-End Property Management'
    | 'NRI Property Management'
    | 'Tenant Placement & Screening'
    | 'Rental & Maintenance Coordination'
    | 'Property Inspection & Documentation'
    | 'Plans & Commercial Proposal';
  preferredContact: 'WhatsApp' | 'Phone Call' | 'Email' | 'Video Consultation';
  message: string;
  privacyConsent: boolean;
  website?: string;
}

export interface ConsultationResponse {
  ok: boolean;
  referenceId?: string;
  mode?: 'crm' | 'local_intake';
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

export async function submitConsultation(payload: ConsultationPayload): Promise<ConsultationResponse> {
  const response = await fetch('/api/consultations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return {
      ok: false,
      error:
        'Online form backend is not active on static hosting. Please message us on WhatsApp or call +91 74110 01523.',
    };
  }

  const data = (await response.json()) as ConsultationResponse;
  if (!response.ok) {
    return {
      ok: false,
      error: data.error || 'Unable to submit your request. Please try again or call +91 74110 01523.',
      fieldErrors: data.fieldErrors,
    };
  }
  return data;
}
