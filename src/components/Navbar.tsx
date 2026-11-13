import React, { useState, useRef, useEffect } from 'react';
import { TabType, FeatureSubTab } from '../types';
import { BOT_INVITE_URL } from '../data/commandsData';
import {
  Menu,
  X,
  ChevronDown,
  Shield,
  Coins,
  Ticket,
  Briefcase,
  Wrench,
  Terminal,
  ShieldCheck,
  Zap,
  MessageSquare,
  Sparkles,
  Store,
  Compass,
  Globe,
  Moon,
  Sun,
} from 'lucide-react';
import { useLanguage, supportedLanguages } from '../i18n/translations';
import { FlagIcon } from './FlagIcon';

const DiscordIcon: React.FC = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType, featureSubTab?: FeatureSubTab) => void;
  onOpenSupport?: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

type DropdownType = 'about' | 'features' | 'commands' | null;

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  isDark = false,
  onToggleTheme,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (menu: DropdownType) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsLangOpen(false);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleNavClick = (tab: TabType, featureSubTab?: FeatureSubTab) => {
    onTabChange(tab, featureSubTab);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setIsLangOpen(false);
  };

  const commandsItems = [
    {
      icon: <Shield className="w-4 h-4" />,
      title: t.commandsPage.categories.moderation,
      desc: t.hero.modDesc,
      onClick: () => handleNavClick('commands'),
    },
    {
      icon: <Coins className="w-4 h-4" />,
      title: t.commandsPage.categories.economy,
      desc: t.hero.ecoDesc,
      onClick: () => handleNavClick('commands'),
    },
    {
      icon: <Ticket className="w-4 h-4" />,
      title: t.featuresPage.tabs.tickets,
      desc: t.hero.ticketDesc,
      onClick: () => handleNavClick('commands'),
    },
    {
      icon: <Briefcase className="w-4 h-4" />,
      title: t.featuresPage.tabs.jobs,
      desc: t.hero.jobDesc,
      onClick: () => handleNavClick('commands'),
    },
    {
      icon: <Wrench className="w-4 h-4" />,
      title: t.commandsPage.categories.utility,
      desc: t.navbar.megaMenu.prefixSub,
      onClick: () => handleNavClick('commands'),
    },
    {
      icon: <Terminal className="w-4 h-4" />,
      title: t.commandsPage.allCommands,
      desc: t.commandsPage.subtitle,
      onClick: () => handleNavClick('commands'),
    },
  ];

  const aboutItems = [
    {
      icon: <ShieldCheck className="w-4 h-4" />,
      title: t.aboutPage.tabs.security,
      desc: t.aboutPage.highlight1Desc || t.hero.highlights.antiRaid,
      onClick: () => handleNavClick('about'),
    },
    {
      icon: <Zap className="w-4 h-4" />,
      title: t.aboutPage.tabs.economy,
      desc: t.aboutPage.highlight2Desc || t.hero.highlights.ping,
      onClick: () => handleNavClick('about'),
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      title: t.aboutPage.tabs.support,
      desc: t.aboutPage.highlight3Desc || t.footer.supportServer,
      onClick: () => handleNavClick('about'),
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      title: t.aboutPage.storyTitle || t.aboutPage.founderTitle,
      desc: t.aboutPage.founderBio,
      onClick: () => handleNavClick('about'),
    },
  ];

  const featuresItems = [
    {
      icon: <Shield className="w-4 h-4" />,
      title: t.featuresPage.tabs.moderation,
      desc: t.hero.modDesc,
      onClick: () => handleNavClick('features', 'moderation'),
    },
    {
      icon: <Coins className="w-4 h-4" />,
      title: t.featuresPage.tabs.economy,
      desc: t.hero.ecoDesc,
      onClick: () => handleNavClick('features', 'economy'),
    },
    {
      icon: <Ticket className="w-4 h-4" />,
      title: t.featuresPage.tabs.tickets,
      desc: t.hero.ticketDesc,
      onClick: () => handleNavClick('features', 'tickets'),
    },
    {
      icon: <Briefcase className="w-4 h-4" />,
      title: t.featuresPage.tabs.jobs,
      desc: t.hero.jobDesc,
      onClick: () => handleNavClick('features', 'jobs'),
    },
    {
      icon: <Store className="w-4 h-4" />,
      title: t.featuresPage.tabs.market,
      desc: t.aboutPage.val3Desc || t.aboutPage.subtitle,
      onClick: () => handleNavClick('features', 'market'),
    },
    {
      icon: <Compass className="w-4 h-4" />,
      title: t.nav.commands,
      desc: t.commandsPage.subtitle,
      onClick: () => handleNavClick('commands'),
    },
  ];

  const currentDropdownItems =
    activeDropdown === 'commands'
      ? commandsItems
      : activeDropdown === 'about'
      ? aboutItems
      : activeDropdown === 'features'
      ? featuresItems
      : [];

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white/85 dark:bg-black/90 backdrop-blur-xl border-b border-neutral-200/80 dark:border-white/[0.12] transition-colors relative before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-neutral-300 dark:before:via-white/25 before:to-transparent before:pointer-events-none"
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-18 px-4 sm:px-8 relative">
        {/* Left Side: Mobile Hamburger (mobile only) */}
        <div className="flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Center: Desktop Navigation with Logo in Middle, flanked by links on left & right */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto z-20">
          {/* Left of Logo: Home & About Us */}
          <nav
            className="flex items-center gap-2 lg:gap-3 text-[13px] font-medium"
            aria-label="Left Navigation"
          >
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-all duration-200 px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap shrink-0 relative ${
                activeTab === 'home'
                  ? 'bg-neutral-100 dark:bg-white/[0.08] text-neutral-950 dark:text-white font-semibold shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/[0.03]'
              }`}
            >
              {t.nav.home}
            </button>

            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('about')}
            >
              <button
                onClick={() => handleNavClick('about')}
                className={`flex items-center gap-1.5 transition-all duration-200 px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap shrink-0 relative ${
                  activeTab === 'about' || activeDropdown === 'about'
                    ? 'bg-neutral-100 dark:bg-white/[0.08] text-neutral-950 dark:text-white font-semibold shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/[0.03]'
                }`}
              >
                <span>{t.nav.about}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'about' ? 'rotate-180 text-neutral-950 dark:text-white' : 'text-neutral-400'
                  }`}
                />
              </button>
            </div>
          </nav>

          {/* Centered Bot Logo Badge */}
          <button
            onClick={() => handleNavClick('home')}
            className="group cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95 px-1.5"
            aria-label="Bot Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl overflow-hidden border border-neutral-300/80 dark:border-white/15 shadow-sm group-hover:shadow-md bg-black shrink-0 flex items-center justify-center ring-1 ring-black/5 dark:ring-white/10 group-hover:ring-black/20 dark:group-hover:ring-white/30 transition-all">
              <img
                src="/assets/aistudio/image_12f5f257.png"
                alt="Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </button>

          {/* Right of Logo: Features & Commands */}
          <nav
            className="flex items-center gap-2 lg:gap-3 text-[13px] font-medium"
            aria-label="Right Navigation"
          >
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('features')}
            >
              <button
                onClick={() => handleNavClick('features')}
                className={`flex items-center gap-1.5 transition-all duration-200 px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap shrink-0 relative ${
                  activeTab === 'features' || activeDropdown === 'features'
                    ? 'bg-neutral-100 dark:bg-white/[0.08] text-neutral-950 dark:text-white font-semibold shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/[0.03]'
                }`}
              >
                <span>{t.nav.features}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'features' ? 'rotate-180 text-neutral-950 dark:text-white' : 'text-neutral-400'
                  }`}
                />
              </button>
            </div>

            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('commands')}
            >
              <button
                onClick={() => handleNavClick('commands')}
                className={`flex items-center gap-1.5 transition-all duration-200 px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap shrink-0 relative ${
                  activeTab === 'commands' || activeDropdown === 'commands'
                    ? 'bg-neutral-100 dark:bg-white/[0.08] text-neutral-950 dark:text-white font-semibold shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/[0.03]'
                }`}
              >
                <span>{t.nav.commands}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'commands' ? 'rotate-180 text-neutral-950 dark:text-white' : 'text-neutral-400'
                  }`}
                />
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Center Logo */}
        <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto z-20">
          <button
            onClick={() => handleNavClick('home')}
            className="group cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
            aria-label="Bot Home"
          >
            <div className="w-9 h-9 rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-700/80 shadow-md bg-black shrink-0 flex items-center justify-center ring-1 ring-black/5 dark:ring-white/10">
              <img
                src="/assets/aistudio/image_12f5f257.png"
                alt="Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </button>
        </div>

        {/* Right Side: Discord Add-to-Server, Language Selector, Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 z-20">
          {/* 1. Discord / Add to Server */}
          <a
            href={BOT_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200 dark:bg-[#0e0f14] dark:hover:bg-[#171922] dark:border-white/[0.15] dark:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
            title={t.hero.addToDiscord}
            aria-label={t.hero.addToDiscord}
          >
            <DiscordIcon />
          </a>

          {/* 2. Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => {
                setActiveDropdown(null);
                setIsLangOpen(!isLangOpen);
              }}
              className="h-9 px-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 dark:bg-[#0e0f14] dark:hover:bg-[#171922] dark:border-white/[0.15] text-neutral-900 dark:text-white flex items-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-95"
              title={t.navbar.selectLanguage}
              aria-label={t.navbar.selectLanguage}
            >
              <FlagIcon code={language} />
              <span className="text-xs font-medium hidden xl:inline">
                {supportedLanguages.find((l) => l.code === language)?.nativeName || 'English'}
              </span>
            </button>

            {isLangOpen && (
              <div className="absolute end-0 top-full mt-2 w-56 max-h-[340px] overflow-y-auto bg-white/95 dark:bg-[#0e0f14]/98 backdrop-blur-xl border border-neutral-200 dark:border-white/[0.15] rounded-2xl p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold border-b border-neutral-100 dark:border-white/[0.08] mb-1 flex items-center justify-between">
                  <span>{t.navbar.selectLanguage}</span>
                  <Globe className="w-3 h-3 text-neutral-400" />
                </div>
                {supportedLanguages.map((l) => {
                  const isCurrent = language === l.code;
                  return (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangOpen(false);
                      }}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium w-full text-left transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-neutral-100 dark:bg-white/15 text-neutral-950 dark:text-white font-semibold'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/10 hover:text-neutral-950 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FlagIcon code={l.code} />
                        <span className="truncate">{l.nativeName}</span>
                      </div>
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Theme Toggle */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-900 dark:bg-[#0e0f14] dark:hover:bg-[#171922] dark:border-white/[0.18] dark:text-amber-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
              title={isDark ? t.navbar.lightMode : t.navbar.darkMode}
              aria-label={t.navbar.themeToggle}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-neutral-900" />}
            </button>
          )}
        </div>
      </div>

      {/* discord.place-style 2-Column Icon Grid Dropdown */}
      {activeDropdown && currentDropdownItems.length > 0 && (
        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full mt-2.5 w-[560px] max-w-[94vw] z-50 animate-in fade-in zoom-in-95 duration-150"
          onMouseEnter={() => handleMouseEnter(activeDropdown)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="rounded-2xl bg-white/95 dark:bg-[#0d0e13]/98 backdrop-blur-2xl border border-neutral-200/90 dark:border-white/[0.12] shadow-[0_22px_50px_-12px_rgba(0,0,0,0.18)] dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.98)] p-2">
            <div className="grid grid-cols-2 gap-1.5">
              {currentDropdownItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.onClick}
                  className="group flex items-start gap-3.5 p-3 rounded-xl text-left transition-all duration-150 cursor-pointer border border-transparent hover:bg-neutral-100/90 hover:border-neutral-200/80 dark:hover:bg-white/[0.06] dark:hover:border-white/[0.08]"
                >
                  <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center bg-neutral-100 text-neutral-800 border border-neutral-200/80 group-hover:bg-neutral-900 group-hover:text-white group-hover:border-neutral-900 dark:bg-white/[0.07] dark:text-white dark:border-white/[0.08] dark:group-hover:bg-white/[0.14] dark:group-hover:border-white/[0.18] transition-all duration-150 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-neutral-950 dark:text-white leading-tight truncate">
                      {item.title}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-snug mt-1 line-clamp-2 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="max-w-7xl mx-auto md:hidden pb-4 pt-2 border-t border-neutral-200 dark:border-white/[0.12] bg-white/95 dark:bg-black/95 flex flex-col gap-1 px-4">
          {[
            { id: 'home' as TabType, label: t.nav.home },
            { id: 'about' as TabType, label: t.nav.about },
            { id: 'features' as TabType, label: t.nav.features },
            { id: 'commands' as TabType, label: t.nav.commands },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                activeTab === item.id
                  ? 'bg-neutral-100 dark:bg-[#0e0f14] text-neutral-900 dark:text-white font-semibold border border-neutral-200 dark:border-white/[0.15]'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.06]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
