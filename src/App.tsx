import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TabType, FeatureSubTab } from './types';
import { Navbar } from './components/Navbar';
import { HeroHome } from './components/HeroHome';
import { AboutUs } from './components/AboutUs';
import { Features } from './components/Features';
import { CommandsView } from './components/CommandsView';
import { LegalPolicyPage, PolicyKey } from './components/LegalPolicyPage';
import { SupportModal } from './components/SupportModal';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';
import { setupDevToolsProtection } from './utils/disableDevTools';
import { LanguageProvider } from './i18n/translations';

function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeFeatureTab, setActiveFeatureTab] = useState<FeatureSubTab>('moderation');
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
    const sameTab = tab === activeTab && (!featureSubTab || featureSubTab === activeFeatureTab);
    if (sameTab) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    setIsPageTransitioning(true);
    transitionTimerRef.current = setTimeout(() => {
      setActiveTab(tab);
      if (featureSubTab) {
        setActiveFeatureTab(featureSubTab);
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
      transitionTimerRef.current = setTimeout(() => {
        setIsPageTransitioning(false);
      }, 180);
    }, 420);
  };

  const getLegalPolicyKey = (tab: TabType): PolicyKey | null => {
    switch (tab) {
      case 'terms-of-service':
        return 'terms';
      case 'privacy-policy':
        return 'privacy';
      case 'acceptable-use':
        return 'acceptable-use';
      case 'ai-moderation':
        return 'ai-moderation';
      case 'discord-tos':
        return 'discord-tos';
      case 'cookie-policy':
        return 'cookie';
      default:
        return null;
    }
  };

  const activeLegalKey = getLegalPolicyKey(activeTab);

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
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-neutral-950 dark:bg-[#0e0f14] border border-neutral-800 dark:border-white/[0.15] shadow-2xl flex items-center justify-center p-3.5 relative">
                <img
                  src="/assets/aistudio/image_ae8bcaf1.png"
                  alt="Synaps"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute -inset-2 rounded-3xl border-2 border-neutral-900/15 border-t-neutral-900 dark:border-white/10 dark:border-t-white animate-spin pointer-events-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <main
        className={`w-full flex-1 flex flex-col transition-colors duration-200 ${
          isDark ? 'bg-black' : 'bg-[#fbfbfd]'
        }`}
      >
        {activeTab === 'home' && <HeroHome onTabChange={handleTabChange} />}
        {activeTab === 'about' && (
          <div className="flex-1 w-full bg-[#fbfbfd] dark:bg-black">
            <AboutUs />
          </div>
        )}
        {activeTab === 'features' && (
          <div className="flex-1 w-full bg-[#fbfbfd] dark:bg-black">
            <Features initialTab={activeFeatureTab} />
          </div>
        )}
        {activeTab === 'commands' && (
          <div className="flex-1 w-full bg-[#fbfbfd] dark:bg-black">
            <CommandsView />
          </div>
        )}
        {activeLegalKey && (
          <div className="flex-1 w-full bg-[#fbfbfd] dark:bg-black">
            <LegalPolicyPage
              currentPolicy={activeLegalKey}
              onSelectPolicy={handleTabChange}
              onBackToHome={() => handleTabChange('home')}
            />
          </div>
        )}
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
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
