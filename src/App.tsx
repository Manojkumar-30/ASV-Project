import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig, motion } from 'motion/react';
import type { YouTubeVideo } from './types';
import { DURATION, EASE_PREMIUM } from './lib/motion';
import { SiteLayout } from './components/layout/SiteLayout';
import { VideoModal } from './components/ui/VideoModal';
import { HomePage } from './pages/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const NRIPage = lazy(() => import('./pages/NRIPage').then((m) => ({ default: m.NRIPage })));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage').then((m) => ({ default: m.HowItWorksPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then((m) => ({ default: m.PricingPage })));
const InsightsPage = lazy(() => import('./pages/InsightsPage').then((m) => ({ default: m.InsightsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })),
);
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="h-8 w-8 rounded-full border-2 border-[#E5E5E5] border-t-[#ED1C24] animate-spin" />
    </div>
  );
}

interface AnimatedRoutesProps {
  onWatchHeroVideo: () => void;
  onPlayVideo: (video: YouTubeVideo) => void;
}

function AnimatedRoutes({ onWatchHeroVideo, onPlayVideo }: AnimatedRoutesProps) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0.75 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.fast, ease: EASE_PREMIUM }}
    >
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location}>
          <Route
            path="/"
            element={<HomePage onWatchHeroVideo={onWatchHeroVideo} onPlayVideo={onPlayVideo} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/nri-property-management" element={<NRIPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/insights" element={<InsightsPage onPlayVideo={onPlayVideo} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />

          {/* Legacy path redirects */}
          <Route path="/terms" element={<Navigate to="/pricing" replace />} />
          <Route path="/nri" element={<Navigate to="/nri-property-management" replace />} />
          <Route path="/videos" element={<Navigate to="/insights" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </motion.div>
  );
}

export default function App() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  const openHeroVideoModal = () => {
    setSelectedVideo(null);
    setVideoModalOpen(true);
  };

  const handlePlayVideo = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setVideoModalOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <SiteLayout modalOpen={videoModalOpen}>
          <AnimatedRoutes onWatchHeroVideo={openHeroVideoModal} onPlayVideo={handlePlayVideo} />
        </SiteLayout>

        <VideoModal
          open={videoModalOpen}
          video={selectedVideo}
          onClose={() => {
            setVideoModalOpen(false);
            setSelectedVideo(null);
          }}
        />
      </BrowserRouter>
    </MotionConfig>
  );
}
