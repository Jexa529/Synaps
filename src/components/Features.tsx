import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlertIcon,
  CoinsIcon,
  TicketIcon,
  BriefcaseIcon,
  StoreIcon,
  CheckCircleIcon,
  LockIcon,
  ZapIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from './ui/Icons';
import { FeatureSubTab } from '../types';
import { BOT_INVITE_URL } from '../data/commandsData';
import { useLanguage } from '../i18n/translations';
import { uiExtras } from '../i18n/extras';
import { getPathForTab } from '../routes';

interface FeaturesProps {
  initialTab?: FeatureSubTab;
}

type TxState =
  | { type: 'initial' }
  | { type: 'claimed'; amount: number }
  | { type: 'deposited'; amount: number }
  | { type: 'withdrew' };

type MarketLogState =
  | { type: 'insufficient' }
  | { type: 'purchased'; itemIdx: number; price: number }
  | null;

export const Features: React.FC<FeaturesProps> = ({ initialTab = 'moderation' }) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const ex = uiExtras[language] || uiExtras.tr;
  const f = ex.features;
  const coinsUnit = ex.hero.coinsUnit;

  const [activeTab, setActiveTab] = useState<FeatureSubTab>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleSelectFeatureTab = (tab: FeatureSubTab) => {
    setActiveTab(tab);
    navigate(getPathForTab('features', tab), { replace: true });
  };

  // Interactive Mini-Demo 2: Economy Simulator
  const [walletBalance, setWalletBalance] = useState(1450);
  const [bankBalance, setBankBalance] = useState(18500);
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [txLog, setTxLog] = useState<TxState>({ type: 'initial' });

  const handleClaimDaily = () => {
    if (dailyClaimed) return;
    const bonus = 750;
    setWalletBalance((prev) => prev + bonus);
    setDailyClaimed(true);
    setTxLog({ type: 'claimed', amount: bonus });
  };

  const handleDepositAll = () => {
    if (walletBalance <= 0) return;
    const amount = walletBalance;
    setBankBalance((prev) => prev + amount);
    setWalletBalance(0);
    setTxLog({ type: 'deposited', amount });
  };

  const handleWithdrawFunds = () => {
    if (bankBalance < 500) return;
    setBankBalance((prev) => prev - 500);
    setWalletBalance((prev) => prev + 500);
    setTxLog({ type: 'withdrew' });
  };

  const recentTransactionText = (() => {
    if (txLog.type === 'initial') return f.initialLog;
    if (txLog.type === 'claimed') return f.claimedLog.replace('{amount}', String(txLog.amount));
    if (txLog.type === 'deposited') return f.depositedLog.replace('{amount}', String(txLog.amount));
    return f.withdrewLog;
  })();

  // Interactive Mini-Demo 3: Ticket Lifecycle Stepper
  const [ticketStep, setTicketStep] = useState<1 | 2 | 3 | 4>(2);

  // Interactive Mini-Demo 4: Career Ladder
  const [selectedCareerTier, setSelectedCareerTier] = useState<number>(2);
  const [jobWorked, setJobWorked] = useState(false);

  const careerTiers = f.tiers.map((tier, idx) => ({
    tier: idx + 1,
    ...tier,
  }));

  // Interactive Mini-Demo 5: Market Simulator
  const [purchasedIndices, setPurchasedIndices] = useState<number[]>([]);
  const [marketLog, setMarketLog] = useState<MarketLogState>(null);

  const handleBuyItem = (itemIdx: number, price: number) => {
    if (walletBalance < price) {
      setMarketLog({ type: 'insufficient' });
      return;
    }
    setWalletBalance((prev) => prev - price);
    setPurchasedIndices((prev) => (prev.includes(itemIdx) ? prev : [...prev, itemIdx]));
    setMarketLog({ type: 'purchased', itemIdx, price });
  };

  const marketFeedbackText = (() => {
    if (!marketLog) return null;
    if (marketLog.type === 'insufficient') return f.insufficientFunds;
    const itemName = f.marketItems[marketLog.itemIdx]?.name || '';
    return f.purchasedLog
      .replace('{name}', itemName)
      .replace('{price}', String(marketLog.price));
  })();

  const shieldIcons = [
    <ShieldCheckIcon key="shield" className="w-4 h-4 text-white" />,
    <ZapIcon key="zap" className="w-4 h-4 text-white" />,
    <LockIcon key="lock" className="w-4 h-4 text-white" />,
  ];

  const activeTicketStep = f.steps[ticketStep - 1] || f.steps[0];

  return (
    <div className="pt-8 sm:pt-12 pb-24 px-6 sm:px-12 max-w-6xl mx-auto text-neutral-900 dark:text-neutral-100">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          {t.featuresPage.title}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto">
          {t.featuresPage.subtitle}
        </p>
      </motion.div>

      {/* Feature Selector Tabs with Shared layoutId Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-center justify-center gap-2 mb-8 p-1.5 bg-neutral-100 dark:bg-[#0c0c0e] rounded-2xl border border-neutral-200/80 dark:border-white/[0.12] max-w-3xl mx-auto shadow-xs"
      >
        {[
          { id: 'moderation' as const, label: t.featuresPage.tabs.moderation, icon: <ShieldAlertIcon className="w-4 h-4 text-neutral-900 dark:text-white" /> },
          { id: 'economy' as const, label: t.featuresPage.tabs.economy, icon: <CoinsIcon className="w-4 h-4 text-neutral-900 dark:text-white" /> },
          { id: 'tickets' as const, label: t.featuresPage.tabs.tickets, icon: <TicketIcon className="w-4 h-4 text-neutral-900 dark:text-white" /> },
          { id: 'jobs' as const, label: t.featuresPage.tabs.jobs, icon: <BriefcaseIcon className="w-4 h-4 text-neutral-900 dark:text-white" /> },
          { id: 'market' as const, label: t.featuresPage.tabs.market, icon: <StoreIcon className="w-4 h-4 text-neutral-900 dark:text-white" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleSelectFeatureTab(tab.id)}
              className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                isActive
                  ? 'text-neutral-900 dark:text-white font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-white/[0.06]'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="features-active-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-white dark:bg-[#17171a] shadow-xs border border-neutral-200 dark:border-white/[0.15] -z-10"
                />
              )}
              <span className={`w-5 h-5 rounded-lg flex items-center justify-center ${isActive ? 'bg-neutral-100 dark:bg-white/[0.1]' : 'bg-neutral-200/60 dark:bg-white/[0.05]'}`}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Sleek Monochrome Black-Gradient Feature Display Stage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        className="bg-gradient-to-b from-[#09090b] via-[#0e0e11] to-[#161619] dark:from-[#0c0c0e] dark:via-[#060607] dark:to-[#111114] rounded-3xl border border-black dark:border-white/[0.15] p-6 sm:p-10 shadow-2xl shadow-black/40 dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.07)] mb-12 relative overflow-hidden text-white"
      >
        {/* Subtle radial ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-white/[0.08] to-transparent rounded-full blur-2xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {/* 1. Auto-Moderation Tab */}
          {activeTab === 'moderation' && (
            <motion.div
              key="moderation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10"
            >
              <div className="lg:col-span-5 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {f.modHeading}
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                  {f.modBody}
                </p>

                <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-neutral-300">
                  {f.modBullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                        <CheckCircleIcon className="w-3 h-3 text-white" />
                      </span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Protection Module Specs Card */}
              <div className="lg:col-span-7 bg-[#0c0c0e]/90 rounded-2xl p-5 sm:p-6 border border-neutral-800 space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                  <span className="font-semibold text-white">{f.shieldTitle}</span>
                  <span className="text-xs text-neutral-400 font-medium font-mono">
                    {f.shieldCount}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {f.shieldCards.map((card, cIdx) => (
                    <motion.div
                      key={cIdx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.24, delay: cIdx * 0.06 }}
                      className="p-3.5 rounded-xl bg-[#141416] border border-neutral-800 flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                        {shieldIcons[cIdx]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-white">{card.title}</h4>
                          <span className="text-[10px] font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/15 shrink-0">
                            {card.tag}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">{card.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. Economy & Vault Tab */}
          {activeTab === 'economy' && (
            <motion.div
              key="economy"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10"
            >
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {f.ecoHeading}
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {f.ecoBody}
              </p>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-neutral-300">
                {f.ecoBullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                      <CheckCircleIcon className="w-3 h-3 text-white" />
                    </span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Widget: Live Economy Bank Simulator */}
            <div className="lg:col-span-7 bg-[#0c0c0e]/90 rounded-2xl p-5 sm:p-6 border border-neutral-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                <span className="font-mono font-semibold text-white">{f.simTitle}</span>
                <span className="text-[11px] font-mono text-neutral-400 font-bold">{f.vaultApr}</span>
              </div>

              {/* Account Balances Card */}
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="p-3.5 rounded-xl bg-[#141416] border border-neutral-800">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    {f.walletLiquid}
                  </span>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                    {walletBalance.toLocaleString()} <span className="text-xs text-neutral-400">{coinsUnit}</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#141416] border border-neutral-800">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    {f.vaultProtected}
                  </span>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                    {bankBalance.toLocaleString()} <span className="text-xs text-neutral-400">{coinsUnit}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClaimDaily}
                  disabled={dailyClaimed}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                    dailyClaimed
                      ? 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
                      : 'bg-white hover:bg-neutral-200 text-neutral-950 shadow-xs font-bold'
                  }`}
                >
                  <span>{dailyClaimed ? f.claimedBtn : f.claimDailyBtn}</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDepositAll}
                  disabled={walletBalance <= 0}
                  className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-200 text-xs font-semibold font-mono transition-colors cursor-pointer border border-neutral-700"
                >
                  {f.depositAllBtn}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWithdrawFunds}
                  disabled={bankBalance < 500}
                  className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-300 text-xs font-semibold font-mono transition-colors cursor-pointer border border-neutral-700"
                >
                  {f.withdrawBtn}
                </motion.button>
              </div>

              {/* Transaction Activity Bar */}
              <div className="p-2.5 rounded-xl bg-[#141416] border border-neutral-800 text-[11px] font-mono text-neutral-300">
                <span className="text-neutral-500 mr-2">LOG:</span>
                {recentTransactionText}
              </div>
            </div>
            </motion.div>
          )}

          {/* 3. Ticket Management Tab */}
          {activeTab === 'tickets' && (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10"
            >
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {f.ticketHeading}
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {f.ticketBody}
              </p>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-neutral-300">
                {f.ticketBullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                      <CheckCircleIcon className="w-3 h-3 text-white" />
                    </span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Widget: Stepper */}
            <div className="lg:col-span-7 bg-[#0c0c0e]/90 rounded-2xl p-5 sm:p-6 border border-neutral-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                <span className="font-mono font-semibold text-white">{f.stepperTitle}</span>
                <span className="text-[11px] font-mono text-neutral-400 font-bold">{f.channelName}</span>
              </div>

              {/* Stepper Steps */}
              <div className="grid grid-cols-4 gap-2 my-5 text-center">
                {f.steps.map((s, idx) => {
                  const stepNum = (idx + 1) as 1 | 2 | 3 | 4;
                  return (
                    <motion.button
                      key={stepNum}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setTicketStep(stepNum)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        ticketStep === stepNum
                          ? 'bg-white text-neutral-950 font-bold shadow-md'
                          : ticketStep > stepNum
                          ? 'bg-neutral-800 text-white border border-neutral-700'
                          : 'bg-[#141416] border border-neutral-800 text-neutral-500'
                      }`}
                    >
                      <div className="text-xs font-mono font-bold">{stepNum}</div>
                      <div className="text-[10px] truncate mt-0.5">{s.label}</div>
                    </motion.button>
                  );
                })}
              </div>

              {/* State Preview Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={ticketStep}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-xl bg-[#141416] border border-neutral-800 font-mono text-xs space-y-2"
                >
                  <span className="text-white font-bold block mb-1">{activeTicketStep.title}</span>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {activeTicketStep.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            </motion.div>
          )}

          {/* 4. Careers & XP Tab */}
          {activeTab === 'jobs' && (
            <motion.div
              key="jobs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10"
            >
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {f.jobsHeading}
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {f.jobsBody}
              </p>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-neutral-300">
                {f.jobsBullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                      <CheckCircleIcon className="w-3 h-3 text-white" />
                    </span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Widget: Career Ladder */}
            <div className="lg:col-span-7 bg-[#0c0c0e]/90 rounded-2xl p-5 sm:p-6 border border-neutral-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                <span className="font-mono font-semibold text-white">{f.ladderTitle}</span>
                <span className="text-[11px] font-mono text-neutral-400 font-bold">{f.xpMultiplierActive}</span>
              </div>

              {/* Tiers List */}
              <div className="space-y-2 my-4">
                {careerTiers.map((tier) => (
                  <motion.button
                    key={tier.tier}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setSelectedCareerTier(tier.tier)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                      selectedCareerTier === tier.tier
                        ? 'bg-[#1c1c20] border-white/40 shadow-sm'
                        : 'bg-[#141416] border-neutral-800 hover:border-neutral-700'
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
                        {f.requiresLabel} {tier.reqXp} · {f.cooldownLabel} {tier.cooldown}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-mono font-bold text-white">
                        {tier.salary}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="p-3 bg-[#141416] rounded-xl border border-neutral-800 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">{f.simulateShiftLabel}</span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setJobWorked(true);
                    setTimeout(() => setJobWorked(false), 2500);
                  }}
                  disabled={jobWorked}
                  className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 font-bold transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {jobWorked ? f.shiftDoneBtn : f.runShiftBtn}
                </motion.button>
              </div>
            </div>
            </motion.div>
          )}

          {/* 5. Market & Inventory Tab */}
          {activeTab === 'market' && (
            <motion.div
              key="market"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10"
            >
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {f.marketHeading}
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {f.marketBody}
              </p>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-neutral-300">
                {f.marketBullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0">
                      <CheckCircleIcon className="w-3 h-3 text-white" />
                    </span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Widget: Market Preview */}
            <div className="lg:col-span-7 bg-[#0c0c0e]/90 rounded-2xl p-5 sm:p-6 border border-neutral-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                <span className="font-mono font-semibold text-white">{f.storeTitle}</span>
                <span className="text-[11px] font-mono text-neutral-400 font-bold">
                  {f.walletPrefix} {walletBalance} {coinsUnit}
                </span>
              </div>

              <AnimatePresence>
                {marketFeedbackText && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 p-2 bg-[#141416] border border-neutral-700 rounded-lg text-[11px] font-mono text-neutral-200"
                  >
                    {marketFeedbackText}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                {f.marketItems.map((item, idx) => {
                  const isBought = purchasedIndices.includes(idx);
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="p-3.5 rounded-xl bg-[#141416] border border-neutral-800 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider font-semibold">
                          {item.tag}
                        </span>
                        <h4 className="text-xs font-bold text-white mt-0.5">{item.name}</h4>
                      </div>
                      <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-white">
                          {item.price} {coinsUnit}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.94 }}
                          onClick={() => handleBuyItem(idx, item.price)}
                          className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded transition-colors cursor-pointer ${
                            isBought
                              ? 'bg-neutral-800 text-neutral-400 border border-neutral-700 font-bold'
                              : 'bg-white hover:bg-neutral-200 text-neutral-950 shadow-xs'
                          }`}
                        >
                          {isBought ? f.ownedLabel : `s!buy ${idx + 1}`}
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom CTA to add bot */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="text-center pt-6"
      >
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          href={BOT_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-medium text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
        >
          <span>{t.hero.addToDiscord}</span>
          <ArrowRightIcon className="w-4 h-4 text-white dark:text-neutral-950" />
        </motion.a>
      </motion.div>
    </div>
  );
};
