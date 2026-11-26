import { usePageMeta } from '../hooks/usePageMeta';
import type { YouTubeVideo } from '../types';
import { Hero } from '../components/home/Hero';
import { TrustHighlights } from '../components/home/TrustHighlights';
import { ServicesSection } from '../components/home/ServicesSection';
import { CustomerProfiles } from '../components/home/CustomerProfiles';
import { ProcessTimeline } from '../components/home/ProcessTimeline';
import { WhyChooseASV } from '../components/home/WhyChooseASV';
import { ValueAddedServices } from '../components/home/ValueAddedServices';
import { ProjectsSection } from '../components/home/ProjectsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { YouTubeSection } from '../components/home/YouTubeSection';
import { ConsultationSection } from '../components/home/ConsultationSection';

interface HomePageProps {
  onWatchHeroVideo: () => void;
  onPlayVideo: (video: YouTubeVideo) => void;
}

export function HomePage({ onWatchHeroVideo, onPlayVideo }: HomePageProps) {
  usePageMeta({
    title: 'Property Management in Bangalore for NRIs | ASV Property Management',
    description:
      'Professional property management services in Bengaluru for NRIs and homeowners. Tenant placement, rent coordination, property inspections, maintenance and documentation support.',
    canonicalPath: '/',
  });

  const scrollToConsultation = () => {
    document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onConsultClick={scrollToConsultation} onWatchVideoClick={onWatchHeroVideo} />
      <TrustHighlights />
      <WhyChooseASV />
      <ProcessTimeline />
      <ServicesSection />
      <ProjectsSection />
      <CustomerProfiles />
      <ValueAddedServices />
      <TestimonialsSection />
      <YouTubeSection onPlayVideo={onPlayVideo} />
      <ConsultationSection />
    </>
  );
}
