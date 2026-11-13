import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Coins,
  Ticket,
  Briefcase,
  Store,
  CheckCircle2,
  Lock,
  Zap,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { FeatureSubTab } from '../types';
import { BOT_INVITE_URL } from '../data/commandsData';
import { useLanguage } from '../i18n/translations';

interface FeaturesProps {
  initialTab?: FeatureSubTab;
}

export const Features: React.FC<FeaturesProps> = ({ initialTab = 'moderation' }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<FeatureSubTab>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Interactive Mini-Demo 2: Economy Simulator
  const [walletBalance, setWalletBalance] = useState(1450);
  const [bankBalance, setBankBalance] = useState(18500);
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [recentTransaction, setRecentTransaction] = useState<string | null>('Initial wallet balance loaded');

  const handleClaimDaily = () => {
    if (dailyClaimed) return;
    const bonus = 750;
    setWalletBalance((prev) => prev + bonus);
    setDailyClaimed(true);
    setRecentTransaction(`+${bonus} Coins claimed via s!daily streak (+15% guild bonus)!`);
  };

  const handleDepositAll = () => {
    if (walletBalance <= 0) return;
    const amount = walletBalance;
    setBankBalance((prev) => prev + amount);
    setWalletBalance(0);
    setRecentTransaction(`Deposited ${amount} Coins into Synaps Vault (Compounding at 2.4% APR).`);
  };

  const handleWithdrawFunds = () => {
    if (bankBalance < 500) return;
    setBankBalance((prev) => prev - 500);
    setWalletBalance((prev) => prev + 500);
    setRecentTransaction('Withdrew 500 Coins from Bank Vault to active Wallet.');
  };

  // Interactive Mini-Demo 3: Ticket Lifecycle Stepper
  const [ticketStep, setTicketStep] = useState<1 | 2 | 3 | 4>(2);

  // Interactive Mini-Demo 4: Career Ladder
  const [selectedCareerTier, setSelectedCareerTier] = useState<number>(2);
  const [jobWorked, setJobWorked] = useState(false);

  const careerTiers = [
    { tier: 1, title: 'Junior Trainee', salary: '250 - 400 Coins', cooldown: '1 Hour', reqXp: '0 XP', badge: 'Tier I' },
    { tier: 2, title: 'Server Moderator', salary: '550 - 800 Coins', cooldown: '45 Mins', reqXp: '1,500 XP', badge: 'Tier II' },
    { tier: 3, title: 'Staff Systems Architect', salary: '1,200 - 1,800 Coins', cooldown: '30 Mins', reqXp: '5,000 XP', badge: 'Tier III' },
    { tier: 4, title: 'Guild Executive Tycoon', salary: '2,500 - 4,000 Coins', cooldown: '15 Mins', reqXp: '15,000 XP', badge: 'Tier IV' },
  ];

  // Interactive Mini-Demo 5: Market Simulator
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [marketFeedback, setMarketFeedback] = useState<string | null>(null);

  const handleBuyItem = (name: string, price: number) => {
    if (walletBalance < price) {
      setMarketFeedback(`Insufficient wallet funds! Deposit or run s!work to earn more.`);
      return;
    }
    setWalletBalance((prev) => prev - price);
    setPurchasedItems((prev) => [...prev, name]);
    setMarketFeedback(`Successfully purchased "${name}" for ${price} Coins! Role assigned.`);
  };

  return (
    <div className="pt-8 sm:pt-12 pb-24 px-6 sm:px-12 max-w-6xl mx-auto text-neutral-900 dark:text-neutral-100">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          {t.featuresPage.title}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto">
          {t.featuresPage.subtitle}
        </p>
      </div>

      {/* Feature Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 p-1.5 bg-neutral-100 dark:bg-[#0e0f14] rounded-2xl border border-neutral-200/80 dark:border-white/[0.12] max-w-3xl mx-auto shadow-xs">
        {[
          { id: 'moderation' as const, label: t.featuresPage.tabs.moderation, icon: <ShieldAlert className="w-4 h-4 text-neutral-900 dark:text-white" /> },
          { id: 'economy' as const, label: t.featuresPage.tabs.economy, icon: <Coins className="w-4 h-4 text-neutral-900 dark:text-white" /> },
          { id: 'tickets' as const, label: t.featuresPage.tabs.tickets, icon: <Ticket className="w-4 h-4 text-neutral-900 dark:text-white" /> },
          { id: 'jobs' as const, label: t.featuresPage.tabs.jobs, icon: <Briefcase className="w-4 h-4 text-neutral-900 dark:text-white" /> },
          { id: 'market' as const, label: t.featuresPage.tabs.market, icon: <Store className="w-4 h-4 text-neutral-900 dark:text-white" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-[#1a1c24] text-neutral-900 dark:text-white shadow-xs border border-neutral-200 dark:border-white/[0.15] font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-white/[0.06]'
              }`}
            >
              <span className={`w-5 h-5 rounded-lg flex items-center justify-center ${isActive ? 'bg-neutral-100 dark:bg-white/[0.1]' : 'bg-neutral-200/60 dark:bg-white/[0.05]'}`}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sleek Monochrome Black-Gradient Feature Display Stage */}
      <div className="bg-gradient-to-b from-[#0a0b0e] via-[#121319] to-[#1c1d26] dark:from-[#0e0f14] dark:via-[#0b0c10] dark:to-[#13141c] rounded-3xl border border-black dark:border-white/[0.15] p-6 sm:p-10 shadow-2xl shadow-black/40 dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.07)] mb-12 relative overflow-hidden text-white">
        {/* Subtle radial ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-white/[0.08] to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* 1. Auto-Moderation Tab */}
        {activeTab === 'moderation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Automated Incident Detection
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                Synaps scans chat messages instantly. It neutralizes phishing links, token grabbers, rapid-fire spam, and unauthorized mass pings before community staff even need to step in.
              </p>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>Real-time anti-spam with adaptive threshold rate-limiting</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>Zero-delay auto-mute, channel lockdown, and message purging</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>Configurable through prefix commands like <code className="font-mono bg-white/10 text-white border border-white/15 px-1.5 py-0.5 rounded text-xs font-semibold">s!protection</code></span>
                </div>
              </div>
            </div>

            {/* Protection Module Specs Card */}
            <div className="lg:col-span-7 bg-[#0e0f14]/90 rounded-2xl p-5 sm:p-6 border border-neutral-800 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                <span className="font-semibold text-white">Active Shield Modules</span>
                <span className="text-xs text-neutral-400 font-medium font-mono">
                  3 Active Modules
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-[#161720] border border-neutral-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-white">Phishing & Token Grabber Neutralizer</h4>
                      <span className="text-[10px] font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/15">Fast Filter</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Continuously checks against known malicious domains and automatically purges scam invitations.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161720] border border-neutral-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-white">Anti-Raid Burst Lockdown</h4>
                      <span className="text-[10px] font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/15">Auto Action</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Detects mass join waves and rapid ping spikes, temporarily isolating unauthorized incoming accounts.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161720] border border-neutral-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-white">Moderation Case Logs</h4>
                      <span className="text-[10px] font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/15">Searchable</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Maintains a detailed historical record of all warnings, kicks, mutes, and ban appeals with moderator IDs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Economy & Vault Tab */}
        {activeTab === 'economy' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Virtual Currency with Vault Security
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                Empower your guild members with an immersive currency system. Reward activity with streaks, protect savings in high-yield vaults, and foster friendly competition with server leaderboards.
              </p>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>Commands: <code className="font-mono bg-white/10 text-white border border-white/15 px-1.5 py-0.5 rounded text-xs font-semibold">s!balance</code>, <code className="font-mono bg-white/10 text-white border border-white/15 px-1.5 py-0.5 rounded text-xs font-semibold">s!deposit</code>, <code className="font-mono bg-white/10 text-white border border-white/15 px-1.5 py-0.5 rounded text-xs font-semibold">s!daily</code></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>Vault protection shields savings from rogue robbing commands</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>Configurable guild tax rates, daily bonuses, and coin drops</span>
                </div>
              </div>
            </div>

            {/* Interactive Widget: Live Economy Bank Simulator */}
            <div className="lg:col-span-7 bg-[#0e0f14]/90 rounded-2xl p-5 sm:p-6 border border-neutral-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                <span className="font-mono font-semibold text-white">Interactive Economy Simulator</span>
                <span className="text-[11px] font-mono text-neutral-400 font-bold">Vault APR: 2.4%</span>
              </div>

              {/* Account Balances Card */}
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="p-3.5 rounded-xl bg-[#161720] border border-neutral-800">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    Wallet (Liquid)
                  </span>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                    {walletBalance.toLocaleString()} <span className="text-xs text-neutral-400">Coins</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#161720] border border-neutral-800">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    Bank Vault (Protected)
                  </span>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                    {bankBalance.toLocaleString()} <span className="text-xs text-neutral-400">Coins</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={handleClaimDaily}
                  disabled={dailyClaimed}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    dailyClaimed
                      ? 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
                      : 'bg-white hover:bg-neutral-200 text-neutral-950 shadow-xs font-bold'
                  }`}
                >
                  <span>{dailyClaimed ? 'Claimed (s!daily)' : 'Claim Daily (+750)'}</span>
                </button>
                <button
                  onClick={handleDepositAll}
                  disabled={walletBalance <= 0}
                  className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-200 text-xs font-semibold font-mono transition-colors cursor-pointer border border-neutral-700"
                >
                  Deposit All (s!dep all)
                </button>
                <button
                  onClick={handleWithdrawFunds}
                  disabled={bankBalance < 500}
                  className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-300 text-xs font-semibold font-mono transition-colors cursor-pointer border border-neutral-700"
                >
                  Withdraw 500
                </button>
              </div>

              {/* Transaction Activity Bar */}
              {recentTransaction && (
                <div className="p-2.5 rounded-xl bg-[#161720] border border-neutral-800 text-[11px] font-mono text-neutral-300">
                  <span className="text-neutral-500 mr-2">LOG:</span>
                  {recentTransaction}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. Ticket Management Tab */}
        {activeTab === 'tickets' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Staff Routing & Instant Transcripts
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                Replace cluttered channels with dynamic, private ticket channels. Synaps categorizes support tickets, alerts on-duty staff, and produces archival HTML transcripts when tickets close.
              </p>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>One-click modal dropdown for billing, player reports, and appeals</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>Direct DM delivery of encrypted HTML transcripts to users</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>Commands: <code className="font-mono bg-white/10 text-white border border-white/15 px-1.5 py-0.5 rounded text-xs font-semibold">s!ticket</code>, <code className="font-mono bg-white/10 text-white border border-white/15 px-1.5 py-0.5 rounded text-xs font-semibold">s!ticket close</code></span>
                </div>
              </div>
            </div>

            {/* Interactive Widget: Stepper */}
            <div className="lg:col-span-7 bg-[#0e0f14]/90 rounded-2xl p-5 sm:p-6 border border-neutral-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                <span className="font-mono font-semibold text-white">Interactive Ticket Stepper</span>
                <span className="text-[11px] font-mono text-neutral-400 font-bold">Channel #ticket-0419</span>
              </div>

              {/* Stepper Steps */}
              <div className="grid grid-cols-4 gap-2 my-5 text-center">
                {[
                  { step: 1, label: 'Open Request' },
                  { step: 2, label: 'Auto Routing' },
                  { step: 3, label: 'Staff Resolve' },
                  { step: 4, label: 'Transcript' },
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setTicketStep(s.step as typeof ticketStep)}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      ticketStep === s.step
                        ? 'bg-white text-neutral-950 font-bold shadow-md'
                        : ticketStep > s.step
                        ? 'bg-neutral-800 text-white border border-neutral-700'
                        : 'bg-[#161720] border border-neutral-800 text-neutral-500'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold">{s.step}</div>
                    <div className="text-[10px] truncate mt-0.5">{s.label}</div>
                  </button>
                ))}
              </div>

              {/* State Preview Box */}
              <div className="p-4 rounded-xl bg-[#161720] border border-neutral-800 font-mono text-xs space-y-2">
                {ticketStep === 1 && (
                  <div>
                    <span className="text-white font-bold block mb-1">STAGE 1: TICKET CREATION</span>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      User clicks button or executes <code className="text-white font-bold">s!ticket create &quot;Billing Issue&quot;</code>. Private room created with isolated permissions.
                    </p>
                  </div>
                )}
                {ticketStep === 2 && (
                  <div>
                    <span className="text-white font-bold block mb-1">STAGE 2: AUTOMATIC TRIAGE & ASSIGNMENT</span>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      Synaps pings the <span className="text-white font-bold">@Support Staff</span> role and displays welcome questions regarding transaction receipt and server ID.
                    </p>
                  </div>
                )}
                {ticketStep === 3 && (
                  <div>
                    <span className="text-white font-bold block mb-1">STAGE 3: ACTIVE STAFF INTERVENTION</span>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      Staff claims ticket via button. Synaps locks other staff members from colliding and tracks response resolution duration.
                    </p>
                  </div>
                )}
                {ticketStep === 4 && (
                  <div>
                    <span className="text-white font-bold block mb-1">STAGE 4: CLOSURE & AUDIT ARCHIVE</span>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      Command <code className="text-white font-bold">s!ticket close</code> generates an interactive HTML transcript archived in Discord logs and direct-messaged to user.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4. Careers & XP Tab */}
        {activeTab === 'jobs' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Guild Career Ladders & Promotions
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                Retain members by providing progression trees. As members chat and work shifts via <code className="font-mono bg-white/10 text-white border border-white/15 px-1.5 py-0.5 rounded text-xs font-semibold">s!work</code>, they accumulate career XP to unlock higher-paying professions.
              </p>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>4 progression tiers with cooldowns and wage multipliers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>Random job events (bonus tips, unexpected server overtime)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>Integrated with server role synchronization</span>
                </div>
              </div>
            </div>

            {/* Interactive Widget: Career Ladder */}
            <div className="lg:col-span-7 bg-[#0e0f14]/90 rounded-2xl p-5 sm:p-6 border border-neutral-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                <span className="font-mono font-semibold text-white">Interactive Career Ladder</span>
                <span className="text-[11px] font-mono text-neutral-400 font-bold">XP Multiplier Active</span>
              </div>

              {/* Tiers List */}
              <div className="space-y-2 my-4">
                {careerTiers.map((tier) => (
                  <button
                    key={tier.tier}
                    onClick={() => setSelectedCareerTier(tier.tier)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                      selectedCareerTier === tier.tier
                        ? 'bg-[#1e202a] border-white/40 shadow-sm'
                        : 'bg-[#161720] border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase bg-white text-neutral-950 px-1.5 py-0.5 rounded font-bold">
                          {tier.badge}
                        </span>
                        <span className="font-semibold text-xs sm:text-sm text-white">{tier.title}</span>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-mono mt-0.5 block">
                        Requires: {tier.reqXp} · Cooldown: {tier.cooldown}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-mono font-bold text-white">
                        {tier.salary}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3 bg-[#161720] rounded-xl border border-neutral-800 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">Simulate Shift Execution:</span>
                <button
                  onClick={() => {
                    setJobWorked(true);
                    setTimeout(() => setJobWorked(false), 2500);
                  }}
                  disabled={jobWorked}
                  className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 font-bold transition-all cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {jobWorked ? 'Shift Finished (+650 Coins, +85 XP)' : 'Run s!work shift'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. Market & Inventory Tab */}
        {activeTab === 'market' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Guild Marketplace & Item Trading
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                Allow members to spend earned virtual currency on customized role rewards, boost passes, and inventory consumables. Easily managed through <code className="font-mono bg-white/10 text-white border border-white/15 px-1.5 py-0.5 rounded text-xs font-semibold">s!market</code> commands.
              </p>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>Customizable stock levels and purchase cooldowns</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>Peer-to-peer item trading via <code className="font-mono bg-white/10 text-white border border-white/15 px-1.5 py-0.5 rounded text-xs font-semibold">s!trade</code></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span>Auto-role provisioning upon store purchase completion</span>
                </div>
              </div>
            </div>

            {/* Interactive Widget: Market Preview */}
            <div className="lg:col-span-7 bg-[#0e0f14]/90 rounded-2xl p-5 sm:p-6 border border-neutral-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                <span className="font-mono font-semibold text-white">Simulated Guild Storefront</span>
                <span className="text-[11px] font-mono text-neutral-400 font-bold">Wallet: {walletBalance} Coins</span>
              </div>

              {marketFeedback && (
                <div className="mt-3 p-2 bg-[#161720] border border-neutral-700 rounded-lg text-[11px] font-mono text-neutral-200">
                  {marketFeedback}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                {[
                  { name: 'VIP Patron Role', price: 500, tag: 'Permanent Role' },
                  { name: 'Custom Hex Color', price: 300, tag: 'Cosmetic' },
                  { name: '2x Work Boost (24h)', price: 750, tag: 'Consumable' },
                  { name: 'Lottery Ticket x10', price: 100, tag: 'Casino Entry' },
                ].map((item, idx) => {
                  const isBought = purchasedItems.includes(item.name);
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#161720] border border-neutral-800 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider font-semibold">
                          {item.tag}
                        </span>
                        <h4 className="text-xs font-bold text-white mt-0.5">{item.name}</h4>
                      </div>
                      <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-white">{item.price} Coins</span>
                        <button
                          onClick={() => handleBuyItem(item.name, item.price)}
                          className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded transition-colors cursor-pointer ${
                            isBought
                              ? 'bg-neutral-800 text-neutral-400 border border-neutral-700 font-bold'
                              : 'bg-white hover:bg-neutral-200 text-neutral-950 shadow-xs'
                          }`}
                        >
                          {isBought ? 'Owned' : `s!buy ${idx + 1}`}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA to add bot */}
      <div className="text-center pt-6">
        <a
          href={BOT_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-medium text-xs sm:text-sm shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <span>{t.hero.addToDiscord}</span>
          <ArrowRight className="w-4 h-4 text-white dark:text-neutral-950" />
        </a>
      </div>
    </div>
  );
};
