import { useState } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { MANAGED_PROJECTS } from '../data/projects';
import type { ProjectCommunity } from '../types';
import { usePageMeta } from '../hooks/usePageMeta';
import { Container } from '../components/ui/Container';
import { Modal } from '../components/ui/Modal';
import { ClipImageReveal, EditorialReveal, MaskedLine } from '../components/ui/MotionPrimitives';
import { SectionLabel } from '../components/ui/SectionLabel';
import { SmartImage } from '../components/ui/SmartImage';
import { ConsultationSection } from '../components/home/ConsultationSection';

const CORRIDOR_FILTERS = ['All', 'Whitefield / East', 'North Bengaluru'] as const;

export function ProjectsPage() {
  usePageMeta({
    title: 'Residential Communities Under Management | ASV Property Management',
    description:
      'Explore residential apartment communities in Bengaluru where ASV manages properties for homeowners and NRIs, including Godrej United, Brigade Lakefront, Prestige Tranquillity, and Sobha City.',
    canonicalPath: '/projects',
  });

  const [filter, setFilter] = useState<(typeof CORRIDOR_FILTERS)[number]>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectCommunity | null>(null);

  const filtered = MANAGED_PROJECTS.filter((project) => {
    if (filter === 'All') return true;
    if (filter === 'North Bengaluru') {
      return project.corridor.includes('North');
    }
    return !project.corridor.includes('North');
  });

  return (
    <>
      <section className="pt-12 sm:pt-16 lg:pt-24 pb-12 bg-[#FAFAFA] border-b border-[#E5E5E5]">
        <Container>
          <SectionLabel text="Portfolio Footprint" className="mb-4" />
          <h1 className="hero-headline font-bold text-[#101010] max-w-4xl mb-6">
            <MaskedLine immediate>Communities where ASV</MaskedLine>
            <MaskedLine immediate delay={0.1}>
              serves <span className="text-[#ED1C24]">homeowners.</span>
            </MaskedLine>
          </h1>
          <p className="text-lg text-[#626262] max-w-2xl leading-relaxed mb-8">
            Below are prominent residential communities in Bengaluru where ASV manages individual owner units.
            We operate independently on behalf of unit owners and do not claim ownership or builder affiliation.
          </p>

          <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#E5E5E5] bg-white p-1">
            {CORRIDOR_FILTERS.map((option) => {
              const active = filter === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  aria-pressed={active}
                  className={`btn-press rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                    active ? 'bg-[#101010] text-white' : 'text-[#626262] hover:text-[#101010]'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-white border-b border-[#E5E5E5]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, idx) => (
              <EditorialReveal key={project.id} delay={idx * 0.04} distance={16}>
                <article className="group h-full rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(16,16,16,0.06)]">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`View ${project.name} details`}
                    className="block w-full text-left"
                  >
                    <ClipImageReveal className="relative aspect-[4/3] overflow-hidden bg-[#F7F7F7]">
                      <SmartImage
                        src={project.image}
                        alt={`${project.name} in ${project.location}`}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </ClipImageReveal>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5 text-xs text-[#626262]">
                          <MapPin className="h-3.5 w-3.5 text-[#ED1C24]" aria-hidden="true" />
                          <span>{project.location}</span>
                        </div>
                        <ArrowUpRight
                          className="h-4 w-4 text-[#858585] group-hover:text-[#ED1C24] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                          aria-hidden="true"
                        />
                      </div>
                      <h2 className="font-display text-xl font-bold text-[#101010]">{project.name}</h2>
                      <p className="text-sm text-[#626262] mt-2">{project.note}</p>
                    </div>
                  </button>
                </article>
              </EditorialReveal>
            ))}
          </div>
        </Container>
      </section>

      <Modal
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name || 'Community Details'}
        maxWidthClass="max-w-2xl"
      >
        {selectedProject && (
          <div className="space-y-5">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#E5E5E5]">
              <SmartImage
                src={selectedProject.image}
                alt={`${selectedProject.name} in ${selectedProject.location}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#626262]">
                <span className="inline-flex items-center gap-1 font-medium text-[#ED1C24]">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {selectedProject.location}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedProject.corridor}</span>
              </div>
              <p className="text-[15px] text-[#626262] leading-relaxed">{selectedProject.note}</p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="btn-press rounded-full border border-[#E5E5E5] px-5 py-2.5 text-sm font-semibold text-[#101010]"
              >
                Close
              </button>
              <a
                href="#consultation"
                onClick={() => setSelectedProject(null)}
                className="btn-press inline-flex items-center gap-2 rounded-full bg-[#ED1C24] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#C81018]"
              >
                <span>Enquire for {selectedProject.name}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </Modal>

      <ConsultationSection />
    </>
  );
}
