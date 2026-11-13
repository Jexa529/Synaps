import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { SUPPORT_SERVER_URL } from '../data/commandsData';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(SUPPORT_SERVER_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0e0f14] text-neutral-900 dark:text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-white/[0.15] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Authentic Bot Logo */}
        <div className="flex items-center gap-3.5 mb-5 relative z-10">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/[0.15] shadow-xs shrink-0 bg-black">
            <img
              src="/assets/aistudio/image_12f5f257.png"
              alt="Synaps Bot Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-950 dark:text-white leading-tight">
              Synaps Support Hub
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Official Discord Support Server</p>
          </div>
        </div>

        {/* Benefits inside Support Server */}
        <div className="space-y-3 py-4 border-y border-neutral-200/80 dark:border-white/[0.1] text-xs text-neutral-600 dark:text-neutral-300 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/[0.12] flex items-center justify-center shrink-0">
              <MessageSquare className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
            </div>
            <span>24/7 dedicated community help desk & ticket assistance</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/[0.12] flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
            </div>
            <span>Early access to new commands & beta features</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/[0.12] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
            </div>
            <span>Direct contact with developers for custom guild configurations</span>
          </div>
        </div>

        {/* Server Invite Link Box */}
        <div className="mt-5 p-3 rounded-xl bg-neutral-50 dark:bg-[#050507] border border-neutral-200 dark:border-white/[0.12] flex items-center justify-between relative z-10">
          <span className="text-xs font-mono text-neutral-800 dark:text-neutral-200 select-all truncate">
            {SUPPORT_SERVER_URL}
          </span>
          <button
            onClick={handleCopy}
            className="ml-2 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-neutral-900 dark:text-white bg-neutral-200 dark:bg-white/[0.1] hover:bg-neutral-300 dark:hover:bg-white/[0.2] rounded-lg transition-all cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white stroke-[3]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 stroke-[2.5]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 relative z-10">
          <a
            href={SUPPORT_SERVER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2.5 px-4 text-xs sm:text-sm font-semibold text-white dark:text-neutral-950 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 rounded-full transition-all shadow-xs cursor-pointer"
          >
            Join Discord Server
          </a>
          <button
            onClick={onClose}
            className="py-2.5 px-4 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer border border-neutral-200 dark:border-neutral-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
