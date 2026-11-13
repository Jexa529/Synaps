import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../i18n/translations';
import { uiExtras } from '../i18n/extras';

interface CookieBannerProps {
  onOpenPolicy: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  onOpenPolicy,
  isOpen: controlledIsOpen,
  onClose,
}) => {
  const { language } = useLanguage();
  const ex = uiExtras[language] || uiExtras.tr;

  const [internalVisible, setInternalVisible] = useState(() => {
    if (typeof controlledIsOpen === 'boolean') {
      return controlledIsOpen;
    }
    try {
      const dismissed = sessionStorage.getItem('synaps_cookie_dismissed');
      return dismissed !== 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (typeof controlledIsOpen === 'boolean') {
      setInternalVisible(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  const isVisible = typeof controlledIsOpen === 'boolean' ? controlledIsOpen : internalVisible;

  const handleDecline = () => {
    try {
      sessionStorage.setItem('synaps_cookie_dismissed', 'true');
      localStorage.setItem('synaps_cookie_consent', 'declined');
    } catch {}
    setInternalVisible(false);
    onClose?.();
  };

  const handleAccept = () => {
    try {
      sessionStorage.setItem('synaps_cookie_dismissed', 'true');
      localStorage.setItem('synaps_cookie_consent', 'accepted');
    } catch {}
    setInternalVisible(false);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="region"
          aria-label={ex.cookie.ariaLabel}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50 max-w-[340px] sm:max-w-[360px] w-full"
        >
          <div className="bg-white/95 dark:bg-[#0c0c0e]/98 backdrop-blur-xl text-neutral-900 dark:text-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-neutral-200 dark:border-white/[0.15] flex flex-col justify-between">
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-300 font-normal">
              {ex.cookie.message}{' '}
              <button
                type="button"
                onClick={onOpenPolicy}
                className="text-neutral-900 dark:text-white hover:underline font-semibold inline text-left cursor-pointer focus:outline-none"
              >
                {ex.cookie.readPolicy}
              </button>
            </p>

            <div className="mt-5 flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={handleDecline}
                className="flex-1 py-2 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-[13px] font-medium transition-colors text-center cursor-pointer border border-neutral-200 dark:border-neutral-700"
              >
                {ex.cookie.decline}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={handleAccept}
                className="flex-1 py-2 px-4 rounded-xl bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-[13px] font-semibold transition-colors text-center cursor-pointer shadow-xs"
              >
                {ex.cookie.accept}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
