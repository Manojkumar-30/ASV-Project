import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WHY_CHOOSE_BENEFITS } from '../../data/whyChooseUs';
import { ApproachFeature } from './ApproachFeature';
import { ASVBenefitsGrid } from './ASVBenefitsGrid';
import { CompanyVideoDialog, CompanyVideoTrigger } from './CompanyVideoDialog';
import { PropertyImageShowcase } from './PropertyImageShowcase';
import { ResponseFeature } from './ResponseFeature';
import { WhyChooseUsCTA } from './WhyChooseUsCTA';
import { WhyChooseUsHeading } from './WhyChooseUsHeading';

export function WhyChooseUsSection() {
  const navigate = useNavigate();
  const [videoOpen, setVideoOpen] = useState(false);

  const handleConsultClick = useCallback(() => {
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate('/contact');
  }, [navigate]);

  return (
    <section
      id="why-choose-us"
      className="scroll-mt-20 py-16 sm:py-24 lg:py-28 xl:py-[112px] bg-[#F7F7F8] border-b border-[#E5E7EB] overflow-x-clip"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Split-Screen Editorial Section:
            Mobile: Heading -> Image -> Approach + Response + Video
            Desktop (lg+): Left 45% Photo | Right 55% Heading + Approach + Response + Video */}
        <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] lg:grid-rows-[auto_1fr] gap-8 lg:gap-x-12 xl:gap-x-16 lg:gap-y-6 items-start">
          {/* 1. Heading & Introduction */}
          <div className="lg:col-start-2 lg:row-start-1">
            <WhyChooseUsHeading />
          </div>

          {/* 2. Architectural Photograph Showcase + Floating Glass Trust Card */}
          <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2">
            <PropertyImageShowcase />
          </div>

          {/* 3. Approach + Fast Response + Watch Video Trigger */}
          <div className="lg:col-start-2 lg:row-start-2">
            <div className="border-t border-[#E5E7EB]">
              <ApproachFeature />
              <ResponseFeature />
            </div>
            <CompanyVideoTrigger onOpen={() => setVideoOpen(true)} />
          </div>
        </div>

        {/* 6 Original Benefits Grid */}
        <ASVBenefitsGrid benefits={WHY_CHOOSE_BENEFITS} />

        {/* Black Architectural CTA Banner */}
        <WhyChooseUsCTA onConsultClick={handleConsultClick} />
      </div>

      {/* Lazy YouTube Video Dialog */}
      <CompanyVideoDialog open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
