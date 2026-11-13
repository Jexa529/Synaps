import React, { useState } from 'react';
import {
  ShieldCheck,
  Coins,
  Ticket,
  Zap,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { useLanguage } from '../i18n/translations';

type SuiteTabId = 'security' | 'economy' | 'support' | 'progression';

interface CommandItem {
  command: string;
  description: string;
}

interface SuiteTab {
  id: SuiteTabId;
  label: string;
  icon: React.ReactNode;
  tagline: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  commands: CommandItem[];
  embedPreview: {
    commandTyped: string;
    embedTitle: string;
    embedSubtitle: string;
    fields: { label: string; value: string }[];
    footer: string;
  };
}

export const AboutUs: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<SuiteTabId>('security');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (cmd: string) => {
    navigator.clipboard?.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => {
      setCopiedCmd(null);
    }, 2000);
  };

  const suiteTabs: SuiteTab[] = [
    {
      id: 'security',
      label: t.aboutPage.tabs.security,
      icon: <ShieldCheck className="w-4 h-4" />,
      tagline: '',
      title: 'Automated Community Protection',
      description:
        'Continuous deep inspection against malicious token-grabbers, deceptive phishing mirrors, and mass mention floods. Protects staff focus with sub-second automated timeouts and persistent audit logging.',
      metrics: [
        { label: 'Gateway Latency', value: '< 15ms' },
        { label: 'Threat Purge', value: 'Instant' },
        { label: 'Strike Tracking', value: 'Persistent' },
        { label: 'False Positives', value: 'Zero Heuristic' },
      ],
      commands: [
        { command: 's!protection', description: 'Inspect or configure automated raid isolation shields.' },
        { command: 's!warn @user [reason]', description: 'Issue a formal infraction and log audit strike.' },
        { command: 's!timeout @user [duration]', description: 'Isolate an offender from all text channels.' },
        { command: 's!purge [amount]', description: 'Bulk remove spam floods from channel history.' },
      ],
      embedPreview: {
        commandTyped: 's!protection',
        embedTitle: 'Automated Audit Shield · Active',
        embedSubtitle: 'Guild Heuristic Inspection Module',
        fields: [
          { label: 'Phishing Filter', value: 'Active (2,400+ domains quarantined)' },
          { label: 'Anti-Mass Ping', value: 'Active (Auto-timeout at 5+ mentions)' },
          { label: 'Raid Burst Isolation', value: 'Active (Sub-second join throttle)' },
        ],
        footer: 'Synaps Security Engine · Incident ID #SEC-9402',
      },
    },
    {
      id: 'economy',
      label: t.aboutPage.tabs.economy,
      icon: <Coins className="w-4 h-4" />,
      tagline: 'Compounding Banking & Work Shifts',
      title: 'Interactive Economy & Daily Streaks',
      description:
        'Fuel daily chat engagement with career promotions, compounding interest bank accounts, item trading, and 24-hour streak bonuses. Fully isolated vaults prevent unauthorized member robbery.',
      metrics: [
        { label: 'Vault Safety', value: '100% Rob-Proof' },
        { label: 'Daily Interest', value: '+2.4% APR' },
        { label: 'Streak Bonus', value: '+15% Boost' },
        { label: 'Ledger Engine', value: 'Zero-Collision' },
      ],
      commands: [
        { command: 's!balance', description: 'View current active wallet and secure bank ledger.' },
        { command: 's!daily', description: 'Claim 24-hour reward with streak bonus multiplier.' },
        { command: 's!work', description: 'Clock in for career shift to earn virtual currency.' },
        { command: 's!deposit [amount|all]', description: 'Safely transfer coins to rob-proof bank vault.' },
      ],
      embedPreview: {
        commandTyped: 's!balance',
        embedTitle: 'Financial Ledger · Synaps Economy',
        embedSubtitle: 'Account summary for @Máve',
        fields: [
          { label: 'Active Wallet', value: '14,850 Coins' },
          { label: 'Bank Vault', value: '125,000 Coins (Rob-Proof)' },
          { label: 'Career Rank', value: 'Senior Architect · 14 Day Streak' },
        ],
        footer: 'Synaps Economy Core · Daily compounding enabled',
      },
    },
    {
      id: 'support',
      label: t.aboutPage.tabs.support,
      icon: <Ticket className="w-4 h-4" />,
      tagline: 'Fast Staff Dispatch & Transcripts',
      title: 'Private Support Ticketing',
      description:
        'Single-click private ticket dispatch channels visible only to the requester and assigned support roles. Generates encrypted, permanent HTML transcript archives delivered upon case resolution.',
      metrics: [
        { label: 'Dispatch Speed', value: 'Single-Click' },
        { label: 'Avg Resolution', value: '1.4 Minutes' },
        { label: 'Transcript Format', value: 'Archival HTML' },
        { label: 'Permission Isolation', value: 'Strict' },
      ],
      commands: [
        { command: 's!ticket-panel', description: 'Deploy interactive ticket creation buttons in channel.' },
        { command: 's!ticket [topic]', description: 'Directly dispatch a private support inquiry room.' },
        { command: 's!close [reason]', description: 'Resolve ticket, export transcript, and archive channel.' },
        { command: 's!add @user', description: 'Grant a specific team member access to active ticket.' },
      ],
      embedPreview: {
        commandTyped: 's!ticket-panel',
        embedTitle: 'Community Help Desk · Open Inquiry',
        embedSubtitle: 'Click below to open an isolated private ticket',
        fields: [
          { label: 'Response Guarantee', value: 'Average staff pickup under 2 minutes' },
          { label: 'Transcript Delivery', value: 'Direct Message archival delivery on close' },
          { label: 'Privacy', value: 'Hidden from general members' },
        ],
        footer: 'Synaps Ticket Dispatch · Secure member desk',
      },
    },
    {
      id: 'progression',
      label: t.aboutPage.tabs.progression,
      icon: <Zap className="w-4 h-4" />,
      tagline: 'Activity Leveling & Vector Cards',
      title: 'Auto-Roles & Member Ranks',
      description:
        'Frictionless onboarding with zero-delay newcomer arrival roles, customizable SVG rank cards, and automated tier promotions as members participate in chat and community events.',
      metrics: [
        { label: 'Arrival Role', value: 'Zero-Delay' },
        { label: 'Rank Card', value: 'Vector SVG' },
        { label: 'XP Calculations', value: 'Dynamic Curve' },
        { label: 'Tier Automation', value: 'Auto-Granted' },
      ],
      commands: [
        { command: 's!rank [@user]', description: 'Render high-resolution member level progress card.' },
        { command: 's!leaderboard', description: 'Display guild top chat contributors and XP rankings.' },
        { command: 's!autorole set @role', description: 'Assign default arrival role for new server members.' },
        { command: 's!level-rewards', description: 'Inspect unlockable roles and special perks.' },
      ],
      embedPreview: {
        commandTyped: 's!rank',
        embedTitle: 'Rank Card · Máve #25f4',
        embedSubtitle: 'Guild Rank #1 · Server Legend',
        fields: [
          { label: 'Current Level', value: 'Level 42 (8,450 / 10,000 XP)' },
          { label: 'Messages Sent', value: '14,290 verified contributions' },
          { label: 'Unlocked Reward', value: 'VIP Tier III + Guild Champion Badge' },
        ],
        footer: 'Synaps Leveling System · Live XP synchronization',
      },
    },
  ];

  const currentTab = suiteTabs.find((t) => t.id === activeTab) || suiteTabs[0];

  const coreValues = [
    {
      title: t.aboutPage.val1Title || 'Prefix Command Engine (s!)',
      description:
        t.aboutPage.val1Desc ||
        'Fast and dependable prefix execution (s!balance, s!daily, s!work) with zero command latency, clean embed responses, and reliable sub-second gateway feedback.',
    },
    {
      title: t.aboutPage.val2Title || 'Sub-Second Execution',
      description:
        t.aboutPage.val2Desc ||
        'Engineered for instant Discord gateway heartbeats so command responses, dice rolls, and moderation actions happen in the blink of an eye.',
    },
    {
      title: t.aboutPage.val3Title || '100% Free Core Toolset',
      description:
        t.aboutPage.val3Desc ||
        'Essential moderation commands, support ticketing, banking, and level progression are free for all communities with zero hidden paywalls.',
    },
    {
      title: t.aboutPage.val4Title || 'Zero Clutter',
      description:
        t.aboutPage.val4Desc ||
        'Consolidates 5+ bots into a single clean architecture without unnecessary bloat.',
    },
  ];

  return (
    <div className="pt-8 sm:pt-14 pb-24 px-6 sm:px-12 max-w-6xl mx-auto text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight leading-tight">
          {t.aboutPage.title}
        </h1>
        <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto font-normal">
          {t.aboutPage.subtitle}
        </p>
      </div>

      {/* The Story & Mission Card */}
      <div className="mb-14 bg-white dark:bg-[#0e0f14] rounded-3xl border border-neutral-200/80 dark:border-white/[0.12] p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white tracking-tight">
            {t.aboutPage.storyTitle || 'Why Synaps Was Created'}
          </h2>
          <div className="mt-4 space-y-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <p>
              {t.aboutPage.storyP1}
            </p>
            <p>
              {t.aboutPage.storyP2}
            </p>
          </div>
        </div>

        {/* 3 Quick Bot Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-neutral-200/80 dark:border-white/[0.1] relative z-10">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                {t.aboutPage.highlight1Title || 'Unified Permissions'}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {t.aboutPage.highlight1Desc || 'One bot, one clean role hierarchy in your server settings.'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                {t.aboutPage.highlight2Title || 'High Reliability'}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {t.aboutPage.highlight2Desc || 'Continuous uptime so your moderation never sleeps.'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                {t.aboutPage.highlight3Title || 'Community Driven'}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {t.aboutPage.highlight3Desc || 'Features shaped directly by Discord server owner feedback.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Community Suite: Interactive Tabbed Showcase */}
      <div className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Comprehensive Community Suite
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            Explore the four unified modules with categorized commands and live operational metrics
          </p>
        </div>

        {/* Segmented Tab Navigation Control */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-neutral-100 dark:bg-[#0e0f14] rounded-2xl max-w-2xl mx-auto mb-8 border border-neutral-200 dark:border-white/[0.12]">
          {suiteTabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-white/[0.06]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display (Split Layout) */}
        <div className="bg-white dark:bg-[#0e0f14] rounded-3xl border border-neutral-200/90 dark:border-white/[0.12] p-6 sm:p-9 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Purpose Narrative, Metrics, and Interactive Commands */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
                  {currentTab.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2.5 leading-relaxed font-normal">
                  {currentTab.description}
                </p>
              </div>

              {/* Minimalist Operational Metrics (Unboxed 4-grid) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {currentTab.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#050507] border border-neutral-200/80 dark:border-white/[0.1] text-center sm:text-left"
                  >
                    <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">{metric.label}</div>
                    <div className="text-sm font-bold text-neutral-950 dark:text-white mt-0.5">{metric.value}</div>
                  </div>
                ))}
              </div>

              {/* Categorized Command Examples with Click-to-Copy */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase font-mono tracking-wider">
                    Core Module Commands
                  </span>
                  <span className="text-[11px] text-neutral-400">Click command to copy</span>
                </div>

                <div className="space-y-2">
                  {currentTab.commands.map((cmd, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#050507] border border-neutral-200/80 dark:border-white/[0.1] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-mono font-bold text-neutral-950 dark:text-white text-xs">
                          {cmd.command}
                        </div>
                        <div className="text-neutral-500 dark:text-neutral-400 text-[11px]">
                          {cmd.description}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(cmd.command)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium transition-colors cursor-pointer shadow-2xs shrink-0 flex items-center gap-1.5"
                      >
                        {copiedCmd === cmd.command ? (
                          <>
                            <Check className="w-3 h-3 text-neutral-900 dark:text-white" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-neutral-600 dark:text-neutral-400" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Discord Embed Response */}
            <div className="lg:col-span-5 space-y-3">
              <div className="rounded-2xl border border-neutral-200 dark:border-white/[0.1] bg-neutral-50/60 dark:bg-[#050507] p-4 sm:p-5 space-y-3 shadow-inner">
                {/* User Command Invocation */}
                <div className="flex items-start gap-2.5 pb-3 border-b border-neutral-200 dark:border-white/[0.08]">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 shrink-0">
                    <img
                      src="/assets/aistudio/image_e0686a18.png"
                      alt="Máve"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-neutral-950 dark:text-white text-xs">Máve</span>
                      <span className="text-[10px] text-neutral-400">Today at 1:12 PM</span>
                    </div>
                    <div className="text-neutral-800 dark:text-neutral-200 font-mono text-xs mt-0.5">
                      {currentTab.embedPreview.commandTyped}
                    </div>
                  </div>
                </div>

                {/* Bot Embed Message */}
                <div className="flex items-start gap-2.5 pt-1">
                  <div className="w-7 h-7 rounded-lg overflow-hidden bg-black border border-neutral-300 dark:border-white/20 shrink-0">
                    <img
                      src="/assets/aistudio/image_12f5f257.png"
                      alt="Synaps Bot"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-neutral-950 dark:text-white text-xs">Synaps</span>
                      <span className="bg-neutral-900 dark:bg-neutral-700 text-white text-[9px] font-bold px-1 rounded">
                        BOT
                      </span>
                    </div>

                    {/* Discord Embed Box */}
                    <div className="p-3.5 rounded-xl border-l-4 border-l-neutral-950 dark:border-l-white bg-white dark:bg-[#0e0f14] border border-neutral-200 dark:border-white/[0.1] space-y-2.5 text-xs shadow-2xs">
                      <div>
                        <div className="font-bold text-neutral-950 dark:text-white text-xs">
                          {currentTab.embedPreview.embedTitle}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                          {currentTab.embedPreview.embedSubtitle}
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-1 text-[11px]">
                        {currentTab.embedPreview.fields.map((field, idx) => (
                          <div key={idx} className="p-1.5 rounded-lg bg-neutral-50 dark:bg-black/60 border border-neutral-100 dark:border-white/[0.08]">
                            <span className="font-semibold text-neutral-800 dark:text-neutral-300 block text-[10px] uppercase font-mono">
                              {field.label}
                            </span>
                            <span className="text-neutral-700 dark:text-neutral-300">{field.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-neutral-100 dark:border-white/[0.08] text-[10px] text-neutral-400 font-mono">
                        {currentTab.embedPreview.footer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Server Owners Choose Synaps */}
      <div className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl font-bold text-neutral-950 dark:text-white tracking-tight">
            {t.aboutPage.valuesTitle || 'Built for Discord Owners & Staff'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5">
            {t.aboutPage.valuesSubtitle || 'Designed around ease of use, responsiveness, and zero fluff'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0e0f14] rounded-2xl border border-neutral-200/80 dark:border-white/[0.12] p-5 shadow-xs"
            >
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{val.title}</h4>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Elevated Founder Profile Card: Máve (with uploaded avatar image_e0686a18.png & black accents) */}
      <div className="bg-white dark:bg-[#0e0f14] rounded-3xl border border-neutral-200/90 dark:border-white/[0.12] p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          {/* Founder Avatar with clean badge */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 shadow-md shrink-0 bg-neutral-100 dark:bg-neutral-800">
            <img
              src="/assets/aistudio/image_e0686a18.png"
              alt="Máve - Founder"
              className="w-full h-full object-cover"
            />
            {/* Clean status indicator */}
            <span className="absolute bottom-2.5 right-2.5 flex h-3.5 w-3.5">
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-neutral-900 dark:bg-white ring-2 ring-white dark:ring-neutral-900" />
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">Máve</h2>
              <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2.5 py-1 rounded-lg">
                #25f4
              </span>
              <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800/80 px-2 py-0.5 rounded-md border border-neutral-200/80 dark:border-neutral-700/60">
                {t.aboutPage.founderRole}
              </span>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
              {t.aboutPage.founderBio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
