import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react';
import { TabType, FeatureSubTab } from '../types';
import { BOT_INVITE_URL } from '../data/commandsData';
import { getPathForTab } from '../routes';
import {
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  ShieldIcon,
  CoinsIcon,
  TicketIcon,
  BriefcaseIcon,
  WrenchIcon,
  TerminalIcon,
  StoreIcon,
  StarIcon,
  TagIcon,
  HelpCircleIcon,
  PenLineIcon,
  BookOpenIcon,
  ActivityIcon,
  MessageSquareIcon,
  BookMarkedIcon,
  CodeIcon,
  GlobeIcon,
  MoonIcon,
  DaySunIcon,
  UsersIcon,
} from './ui/Icons';
import { useLanguage, supportedLanguages } from '../i18n/translations';
import { portalTranslations } from '../i18n/portal';
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

type DropdownType = 'commands' | 'market' | 'other' | null;

interface DropdownMenuItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  tab: TabType;
  subTab?: FeatureSubTab;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  isDark = false,
  onToggleTheme,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const pt = portalTranslations[language] || portalTranslations.tr;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (mobileMenuOpen || isLangOpen || activeDropdown) {
      setIsHeaderHidden(false);
      return;
    }
    if (latest <= 64) {
      setIsHeaderHidden(false);
    } else if (latest > previous && latest > 96) {
      setIsHeaderHidden(true);
      setActiveDropdown(null);
      setIsLangOpen(false);
    } else if (previous - latest > 6) {
      setIsHeaderHidden(false);
    }
  });

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

  const handleRouteAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tab: TabType,
    featureSubTab?: FeatureSubTab
  ) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      handleNavClick(tab, featureSubTab);
    }
  };

  // Top Selection Menu for Komutlar
  const commandsItems: DropdownMenuItem[] = [
    {
      icon: <ShieldIcon className="w-[18px] h-[18px]" />,
      title: t.commandsPage.categories.moderation,
      desc: t.hero.modDesc,
      href: getPathForTab('commands'),
      tab: 'commands',
    },
    {
      icon: <CoinsIcon className="w-[18px] h-[18px]" />,
      title: t.commandsPage.categories.economy,
      desc: t.hero.ecoDesc,
      href: getPathForTab('commands'),
      tab: 'commands',
    },
    {
      icon: <TicketIcon className="w-[18px] h-[18px]" />,
      title: t.featuresPage.tabs.tickets,
      desc: t.hero.ticketDesc,
      href: getPathForTab('features', 'tickets'),
      tab: 'features',
      subTab: 'tickets',
    },
    {
      icon: <BriefcaseIcon className="w-[18px] h-[18px]" />,
      title: t.featuresPage.tabs.jobs,
      desc: t.hero.jobDesc,
      href: getPathForTab('features', 'jobs'),
      tab: 'features',
      subTab: 'jobs',
    },
    {
      icon: <WrenchIcon className="w-[18px] h-[18px]" />,
      title: t.commandsPage.categories.utility,
      desc: t.navbar.megaMenu.prefixSub,
      href: getPathForTab('commands'),
      tab: 'commands',
    },
    {
      icon: <TerminalIcon className="w-[18px] h-[18px]" />,
      title: t.commandsPage.allCommands,
      desc: t.commandsPage.subtitle,
      href: getPathForTab('commands'),
      tab: 'commands',
    },
  ];

  // Top Selection Menu for Market (Same clean horizontal style as Komutlar & Diğer)
  const marketItems: DropdownMenuItem[] = [
    {
      icon: <StoreIcon className="w-[18px] h-[18px]" />,
      title: pt.nav.marketDropdown.marketTitle,
      desc: pt.nav.marketDropdown.marketDesc,
      href: getPathForTab('market'),
      tab: 'market',
    },
    {
      icon: <StarIcon className="w-[18px] h-[18px]" />,
      title: pt.nav.marketDropdown.premiumTitle,
      desc: pt.nav.marketDropdown.premiumDesc,
      href: getPathForTab('premium'),
      tab: 'premium',
    },
    {
      icon: <TagIcon className="w-[18px] h-[18px]" />,
      title: pt.nav.marketDropdown.adsTitle,
      desc: pt.nav.marketDropdown.adsDesc,
      href: getPathForTab('ads'),
      tab: 'ads',
    },
    {
      icon: <UsersIcon className="w-[18px] h-[18px]" />,
      title: pt.nav.marketDropdown.partnerTitle,
      desc: pt.nav.marketDropdown.partnerDesc,
      href: getPathForTab('partner'),
      tab: 'partner',
    },
  ];

  // Top Selection Menu for Diğer (Screenshot-matched 2×4 Grid)
  const otherItems: DropdownMenuItem[] = [
    {
      icon: <HelpCircleIcon className="w-[18px] h-[18px]" />,
      title: pt.nav.otherDropdown.faqTitle,
      desc: pt.nav.otherDropdown.faqDesc,
      href: getPathForTab('faq'),
      tab: 'faq',
    },
    {
      icon: <PenLineIcon className="w-[18px] h-[18px]" />,
      title: pt.nav.otherDropdown.changelogTitle,
      desc: pt.nav.otherDropdown.changelogDesc,
      href: getPathForTab('changelog'),
      tab: 'changelog',
    },
    {
      icon: <BookOpenIcon className="w-[18px] h-[18px]" />,
      title: pt.nav.otherDropdown.wikiTitle,
      desc: pt.nav.otherDropdown.wikiDesc,
      href: getPathForTab('wiki'),
      tab: 'wiki',
    },
    {
      icon: <ActivityIcon className="w-[18px] h-[18px]" />,
      title: pt.nav.otherDropdown.statusTitle,
      desc: pt.nav.otherDropdown.statusDesc,
      href: getPathForTab('status'),
      tab: 'status',
    },
    {
      icon: <MessageSquareIcon className="w-[18px] h-[18px]" />,
      title: pt.nav.otherDropdown.feedbackTitle,
      desc: pt.nav.otherDropdown.feedbackDesc,
      href: getPathForTab('feedback'),
      tab: 'feedback',
    },
    {
      icon: <StarIcon className="w-[18px] h-[18px]" />,
      title: pt.nav.otherDropdown.premiumTitle,
      desc: pt.nav.otherDropdown.premiumDesc,
      href: getPathForTab('premium'),
      tab: 'premium',
    },
    {
      icon: <BookMarkedIcon className="w-[18px] h-[18px]" />,
      title: pt.nav.otherDropdown.docsTitle,
      desc: pt.nav.otherDropdown.docsDesc,
      href: getPathForTab('docs'),
      tab: 'docs',
    },
    {
      icon: <CodeIcon className="w-[18px] h-[18px]" />,
      title: pt.nav.otherDropdown.apiTitle,
      desc: pt.nav.otherDropdown.apiDesc,
      href: getPathForTab('api-keys'),
      tab: 'api-keys',
    },
  ];

  const isMarketActive =
    activeTab === 'market' ||
    activeTab === 'premium' ||
    activeTab === 'ads' ||
    activeTab === 'partner';
  const isOtherActive =
    activeTab === 'faq' ||
    activeTab === 'changelog' ||
    activeTab === 'wiki' ||
    activeTab === 'status' ||
    activeTab === 'feedback' ||
    activeTab === 'docs' ||
    activeTab === 'api-keys';

  const currentDropdownItems =
    activeDropdown === 'commands'
      ? commandsItems
      : activeDropdown === 'market'
      ? marketItems
      : activeDropdown === 'other'
      ? otherItems
      : [];

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{
        y: isHeaderHidden ? '-110%' : '0%',
        opacity: isHeaderHidden ? 0 : 1,
      }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full bg-white/90 dark:bg-black/92 backdrop-blur-xl border-b border-neutral-300/80 dark:border-white/[0.1] transition-colors before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:z-30 before:bg-gradient-to-r before:from-transparent before:via-neutral-300 dark:before:via-white/20 before:to-transparent before:pointer-events-none"
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-18 px-4 sm:px-8 relative z-20">
        {/* Left Side: Mobile Hamburger */}
        <div className="flex items-center">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Center: Desktop Navigation — Ana Sayfa, Komutlar | [Logo] | Market, Diğer */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto z-20">
          {/* Left of Logo: Ana Sayfa & Komutlar */}
          <nav
            className="flex items-center gap-2 lg:gap-3 text-[13px] font-medium"
            aria-label="Left Navigation"
          >
            <a
              href={getPathForTab('home')}
              onClick={(e) => handleRouteAnchor(e, 'home')}
              onMouseEnter={() => setActiveDropdown(null)}
              className={`transition-colors duration-200 px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap shrink-0 relative ${
                activeTab === 'home'
                  ? 'text-neutral-950 dark:text-white font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-50/70 dark:hover:bg-white/[0.03]'
              }`}
            >
              {activeTab === 'home' && (
                <motion.span
                  layoutId="navbar-active-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-neutral-100 dark:bg-white/[0.08] shadow-2xs -z-10"
                />
              )}
              {t.nav.home}
            </a>

            <div className="relative" onMouseEnter={() => handleMouseEnter('commands')}>
              <a
                href={getPathForTab('commands')}
                onClick={(e) => handleRouteAnchor(e, 'commands')}
                className={`flex items-center gap-1.5 transition-colors duration-200 px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap shrink-0 relative ${
                  activeTab === 'commands' || activeDropdown === 'commands'
                    ? 'text-neutral-950 dark:text-white font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-50/70 dark:hover:bg-white/[0.03]'
                }`}
              >
                {activeTab === 'commands' && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-neutral-100 dark:bg-white/[0.08] shadow-2xs -z-10"
                  />
                )}
                <span>{t.nav.commands}</span>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'commands' ? 'rotate-180 text-neutral-950 dark:text-white' : 'text-neutral-400'
                  }`}
                />
              </a>
            </div>
          </nav>

          {/* Horizontal Spacer keeping Left & Right links balanced around 42px centered logo */}
          <div className="w-16 lg:w-18 shrink-0" aria-hidden="true" />

          {/* Right of Logo: Market & Diğer */}
          <nav
            className="flex items-center gap-2 lg:gap-3 text-[13px] font-medium"
            aria-label="Right Navigation"
          >
            <div className="relative" onMouseEnter={() => handleMouseEnter('market')}>
              <a
                href={getPathForTab('market')}
                onClick={(e) => handleRouteAnchor(e, 'market')}
                className={`flex items-center gap-1.5 transition-colors duration-200 px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap shrink-0 relative ${
                  isMarketActive || activeDropdown === 'market'
                    ? 'text-neutral-950 dark:text-white font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-50/70 dark:hover:bg-white/[0.03]'
                }`}
              >
                {isMarketActive && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-neutral-100 dark:bg-white/[0.08] shadow-2xs -z-10"
                  />
                )}
                <span>{pt.nav.market}</span>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'market' ? 'rotate-180 text-neutral-950 dark:text-white' : 'text-neutral-400'
                  }`}
                />
              </a>
            </div>

            <div className="relative" onMouseEnter={() => handleMouseEnter('other')}>
              <button
                type="button"
                onClick={() => setActiveDropdown((prev) => (prev === 'other' ? null : 'other'))}
                className={`flex items-center gap-1.5 transition-colors duration-200 px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap shrink-0 relative ${
                  isOtherActive || activeDropdown === 'other'
                    ? 'text-neutral-950 dark:text-white font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-50/70 dark:hover:bg-white/[0.03]'
                }`}
                aria-expanded={activeDropdown === 'other'}
              >
                {isOtherActive && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-neutral-100 dark:bg-white/[0.08] shadow-2xs -z-10"
                  />
                )}
                <span>{pt.nav.other}</span>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'other' ? 'rotate-180 text-neutral-950 dark:text-white' : 'text-neutral-400'
                  }`}
                />
              </button>
            </div>
          </nav>
        </div>

        {/* Right Side: Discord Add-to-Server, Language Selector, Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 z-20">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            href={BOT_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200 dark:bg-[#0d0d0f] dark:hover:bg-[#171719] dark:border-white/[0.14] dark:text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
            title={t.hero.addToDiscord}
            aria-label={t.hero.addToDiscord}
          >
            <DiscordIcon />
          </motion.a>

          <div className="relative" ref={langRef}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveDropdown(null);
                setIsLangOpen(!isLangOpen);
              }}
              className="h-9 px-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 dark:bg-[#0d0d0f] dark:hover:bg-[#171719] dark:border-white/[0.14] text-neutral-900 dark:text-white flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
              title={t.navbar.selectLanguage}
              aria-label={t.navbar.selectLanguage}
            >
              <FlagIcon code={language} />
              <span className="text-xs font-medium hidden xl:inline">
                {supportedLanguages.find((l) => l.code === language)?.nativeName || 'English'}
              </span>
            </motion.button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute end-0 top-full mt-2 w-56 max-h-[340px] overflow-y-auto bg-white/95 dark:bg-[#0a0a0c]/98 backdrop-blur-xl border border-neutral-200 dark:border-white/[0.14] rounded-2xl p-1.5 shadow-2xl z-50 origin-top-right"
                >
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold border-b border-neutral-100 dark:border-white/[0.08] mb-1 flex items-center justify-between">
                    <span>{t.navbar.selectLanguage}</span>
                    <GlobeIcon className="w-3 h-3 text-neutral-400" />
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {onToggleTheme && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={onToggleTheme}
              className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-900 dark:bg-[#0d0d0f] dark:hover:bg-[#171719] dark:border-white/[0.16] dark:text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              title={isDark ? t.navbar.lightMode : t.navbar.darkMode}
              aria-label={t.navbar.themeToggle}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -45, opacity: 0, scale: 0.75 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 45, opacity: 0, scale: 0.75 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    <DaySunIcon />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 45, opacity: 0, scale: 0.75 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -45, opacity: 0, scale: 0.75 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    <MoonIcon className="w-4 h-4 text-neutral-900" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </div>

      {/* Neutral Monochrome Subtle Logo Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-[5%] w-14 h-7 rounded-full bg-black/5 dark:bg-white/[0.06] blur-lg z-20"
      />

      {/* Medium Rounded-XL Center Logo (42px) */}
      <motion.a
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
        href={getPathForTab('home')}
        onClick={(e) => handleRouteAnchor(e, 'home')}
        className="group cursor-pointer focus:outline-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30"
        aria-label="Synaps"
      >
        <div className="w-[42px] h-[42px] rounded-xl overflow-hidden border border-neutral-200 dark:border-white/[0.16] shadow-xs group-hover:shadow-md bg-black shrink-0 flex items-center justify-center transition-shadow">
          <img
            src="/assets/aistudio/image_12f5f257.png"
            alt="Synaps Logo"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.a>

      {/* Top Selection Dropdown Overlay for Komutlar, Market & Diğer */}
      <AnimatePresence>
        {activeDropdown && currentDropdownItems.length > 0 && (
          <motion.div
            key={activeDropdown}
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full pt-2.5 z-50 origin-top w-[600px] max-w-[94vw]"
            onMouseEnter={() => handleMouseEnter(activeDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="rounded-2xl bg-white/96 dark:bg-[#0a0a0c]/98 backdrop-blur-2xl border border-neutral-200/90 dark:border-white/[0.12] shadow-[0_22px_50px_-12px_rgba(0,0,0,0.18)] dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.95)] p-3">
              <div className="grid grid-cols-2 gap-1.5">
                {currentDropdownItems.map((item, idx) => (
                  <motion.a
                    key={`${activeDropdown}-${item.tab}-${idx}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: idx * 0.025, ease: [0.22, 1, 0.36, 1] }}
                    href={item.href}
                    onClick={(e) => handleRouteAnchor(e, item.tab, item.subTab)}
                    className={`group flex items-start gap-3.5 p-3 rounded-xl text-left transition-all duration-150 cursor-pointer border ${
                      activeTab === item.tab && activeDropdown !== 'commands'
                        ? 'bg-neutral-100/90 border-neutral-200 dark:bg-[#151518] dark:border-white/[0.14]'
                        : 'border-transparent hover:bg-neutral-100/80 hover:border-neutral-200/80 dark:hover:bg-white/[0.06] dark:hover:border-white/[0.08]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center bg-neutral-200/75 text-neutral-900 border border-neutral-300/70 group-hover:bg-neutral-900 group-hover:text-white group-hover:border-neutral-900 dark:bg-[#18181b] dark:text-neutral-200 dark:border-white/[0.08] dark:group-hover:bg-white dark:group-hover:text-neutral-950 dark:group-hover:border-white transition-all duration-150 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold text-neutral-950 dark:text-white leading-tight">
                        {item.title}
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-snug mt-1 line-clamp-2 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-full inset-x-0 z-[5] border-b border-neutral-200 dark:border-white/[0.12] bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-2xl max-h-[75vh] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto pb-5 pt-3 flex flex-col gap-1 px-4">
              {[
                { id: 'home' as TabType, label: t.nav.home },
                { id: 'commands' as TabType, label: t.nav.commands },
              ].map((item, idx) => (
                <motion.a
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, delay: idx * 0.03 }}
                  href={getPathForTab(item.id)}
                  onClick={(e) => handleRouteAnchor(e, item.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer block ${
                    activeTab === item.id
                      ? 'bg-neutral-100 dark:bg-[#141416] text-neutral-900 dark:text-white font-semibold border border-neutral-200 dark:border-white/[0.15]'
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}

              <div className="px-4 pt-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                {pt.nav.market}
              </div>
              {marketItems.map((item) => (
                <a
                  key={item.tab}
                  href={item.href}
                  onClick={(e) => handleRouteAnchor(e, item.tab)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === item.tab
                      ? 'bg-neutral-100 dark:bg-[#141416] text-neutral-900 dark:text-white font-semibold border border-neutral-200 dark:border-white/[0.15]'
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="text-neutral-500 dark:text-neutral-400">{item.icon}</span>
                  <span>{item.title}</span>
                </a>
              ))}

              <div className="px-4 pt-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                {pt.nav.other}
              </div>
              {otherItems
                .filter((i) => i.tab !== 'premium')
                .map((item) => (
                  <a
                    key={item.tab}
                    href={item.href}
                    onClick={(e) => handleRouteAnchor(e, item.tab)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                      activeTab === item.tab
                        ? 'bg-neutral-100 dark:bg-[#141416] text-neutral-900 dark:text-white font-semibold border border-neutral-200 dark:border-white/[0.15]'
                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className="text-neutral-500 dark:text-neutral-400">{item.icon}</span>
                    <span>{item.title}</span>
                  </a>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
