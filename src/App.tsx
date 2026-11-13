import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { TabType, FeatureSubTab } from './types';
import { Navbar } from './components/Navbar';
import { SupportModal } from './components/SupportModal';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { CommandsPage } from './pages/CommandsPage';
import { LegalPage } from './pages/LegalPage';
import {
  MarketPage,
  StatusPage,
  PremiumPage,
  AdsPage,
  FaqPage,
  ChangelogPage,
  WikiPage,
  DocsPage,
  ApiKeysPage,
  FeedbackPage,
  LoginPage,
  PartnerPage,
} from './components/PortalPages';
import { setupDevToolsProtection } from './utils/disableDevTools';
import { LanguageProvider } from './i18n/translations';
import { getPathForTab, getTabFromPath } from './routes';

function MainApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tab: activeTab, featureSubTab: activeFeatureTab } = getTabFromPath(location.pathname);

  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isCookieBannerOpen, setIsCookieBannerOpen] = useState(true);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('synaps_theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  // Apply dark class to documentElement whenever isDark changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('synaps_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('synaps_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Silently disable F12, DevTools shortcuts, and right-click inspection
  useEffect(() => {
    const cleanup = setupDevToolsProtection();
    return () => {
      cleanup?.();
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const handleTabChange = (tab: TabType, featureSubTab?: FeatureSubTab) => {
    const targetPath = getPathForTab(tab, featureSubTab);
    const currentPath = location.pathname.replace(/\/+$/, '') || '/';

    if (targetPath === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    setIsPageTransitioning(true);
    transitionTimerRef.current = setTimeout(() => {
      navigate(targetPath);
      window.scrollTo({ top: 0, behavior: 'auto' });
      transitionTimerRef.current = setTimeout(() => {
        setIsPageTransitioning(false);
      }, 180);
    }, 420);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-between transition-colors duration-200 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black ${
        isDark ? 'bg-black text-[#f4f4f5]' : 'bg-[#fbfbfd] text-neutral-900'
      }`}
    >
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenSupport={() => setIsSupportOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Page Transition Loading Wait Overlay */}
      <AnimatePresence>
        {isPageTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#fbfbfd]/90 dark:bg-black/92 backdrop-blur-md pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* Subtle Neutral Glow */}
              <div
                aria-hidden="true"
                className="absolute w-24 h-24 rounded-full bg-neutral-400/15 dark:bg-white/[0.06] blur-2xl pointer-events-none"
              />

              {/* Orbiting Minimal SVG Ring */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.15, ease: 'linear' }}
                className="w-[88px] h-[88px] pointer-events-none"
                viewBox="0 0 88 88"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="44"
                  cy="44"
                  r="40"
                  className="stroke-neutral-900/10 dark:stroke-white/10"
                  strokeWidth="2"
                />
                <path
                  d="M44 4 A 40 40 0 0 1 84 44"
                  className="stroke-neutral-900 dark:stroke-white"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                />
              </motion.svg>

              {/* Centered Synaps Bot Logo */}
              <motion.div
                animate={{ scale: [0.97, 1.03, 0.97] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="absolute w-14 h-14 rounded-2xl overflow-hidden bg-black border border-neutral-200/80 dark:border-white/20 shadow-2xl flex items-center justify-center"
              >
                <img
                  src="/assets/aistudio/image_12f5f257.png"
                  alt="Synaps"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Routed Page Content with Cinematic Framer Motion Route Transitions */}
      <main
        className={`w-full flex-1 flex flex-col transition-colors duration-200 ${
          isDark ? 'bg-black' : 'bg-[#fbfbfd]'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex-1 flex flex-col"
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage onTabChange={handleTabChange} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/features" element={<FeaturesPage defaultTab={activeFeatureTab} />} />
              <Route path="/features/:subTab" element={<FeaturesPage defaultTab={activeFeatureTab} />} />
              <Route path="/commands" element={<CommandsPage />} />
              <Route path="/market" element={<MarketPage onTabChange={handleTabChange} />} />
              <Route path="/premium" element={<PremiumPage onTabChange={handleTabChange} />} />
              <Route path="/ads" element={<AdsPage />} />
              <Route path="/reklamlar" element={<AdsPage />} />
              <Route path="/partner" element={<PartnerPage />} />
              <Route path="/partnerlik" element={<PartnerPage />} />
              <Route path="/changelog" element={<ChangelogPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/wiki" element={<WikiPage />} />
              <Route path="/status" element={<StatusPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/docs" element={<DocsPage onTabChange={handleTabChange} />} />
              <Route path="/api-anahtarlari" element={<ApiKeysPage />} />
              <Route path="/api-keys" element={<ApiKeysPage />} />
              <Route path="/login" element={<LoginPage onTabChange={handleTabChange} />} />
              <Route
                path="/terms-of-service"
                element={
                  <LegalPage
                    currentPolicy="terms"
                    onSelectPolicy={handleTabChange}
                    onBackToHome={() => handleTabChange('home')}
                  />
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <LegalPage
                    currentPolicy="privacy"
                    onSelectPolicy={handleTabChange}
                    onBackToHome={() => handleTabChange('home')}
                  />
                }
              />
              <Route
                path="/acceptable-use"
                element={
                  <LegalPage
                    currentPolicy="acceptable-use"
                    onSelectPolicy={handleTabChange}
                    onBackToHome={() => handleTabChange('home')}
                  />
                }
              />
              <Route
                path="/ai-moderation"
                element={
                  <LegalPage
                    currentPolicy="ai-moderation"
                    onSelectPolicy={handleTabChange}
                    onBackToHome={() => handleTabChange('home')}
                  />
                }
              />
              <Route
                path="/discord-tos"
                element={
                  <LegalPage
                    currentPolicy="discord-tos"
                    onSelectPolicy={handleTabChange}
                    onBackToHome={() => handleTabChange('home')}
                  />
                }
              />
              <Route
                path="/cookie-policy"
                element={
                  <LegalPage
                    currentPolicy="cookie"
                    onSelectPolicy={handleTabChange}
                    onBackToHome={() => handleTabChange('home')}
                  />
                }
              />
              <Route path="*" element={<HomePage onTabChange={handleTabChange} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Custom Footer */}
      <Footer
        onTabChange={handleTabChange}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenCookieSettings={() => setIsCookieBannerOpen(true)}
      />

      {/* Support Server Interactive Modal */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      {/* Cookie Banner */}
      <CookieBanner
        isOpen={isCookieBannerOpen}
        onClose={() => setIsCookieBannerOpen(false)}
        onOpenPolicy={() => handleTabChange('cookie-policy')}
      />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <LanguageProvider>
          <MainApp />
        </LanguageProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}
