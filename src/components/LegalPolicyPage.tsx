import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeftIcon,
  FileTextIcon,
  LockIcon,
  AlertTriangleIcon,
  BotIcon,
  CookieIcon,
  CheckCircleIcon,
} from './ui/Icons';
import { TabType } from '../types';
import { useLanguage } from '../i18n/translations';
import { uiExtras } from '../i18n/extras';
import { legalPoliciesI18n, PolicyKeyType } from '../i18n/commandsAndLegal';

export type PolicyKey = PolicyKeyType;

interface LegalPolicyPageProps {
  currentPolicy: PolicyKey;
  onSelectPolicy: (tab: TabType) => void;
  onBackToHome: () => void;
}

const POLICY_ICONS: Record<PolicyKey, React.ReactNode> = {
  terms: <FileTextIcon className="w-4 h-4 text-neutral-900 dark:text-white" />,
  privacy: <LockIcon className="w-4 h-4 text-neutral-900 dark:text-white" />,
  'acceptable-use': <AlertTriangleIcon className="w-4 h-4 text-neutral-900 dark:text-white" />,
  'ai-moderation': <BotIcon className="w-4 h-4 text-neutral-900 dark:text-white" />,
  'discord-tos': <CheckCircleIcon className="w-4 h-4 text-neutral-900 dark:text-white" />,
  cookie: <CookieIcon className="w-4 h-4 text-neutral-900 dark:text-white" />,
};

export const LegalPolicyPage: React.FC<LegalPolicyPageProps> = ({
  currentPolicy,
  onSelectPolicy,
  onBackToHome,
}) => {
  const { language, t } = useLanguage();
  const ex = uiExtras[language] || uiExtras.tr;
  const policies = legalPoliciesI18n[language] || legalPoliciesI18n.tr;
  const policy = policies[currentPolicy] || policies.terms;

  const policyNavigation: { key: PolicyKey; label: string; tab: TabType }[] = [
    { key: 'terms', label: t.footer.tos, tab: 'terms-of-service' },
    { key: 'privacy', label: t.footer.privacyPolicy, tab: 'privacy-policy' },
    { key: 'cookie', label: t.footer.cookiePolicy, tab: 'cookie-policy' },
    { key: 'acceptable-use', label: t.footer.acceptableUse, tab: 'acceptable-use' },
    { key: 'ai-moderation', label: t.footer.aiModeration, tab: 'ai-moderation' },
    { key: 'discord-tos', label: t.footer.discordTos, tab: 'discord-tos' },
  ];

  return (
    <div className="pt-8 sm:pt-12 pb-24 px-6 sm:px-12 max-w-4xl mx-auto text-neutral-900 dark:text-neutral-100">
      {/* Top Bar: Back to Home + Policy Nav */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white bg-white dark:bg-[#0c0c0e] hover:bg-neutral-50 dark:hover:bg-[#17171a] border border-neutral-200 dark:border-white/[0.15] px-4 py-2 rounded-full transition-colors cursor-pointer shadow-xs"
        >
          <ArrowLeftIcon className="w-4 h-4 text-neutral-900 dark:text-white" />
          <span>{ex.legal.backToHome}</span>
        </motion.button>

        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          {ex.legal.legalHub}
        </span>
      </motion.div>

      {/* Policy Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-neutral-100 dark:bg-[#0c0c0e] rounded-2xl border border-neutral-200/80 dark:border-white/[0.12] mb-10 overflow-x-auto shadow-xs">
        {policyNavigation.map((item) => {
          const isCurrent = currentPolicy === item.key;
          return (
            <motion.button
              key={item.key}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectPolicy(item.tab)}
              className={`relative z-10 px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                isCurrent
                  ? 'text-neutral-900 dark:text-white font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-white/[0.06]'
              }`}
            >
              {isCurrent && (
                <motion.span
                  layoutId="legal-policy-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-white dark:bg-[#17171a] border border-neutral-200 dark:border-white/[0.15] shadow-xs -z-10"
                />
              )}
              {item.label}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPolicy}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Main Header */}
          <div className="border-b border-neutral-200 dark:border-white/[0.1] pb-6 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-[#0c0c0e] border border-neutral-200 dark:border-white/[0.12] text-neutral-700 dark:text-neutral-300 text-xs font-semibold mb-3">
              {POLICY_ICONS[currentPolicy]}
              <span>{policy.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              {policy.title}
            </h1>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
              {policy.summary}
            </p>
          </div>

          {/* Document Sections */}
          <div className="space-y-6 text-neutral-700 dark:text-neutral-300 text-sm sm:text-[15px] leading-relaxed">
            {policy.sections.map((sec, idx) => (
              <motion.section
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white dark:bg-[#0c0c0e] p-6 sm:p-7 rounded-2xl border border-neutral-200/80 dark:border-white/[0.12] shadow-xs hover:shadow-md transition-shadow"
              >
                <h2 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white mb-3">
                  {sec.heading}
                </h2>
                <div className="space-y-2 text-neutral-600 dark:text-neutral-400">
                  {sec.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>
                      {paragraph.startsWith('http') || paragraph.includes('https://') ? (
                        <span className="font-mono text-xs text-neutral-900 dark:text-white underline">
                          {paragraph}
                        </span>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer CTA back to home */}
      <div className="mt-12 text-center pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-medium text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeftIcon className="w-4 h-4 text-white dark:text-neutral-950" />
          <span>{ex.legal.returnHome}</span>
        </motion.button>
      </div>
    </div>
  );
};
