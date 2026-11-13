import React from 'react';
import { ArrowLeftIcon, ShieldCheckIcon, EyeOffIcon, SlidersIcon } from './ui/Icons';

interface CookiePolicyPageProps {
  onBackToHome: () => void;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ onBackToHome }) => {
  return (
    <div className="pt-8 sm:pt-12 pb-20 px-6 sm:px-12 max-w-4xl mx-auto text-neutral-900 dark:text-neutral-100">
      {/* Back button */}
      <div className="mb-8">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-4 py-2 rounded-full transition-colors cursor-pointer border border-transparent dark:border-neutral-700"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Header */}
      <div className="border-b border-neutral-200/80 dark:border-neutral-800 pb-6 mb-8">
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold mb-3">
          <span>Legal Information</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Cookie Policy
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 font-mono">
          Last updated: October 25, 2026 · Synaps Discord Bot
        </p>
      </div>

      {/* Content sections */}
      <div className="space-y-8 text-neutral-700 dark:text-neutral-300 text-sm sm:text-[15px] leading-relaxed">
        <section className="bg-white dark:bg-[#111215] p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-neutral-900 dark:text-white" />
            1. What Are Cookies and Why We Use Them
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Cookies are small text files stored on your device through your browser when you visit
            our website. Synaps uses cookies to provide smooth navigation between pages, remember
            your essential preferences (such as your cookie consent choices), and ensure core site
            performance and reliability.
          </p>
        </section>

        <section className="bg-white dark:bg-[#111215] p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
            <SlidersIcon className="w-5 h-5 text-neutral-900 dark:text-white" />
            2. Categories of Cookies We Use
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
              <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">A. Strictly Necessary & Functional Cookies</h3>
              <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                Essential for the website to function properly. Your choice to accept or decline
                cookies is preserved locally in your browser storage so you are not prompted repeatedly.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
              <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">B. Performance & Experience Cookies</h3>
              <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                Helps us understand how visitors interact with our documentation, command catalog,
                and feature guides to fix potential issues and improve site speed.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-[#111215] p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
            <EyeOffIcon className="w-5 h-5 text-neutral-900 dark:text-white" />
            3. Zero Third-Party Advertising Trackers
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Synaps respects user privacy. We do not use third-party behavioral advertising cookies,
            commercial data profiling brokers, or cross-site tracking scripts. Your browsing data
            is never monetized or sold.
          </p>
        </section>

        <section className="bg-white dark:bg-[#111215] p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
            4. Managing and Clearing Cookies
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            You can modify your browser settings at any time to delete existing cookies or reject
            new ones. Note that disabling essential cookies may impact certain interface preferences
            and smooth navigation.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 text-center">
          <h3 className="font-bold text-neutral-900 dark:text-white text-base">Questions or Support?</h3>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            If you have questions regarding our privacy practices or cookie guidelines, feel free to join our official Discord Support Server.
          </p>
          <div className="mt-4">
            <button
              onClick={onBackToHome}
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white dark:text-neutral-950 bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 rounded-full transition-all cursor-pointer shadow-xs"
            >
              Back to Home
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
