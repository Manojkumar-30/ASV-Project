import { ConsultationContactPanel } from './ConsultationContactPanel';
import { ConsultationForm } from './ConsultationForm';
import { ConsultationHeading } from './ConsultationHeading';
import { ConsultationPropertyImage } from './ConsultationPropertyImage';
import { ConsultationTrustStrip } from './ConsultationTrustStrip';

export function ConsultationSection() {
  return (
    <section
      id="consultation"
      aria-label="Consultation and Contact"
      className="scroll-mt-20 relative py-16 sm:py-24 lg:py-[112px] bg-[#101010] text-white overflow-x-clip"
    >
      {/* Subtle Low-Opacity Architectural Grid Backdrop */}
      <div
        className="pointer-events-none absolute inset-0 architectural-grid-dark opacity-70"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Desktop Split (~44% Left | ~56% Right) & Exact Mobile Hierarchy:
            Mobile: 1. Heading -> 2. Intro -> 3. Quick Call/WhatsApp -> 4. Form -> 5. Photo -> 6. Office/Hours -> 7. Trust Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-[44fr_56fr] lg:grid-rows-[auto_auto_1fr] gap-8 lg:gap-x-12 xl:gap-x-16 lg:gap-y-7 items-start">
          {/* 1, 2 & Mobile 3: Heading, Intro & Mobile Quick Contact Buttons */}
          <div className="lg:col-start-1 lg:row-start-1">
            <ConsultationHeading />
          </div>

          {/* Mobile 4 / Desktop Right Column: Elevated White Consultation Form */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-3">
            <ConsultationForm />
          </div>

          {/* Mobile 5 / Desktop Left Middle: Architectural Photograph + Floating Glass Card */}
          <div className="lg:col-start-1 lg:row-start-2">
            <ConsultationPropertyImage />
          </div>

          {/* Mobile 6 / Desktop Left Bottom: Separated Dark Contact Panel */}
          <div className="lg:col-start-1 lg:row-start-3 self-start">
            <ConsultationContactPanel />
          </div>
        </div>

        {/* 7: Compact Trust Strip */}
        <ConsultationTrustStrip />
      </div>
    </section>
  );
}
