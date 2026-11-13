import React, { useState } from 'react';
import { TabType } from '../types';
import { BOT_INVITE_URL } from '../data/commandsData';
import {
  X,
  Terminal,
  Activity,
  Layers,
} from 'lucide-react';
import { useLanguage } from '../i18n/translations';

interface FooterProps {
  onTabChange: (tab: TabType) => void;
  onOpenSupport: () => void;
  onOpenCookieSettings?: () => void;
}

type ModalType =
  | null
  | 'changelog'
  | 'newsletter'
  | 'feedback'
  | 'staff-apply'
  | 'developer-team'
  | 'quickstart'
  | 'shard-status'
  | 'permissions';

export const Footer: React.FC<FooterProps> = ({
  onTabChange,
  onOpenSupport,
  onOpenCookieSettings,
}) => {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
        setActiveModal(null);
      }, 2000);
    }
  };

  return (
    <>
      <footer className="w-full bg-white dark:bg-black text-neutral-800 dark:text-neutral-200 pt-12 pb-10 px-6 sm:px-10 lg:px-16 border-t border-neutral-200/80 dark:border-white/[0.12] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* 5 Distinct Columns - Kept intact as strictly required */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-6 pb-10">
            {/* Column 1: MENU */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                {t.footer.menu}
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400">
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      onTabChange('home');
                    }}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.nav.home}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      onTabChange('about');
                    }}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.nav.about}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      onTabChange('features');
                    }}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.nav.features}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      onTabChange('commands');
                    }}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.nav.commands}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: COMMUNITY */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                {t.footer.community}
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400">
                <li>
                  <button
                    onClick={onOpenSupport}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.supportServer}
                  </button>
                </li>
                <li>
                  <a
                    href="https://top.gg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left block"
                  >
                    {t.footer.topGg}
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('developer-team')}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.devTeam}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('feedback')}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.feedback}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('staff-apply')}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.staffApply}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: RESOURCES with Authentic Bot Logo (Synaps text removed as requested) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2 pb-0.5">
                <div className="w-7 h-7 rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-black shrink-0 shadow-xs">
                  <img
                    src="/assets/aistudio/image_12f5f257.png"
                    alt="Bot Logo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                {t.footer.resources}
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400">
                <li>
                  <a
                    href={BOT_INVITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left block"
                  >
                    {t.footer.botInvite}
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('quickstart')}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.quickstart}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('shard-status')}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.shardStatus}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('newsletter')}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.newsletter}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: LEGAL */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                {t.footer.legal}
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400">
                <li>
                  <button
                    onClick={() => onTabChange('terms-of-service')}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.tos}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onTabChange('privacy-policy')}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.privacyPolicy}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onTabChange('acceptable-use')}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.acceptableUse}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onTabChange('ai-moderation')}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.aiModeration}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onTabChange('discord-tos')}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.discordTos}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onTabChange('cookie-policy')}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.cookiePolicy}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 5: SUPPORT */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                {t.footer.support}
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400">
                <li>
                  <button
                    onClick={onOpenSupport}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.helpDesk}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('feedback')}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.reportIssue}
                  </button>
                </li>
                <li>
                  <a
                    href="https://discord.gg/synap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left block"
                  >
                    {t.footer.officialGuild}
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('permissions')}
                    className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.footer.botPermissions}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-neutral-200 dark:border-white/[0.1] text-xs text-neutral-500 dark:text-neutral-400 gap-4">
            <div>Synaps © 2026 · Built by Máve · {t.footer.rights}</div>
            {onOpenCookieSettings && (
              <button
                onClick={onOpenCookieSettings}
                className="hover:text-neutral-900 dark:hover:text-white underline text-xs cursor-pointer"
              >
                {t.footer.cookieSettings}
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0e0f14] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-neutral-200 dark:border-white/[0.15] text-neutral-900 dark:text-white relative overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Developer Team Modal: Specifically showcasing mave - 25f4 */}
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

            {/* Modal: Bot Setup & Quickstart */}
            {activeModal === 'quickstart' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white">
                    <Terminal className="w-5 h-5 text-neutral-900 dark:text-white" />
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

            {/* Modal: Gateway & Shard Status */}
            {activeModal === 'shard-status' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white">
                    <Activity className="w-5 h-5 text-neutral-900 dark:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {t.footer.modals.shardTitle}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">{t.footer.modals.shardSub}</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400 my-4">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-white" />
                      <span className="font-semibold text-neutral-900 dark:text-white">Shard #0 (Gateway Core)</span>
                    </div>
                    <span className="font-mono text-neutral-900 dark:text-white font-semibold">24ms · {t.footer.modals.healthy}</span>
                  </div>
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-white" />
                      <span className="font-semibold text-neutral-900 dark:text-white">Shard #1 (Guild Partition)</span>
                    </div>
                    <span className="font-mono text-neutral-900 dark:text-white font-semibold">26ms · {t.footer.modals.healthy}</span>
                  </div>
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span className="font-semibold text-neutral-900 dark:text-white">REST API Webhook Proxy</span>
                    </div>
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold">{t.footer.modals.operational}</span>
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

            {/* Modal: OAuth2 Permission Scopes */}
            {activeModal === 'permissions' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white">
                    <Layers className="w-5 h-5 text-neutral-900 dark:text-white" />
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

            {/* Modal: Staff Application */}
            {activeModal === 'staff-apply' && (
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                  {t.footer.modals.staffApplyTitle}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                  {t.footer.modals.staffApplySub}
                </p>

                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 space-y-2 mb-5">
                  <p className="font-medium text-neutral-900 dark:text-white">{t.footer.modals.staffReqTitle}</p>
                  <ul className="list-disc pl-4 space-y-1 text-neutral-600 dark:text-neutral-400">
                    <li>{t.footer.modals.staffReq1}</li>
                    <li>{t.footer.modals.staffReq2}</li>
                    <li>{t.footer.modals.staffReq3}</li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setActiveModal(null);
                    onOpenSupport();
                  }}
                  className="w-full py-2.5 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs"
                >
                  {t.footer.modals.joinToApply}
                </button>
              </div>
            )}

            {/* Modal: Suggestions & Bug Reports */}
            {activeModal === 'feedback' && (
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                  {t.footer.modals.feedbackTitle}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                  {t.footer.modals.feedbackSub}
                </p>

                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 mb-5">
                  <p>
                    {t.footer.modals.feedbackDesc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveModal(null);
                    onOpenSupport();
                  }}
                  className="w-full py-2.5 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs"
                >
                  {t.footer.modals.submitDiscord}
                </button>
              </div>
            )}

            {/* Modal: Newsletter */}
            {activeModal === 'newsletter' && (
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                  {t.footer.modals.newsletterTitle}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                  {t.footer.modals.newsletterSub}
                </p>

                {newsletterSubscribed ? (
                  <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-300 dark:border-neutral-700 text-center text-xs sm:text-sm text-neutral-900 dark:text-white font-medium">
                    {t.footer.modals.newsletterSuccess}
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder={t.footer.modals.newsletterPlaceholder}
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10 focus:border-neutral-900 dark:focus:border-white"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs"
                    >
                      {t.footer.modals.subscribe}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
