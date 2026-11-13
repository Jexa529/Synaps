import React, { useState } from 'react';
import { BOT_INVITE_URL } from '../data/commandsData';
import { TabType } from '../types';
import {
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { ScrollAnimation } from './ui/scroll-animation';
import { useLanguage } from '../i18n/translations';

interface HeroHomeProps {
  onTabChange?: (tab: TabType) => void;
}

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  commandTip?: string;
}

export const HeroHome: React.FC<HeroHomeProps> = ({ onTabChange }) => {
  const { t } = useLanguage();
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
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

  return (
    <div className="relative w-full overflow-hidden bg-[#fbfbfd] dark:bg-black text-neutral-900 dark:text-neutral-100 pt-12 sm:pt-16 pb-24 sm:pb-32 transition-colors duration-200">
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute left-1/2 -top-40 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-neutral-200/50 via-neutral-100/30 to-transparent dark:from-white/[0.06] dark:via-neutral-900/20 blur-[120px] opacity-70" />
        <div className="absolute -left-32 top-1/3 w-96 h-96 bg-neutral-200/30 dark:bg-white/[0.03] blur-[100px] rounded-full" />
        <div className="absolute -right-32 top-1/2 w-96 h-96 bg-neutral-200/30 dark:bg-white/[0.03] blur-[100px] rounded-full" />
      </div>

      {/* Massive Faded Background Typography Accent */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 opacity-40 dark:opacity-100">
        <span className="text-[20vw] sm:text-[18vw] font-black tracking-tighter text-neutral-200/40 dark:text-white/[0.035] leading-none">
          SYNAPS
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-center text-center">
        {/* Main Headline with Scroll Animation */}
        <ScrollAnimation direction="up" duration={0.8}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.08] max-w-4xl mx-auto">
            {t.hero.headlinePart1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-neutral-400 font-extrabold">
              {t.hero.headlineHighlight}
            </span>{' '}
            <br className="hidden sm:inline" />
            {t.hero.headlinePart2}
          </h1>
        </ScrollAnimation>

        {/* Subtitle with Scroll Animation */}
        <ScrollAnimation direction="up" delay={0.15} duration={0.8}>
          <p className="mt-5 text-neutral-600 dark:text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            {t.hero.subtitle}
          </p>
        </ScrollAnimation>

        {/* Action CTAs: Clean pill geometry with label and arrow */}
        <ScrollAnimation direction="up" delay={0.25} duration={0.8}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            {/* Primary CTA: Sunucuna Ekle */}
            <a
              href={BOT_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-12 px-7 rounded-full bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-2.5"
            >
              <span>{t.hero.addToDiscord}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/80 dark:text-neutral-950/80 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </a>

            {/* Secondary CTA: Komutları Keşfet */}
            <button
              onClick={() => onTabChange?.('commands')}
              className="group h-12 px-7 rounded-full bg-neutral-100 hover:bg-neutral-200/90 dark:bg-[#0e0f14] dark:hover:bg-[#171922] text-neutral-900 dark:text-white border border-neutral-300/80 dark:border-white/[0.15] font-semibold text-xs sm:text-sm transition-all duration-200 shadow-xs hover:shadow-sm active:scale-95 cursor-pointer inline-flex items-center gap-2.5"
            >
              <span>{t.hero.exploreCommands}</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          </div>
        </ScrollAnimation>

        {/* Expansive, Spacious Capability Showcase */}
        <div className="w-full mt-24 text-left">
          <ScrollAnimation direction="up" duration={0.8} className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              {t.hero.capabilitiesTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              {t.hero.capabilitiesSubtitle}
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1: Automated Incident Moderation */}
            <ScrollAnimation direction="left" duration={0.75} className="h-full">
              <div className="p-8 sm:p-9 rounded-3xl bg-white dark:bg-[#0e0f14] border border-neutral-200/90 dark:border-white/[0.12] dark:hover:border-white/25 shadow-sm hover:shadow-md dark:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.9)] transition-all flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-bold text-neutral-950 dark:text-white">{t.hero.modTitle}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                    {t.hero.modDesc}
                  </p>

                  {/* Simulated Live Sanction Card preview */}
                  <div className="mt-6 p-4 rounded-2xl bg-neutral-950 dark:bg-[#050507] text-white font-mono text-xs space-y-2.5 border border-neutral-800 dark:border-white/[0.1]">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 border-b border-neutral-800 dark:border-white/10 pb-2">
                      <span className="text-neutral-300 font-bold">{t.hero.cards?.liveSanctionTitle || 'LIVE SANCTION AUDIT'}</span>
                      <span className="text-[10px] bg-neutral-800 dark:bg-white/10 px-2 py-0.5 rounded text-neutral-300">
                        {t.hero.cards?.subSecondTimeout || 'Sub-second Timeout'}
                      </span>
                    </div>
                    <div className="space-y-1 text-[11px]">
                      <div className="text-neutral-400">{t.hero.cards?.threatLabel || 'Threat:'} <span className="text-white font-semibold">{t.hero.cards?.threatVal || 'Phishing domain detected'}</span></div>
                      <div className="text-neutral-400">{t.hero.cards?.sanctionLabel || 'Sanction:'} <span className="text-white">{t.hero.cards?.sanctionVal || 'Message purged · 60s timeout'}</span></div>
                      <div className="text-neutral-400">{t.hero.cards?.recordLabel || 'Record:'} <span className="text-white">{t.hero.cards?.recordVal || 'Strike [1/3] logged to database'}</span></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-white/[0.08] space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0" />
                    <span>{t.hero.cards?.modBullet1 || 'Sub-second raid surge isolation & auto-lockdown'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0" />
                    <span>{t.hero.cards?.modBullet2 || 'Persistent audit logging for strikes, mutes, and warnings'}</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Card 2: Economy & Banking Vaults */}
            <ScrollAnimation direction="right" duration={0.75} className="h-full">
              <div className="p-8 sm:p-9 rounded-3xl bg-white dark:bg-[#0e0f14] border border-neutral-200/90 dark:border-white/[0.12] dark:hover:border-white/25 shadow-sm hover:shadow-md dark:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.9)] transition-all flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-bold text-neutral-950 dark:text-white">{t.hero.ecoTitle}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                    {t.hero.ecoDesc}
                  </p>

                  {/* Simulated Digital Vault Card preview */}
                  <div className="mt-6 p-4 rounded-2xl bg-neutral-50 dark:bg-[#050507] border border-neutral-200 dark:border-white/[0.1] font-mono text-xs space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 border-b border-neutral-200/80 dark:border-white/10 pb-2">
                      <span className="font-bold text-neutral-900 dark:text-white font-sans">{t.hero.cards?.vaultTitle || 'SYNAPS SECURE VAULT'}</span>
                      <span className="text-[10px] bg-white dark:bg-white/10 px-2 py-0.5 rounded border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-200">
                        {t.hero.cards?.interestLabel || 'Interest: +2.4% APR'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#111218] border border-neutral-200 dark:border-white/[0.08]">
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans">{t.hero.cards?.walletLabel || 'Active Wallet'}</div>
                        <div className="font-bold text-neutral-900 dark:text-white">14,850 Coins</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#111218] border border-neutral-200 dark:border-white/[0.08]">
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans">{t.hero.cards?.vaultLabel || 'Vault (Rob-Proof)'}</div>
                        <div className="font-bold text-neutral-900 dark:text-white">125,000 Coins</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-neutral-600 dark:text-neutral-400 flex items-center justify-between font-sans">
                      <span>{t.hero.cards?.activeStreakLabel || 'Active Streak:'} <strong className="dark:text-white">{t.hero.cards?.daysLabel || '14 Days'}</strong></span>
                      <span className="text-neutral-900 dark:text-white font-semibold font-mono">+15% Multiplier</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-white/[0.08] space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0" />
                    <span>{t.hero.cards?.ecoBullet1 || 'Bank vault protection completely prevents coin robbing'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0" />
                    <span>{t.hero.cards?.ecoBullet2 || 'Competitive guild wealth and activity leaderboards'}</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Card 3: Support Desks */}
            <ScrollAnimation direction="left" duration={0.75} className="h-full">
              <div className="p-8 sm:p-9 rounded-3xl bg-white dark:bg-[#0e0f14] border border-neutral-200/90 dark:border-white/[0.12] dark:hover:border-white/25 shadow-sm hover:shadow-md dark:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.9)] transition-all flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-bold text-neutral-950 dark:text-white">{t.hero.ticketTitle}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                    {t.hero.ticketDesc}
                  </p>

                  {/* Simulated Ticket Dispatch Preview */}
                  <div className="mt-6 p-4 rounded-2xl bg-neutral-50 dark:bg-[#050507] border border-neutral-200 dark:border-white/[0.1] font-mono text-xs space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 border-b border-neutral-200/80 dark:border-white/10 pb-2">
                      <span className="font-bold text-neutral-900 dark:text-white font-sans">{t.hero.cards?.ticketHeader || 'CHANNEL #ticket-0419'}</span>
                      <span className="text-[10px] bg-white dark:bg-white/10 px-2 py-0.5 rounded border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-200">
                        {t.hero.cards?.urgentPriority || 'Closed in 1.4m'}
                      </span>
                    </div>
                    <div className="space-y-1 text-[11px] font-sans">
                      <div className="text-neutral-600 dark:text-neutral-300">Requester: <strong className="text-neutral-900 dark:text-white">@community_member</strong></div>
                      <div className="text-neutral-600 dark:text-neutral-300">{t.hero.cards?.assignedStaff || 'Staff Assigned:'} <strong className="text-neutral-900 dark:text-white">Máve</strong></div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono pt-1">
                        {t.hero.cards?.transcriptsSaved || 'Transcript exported & delivered to user DM'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-white/[0.08] space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0" />
                    <span>{t.hero.cards?.ticketBullet1 || 'Isolated channel permissions prevent member collisions'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0" />
                    <span>{t.hero.cards?.ticketBullet2 || 'Encrypted HTML transcript DM dispatch to user on close'}</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Card 4: Leveling & Rank Cards */}
            <ScrollAnimation direction="right" duration={0.75} className="h-full">
              <div className="p-8 sm:p-9 rounded-3xl bg-white dark:bg-[#0e0f14] border border-neutral-200/90 dark:border-white/[0.12] dark:hover:border-white/25 shadow-sm hover:shadow-md dark:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.9)] transition-all flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-bold text-neutral-950 dark:text-white">{t.hero.jobTitle}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                    {t.hero.jobDesc}
                  </p>

                  {/* Simulated Rank Card Preview */}
                  <div className="mt-6 p-4 rounded-2xl bg-neutral-950 dark:bg-[#050507] text-white font-mono text-xs space-y-3 border border-neutral-800 dark:border-white/[0.1]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-700">
                          <img
                            src="/assets/aistudio/image_e0686a18.png"
                            alt="Máve"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="font-sans">
                          <div className="font-bold text-xs text-white">Máve</div>
                          <div className="text-[10px] text-neutral-400 font-mono">{t.hero.cards?.careerHeader || 'Rank #1'}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] text-neutral-400">LEVEL</div>
                        <div className="text-base font-black text-white">42</div>
                      </div>
                    </div>

                    <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                      <div className="h-full bg-white rounded-full w-[84%]" />
                    </div>

                    <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                      <span>8,450 / 10,000 XP</span>
                      <span className="text-white">{t.hero.cards?.seniorArtisan || 'Role: Server Legend'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800/80 space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0" />
                    <span>{t.hero.cards?.careerBullet1 || 'Zero-delay newcomer role distribution on guild join'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0" />
                    <span>{t.hero.cards?.careerBullet2 || 'Configurable activity XP multipliers and role rewards'}</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>

        {/* Minimal High-End Quick Conversion Banner */}
        <ScrollAnimation direction="up" duration={0.8} className="w-full max-w-4xl mt-20">
          <div className="rounded-3xl bg-neutral-950 dark:bg-gradient-to-br dark:from-[#16171f] dark:via-[#0e0f14] dark:to-[#08090c] text-white p-8 sm:p-12 border border-neutral-800 dark:border-white/[0.15] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl dark:shadow-[0_0_60px_-15px_rgba(255,255,255,0.08)]">
            <div className="text-center sm:text-left space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ready to Upgrade Your Discord Server?
              </h3>
              <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
                Join verified Discord guilds running Synaps for sub-second moderation, banking economy, and support desks.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={BOT_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-white text-neutral-950 font-bold text-sm hover:bg-neutral-100 transition-all cursor-pointer shadow-sm active:scale-95 inline-flex items-center gap-2"
              >
                <span>{t.hero.addToDiscord}</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </a>
            </div>
          </div>
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

          {/* Clean, Spacious Accordion List */}
          <div className="space-y-4">
            {faqItems.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              return (
                <ScrollAnimation
                  key={faq.id}
                  direction="up"
                  delay={index * 0.05}
                  duration={0.6}
                >
                  <div
                    className={`rounded-3xl border transition-all duration-200 overflow-hidden bg-white dark:bg-[#0e0f14] shadow-xs ${
                      isOpen
                        ? 'border-neutral-900/40 dark:border-white/30 dark:bg-[#12131a] ring-1 ring-neutral-900/10 dark:ring-white/15 shadow-md'
                        : 'border-neutral-200/90 dark:border-white/[0.12] hover:border-neutral-300 dark:hover:border-white/25 hover:shadow-xs'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-6 sm:p-7 flex items-start justify-between text-left cursor-pointer transition-colors gap-4"
                    >
                      <div className="flex-1 pr-2">
                        <h4 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white leading-snug">
                          {faq.question}
                        </h4>
                      </div>
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 mt-1 ${
                          isOpen
                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 rotate-180'
                            : 'bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-white/20'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 border-t border-neutral-100 dark:border-white/[0.08] space-y-4 bg-neutral-50/50 dark:bg-[#07080c]">
                        <p className="leading-relaxed font-normal">{faq.answer}</p>
                        {faq.commandTip && (
                          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0e0f14] border border-neutral-200 dark:border-white/[0.12] shadow-xs font-mono text-xs sm:text-sm text-neutral-900 dark:text-neutral-200">
                            <span className="font-medium">{faq.commandTip}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
