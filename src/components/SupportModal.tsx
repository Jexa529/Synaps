import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  CloseIcon,
  CopyIcon,
  CheckIcon,
  MessageSquareIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from './ui/Icons';
import { SUPPORT_SERVER_URL } from '../data/commandsData';
import { useLanguage } from '../i18n/translations';
import { uiExtras } from '../i18n/extras';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const ex = uiExtras[language] || uiExtras.tr;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SUPPORT_SERVER_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white dark:bg-[#0c0c0e] text-neutral-900 dark:text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-white/[0.15] overflow-hidden"
          >
            {/* Close Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label={t.common.close}
            >
              <CloseIcon className="w-4 h-4" />
            </motion.button>

            {/* Header with Authentic Bot Logo */}
            <div className="flex items-center gap-3.5 mb-5 relative z-10">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/[0.15] shadow-xs shrink-0 bg-black">
                <img
                  src="/assets/aistudio/image_12f5f257.png"
                  alt="Synaps"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white leading-tight">
                  {ex.supportModal.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  {ex.supportModal.subtitle}
                </p>
              </div>
            </div>

            {/* Benefits inside Support Server */}
            <div className="space-y-3 py-4 border-y border-neutral-200/80 dark:border-white/[0.1] text-xs text-neutral-600 dark:text-neutral-300 relative z-10">
              {[
                { icon: <MessageSquareIcon className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />, text: ex.supportModal.perk1 },
                { icon: <SparklesIcon className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />, text: ex.supportModal.perk2 },
                { icon: <ShieldCheckIcon className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />, text: ex.supportModal.perk3 },
              ].map((perk, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.08 + idx * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/[0.12] flex items-center justify-center shrink-0">
                    {perk.icon}
                  </div>
                  <span>{perk.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Server Invite Link Box */}
            <div className="mt-5 p-3 rounded-xl bg-neutral-50 dark:bg-[#141416] border border-neutral-200 dark:border-white/[0.12] flex items-center justify-between relative z-10">
              <span className="text-xs font-mono text-neutral-800 dark:text-neutral-200 select-all truncate">
                {SUPPORT_SERVER_URL}
              </span>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={handleCopy}
                className="ml-2 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-neutral-900 dark:text-white bg-neutral-200 dark:bg-white/[0.1] hover:bg-neutral-300 dark:hover:bg-white/[0.2] rounded-lg transition-colors cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                    <span>{t.common.copied}</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                    <span>{t.common.copy}</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 relative z-10">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href={SUPPORT_SERVER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 px-4 text-xs sm:text-sm font-semibold text-white dark:text-neutral-950 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 rounded-full transition-colors shadow-xs cursor-pointer"
              >
                {ex.supportModal.joinButton}
              </motion.a>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={onClose}
                className="py-2.5 px-4 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer border border-neutral-200 dark:border-neutral-700"
              >
                {t.common.close}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
