import React, { useState, useEffect } from 'react';

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

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50 max-w-[340px] sm:max-w-[360px] w-full animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="bg-white/95 dark:bg-[#0e0f14]/98 backdrop-blur-xl text-neutral-900 dark:text-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-neutral-200 dark:border-white/[0.15] flex flex-col justify-between">
        <p className="text-[13px] sm:text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-300 font-normal">
          We use cookies to improve your experience, analyze site traffic, and personalize
          content and features.{' '}
          <button
            type="button"
            onClick={onOpenPolicy}
            className="text-neutral-900 dark:text-white hover:underline font-semibold inline cursor-pointer focus:outline-none"
          >
            Read our Cookie Policy
          </button>
          .
        </p>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={handleDecline}
            className="flex-1 py-2 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-[13px] font-medium transition-all text-center cursor-pointer border border-neutral-200 dark:border-neutral-700"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 py-2 px-4 rounded-xl bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-[13px] font-semibold transition-all text-center cursor-pointer shadow-xs"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
