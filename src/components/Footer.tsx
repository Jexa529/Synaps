import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TabType } from '../types';
import { BOT_INVITE_URL } from '../data/commandsData';
import {
  CloseIcon,
  TerminalIcon,
  LayersIcon,
  ArrowRightIcon,
} from './ui/Icons';
import { useLanguage } from '../i18n/translations';
import { portalTranslations } from '../i18n/portal';
import { getPathForTab } from '../routes';

interface FooterProps {
  onTabChange: (tab: TabType) => void;
  onOpenSupport: () => void;
  onOpenCookieSettings?: () => void;
}

type ModalType =
  | null
  | 'developer-team'
  | 'quickstart'
  | 'permissions';

export const Footer: React.FC<FooterProps> = ({
  onTabChange,
  onOpenSupport,
  onOpenCookieSettings,
}) => {
  const { language, t } = useLanguage();
  const pt = portalTranslations[language] || portalTranslations.tr;
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: TabType) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      onTabChange(tab);
    }
  };

  return (
    <>
      <footer className="w-full bg-white dark:bg-black text-neutral-800 dark:text-neutral-200 pt-16 pb-10 px-6 sm:px-10 lg:px-16 border-t border-neutral-200/80 dark:border-white/[0.1] relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl mx-auto"
        >
          {/* Main 12-Col Editorial Grid: Brand Column + 4 Clean Navigation Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14">
            {/* Left Brand Summary Column */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3.5">
                <motion.a
                  href={getPathForTab('home')}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                      e.preventDefault();
                      onTabChange('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                  className="relative inline-flex items-center justify-center group cursor-pointer shrink-0"
                  aria-label="Synaps Home"
                >
                  <div className="w-11 h-11 rounded-xl overflow-hidden border border-neutral-200/90 dark:border-white/15 bg-black shadow-sm">
                    <img
                      src="/assets/aistudio/image_12f5f257.png"
                      alt="Synaps Bot Logo"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.a>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight text-neutral-950 dark:text-white leading-none">
                    Synaps
                  </h3>
                  <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 block mt-1">
                    {language === 'tr' ? 'Discord Sunucu Altyapısı' : 'Discord Server Infrastructure'}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
                {language === 'tr'
                  ? 'Otomatik baskın koruması, banka kasası ekonomisi, destek bilet masası ve yüksek hızlı s! önek motoru tek botta.'
                  : 'Automated anti-raid shield, vault economy, ticket desk, and instant s! prefix command engine unified in one bot.'}
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a
                  href={BOT_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-semibold transition-colors shadow-xs"
                >
                  <span>{t.hero.addToDiscord}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </a>

                <a
                  href={getPathForTab('status')}
                  onClick={(e) => handleLinkClick(e, 'status')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-[#111113] dark:hover:bg-[#18181b] text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/[0.12] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>{pt.nav.otherDropdown.statusTitle}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right 4-Column Navigation Matrix */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {/* Column 1: MENU */}
              <div className="space-y-3.5">
                <h4 className="text-[11px] font-bold text-neutral-950 dark:text-white uppercase tracking-wider">
                  {t.footer.menu}
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400">
                  <li>
                    <a
                      href={getPathForTab('home')}
                      onClick={(e) => handleLinkClick(e, 'home')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {t.nav.home}
                    </a>
                  </li>
                  <li>
                    <a
                      href={getPathForTab('commands')}
                      onClick={(e) => handleLinkClick(e, 'commands')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {t.nav.commands}
                    </a>
                  </li>
                  <li>
                    <a
                      href={getPathForTab('market')}
                      onClick={(e) => handleLinkClick(e, 'market')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {pt.nav.market}
                    </a>
                  </li>
                  <li>
                    <a
                      href={getPathForTab('premium')}
                      onClick={(e) => handleLinkClick(e, 'premium')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {pt.nav.marketDropdown.premiumTitle}
                    </a>
                  </li>
                  <li>
                    <a
                      href={getPathForTab('ads')}
                      onClick={(e) => handleLinkClick(e, 'ads')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {pt.nav.marketDropdown.adsTitle}
                    </a>
                  </li>
                  <li>
                    <a
                      href={getPathForTab('partner')}
                      onClick={(e) => handleLinkClick(e, 'partner')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {pt.nav.marketDropdown.partnerTitle}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: RESOURCES */}
              <div className="space-y-3.5">
                <h4 className="text-[11px] font-bold text-neutral-950 dark:text-white uppercase tracking-wider">
                  {t.footer.resources}
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400">
                  <li>
                    <a
                      href={getPathForTab('faq')}
                      onClick={(e) => handleLinkClick(e, 'faq')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {pt.nav.otherDropdown.faqTitle}
                    </a>
                  </li>
                  <li>
                    <a
                      href={getPathForTab('wiki')}
                      onClick={(e) => handleLinkClick(e, 'wiki')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {pt.nav.otherDropdown.wikiTitle}
                    </a>
                  </li>
                  <li>
                    <a
                      href={getPathForTab('docs')}
                      onClick={(e) => handleLinkClick(e, 'docs')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {pt.nav.otherDropdown.docsTitle}
                    </a>
                  </li>
                  <li>
                    <a
                      href={getPathForTab('changelog')}
                      onClick={(e) => handleLinkClick(e, 'changelog')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {pt.nav.otherDropdown.changelogTitle}
                    </a>
                  </li>
                  <li>
                    <a
                      href={getPathForTab('api-keys')}
                      onClick={(e) => handleLinkClick(e, 'api-keys')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {pt.nav.otherDropdown.apiTitle}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: SUPPORT */}
              <div className="space-y-3.5">
                <h4 className="text-[11px] font-bold text-neutral-950 dark:text-white uppercase tracking-wider">
                  {t.footer.support}
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400">
                  <li>
                    <button
                      onClick={onOpenSupport}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {t.footer.supportServer}
                    </button>
                  </li>
                  <li>
                    <a
                      href={getPathForTab('feedback')}
                      onClick={(e) => handleLinkClick(e, 'feedback')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {pt.nav.otherDropdown.feedbackTitle}
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('quickstart')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {t.footer.quickstart}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('permissions')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {t.footer.botPermissions}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('developer-team')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {t.footer.devTeam}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 4: LEGAL */}
              <div className="space-y-3.5">
                <h4 className="text-[11px] font-bold text-neutral-950 dark:text-white uppercase tracking-wider">
                  {t.footer.legal}
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400">
                  <li>
                    <a
                      href={getPathForTab('terms-of-service')}
                      onClick={(e) => handleLinkClick(e, 'terms-of-service')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {t.footer.tos}
                    </a>
                  </li>
                  <li>
                    <a
                      href={getPathForTab('privacy-policy')}
                      onClick={(e) => handleLinkClick(e, 'privacy-policy')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {t.footer.privacyPolicy}
                    </a>
                  </li>
                  <li>
                    <a
                      href={getPathForTab('acceptable-use')}
                      onClick={(e) => handleLinkClick(e, 'acceptable-use')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {t.footer.acceptableUse}
                    </a>
                  </li>
                  <li>
                    <a
                      href={getPathForTab('ai-moderation')}
                      onClick={(e) => handleLinkClick(e, 'ai-moderation')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {t.footer.aiModeration}
                    </a>
                  </li>
                  <li>
                    <a
                      href={getPathForTab('cookie-policy')}
                      onClick={(e) => handleLinkClick(e, 'cookie-policy')}
                      className="hover:text-neutral-950 dark:hover:text-white transition-colors block"
                    >
                      {t.footer.cookiePolicy}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-neutral-200/80 dark:border-white/[0.08] text-xs text-neutral-500 dark:text-neutral-400 gap-4">
            <div className="font-medium">Synaps © 2026 · {t.footer.rights}</div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-5">
              {onOpenCookieSettings && (
                <button
                  onClick={onOpenCookieSettings}
                  className="hover:text-neutral-950 dark:hover:text-white underline underline-offset-4 text-xs cursor-pointer transition-colors"
                >
                  {t.footer.cookieSettings}
                </button>
              )}
              <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline" aria-hidden="true">
                ·
              </span>
              <span className="text-neutral-600 dark:text-neutral-300 font-medium">
                {language === 'tr' ? 'Máve tarafından geliştirilmiştir.' : 'Developed by Máve.'}
              </span>
            </div>
          </div>
        </motion.div>
      </footer>

      {/* Interactive Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#0c0c0e] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-neutral-200 dark:border-white/[0.15] text-neutral-900 dark:text-white relative overflow-hidden"
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </motion.button>

              {activeModal === 'developer-team' && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold">
                      {t.footer.modals.devTeamTitle}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{t.footer.modals.devTeamSub}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-5 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 my-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-xs shrink-0 bg-neutral-100 dark:bg-neutral-800">
                      <img
                        src="/assets/aistudio/image_e0686a18.png"
                        alt="Máve"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                          Máve
                        </h3>
                        <span className="text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md border border-neutral-200 dark:border-neutral-700">
                          #25f4
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mt-0.5">
                        {t.footer.modals.devTeamRole}
                      </p>

                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                        {t.footer.modals.devTeamDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setActiveModal(null);
                        onOpenSupport();
                      }}
                      className="flex-1 py-2.5 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs"
                    >
                      {t.footer.modals.connectSupport}
                    </button>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer border border-neutral-200 dark:border-neutral-700"
                    >
                      {t.footer.modals.close}
                    </button>
                  </div>
                </div>
              )}

              {activeModal === 'quickstart' && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white">
                      <TerminalIcon className="w-5 h-5 text-neutral-900 dark:text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                        {t.footer.modals.quickstartTitle}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">{t.footer.modals.quickstartSub}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 my-4">
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <span className="font-bold text-neutral-900 dark:text-white">{t.footer.modals.step1Title}</span>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        {t.footer.modals.step1Desc}
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <span className="font-bold text-neutral-900 dark:text-white">{t.footer.modals.step2Title}</span>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        {t.footer.modals.step2Desc}
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <span className="font-bold text-neutral-900 dark:text-white">{t.footer.modals.step3Title}</span>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        {t.footer.modals.step3Desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={BOT_INVITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 rounded-xl text-xs sm:text-sm font-semibold transition-all text-center cursor-pointer shadow-xs"
                    >
                      {t.footer.modals.addSynapsNow}
                    </a>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer border border-neutral-200 dark:border-neutral-700"
                    >
                      {t.footer.modals.close}
                    </button>
                  </div>
                </div>
              )}

              {activeModal === 'permissions' && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white">
                      <LayersIcon className="w-5 h-5 text-neutral-900 dark:text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                        {t.footer.modals.permissionsTitle}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">{t.footer.modals.permissionsSub}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 my-4">
                    <div className="p-2.5 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <span className="font-bold text-neutral-900 dark:text-white">{t.footer.modals.perm1Title}</span>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">{t.footer.modals.perm1Desc}</p>
                    </div>
                    <div className="p-2.5 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <span className="font-bold text-neutral-900 dark:text-white">{t.footer.modals.perm2Title}</span>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">{t.footer.modals.perm2Desc}</p>
                    </div>
                    <div className="p-2.5 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <span className="font-bold text-neutral-900 dark:text-white">{t.footer.modals.perm3Title}</span>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">{t.footer.modals.perm3Desc}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer border border-neutral-200 dark:border-neutral-700"
                  >
                    {t.footer.modals.close}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
