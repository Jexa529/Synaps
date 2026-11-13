import React, { useState, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react';
import { BOT_INVITE_URL } from '../data/commandsData';
import { FeatureSubTab, TabType } from '../types';
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
} from './ui/Icons';
import { ScrollAnimation } from './ui/scroll-animation';
import { useLanguage } from '../i18n/translations';
import { uiExtras } from '../i18n/extras';
import { getPathForTab } from '../routes';

interface HeroHomeProps {
  onTabChange?: (tab: TabType, featureSubTab?: FeatureSubTab) => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({ onTabChange }) => {
  const { language, t } = useLanguage();
  const ex = uiExtras[language] || uiExtras.tr;
  const isTr = language === 'tr';
  const heroStageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroStageRef,
    offset: ['start start', 'end start'],
  });
  const smoothHeroProgress = useSpring(heroScrollProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.25,
  });
  const backdropY = useTransform(smoothHeroProgress, [0, 1], [0, 110]);
  const backdropScale = useTransform(smoothHeroProgress, [0, 1], [1, 1.09]);
  const backdropOpacity = useTransform(smoothHeroProgress, [0, 0.85], [1, 0.22]);
  const spotlightY = useTransform(smoothHeroProgress, [0, 1], [0, 68]);
  const heroForegroundY = useTransform(smoothHeroProgress, [0, 1], [0, 36]);
  const heroForegroundOpacity = useTransform(smoothHeroProgress, [0, 0.9], [1, 0.35]);

  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const splitHeadlinePart2 = (text: string) => {
    const trimmed = text.trim();
    if (language === 'ja' && trimmed.startsWith('で')) {
      return { prefix: 'で', gradient: trimmed.slice(1) };
    }
    const words = trimmed.split(/\s+/);
    if (words.length < 2) {
      return { prefix: '', gradient: trimmed };
    }
    const prefixCount = language === 'ru' ? 3 : language === 'ar' ? 2 : 1;
    if (words.length <= prefixCount) {
      return { prefix: '', gradient: trimmed };
    }
    return {
      prefix: `${words.slice(0, prefixCount).join(' ')} `,
      gradient: words.slice(prefixCount).join(' '),
    };
  };

  const part2 = splitHeadlinePart2(t.hero.headlinePart2);

  const renderHighlightedSubtitle = (text: string) => {
    const parts = text.split(/(%99\.98|99\.98%|Discord|ديسكورد|디스코드)/gi);
    return parts.map((segment, index) => {
      if (/^(%99\.98|99\.98%|Discord|ديسكورد|디스코드)$/i.test(segment)) {
        return (
          <span
            key={index}
            className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-black via-neutral-600 to-neutral-800 dark:from-white dark:via-neutral-300 dark:to-neutral-500"
          >
            {segment}
          </span>
        );
      }
      return <React.Fragment key={index}>{segment}</React.Fragment>;
    });
  };

  const handleAnchorRoute = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tab: TabType,
    subTab?: FeatureSubTab
  ) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      onTabChange?.(tab, subTab);
    }
  };

  const faqItems = (t.hero.faqs && t.hero.faqs.length > 0)
    ? t.hero.faqs.map((faq, idx) => ({
        id: `faq-${idx + 1}`,
        category: faq.category,
        question: faq.question,
        answer: faq.answer,
        commandTip: faq.commandTip,
      }))
    : [];

  const capabilityModules: Array<{
    key: FeatureSubTab;
    railLabel: string;
    title: string;
    desc: string;
    bullets: Array<string | undefined>;
    card: React.ReactNode;
  }> = [
    {
      key: 'moderation',
      railLabel: isTr ? 'Güvenlik & Koruma' : 'Security & Shield',
      title: t.hero.modTitle,
      desc: t.hero.modDesc,
      bullets: [t.hero.cards?.modBullet1, t.hero.cards?.modBullet2],
      card: (
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#161618] via-[#101012] to-[#0a0a0b] text-white font-mono text-xs space-y-2.5 border border-neutral-800/80 dark:border-white/[0.1] shadow-sm hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between text-[11px] text-neutral-400 border-b border-white/[0.08] pb-2">
            <span className="text-neutral-200 font-bold tracking-wide">{t.hero.cards?.liveSanctionTitle}</span>
            <span className="text-[10px] text-neutral-400">
              {t.hero.cards?.subSecondTimeout}
            </span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="text-neutral-400 flex items-baseline gap-1.5">
              <span className="text-neutral-500 shrink-0">{t.hero.cards?.threatLabel}</span>
              <span className="text-white font-semibold">{t.hero.cards?.threatVal}</span>
            </div>
            <div className="text-neutral-400 flex items-baseline gap-1.5">
              <span className="text-neutral-500 shrink-0">{t.hero.cards?.sanctionLabel}</span>
              <span className="text-neutral-200">{t.hero.cards?.sanctionVal}</span>
            </div>
            <div className="text-neutral-400 flex items-baseline gap-1.5">
              <span className="text-neutral-500 shrink-0">{t.hero.cards?.recordLabel}</span>
              <span className="text-neutral-300">{t.hero.cards?.recordVal}</span>
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      key: 'economy',
      railLabel: isTr ? 'Ekonomi & Banka' : 'Economy & Vault',
      title: t.hero.ecoTitle,
      desc: t.hero.ecoDesc,
      bullets: [t.hero.cards?.ecoBullet1, t.hero.cards?.ecoBullet2],
      card: (
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="p-5 rounded-2xl bg-neutral-100/85 dark:bg-gradient-to-br dark:from-[#161618] dark:via-[#101012] dark:to-[#0a0a0b] border border-neutral-200/80 dark:border-white/[0.1] font-mono text-xs space-y-3 shadow-xs hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 border-b border-neutral-200/80 dark:border-white/[0.08] pb-2">
            <span className="font-bold text-neutral-900 dark:text-white font-sans">{t.hero.cards?.vaultTitle}</span>
            <span className="text-[10px] text-neutral-600 dark:text-neutral-300">
              {t.hero.cards?.interestLabel}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="py-1">
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans truncate">{t.hero.cards?.walletLabel}</div>
              <div className="font-bold text-sm text-neutral-950 dark:text-white mt-0.5">14,850 {ex.hero.coinsUnit}</div>
            </div>
            <div className="py-1">
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans truncate">{t.hero.cards?.vaultLabel}</div>
              <div className="font-bold text-sm text-neutral-950 dark:text-white mt-0.5">125,000 {ex.hero.coinsUnit}</div>
            </div>
          </div>
          <div className="text-[10px] text-neutral-600 dark:text-neutral-400 flex items-center justify-between font-sans pt-2 border-t border-neutral-200/70 dark:border-white/[0.08]">
            <span>{t.hero.cards?.activeStreakLabel} <strong className="text-neutral-900 dark:text-white">{t.hero.cards?.daysLabel}</strong></span>
            <span className="text-neutral-900 dark:text-white font-semibold font-mono">{ex.hero.multiplierLabel}</span>
          </div>
        </motion.div>
      ),
    },
    {
      key: 'tickets',
      railLabel: isTr ? 'Destek Masası' : 'Support Desk',
      title: t.hero.ticketTitle,
      desc: t.hero.ticketDesc,
      bullets: [t.hero.cards?.ticketBullet1, t.hero.cards?.ticketBullet2],
      card: (
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="p-5 rounded-2xl bg-neutral-100/85 dark:bg-gradient-to-br dark:from-[#161618] dark:via-[#101012] dark:to-[#0a0a0b] border border-neutral-200/80 dark:border-white/[0.1] font-mono text-xs space-y-2.5 shadow-xs hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 border-b border-neutral-200/80 dark:border-white/[0.08] pb-2">
            <span className="font-bold text-neutral-900 dark:text-white font-sans">{t.hero.cards?.ticketHeader}</span>
            <span className="text-[10px] text-neutral-600 dark:text-neutral-300">
              {t.hero.cards?.urgentPriority}
            </span>
          </div>
          <div className="space-y-1.5 text-[11px] font-sans">
            <div className="text-neutral-600 dark:text-neutral-300">
              {ex.hero.requesterLabel} <strong className="text-neutral-950 dark:text-white font-mono">{ex.hero.requesterUser}</strong>
            </div>
            <div className="text-neutral-600 dark:text-neutral-300">
              {t.hero.cards?.assignedStaff} <strong className="text-neutral-950 dark:text-white">Máve</strong>
            </div>
            <div className="text-neutral-500 dark:text-neutral-400 font-mono text-[10px] pt-1.5 border-t border-neutral-200/60 dark:border-white/[0.08]">
              {t.hero.cards?.transcriptsSaved}
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      key: 'jobs',
      railLabel: isTr ? 'Kariyer & XP' : 'Careers & XP',
      title: t.hero.jobTitle,
      desc: t.hero.jobDesc,
      bullets: [t.hero.cards?.careerBullet1, t.hero.cards?.careerBullet2],
      card: (
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#161618] via-[#101012] to-[#0a0a0b] text-white font-mono text-xs space-y-3 border border-neutral-800/80 dark:border-white/[0.1] shadow-sm hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700 shrink-0">
                <img
                  src="/assets/aistudio/image_e0686a18.png"
                  alt="Máve"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-sans">
                <div className="font-bold text-xs text-white">Máve</div>
                <div className="text-[10px] text-neutral-400 font-mono">{t.hero.cards?.careerHeader}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-neutral-400 tracking-wider">{ex.hero.levelLabel}</div>
              <div className="text-base font-black text-white leading-tight">42</div>
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '84%' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-to-r from-neutral-400 via-neutral-200 to-white rounded-full"
            />
          </div>

          <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
            <span>8,450 / 10,000 XP</span>
            <span className="text-white">{t.hero.cards?.seniorArtisan}</span>
          </div>
        </motion.div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#fbfbfd] dark:bg-black text-neutral-900 dark:text-neutral-100 pt-12 sm:pt-16 pb-24 sm:pb-32 transition-colors duration-200">
      {/* Subtle Pure Monochrome Backdrop Highlights */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute left-1/2 -top-40 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-neutral-200/50 via-neutral-100/30 to-transparent dark:from-white/[0.04] dark:via-neutral-900/20 blur-[120px] opacity-75" />
        <motion.div
          style={{ y: spotlightY }}
          className="absolute left-1/2 top-4 sm:top-6 -translate-x-1/2 w-[940px] max-w-[96vw] h-[380px] sm:h-[440px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.18)_0%,rgba(24,24,27,0.1)_45%,transparent_78%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(24,24,27,0.35)_52%,transparent_82%)] blur-[54px]"
        />
        <motion.div
          style={{ y: spotlightY }}
          className="absolute left-1/2 top-14 sm:top-18 -translate-x-1/2 w-[560px] max-w-[85vw] h-[230px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.15)_0%,rgba(39,39,42,0.08)_48%,transparent_76%)] dark:bg-[radial-gradient(circle,rgba(24,24,27,0.65)_0%,rgba(12,12,14,0.45)_55%,transparent_80%)] blur-[38px]"
        />
        <div className="absolute -left-32 top-1/3 w-96 h-96 bg-neutral-200/30 dark:bg-white/[0.02] blur-[100px] rounded-full" />
        <div className="absolute -right-32 top-1/2 w-96 h-96 bg-neutral-200/30 dark:bg-white/[0.02] blur-[100px] rounded-full" />
      </div>

      {/* Monochrome SYNAPS Backdrop Accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: backdropY, scale: backdropScale, opacity: backdropOpacity }}
        className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0"
      >
        <span className="block text-[20vw] sm:text-[17vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-black/[0.22] via-neutral-700/[0.15] to-neutral-950/[0.12] dark:from-white/[0.18] dark:via-neutral-400/[0.11] dark:to-neutral-700/[0.08]">
          SYNAPS
        </span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-center text-center">
        {/* Hero Foreground Stage */}
        <motion.div
          ref={heroStageRef}
          style={{ y: heroForegroundY, opacity: heroForegroundOpacity }}
          className="w-full flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.12] max-w-4xl mx-auto">
              {t.hero.headlinePart1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-neutral-500 to-neutral-800 dark:from-white dark:via-neutral-400 dark:to-neutral-600 font-extrabold">
                {t.hero.headlineHighlight}
              </span>{' '}
              <br className="hidden sm:inline" />
              {part2.prefix}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-700 via-neutral-900 to-black dark:from-neutral-500 dark:via-neutral-200 dark:to-white font-extrabold">
                {part2.gradient}
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mt-5 text-neutral-600 dark:text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              {renderHighlightedSubtitle(t.hero.subtitle)}
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                href={BOT_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group h-12 px-7 rounded-full bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs sm:text-sm transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer inline-flex items-center gap-2.5"
              >
                <span>{t.hero.addToDiscord}</span>
                <ArrowRightIcon className="w-3.5 h-3.5 text-white/80 dark:text-neutral-950/80 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                href={getPathForTab('commands')}
                onClick={(e) => handleAnchorRoute(e, 'commands')}
                className="group h-12 px-7 rounded-full bg-neutral-100 hover:bg-neutral-200/90 dark:bg-[#111113] dark:hover:bg-[#18181b] text-neutral-900 dark:text-white border border-neutral-300/80 dark:border-white/[0.15] font-semibold text-xs sm:text-sm transition-colors duration-200 shadow-xs hover:shadow-sm cursor-pointer inline-flex items-center gap-2.5"
              >
                <span>{t.hero.exploreCommands}</span>
                <ArrowRightIcon className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Capabilities Timeline — Exact 1-to-1 Mirror of ChangelogPage Vertical Rail */}
        <div className="w-full mt-24 text-left max-w-4xl mx-auto">
          <ScrollAnimation direction="up" duration={0.8} className="mb-10 sm:mb-14 space-y-2">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              {t.hero.capabilitiesTitle}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              {t.hero.capabilitiesSubtitle}
            </p>
          </ScrollAnimation>

          <div className="relative flex flex-col md:flex-row md:gap-10">
            {/* Continuous Vertical Timeline Rail */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute left-5 top-3 bottom-0 w-px bg-neutral-200 dark:bg-white/[0.1]"
            />

            {/* Sticky Left Title Matching Changelog Year Column */}
            <div className="md:sticky md:top-24 z-10 flex items-center self-start md:w-44 shrink-0 mb-6 md:mb-0">
              <div className="hidden md:flex w-10 h-10 rounded-full bg-[#fbfbfd] dark:bg-black items-center justify-center border border-neutral-200 dark:border-white/[0.14] mr-4">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-white" />
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-neutral-400 dark:text-neutral-500 font-mono tracking-tight">
                {isTr ? 'Modüller' : 'Modules'}
              </h3>
            </div>

            {/* Right Column Stacked Release-Style Articles */}
            <div className="flex-1 space-y-10 border-l md:border-l-0 border-neutral-200 dark:border-white/[0.1] pl-5 md:pl-0">
              {capabilityModules.map((mod) => (
                <article
                  key={mod.key}
                  className="pb-10 border-b border-neutral-200/70 dark:border-white/[0.08] last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="block font-mono text-xs text-neutral-500 dark:text-neutral-400">
                      {mod.railLabel}
                    </span>
                    <a
                      href={getPathForTab('features', mod.key)}
                      onClick={(e) => handleAnchorRoute(e, 'features', mod.key)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-950 dark:text-white hover:underline underline-offset-4 transition-colors"
                    >
                      <span>{ex.hero.inspectModule}</span>
                      <ArrowRightIcon className="w-3 h-3" />
                    </a>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white mb-2">
                    {mod.title}
                  </h4>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    {mod.desc}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {mod.bullets
                      .filter((b): b is string => Boolean(b))
                      .map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
                        >
                          <CheckIcon className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                  </ul>

                  <div>{mod.card}</div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Conversion Banner */}
        <ScrollAnimation direction="up" duration={0.8} className="w-full max-w-4xl mt-20">
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="rounded-3xl bg-neutral-900 dark:bg-gradient-to-br dark:from-[#161618] dark:via-[#101012] dark:to-[#0a0a0b] text-white p-8 sm:p-12 border border-neutral-800 dark:border-white/[0.14] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl dark:shadow-[0_0_60px_-15px_rgba(255,255,255,0.05)]"
          >
            <div className="text-center sm:text-left space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {ex.hero.ctaTitle}
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 dark:text-neutral-400 max-w-xl leading-relaxed">
                {ex.hero.ctaSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <motion.a
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                href={BOT_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-white text-neutral-950 font-bold text-sm hover:bg-neutral-100 transition-colors cursor-pointer shadow-sm inline-flex items-center gap-2"
              >
                <span>{t.hero.addToDiscord}</span>
                <ArrowRightIcon className="w-4 h-4 text-neutral-950" />
              </motion.a>
            </div>
          </motion.div>
        </ScrollAnimation>

        {/* FAQ Section */}
        <div className="w-full mt-24 pt-16 border-t border-neutral-200 dark:border-white/[0.1] text-left max-w-4xl">
          <ScrollAnimation direction="up" duration={0.7} className="text-center mb-12">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              {t.hero.faqTitle}
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mt-3 max-w-lg mx-auto leading-relaxed">
              {t.hero.faqSubtitle}
            </p>
          </ScrollAnimation>

          <div className="space-y-4">
            {faqItems.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.div
                    layout
                    whileHover={{ y: isOpen ? 0 : -2 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                    className={`rounded-3xl border transition-colors duration-200 overflow-hidden bg-white dark:bg-[#0c0c0e] shadow-xs ${
                      isOpen
                        ? 'border-neutral-900/40 dark:border-white/30 dark:bg-[#121214] ring-1 ring-neutral-900/10 dark:ring-white/15 shadow-md'
                        : 'border-neutral-200/90 dark:border-white/[0.12] hover:border-neutral-300 dark:hover:border-white/25 hover:shadow-xs'
                    }`}
                  >
                    <motion.button
                      whileTap={{ scale: 0.995 }}
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-6 sm:p-7 flex items-start justify-between text-left cursor-pointer transition-colors gap-4"
                      aria-expanded={isOpen}
                    >
                      <div className="flex-1 pr-2">
                        <h4 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white leading-snug">
                          {faq.question}
                        </h4>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 mt-1 ${
                          isOpen
                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950'
                            : 'bg-neutral-100 dark:bg-[#17171a] text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-white/20'
                        }`}
                      >
                        <ChevronDownIcon className="w-4 h-4" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="faq-answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <motion.div
                            initial={{ y: -8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -6, opacity: 0 }}
                            transition={{ duration: 0.24, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                            className="px-6 sm:px-7 pb-6 pt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 border-t border-neutral-100 dark:border-white/[0.08] space-y-4 bg-neutral-50/50 dark:bg-[#101012]"
                          >
                            <p className="leading-relaxed font-normal">{faq.answer}</p>
                            {faq.commandTip && (
                              <p className="font-mono text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400">
                                {faq.commandTip}
                              </p>
                            )}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
