import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { BOT_ID, BOT_INVITE_URL, SUPPORT_SERVER_URL } from '../data/commandsData';
import { TabType } from '../types';
import { useLanguage } from '../i18n/translations';
import { portalTranslations } from '../i18n/portal';
import {
  ActivityIcon,
  RefreshIcon,
  CheckCircleIcon,
  CheckIcon,
  AlertTriangleIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
  SearchIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  LockIcon,
  DiscordIcon,
  StarIcon,
} from './ui/Icons';
import { WikiView } from './WikiView';
import { DocsView } from './DocsView';

interface PageNavProps {
  onTabChange: (tab: TabType) => void;
}

/* -------------------------------------------------------------------------- */
/* 1. Market Page (/market) — Clean Empty Storefront Placeholder              */
/* -------------------------------------------------------------------------- */
export const MarketPage: React.FC<PageNavProps> = ({ onTabChange }) => {
  const { language } = useLanguage();
  const pt = portalTranslations[language] || portalTranslations.tr;
  const isTr = language === 'tr';

  return (
    <div className="pt-10 sm:pt-14 pb-24 px-5 sm:px-10 max-w-4xl mx-auto w-full text-neutral-900 dark:text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-xl mx-auto mb-10 space-y-3"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          {pt.marketPage.title}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          {pt.marketPage.subtitle}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.06 }}
        className="rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/85 dark:border-white/[0.1] p-8 sm:p-12 text-center shadow-xs space-y-5 max-w-2xl mx-auto"
      >
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white tracking-tight">
            {pt.marketPage.emptyTitle}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
            {pt.marketPage.emptyDesc}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onTabChange('premium')}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
          >
            <span>{isTr ? 'Premium Planları İncele' : 'Explore Premium'}</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onTabChange('home')}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-[#141416] dark:hover:bg-[#1b1b1e] text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/[0.12] text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>{pt.marketPage.backHome}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. Status Page (/status) — Strict Monochrome Operational Dashboard         */
/* -------------------------------------------------------------------------- */
interface LiveBotStatusResponse {
  ok: boolean;
  checkedAt: string;
  botId: string;
  bot: {
    id: string;
    name: string;
    username: string;
    discriminator: string;
    tag: string;
    description: string;
    avatarUrl: string | null;
    bannerUrl: string | null;
    isVerified: boolean;
    botPublic: boolean;
    requireCodeGrant: boolean;
    publicFlags: number;
    termsOfServiceUrl: string | null;
    privacyPolicyUrl: string | null;
    createdAt: string | null;
  };
  metrics: {
    apiStatus: 'operational' | 'degraded';
    apiLatencyMs: number;
    gatewayStatus: 'operational' | 'degraded';
    gatewayLatencyMs: number;
    gatewayUrl: string;
  };
  discordPlatform: {
    indicator: string;
    description: string;
    components: Array<{ id: string; name: string; status: string }>;
  };
}

export const StatusPage: React.FC = () => {
  const { language } = useLanguage();
  const pt = portalTranslations[language] || portalTranslations.tr;
  const sp = pt.statusPage;
  const isTr = language === 'tr';

  const [data, setData] = useState<LiveBotStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStatus = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/status', { cache: 'no-store' });
      const json = (await res.json()) as LiveBotStatusResponse;
      setData(json);
      if (!res.ok && !json.bot) {
        setError(sp.errorBanner);
      }
    } catch {
      setError(sp.errorBanner);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [sp.errorBanner]);

  useEffect(() => {
    loadStatus(false);
  }, [loadStatus]);

  const formatDate = (iso: string | null | undefined) => {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleDateString(isTr ? 'tr-TR' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  const formatTime = (iso: string | undefined) => {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleTimeString(isTr ? 'tr-TR' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  const activeServicesCount =
    data?.discordPlatform.components.filter((c) => c.status === 'operational').length ?? 0;
  const totalServicesCount = data?.discordPlatform.components.length ?? 0;

  return (
    <div className="pt-10 sm:pt-14 pb-24 px-5 sm:px-10 max-w-4xl mx-auto w-full text-neutral-900 dark:text-neutral-100">
      {/* Header matching Changelog editorial layout */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            {sp.title}
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
            {sp.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {data?.checkedAt && (
            <span className="text-[11px] font-mono tabular-nums text-neutral-500 dark:text-neutral-400">
              {sp.lastChecked} {formatTime(data.checkedAt)}
            </span>
          )}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => loadStatus(true)}
            disabled={refreshing || loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-60 shadow-xs"
          >
            <RefreshIcon className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? sp.refreshing : sp.refresh}</span>
          </motion.button>
        </div>
      </motion.div>

      {error && !data && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-white/[0.12] text-center space-y-3 mb-8">
          <AlertTriangleIcon className="w-6 h-6 text-neutral-900 dark:text-white mx-auto" />
          <p className="text-sm font-medium">{error}</p>
          <button
            onClick={() => loadStatus(true)}
            className="px-4 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold cursor-pointer"
          >
            {sp.retry}
          </button>
        </div>
      )}

      {loading && (
        <div className="space-y-8">
          <div className="h-44 rounded-3xl bg-neutral-100 dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1] animate-pulse" />
          <div className="h-40 rounded-3xl bg-neutral-100 dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1] animate-pulse" />
        </div>
      )}

      {!loading && data && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative space-y-12 sm:space-y-14"
        >
          {/* Vertical Timeline Rail matching Changelog */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-5 top-3 bottom-3 w-px bg-neutral-200 dark:bg-white/[0.1]"
          />

          {/* 1. Bot Identity Section */}
          <div className="relative flex flex-col md:flex-row md:gap-10">
            <div className="md:sticky md:top-24 z-10 flex items-center self-start md:w-44 shrink-0 mb-5 md:mb-0">
              <div className="hidden md:flex w-10 h-10 rounded-full bg-[#fbfbfd] dark:bg-black items-center justify-center border border-neutral-200 dark:border-white/[0.14] mr-4">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-white" />
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-neutral-400 dark:text-neutral-500 font-mono tracking-tight">
                Bot
              </h2>
            </div>

            <div className="flex-1 space-y-6 pb-8 border-b border-neutral-200/70 dark:border-white/[0.08] border-l md:border-l-0 border-neutral-200 dark:border-white/[0.1] pl-5 md:pl-0">
              <div className="rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/90 dark:border-white/[0.1] overflow-hidden shadow-xs">
                {data.bot.bannerUrl && (
                  <div className="h-24 sm:h-32 w-full bg-[#111113] overflow-hidden relative">
                    <img
                      src={data.bot.bannerUrl}
                      alt={data.bot.name}
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                  </div>
                )}

                <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/15 bg-black shrink-0 shadow-md">
                      <img
                        src={data.bot.avatarUrl || '/assets/aistudio/image_12f5f257.png'}
                        alt={data.bot.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 dark:text-white">
                          {data.bot.name}
                        </h3>
                        <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                          {data.bot.tag}
                        </span>
                        {data.bot.isVerified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-[10px] font-bold">
                            <CheckIcon className="w-3 h-3" />
                            <span>{sp.verifiedBadge}</span>
                          </span>
                        )}
                      </div>

                      {data.bot.description && (
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-line leading-relaxed max-w-xl">
                          {data.bot.description}
                        </p>
                      )}

                      {data.bot.createdAt && (
                        <div className="pt-0.5 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                          {sp.createdAt}:{' '}
                          <strong className="text-neutral-900 dark:text-white">
                            {formatDate(data.bot.createdAt)}
                          </strong>
                        </div>
                      )}
                    </div>
                  </div>

                  <a
                    href={BOT_INVITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-semibold transition-colors shrink-0 shadow-xs"
                  >
                    <span>{sp.inviteBot}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2. API & Gateway Latency Section */}
          <div className="relative flex flex-col md:flex-row md:gap-10">
            <div className="md:sticky md:top-24 z-10 flex items-center self-start md:w-44 shrink-0 mb-5 md:mb-0">
              <div className="hidden md:flex w-10 h-10 rounded-full bg-[#fbfbfd] dark:bg-black items-center justify-center border border-neutral-200 dark:border-white/[0.14] mr-4">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-white" />
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-neutral-400 dark:text-neutral-500 font-mono tracking-tight">
                {isTr ? 'Gecikme' : 'Latency'}
              </h2>
            </div>

            <div className="flex-1 space-y-4 pb-8 border-b border-neutral-200/70 dark:border-white/[0.08] border-l md:border-l-0 border-neutral-200 dark:border-white/[0.1] pl-5 md:pl-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1] p-5 space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      {sp.apiHealth}
                    </span>
                    {data.metrics.apiStatus === 'operational' ? (
                      <CheckIcon className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                    ) : (
                      <AlertTriangleIcon className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                    )}
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold tabular-nums text-neutral-950 dark:text-white tracking-tight">
                    {data.metrics.apiLatencyMs}{' '}
                    <span className="text-sm font-semibold text-neutral-500">{sp.latencyUnit}</span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 pt-1.5 border-t border-neutral-100 dark:border-white/[0.06]">
                    {data.metrics.apiStatus === 'operational' ? sp.operational : sp.degraded}
                  </div>
                </div>

                <div className="rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1] p-5 space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      {sp.gatewayHealth}
                    </span>
                    {data.metrics.gatewayStatus === 'operational' ? (
                      <CheckIcon className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                    ) : (
                      <AlertTriangleIcon className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                    )}
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold tabular-nums text-neutral-950 dark:text-white tracking-tight">
                    {data.metrics.gatewayLatencyMs}{' '}
                    <span className="text-sm font-semibold text-neutral-500">{sp.latencyUnit}</span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 pt-1.5 border-t border-neutral-100 dark:border-white/[0.06] truncate">
                    {data.metrics.gatewayUrl}
                  </div>
                </div>

                <div className="rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1] p-5 space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      {sp.infraHealthLabel}
                    </span>
                    <ActivityIcon className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold tabular-nums text-neutral-950 dark:text-white tracking-tight">
                    {totalServicesCount > 0 ? (
                      <>
                        {activeServicesCount}/{totalServicesCount}
                      </>
                    ) : (
                      sp.operational
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 pt-1.5 border-t border-neutral-100 dark:border-white/[0.06] truncate">
                    {data.discordPlatform.description}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Discord Components Section */}
          {data.discordPlatform.components.length > 0 && (
            <div className="relative flex flex-col md:flex-row md:gap-10">
              <div className="md:sticky md:top-24 z-10 flex items-center self-start md:w-44 shrink-0 mb-5 md:mb-0">
                <div className="hidden md:flex w-10 h-10 rounded-full bg-[#fbfbfd] dark:bg-black items-center justify-center border border-neutral-200 dark:border-white/[0.14] mr-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-white" />
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-neutral-400 dark:text-neutral-500 font-mono tracking-tight">
                  {isTr ? 'Servisler' : 'Services'}
                </h2>
              </div>

              <div className="flex-1 space-y-4 border-l md:border-l-0 border-neutral-200 dark:border-white/[0.1] pl-5 md:pl-0">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
                    {sp.discordPlatform}
                  </h3>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    discordstatus.com
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.discordPlatform.components.map((comp) => {
                    const isOk = comp.status === 'operational';
                    return (
                      <div
                        key={comp.id}
                        className="p-3.5 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1] flex items-center justify-between gap-2 shadow-xs"
                      >
                        <span className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                          {comp.name}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-neutral-700 dark:text-neutral-300 shrink-0">
                          {isOk ? (
                            <CheckCircleIcon className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                          ) : (
                            <AlertTriangleIcon className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                          )}
                          <span>{isOk ? sp.operational : comp.status}</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. Premium Page (/premium) — S1–S4 · Sunucuya Ekleme · %50 Yıllık           */
/* -------------------------------------------------------------------------- */
type BillingPeriod = 'monthly' | 'yearly' | 'lifetime';

interface PremiumTier {
  id: string;
  sku: string;
  level: string;
  title: string;
  subtitle: string;
  popular?: boolean;
  serverAdditions: number;
  monthlyPrice: number;
  cooldownDiscount: string;
  multiplier: string;
  supportLevel: string;
  perks: string[];
}

export const PremiumPage: React.FC<PageNavProps> = () => {
  const { language } = useLanguage();
  const isTr = language === 'tr';
  const navigate = useNavigate();

  const [period, setPeriod] = useState<BillingPeriod>('monthly');
  const [showPromo, setShowPromo] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);

  const periods: Array<{ id: BillingPeriod; label: string; topBadge?: string }> = useMemo(
    () => [
      { id: 'monthly', label: isTr ? 'Aylık' : 'Monthly' },
      { id: 'yearly', label: isTr ? 'Yıllık' : 'Yearly', topBadge: isTr ? '%50 daha ucuz' : '50% off' },
      { id: 'lifetime', label: isTr ? 'Sınırsız' : 'Lifetime' },
    ],
    [isTr]
  );

  const tiers: PremiumTier[] = useMemo(
    () => [
      {
        id: 's1',
        sku: 'synaps-s1',
        level: 'S1',
        title: 'Synaps S1',
        subtitle: isTr ? 'Küçük ve aktif sunucular için temel güç' : 'Core perks for growing communities',
        serverAdditions: 1,
        monthlyPrice: 120,
        cooldownDiscount: '%15',
        multiplier: '1.25x',
        supportLevel: isTr ? 'Standart' : 'Standard',
        perks: isTr
          ? ['1 sunucuya ekleme hakkı', '%15 komut bekleme indirimi', '1.25x ekonomi ve XP çarpanı', 'Oy kilidi olmadan kullanım']
          : ['1 server addition slot', '15% cooldown reduction', '1.25x economy & XP multiplier', 'No vote lock'],
      },
      {
        id: 's2',
        sku: 'synaps-s2',
        level: 'S2',
        title: 'Synaps S2',
        subtitle: isTr ? 'Birden fazla topluluk için dengeli paket' : 'Balanced tier for active servers',
        serverAdditions: 2,
        monthlyPrice: 220,
        cooldownDiscount: '%30',
        multiplier: '1.50x',
        supportLevel: isTr ? 'Hızlı Yanıt' : 'Fast Track',
        perks: isTr
          ? ['2 sunucuya ekleme hakkı', '%30 komut bekleme indirimi', '1.50x ekonomi ve XP çarpanı', 'Gelişmiş bilet log arşivi']
          : ['2 server addition slots', '30% cooldown reduction', '1.50x economy & XP multiplier', 'Extended ticket archives'],
      },
      {
        id: 's3',
        sku: 'synaps-s3',
        level: 'S3',
        title: 'Synaps S3',
        subtitle: isTr ? 'Büyük sunucular ve hızlı ekonomi döngüsü' : 'High-capacity tier for large guilds',
        serverAdditions: 3,
        monthlyPrice: 360,
        cooldownDiscount: '%45',
        multiplier: '2.00x',
        supportLevel: isTr ? 'Öncelikli' : 'Priority',
        perks: isTr
          ? ['3 sunucuya ekleme hakkı', '%45 komut bekleme indirimi', '2.00x ekonomi ve XP çarpanı', 'Öncelikli anti-raid koruma']
          : ['3 server addition slots', '45% cooldown reduction', '2.00x economy & XP multiplier', 'Priority anti-raid shield'],
      },
      {
        id: 's4',
        sku: 'synaps-s4',
        level: 'S4',
        title: 'Synaps S4',
        subtitle: isTr ? 'Maksimum limitler ve tam VIP önceliği' : 'Maximum capacity and priority perks',
        popular: true,
        serverAdditions: 5,
        monthlyPrice: 540,
        cooldownDiscount: '%60',
        multiplier: '3.00x',
        supportLevel: isTr ? 'VIP Doğrudan' : 'VIP Direct',
        perks: isTr
          ? ['5 sunucuya ekleme hakkı', '%60 komut bekleme indirimi', '3.00x ekonomi ve XP çarpanı', 'Doğrudan geliştirici destek önceliği']
          : ['5 server addition slots', '60% cooldown reduction', '3.00x economy & XP multiplier', 'Direct priority support'],
      },
    ],
    [isTr]
  );

  const sharedHighlights = useMemo(
    () =>
      isTr
        ? [
            {
              title: 'Anında Senkronizasyon',
              desc: 'Ödeme sonrası Discord hesabınla tüm ayrıcalıklar ve sunucu eklemeleri otomatik aktifleşir.',
            },
            {
              title: 'Fark Ödeyerek Yükseltme',
              desc: 'İstediğin zaman S1’den S2 veya S3/S4 planlarına geçerken yalnızca kalan farkı ödersin.',
            },
            {
              title: 'Esnek Sunucu Taşıma',
              desc: 'Sunucuya ekleme hakkını dilediğin an başka bir Discord sunucusuna devredebilirsin.',
            },
          ]
        : [
            {
              title: 'Instant Sync',
              desc: 'Account perks and guild additions activate automatically after Discord verification.',
            },
            {
              title: 'Pay-The-Difference Upgrades',
              desc: 'Upgrade smoothly from S1 to S2, S3, or S4 by paying only the prorated difference.',
            },
            {
              title: 'Flexible Server Transfer',
              desc: 'Move your server addition slots to another guild whenever your community evolves.',
            },
          ],
    [isTr]
  );

  const computeDisplayPrice = (baseMonthly: number) => {
    let price = baseMonthly;
    if (period === 'yearly') {
      price = Math.round(baseMonthly * 0.5);
    } else if (period === 'lifetime') {
      price = baseMonthly * 18;
    }
    if (appliedPromo) {
      price = Math.round(price * 0.9);
    }
    return price;
  };

  const getPriceUnitLabel = () => {
    if (period === 'lifetime') return isTr ? 'sınırsız tek seferlik ödeme' : 'one-time lifetime access';
    if (period === 'yearly') return isTr ? '/ ay (yıllık faturalanır)' : '/ mo (billed yearly)';
    return isTr ? '/ ay' : '/ mo';
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = promoInput.trim().toUpperCase();
    if (!cleaned) {
      setAppliedPromo(null);
      setPromoFeedback(null);
      return;
    }
    setAppliedPromo(cleaned);
    setPromoFeedback(
      isTr ? `${cleaned} uygulandı (%10 indirim)` : `${cleaned} applied (10% discount)`
    );
  };

  const handleGoToCart = (tier: PremiumTier) => {
    const checkoutTarget = `/checkout?kind=shop&id=${tier.sku}&sku=${tier.sku}&period=${period}`;
    navigate(`/login?backURL=${encodeURIComponent(checkoutTarget)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-10 sm:pt-14 pb-24 px-5 sm:px-10 max-w-6xl mx-auto w-full text-neutral-900 dark:text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight inline-flex items-center justify-center gap-3">
          <StarIcon className="w-7 h-7 sm:w-9 sm:h-9 text-neutral-950 dark:text-white shrink-0" />
          <span>Synaps Premium</span>
        </h1>
        <p className="mt-3 text-xs sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {isTr
            ? 'Tek hesap ayrıcalıkları sunucularla birlikte gelir; her plan sunucularına ekleyebileceğin sunucuya ekleme hakkı içerir. Yükseltmelerde sadece aradaki fark ödenir.'
            : 'Single account perks come bundled with server additions you can assign to any guild. Upgrades only charge the difference.'}
        </p>
      </motion.div>

      {/* Billing Period Switcher (With Floating %50 daha ucuz Label Above Yıllık) */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <div
          role="tablist"
          aria-label={isTr ? 'Faturalama dönemi' : 'Billing period'}
          className="inline-flex items-center gap-1.5 p-1.5 pt-2 rounded-2xl bg-neutral-100 dark:bg-[#0d0d0f] border border-neutral-200/90 dark:border-white/[0.1] shadow-xs mt-4"
        >
          {periods.map((item) => {
            const active = period === item.id;
            return (
              <div key={item.id} className="relative">
                {item.topBadge && (
                  <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-xs z-20">
                    {item.topBadge}
                  </span>
                )}
                <button
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setPeriod(item.id)}
                  className={`relative z-10 min-w-[5.5rem] sm:min-w-[7rem] px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'text-neutral-950 dark:text-white'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="premium-billing-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-white/[0.14] shadow-xs -z-10"
                    />
                  )}
                  <span>{item.label}</span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-2">
          {!showPromo ? (
            <button
              type="button"
              onClick={() => setShowPromo(true)}
              className="text-xs font-medium text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
            >
              {isTr ? 'Promosyon kodu ekle' : 'Add promo code'}
            </button>
          ) : (
            <form onSubmit={handleApplyPromo} className="flex items-center gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder={isTr ? 'Promosyon kodu' : 'Promo code'}
                className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0d0d0f] border border-neutral-200 dark:border-white/[0.12] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/15"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-semibold cursor-pointer transition-colors"
              >
                {isTr ? 'Uygula' : 'Apply'}
              </button>
            </form>
          )}
          {promoFeedback && (
            <span className="text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
              {promoFeedback}
            </span>
          )}
        </div>
      </div>

      {/* 4-Tier Plan Cards (S1 - S4) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {tiers.map((tier, idx) => {
          const finalPrice = computeDisplayPrice(tier.monthlyPrice);
          const yearlyStrikePrice =
            period === 'yearly' && !appliedPromo ? tier.monthlyPrice : null;

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all ${
                tier.popular
                  ? 'bg-gradient-to-b from-[#18181b] to-[#0a0a0c] text-white dark:bg-gradient-to-b dark:from-white dark:to-neutral-100 dark:text-neutral-950 border border-neutral-800 dark:border-white shadow-xl'
                  : 'bg-white dark:bg-[#0c0c0e] border border-neutral-200/90 dark:border-white/[0.1] shadow-xs hover:border-neutral-400 dark:hover:border-white/25'
              }`}
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold ${
                          tier.popular
                            ? 'text-neutral-300 dark:text-neutral-600'
                            : 'text-neutral-500 dark:text-neutral-400'
                        }`}
                      >
                        {tier.level}
                      </span>
                      {tier.popular && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/15 text-white dark:bg-neutral-900/10 dark:text-neutral-950">
                          {isTr ? 'En popüler' : 'Most popular'}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-extrabold mt-1">{tier.title}</h2>
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        tier.popular
                          ? 'text-neutral-300 dark:text-neutral-600'
                          : 'text-neutral-500 dark:text-neutral-400'
                      }`}
                    >
                      {tier.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-current/10">
                  <div className="flex items-baseline gap-2">
                    {yearlyStrikePrice && (
                      <span
                        className={`text-sm font-mono line-through ${
                          tier.popular
                            ? 'text-neutral-400 dark:text-neutral-500'
                            : 'text-neutral-400'
                        }`}
                      >
                        {yearlyStrikePrice} TL
                      </span>
                    )}
                    <span className="text-3xl font-extrabold font-mono tabular-nums tracking-tight">
                      {finalPrice.toLocaleString(isTr ? 'tr-TR' : 'en-US')} TL
                    </span>
                  </div>
                  <div
                    className={`text-[11px] mt-1 font-mono ${
                      tier.popular
                        ? 'text-neutral-300 dark:text-neutral-600'
                        : 'text-neutral-500 dark:text-neutral-400'
                    }`}
                  >
                    {getPriceUnitLabel()} · {tier.serverAdditions}{' '}
                    {isTr ? 'sunucuya ekleme' : 'server additions'}
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-current/10 text-xs">
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        tier.popular
                          ? 'text-neutral-300 dark:text-neutral-600'
                          : 'text-neutral-500 dark:text-neutral-400'
                      }
                    >
                      {isTr ? 'Cooldown indirimi' : 'Cooldown cut'}
                    </span>
                    <span className="font-mono font-bold">{tier.cooldownDiscount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        tier.popular
                          ? 'text-neutral-300 dark:text-neutral-600'
                          : 'text-neutral-500 dark:text-neutral-400'
                      }
                    >
                      {isTr ? 'Çarpan' : 'Multiplier'}
                    </span>
                    <span className="font-mono font-bold">{tier.multiplier}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        tier.popular
                          ? 'text-neutral-300 dark:text-neutral-600'
                          : 'text-neutral-500 dark:text-neutral-400'
                      }
                    >
                      {isTr ? 'Oy kilidi' : 'Vote lock'}
                    </span>
                    <span className="font-mono font-bold">{isTr ? 'Yok' : 'None'}</span>
                  </div>
                </div>

                <ul className="space-y-2 pt-2 border-t border-current/10 text-xs">
                  {tier.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <CheckIcon className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-80" />
                      <span
                        className={
                          tier.popular
                            ? 'text-neutral-200 dark:text-neutral-800'
                            : 'text-neutral-700 dark:text-neutral-300'
                        }
                      >
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => handleGoToCart(tier)}
                className={`mt-7 w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-colors cursor-pointer inline-flex items-center justify-center gap-2 ${
                  tier.popular
                    ? 'bg-white text-neutral-950 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200'
                }`}
              >
                <span>{isTr ? 'Sepete git' : 'Go to cart'}</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Included Across All Plans Strip */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {sharedHighlights.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1] p-5 space-y-1.5 shadow-xs"
          >
            <h3 className="text-sm font-bold text-neutral-950 dark:text-white">{item.title}</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Plan Comparison Matrix Table */}
      <div className="mt-8 rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1] p-6 sm:p-8 shadow-xs overflow-x-auto">
        <h2 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white mb-4">
          {isTr ? 'Seviye Karşılaştırması' : 'Tier Comparison'}
        </h2>
        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[540px]">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-white/[0.1] text-neutral-500 dark:text-neutral-400">
              <th className="py-2.5 pr-4 font-semibold">{isTr ? 'Özellik' : 'Feature'}</th>
              {tiers.map((t) => (
                <th key={t.id} className="py-2.5 px-3 font-mono font-bold text-neutral-950 dark:text-white">
                  {t.level}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-white/[0.06] text-neutral-700 dark:text-neutral-300">
            <tr>
              <td className="py-3 pr-4 font-medium">{isTr ? 'Sunucuya Ekleme' : 'Server Additions'}</td>
              {tiers.map((t) => (
                <td key={t.id} className="py-3 px-3 font-mono font-bold">
                  {t.serverAdditions} {isTr ? 'sunucu' : 'servers'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 pr-4 font-medium">{isTr ? 'Cooldown İndirimi' : 'Cooldown Reduction'}</td>
              {tiers.map((t) => (
                <td key={t.id} className="py-3 px-3 font-mono">{t.cooldownDiscount}</td>
              ))}
            </tr>
            <tr>
              <td className="py-3 pr-4 font-medium">{isTr ? 'Ekonomi & XP Çarpanı' : 'Economy & XP Multiplier'}</td>
              {tiers.map((t) => (
                <td key={t.id} className="py-3 px-3 font-mono">{t.multiplier}</td>
              ))}
            </tr>
            <tr>
              <td className="py-3 pr-4 font-medium">{isTr ? 'Oy Kilidi' : 'Vote Lock'}</td>
              {tiers.map((t) => (
                <td key={t.id} className="py-3 px-3 font-mono">{isTr ? 'Yok' : 'None'}</td>
              ))}
            </tr>
            <tr>
              <td className="py-3 pr-4 font-medium">{isTr ? 'Destek Önceliği' : 'Support Priority'}</td>
              {tiers.map((t) => (
                <td key={t.id} className="py-3 px-3">{t.supportLevel}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Utility Strip */}
      <div className="mt-6 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600 dark:text-neutral-400">
        <span>
          {isTr
            ? 'Sunucuya ekleme ataması ve özel bot talepleri Discord destek sunucumuz üzerinden yönetilir.'
            : 'Server addition assignments and custom bot setups are managed through our Discord support server.'}
        </span>
        <a
          href={SUPPORT_SERVER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-neutral-950 dark:text-white hover:underline underline-offset-4 shrink-0"
        >
          <span>{isTr ? 'Destek Sunucusu' : 'Support Server'}</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3b. Login / Continue With Discord Page (/login?backURL=...)                */
/*     Strictly NO Fluxer — Clean Complete DiscordIcon                        */
/* -------------------------------------------------------------------------- */
export const LoginPage: React.FC<PageNavProps> = ({ onTabChange }) => {
  const { language } = useLanguage();
  const isTr = language === 'tr';
  const location = useLocation();
  const [joinSupport, setJoinSupport] = useState(true);

  const selectedPlanInfo = useMemo(() => {
    try {
      const params = new URLSearchParams(location.search);
      const backURL = params.get('backURL');
      if (!backURL) return null;
      const decoded = decodeURIComponent(backURL);
      const queryPart = decoded.split('?')[1] || '';
      const inner = new URLSearchParams(queryPart);
      const sku = inner.get('sku');
      const period = inner.get('period');
      if (!sku) return null;
      const periodMap: Record<string, string> = {
        monthly: isTr ? 'Aylık' : 'Monthly',
        yearly: isTr ? 'Yıllık' : 'Yearly',
        lifetime: isTr ? 'Sınırsız' : 'Lifetime',
      };
      return {
        sku: sku.toUpperCase(),
        periodLabel: (period && periodMap[period]) || period || '',
      };
    } catch {
      return null;
    }
  }, [location.search, isTr]);

  const targetDiscordHref = joinSupport ? SUPPORT_SERVER_URL : BOT_INVITE_URL;

  return (
    <div className="pt-12 sm:pt-16 pb-24 px-6 flex-1 flex items-center justify-center w-full text-neutral-900 dark:text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/90 dark:border-white/[0.12] p-7 sm:p-9 shadow-xl space-y-6"
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative flex items-center justify-center">
            <div className="relative z-10 w-12 h-12 rounded-xl overflow-hidden bg-black border border-neutral-200 dark:border-white/15 shadow-sm">
              <img
                src="/assets/aistudio/image_12f5f257.png"
                alt="Synaps"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              {isTr ? 'Discord ile devam et' : 'Continue with Discord'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
              {isTr
                ? 'Seçtiğiniz paket ve sunucu doğrulaması için Discord üzerinden devam edin.'
                : 'Continue via Discord to verify your account and proceed with your selection.'}
            </p>
          </div>
        </div>

        {selectedPlanInfo && (
          <div className="rounded-2xl bg-neutral-50 dark:bg-[#141416] border border-neutral-200/80 dark:border-white/[0.08] p-4 flex items-center justify-between text-xs">
            <span className="text-neutral-500 dark:text-neutral-400">
              {isTr ? 'Seçilen Paket' : 'Selected Plan'}
            </span>
            <span className="font-mono font-bold text-neutral-950 dark:text-white">
              {selectedPlanInfo.sku}
              {selectedPlanInfo.periodLabel ? ` · ${selectedPlanInfo.periodLabel}` : ''}
            </span>
          </div>
        )}

        <div className="space-y-4">
          <a
            href={targetDiscordHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-sm font-bold transition-colors shadow-sm inline-flex items-center justify-center gap-3"
          >
            <DiscordIcon className="w-[18px] h-[18px] shrink-0" />
            <span>{isTr ? 'Discord ile devam et' : 'Continue with Discord'}</span>
          </a>

          <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#141416] border border-neutral-200/80 dark:border-white/[0.08] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={joinSupport}
              onChange={(e) => setJoinSupport(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-neutral-900 dark:accent-white rounded cursor-pointer shrink-0"
            />
            <span className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
              <strong className="text-neutral-950 dark:text-white block">
                {isTr ? 'Destek sunucusuna katıl' : 'Join support server'}
              </strong>
              {isTr
                ? 'Discord devamında işaretlersen destek sunucusuna yönlendirilirsin.'
                : 'When checked, continues directly into the official Discord support server.'}
            </span>
          </label>
        </div>

        <div className="pt-4 border-t border-neutral-100 dark:border-white/[0.08] flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
            <LockIcon className="w-3.5 h-3.5 shrink-0" />
            <span>
              {isTr
                ? 'Discord ile güvenli devam. Oturum sadece bu panelde kullanılır.'
                : 'Secure Discord continuation. Session stays scoped to this panel.'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onTabChange('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white cursor-pointer transition-colors"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            <span>{isTr ? 'Ana sayfaya dön' : 'Back to home'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. Ads Page (/ads & /reklamlar) — Structured Reklam Paketleri              */
/* -------------------------------------------------------------------------- */
export const AdsPage: React.FC = () => {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const primaryPackages = useMemo(
    () => [
      {
        title: isTr
          ? '1.000 Üye Garantili Katılım Şartlı Komut Reklamı'
          : '1,000-Member Guaranteed Command Join Ad',
        oldPrice: '4.000 TL',
        price: '3.500 TL',
        tag: isTr ? 'Üye Garantili' : 'Guaranteed',
        desc: isTr
          ? 'Reklama özel oluşturduğunuz davet linki 1.000 giriş sayısına ulaşana kadar reklam süresiz olarak devam eder; satın aldığınız üye miktarına mutlaka ulaşırsınız. Sadece aktif Synaps komut kullanıcılarına ulaşır.'
          : 'Runs indefinitely until your invite reaches 1,000 joins. Targets active Synaps command users only.',
      },
      {
        title: isTr
          ? '1.000 Üye Garantili DM Reklamı'
          : '1,000-Member Guaranteed DM Ad',
        oldPrice: '3.700 TL',
        price: '3.000 TL',
        tag: isTr ? 'Ses Aktif' : 'Voice Active',
        desc: isTr
          ? 'Özel davet linkiniz 1.000 giriş sayısına ulaşana kadar süresiz devam eder. Sadece ses kanallarına giriş-çıkış yapan aktif üyelere ulaşır; böylece sesli kanalları kullanan üyeler sunucunuza gelir.'
          : 'Runs until 1,000 joins via your invite link. Delivered exclusively to active voice-channel members.',
      },
      {
        title: isTr
          ? '24 Saatlik Ses Kanalı Aktif DM Reklamı'
          : '24-Hour Voice Active DM Broadcast',
        oldPrice: '1.750 TL',
        price: '1.000 TL',
        tag: isTr ? '24 Saat · 100.000+ Erişim' : '24h · 100k+ Reach',
        desc: isTr
          ? '24 saat boyunca ses kanallarına çıkıp giren günlük 100.000+ aktif üyeye DM gönderimi (DM kapalı/bot engelleyen kullanıcılar hariç). Üye kazancı sunucu konseptine ve reklam metnine göre değişir; üye garantisi verilmez.'
          : '24-hour campaign reaching ~100,000 daily voice-active users (excluding closed DMs).',
      },
      {
        title: isTr ? 'Bot Durum Reklamı' : 'Bot Status Advertisement',
        oldPrice: '2.000 TL',
        price: '1.500 TL',
        tag: isTr ? 'Yüksek Görünürlük' : 'High Visibility',
        desc: isTr
          ? 'Synaps botunun Discord durum alanında sunucu reklamınızın görünmesiyle aktif sunuculardaki yüz binlerce üyeye doğrudan görünürlük sağlanır.'
          : 'Displays your community promotion directly inside Synaps bot Discord status across active guilds.',
      },
    ],
    [isTr]
  );

  const categoryPackages = useMemo(
    () => [
      {
        title: isTr ? '1 Everyoneli 1 Aylık Özel Kanal' : '1x Everyone · 1-Month Private Channel',
        price: '550 TL',
        desc: isTr
          ? 'Özel reklam metin kanalı üzerinden 1 aylık barındırma ve 1 adet @everyone duyuru hakkı.'
          : 'Dedicated text channel hosting for 1 month with 1 @everyone announcement.',
      },
      {
        title: isTr
          ? '1 Everyoneli Çekilişli 1 Aylık Özel Kanal'
          : '1x Everyone Giveaway · 1-Month Channel',
        price: '650 TL',
        desc: isTr
          ? '1 aylık özel kanal ve 1 adet @everyone duyurusu. Çekilişi sunucunuzda siz başlatırsınız; kazanan kişiye ödül tarafımızca teslim edilir.'
          : '1-month dedicated channel + 1 @everyone announcement. You host the giveaway and we deliver the prize.',
      },
      {
        title: isTr
          ? '1 Everyoneli 1 Aylık Özel Reklam Kanalı (Sunucu Kategorisi İçerisinde)'
          : '1x Everyone · 1-Month Category Ad Channel',
        price: '800 TL',
        desc: isTr
          ? 'Doğrudan ana sunucu kategorisi içerisinde yer alan yüksek öncelikli 1 aylık özel reklam kanalı.'
          : 'High-visibility 1-month ad channel placed directly inside the main server category.',
      },
    ],
    [isTr]
  );

  return (
    <div className="pt-10 sm:pt-14 pb-24 px-5 sm:px-10 max-w-5xl mx-auto w-full text-neutral-900 dark:text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          {isTr ? 'Reklam Paketleri' : 'Advertising Packages'}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          {isTr
            ? 'Aktif Discord topluluğunuza gerçek ve ses/komut etkileşimi yüksek üyeler kazandıran reklam çözümleri.'
            : 'Reach genuine voice and command-active Discord members with transparent advertising tiers.'}
        </p>
      </motion.div>

      <div className="space-y-10">
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
            {isTr ? 'Üye Garantili & DM Reklamları' : 'Guaranteed Member & DM Campaigns'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {primaryPackages.map((pkg, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/90 dark:border-white/[0.1] p-6 shadow-xs flex flex-col justify-between gap-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                    <span>{pkg.tag}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {pkg.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-white/[0.08] flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2.5 font-mono">
                    <span className="text-xs text-neutral-400 line-through">{pkg.oldPrice}</span>
                    <span className="text-2xl font-extrabold text-neutral-950 dark:text-white tabular-nums">
                      {pkg.price}
                    </span>
                  </div>
                  <a
                    href={SUPPORT_SERVER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white hover:underline underline-offset-4"
                  >
                    <span>{isTr ? 'DM / Destek' : 'Contact'}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
            {isTr ? 'Özel Reklam Kategorisi' : 'Dedicated Ad Category'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categoryPackages.map((pkg, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/90 dark:border-white/[0.1] p-6 shadow-xs flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {pkg.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-white/[0.08] flex items-baseline justify-between">
                  <span className="text-xl font-extrabold font-mono text-neutral-950 dark:text-white tabular-nums">
                    {pkg.price}
                  </span>
                  <a
                    href={SUPPORT_SERVER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 dark:text-white hover:underline underline-offset-4"
                  >
                    <span>{isTr ? 'İletişim' : 'Inquire'}</span>
                    <ArrowRightIcon className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#161618] via-[#101012] to-[#0a0a0b] text-white border border-neutral-800 dark:border-white/[0.12] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="text-sm sm:text-base font-bold">
                {isTr ? '1 Aylık Üyelik Hediyesi & Satın Alma' : '1-Month Membership Gift & Booking'}
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                {isTr
                  ? 'Reklam alan sunucularda üyelik bulunmuyorsa reklam yaptırdıkları sunucuya 1 Aylık üyelik hediye edilir. Reklam satın almak için Discord destek sunucumuz üzerinden veya DM ile ulaşabilirsiniz.'
                  : 'Servers booking a campaign receive a complimentary 1-month membership gift if not already active. Reach out on our Discord server to reserve your campaign.'}
              </p>
            </div>
            <a
              href={SUPPORT_SERVER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-bold transition-colors shrink-0"
            >
              <span>{isTr ? 'Discord’dan Ulaş' : 'Reach on Discord'}</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. FAQ Page (/faq) — Collapsed on Load, Clean Unboxed Answers              */
/* -------------------------------------------------------------------------- */
export const FaqPage: React.FC = () => {
  const { language, t } = useLanguage();
  const pt = portalTranslations[language] || portalTranslations.tr;
  const [query, setQuery] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const allFaqs = t.hero.faqs || [];

  const items = allFaqs.filter((item) => {
    const q = query.trim().toLowerCase();
    return (
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      (item.commandTip && item.commandTip.toLowerCase().includes(q))
    );
  });

  return (
    <div className="pt-10 sm:pt-14 pb-24 px-6 sm:px-12 max-w-4xl mx-auto w-full text-neutral-900 dark:text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center max-w-2xl mx-auto mb-8"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          {pt.subPages.faqTitle}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          {pt.subPages.faqSubtitle}
        </p>
      </motion.div>

      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="relative w-full max-w-md">
          <SearchIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIdx(null);
            }}
            placeholder={pt.subPages.faqSearchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-white/[0.1] text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/15"
          />
        </div>
      </div>

      <div className="space-y-3.5">
        {items.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/90 dark:border-white/[0.1] overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <h3 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white">
                  {faq.question}
                </h3>
                <ChevronDownIcon
                  className={`w-4 h-4 text-neutral-500 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-neutral-100 dark:border-white/[0.08] text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 space-y-2.5">
                      <p className="leading-relaxed">{faq.answer}</p>
                      {faq.commandTip && (
                        <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                          {faq.commandTip}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 6. Changelog Page (/changelog) — Magoa Sticky-Year Vertical Timeline       */
/* -------------------------------------------------------------------------- */
export const ChangelogPage: React.FC = () => {
  const { language } = useLanguage();
  const pt = portalTranslations[language] || portalTranslations.tr;
  const isTr = language === 'tr';

  const yearGroups = useMemo(
    () => [
      {
        year: '2026',
        entries: [
          {
            date: '2026-11-13',
            title: isTr ? 'Synaps Premium S1–S4, Partnerlik & Portal Yenilemesi' : 'Synaps Premium S1–S4, Partnership & Portal Upgrade',
            summary: isTr
              ? 'Sunucuya ekleme sistemiyle çalışan S1–S4 paketleri, yıllık %50 faturalandırma, Partnerlik programı ve saf siyah katmanlı portal arayüzü yayında.'
              : 'Server-addition S1–S4 packages with 50% annual billing, Partnership tiers, and the pure black monochrome web portal.',
            items: isTr
              ? [
                  'Aylık, Yıllık (%50 indirim) ve Sınırsız plan katmanları',
                  'Reklam paketleri, Partnerlik programı ve Discord devam akışı',
                  'Yenilenen Komutlar, Dokümantasyon ve zaman çizelgesi görünümü',
                ]
              : [
                  'Monthly, Yearly (50% off), and Lifetime package tiers',
                  'Advertising packages, Partnership program, and Discord login flow',
                  'Upgraded Commands, Documentation, and timeline showcase',
                ],
          },
          {
            date: '2026-10-20',
            title: isTr ? 'Canlı Durum İzleme & Components V2 Bildirim Akışı' : 'Live Status Tracking & Components V2 Pipeline',
            summary: isTr
              ? 'Gerçek zamanlı Discord API, Gateway gecikme ölçümü ve öneri/hata bildirimleri için Discord Components V2 webhook altyapısı eklendi.'
              : 'Real-time Discord Application API, Gateway latency monitoring, and Discord Components V2 webhook routing.',
            items: isTr
              ? [
                  'Token gerektirmeyen canlı API & Gateway gecikme takibi',
                  'Öneri ve hata bildirimleri için Discord Components V2 entegrasyonu',
                  'Üst menü Market ve Diğer açılır menü mimarisi',
                ]
              : [
                  'Tokenless live API & Gateway latency monitoring',
                  'Discord Components V2 integration for suggestions & bug reports',
                  'Unified Market & More dropdown navigation system',
                ],
          },
          {
            date: '2026-09-10',
            title: isTr ? 'Kasa Korumalı Ekonomi, Meslek XP & Bilet Motoru' : 'Vault Economy, Career XP & Ticket Engine',
            summary: isTr
              ? 'Soyguna karşı korumalı banka kasası, 4 kademeli kariyer gelişimi ve kapanış HTML/JSON destek bilet dökümleri devreye alındı.'
              : 'Rob-proof bank vaults, 4-tier career progression, and automated HTML/JSON ticket transcript exports.',
            items: isTr
              ? [
                  'Bileşik faizli kasa mevduatları ve günlük seri çarpanları (s!deposit)',
                  'Otomatik HTML & JSON destek bileti transkript arşivi',
                  'Anti-raid ve kimlik avı link engelleme optimizasyonu',
                ]
              : [
                  'Compounding bank vault deposits and daily streak multipliers (s!deposit)',
                  'Automated HTML & JSON support ticket archives',
                  'Sub-second anti-raid and phishing neutralization',
                ],
          },
          {
            date: '2026-06-15',
            title: isTr ? 'Otomatik Olay & Anti-Raid Koruma Kalkanı' : 'Automated Incident & Anti-Raid Shield',
            summary: isTr
              ? 'Zararlı kimlik avı bağlantılarını, toplu etiket spamlarını ve ani giriş dalgalarını milisaniyeler içinde durduran koruma motoru yayınlandı.'
              : 'Sub-second phishing neutralization, mention flood limits, and burst raid lock engine released.',
            items: isTr
              ? [
                  'Saliselik baskın dalgası izolasyonu ve otomatik zaman aşımı',
                  'İhtar, susturma ve yasaklama için kalıcı denetim sicili',
                  'Sunucuya katılma şartlı komut doğrulama altyapısı',
                ]
              : [
                  'Burst raid wave isolation and automated member timeout',
                  'Persistent audit ledger for warnings, mutes, and bans',
                  'Join-gated command verification flow',
                ],
          },
          {
            date: '2026-03-01',
            title: isTr ? 'Synaps Çekirdek Komut Motoru & Çoklu Dil Desteği' : 'Synaps Core Command Engine & Multi-Language',
            summary: isTr
              ? 'Yüksek hızlı s! önek komut işleyicisi, temel ekonomi döngüsü ve 12 dilde tam arayüz yerelleştirmesi kullanıma sunuldu.'
              : 'Sub-second s! prefix command router, core economy loop, and 12-language localization launched.',
            items: isTr
              ? [
                  'Slash gecikmesi olmayan s! önek tabanlı komut yönlendiricisi',
                  '40+ doğrulanmış komut ile 7 modül kategorisi',
                  '12 dilde tam arayüz ve komut açıklaması desteği',
                ]
              : [
                  'Zero-delay s! prefix command router',
                  '7 module categories spanning 40+ verified commands',
                  'Full interface localization across 12 languages',
                ],
          },
        ],
      },
    ],
    [isTr]
  );

  return (
    <div className="pt-10 sm:pt-14 pb-24 px-5 sm:px-10 max-w-4xl mx-auto w-full text-neutral-900 dark:text-neutral-100">
      {/* Header matching Magoa Changelog intro */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10 sm:mb-14 space-y-2"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          {pt.subPages.changelogTitle}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
          {pt.subPages.changelogSubtitle}
        </p>
      </motion.div>

      {/* Vertical Timeline with Sticky Left Year */}
      <div className="relative space-y-14 sm:space-y-16">
        {yearGroups.map((group) => (
          <div key={group.year} className="relative flex flex-col md:flex-row md:gap-10">
            {/* Vertical Timeline Rail */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute left-5 top-3 bottom-0 w-px bg-neutral-200 dark:bg-white/[0.1]"
            />

            {/* Sticky Left Year */}
            <div className="md:sticky md:top-24 z-10 flex items-center self-start md:w-44 shrink-0 mb-5 md:mb-0">
              <div className="hidden md:flex w-10 h-10 rounded-full bg-[#fbfbfd] dark:bg-black items-center justify-center border border-neutral-200 dark:border-white/[0.14] mr-4">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-white" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-400 dark:text-neutral-500 font-mono tracking-tight">
                {group.year}
              </h2>
            </div>

            {/* Right Column Release Articles */}
            <div className="flex-1 space-y-10 border-l md:border-l-0 border-neutral-200 dark:border-white/[0.1] pl-5 md:pl-0">
              {group.entries.map((entry) => (
                <article
                  key={entry.date}
                  className="pb-8 border-b border-neutral-200/70 dark:border-white/[0.08] last:border-b-0 last:pb-0"
                >
                  <time className="block font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                    {entry.date}
                  </time>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white mb-2">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    {entry.summary}
                  </p>
                  <ul className="space-y-2">
                    {entry.items.map((item, iIdx) => (
                      <li
                        key={iIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
                      >
                        <CheckIcon className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 7. Wiki Page (/wiki)                                                       */
/* -------------------------------------------------------------------------- */
export const WikiPage: React.FC = () => <WikiView />;

/* -------------------------------------------------------------------------- */
/* 8. Documentation Page (/docs)                                              */
/* -------------------------------------------------------------------------- */
export const DocsPage: React.FC<PageNavProps> = ({ onTabChange }) => (
  <DocsView onTabChange={onTabChange} />
);

/* -------------------------------------------------------------------------- */
/* 9. API Access Page (/api-anahtarlari) — Discord Server Required            */
/* -------------------------------------------------------------------------- */
export const ApiKeysPage: React.FC = () => {
  const { language } = useLanguage();
  const pt = portalTranslations[language] || portalTranslations.tr;
  const sub = pt.subPages;

  return (
    <div className="pt-10 sm:pt-14 pb-24 px-6 sm:px-12 max-w-3xl mx-auto w-full text-neutral-900 dark:text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          {sub.apiKeysTitle}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          {sub.apiKeysSubtitle}
        </p>
      </motion.div>

      <div className="rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1] p-7 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-2.5">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
            {sub.apiKeysJoinTitle}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {sub.apiKeysJoinDesc}
          </p>
        </div>

        <ol className="space-y-3 pt-1">
          {sub.apiKeysJoinSteps.map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
            >
              <span className="w-5 h-5 rounded-md bg-neutral-100 dark:bg-[#17171a] border border-neutral-200 dark:border-white/[0.1] font-mono text-[11px] font-bold text-neutral-900 dark:text-white flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="pt-3 border-t border-neutral-100 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <a
            href={SUPPORT_SERVER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs sm:text-sm font-semibold transition-colors shadow-xs"
          >
            <span>{sub.apiKeysJoinBtn}</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </a>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            discord.gg/synap
          </span>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 10. Feedback Page (/feedback) — Live Discord Webhook Delivery              */
/* -------------------------------------------------------------------------- */
export const FeedbackPage: React.FC = () => {
  const { language } = useLanguage();
  const pt = portalTranslations[language] || portalTranslations.tr;
  const sub = pt.subPages;

  const [selectedType, setSelectedType] = useState(0);
  const [contact, setContact] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const categoryKeys: Array<'suggestion' | 'bug' | 'improvement'> = [
    'suggestion',
    'bug',
    'improvement',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setStatus('idle');
    setErrorDetail(null);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: categoryKeys[selectedType] || 'suggestion',
          subject: subject.trim(),
          message: message.trim(),
          contact: contact.trim(),
        }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus('error');
        setErrorDetail(json.error || sub.feedbackError);
      } else {
        setStatus('success');
        setSubject('');
        setMessage('');
        setContact('');
      }
    } catch {
      setStatus('error');
      setErrorDetail(sub.feedbackError);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-10 sm:pt-14 pb-24 px-6 sm:px-12 max-w-3xl mx-auto w-full text-neutral-900 dark:text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          {sub.feedbackTitle}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          {sub.feedbackSubtitle}
        </p>
      </motion.div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1] p-6 sm:p-8 shadow-xs space-y-5"
      >
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block">
            {sub.feedbackTypeLabel}
          </label>
          <div className="flex flex-wrap gap-2">
            {sub.feedbackTypes.map((label, idx) => (
              <button
                type="button"
                key={label}
                onClick={() => setSelectedType(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                  selectedType === idx
                    ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-950 dark:border-white'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100 dark:bg-[#141416] dark:text-neutral-300 dark:border-white/[0.1]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder={sub.feedbackContactPlaceholder}
          maxLength={80}
          className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#141416] border border-neutral-200 dark:border-white/[0.1] text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/15"
        />

        <input
          type="text"
          required
          minLength={2}
          maxLength={140}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={sub.feedbackSubjectPlaceholder}
          className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#141416] border border-neutral-200 dark:border-white/[0.1] text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/15"
        />

        <textarea
          required
          minLength={5}
          maxLength={2000}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={sub.feedbackMessagePlaceholder}
          className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#141416] border border-neutral-200 dark:border-white/[0.1] text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/15 resize-y"
        />

        {status === 'success' && (
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#17171a] border border-neutral-200 dark:border-white/[0.15] text-xs font-medium flex items-center gap-2 text-neutral-900 dark:text-white">
            <ShieldCheckIcon className="w-4 h-4 shrink-0" />
            <span>{sub.feedbackSuccess}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#17171a] border border-neutral-300 dark:border-white/[0.2] text-xs font-medium flex items-center gap-2 text-neutral-900 dark:text-white">
            <AlertTriangleIcon className="w-4 h-4 shrink-0" />
            <span>{errorDetail || sub.feedbackError}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60"
          >
            <span>{sending ? sub.feedbackSending : sub.feedbackSubmit}</span>
            {!sending && <ArrowRightIcon className="w-3.5 h-3.5" />}
          </button>

          <a
            href={SUPPORT_SERVER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white underline underline-offset-4"
          >
            discord.gg/synap
          </a>
        </div>
      </form>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 12. Partnerlik Page (/partner) — Community & Server Collaboration Program  */
/* -------------------------------------------------------------------------- */
export const PartnerPage: React.FC = () => {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const tiers = [
    {
      code: '01 · COMMUNITY',
      title: isTr ? 'Topluluk Partneri' : 'Community Partner',
      requirement: isTr ? 'En az 250+ gerçek üye · Aktif sohbet' : '250+ active members · Healthy chat',
      desc: isTr
        ? 'Büyüyen topluluklar için karşılıklı sunucu tanıtımı ve destek sunucusunda özel partner kanalı görünürlüğü.'
        : 'Mutual server announcements and dedicated partner channel placement for growing communities.',
      perks: isTr
        ? ['Karşılıklı partner duyuru paylaşımı', 'Resmi sunucuda Partner Rolü', 'Synaps ile otomatik partner logu']
        : ['Cross-server partner announcement', 'Partner role in our Discord', 'Automated Synaps partner tracking'],
    },
    {
      code: '02 · GROWTH',
      title: isTr ? 'Büyüme Partneri' : 'Growth Partner',
      requirement: isTr ? 'En az 1.500+ üye · Etkinlik odaklı' : '1,500+ members · Event active',
      desc: isTr
        ? 'Etkinlik ve çekiliş düzenleyen orta/büyük ölçekli sunucular için reklam paketlerinde özel iş birliği avantajları.'
        : 'Special campaign discounts and shared giveaway collaborations for mid-to-large active servers.',
      perks: isTr
        ? ['Reklam paketlerinde %15 partner indirimi', 'Ortak çekiliş & etkinlik desteği', 'Öncelikli teknik kurulum kanalı']
        : ['15% partner discount on ad packages', 'Shared giveaway & event support', 'Priority technical setup line'],
    },
    {
      code: '03 · VERIFIED',
      title: isTr ? 'Onaylı Partner' : 'Verified Partner',
      requirement: isTr ? '5.000+ üye · Synaps aktif kullanımı' : '5,000+ members · Active Synaps usage',
      desc: isTr
        ? 'Synaps’ı ana altyapısında kullanan yüksek hacimli topluluklar için özel Premium hediye kontenjanı ve VIP destek.'
        : 'Complimentary Premium server addition allocation and dedicated VIP engineering support for flagship guilds.',
      perks: isTr
        ? ['1 Aylık Synaps Premium hediye kontenjanı', 'Doğrudan geliştirici & durum bildirim hattı', 'Öne çıkarılan partner sunucu listelemesi']
        : ['Complimentary 1-Month Synaps Premium slot', 'Direct developer & incident escalation line', 'Featured partner showcase placement'],
    },
  ];

  return (
    <div className="pt-10 sm:pt-14 pb-24 px-6 sm:px-12 max-w-5xl mx-auto w-full text-neutral-900 dark:text-neutral-100 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto space-y-3"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          {isTr ? 'Synaps Partnerlik Programı' : 'Synaps Partnership Program'}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {isTr
            ? 'Aktif Discord toplulukları için karşılıklı büyüme, ortak etkinlik ve özel avantajlar sunan iş birliği programı.'
            : 'Collaborative growth, joint community events, and exclusive perks for active Discord servers.'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tiers.map((tier, idx) => (
          <motion.div
            key={tier.code}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/85 dark:border-white/[0.1] p-6 sm:p-7 shadow-xs flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                  {tier.code}
                </span>
                <h2 className="text-xl font-bold text-neutral-950 dark:text-white tracking-tight">
                  {tier.title}
                </h2>
                <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  {tier.requirement}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {tier.desc}
              </p>

              <ul className="space-y-2 pt-2 border-t border-neutral-100 dark:border-white/[0.08]">
                {tier.perks.map((perk, pIdx) => (
                  <li
                    key={pIdx}
                    className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300 leading-snug"
                  >
                    <CheckIcon className="w-3.5 h-3.5 text-neutral-950 dark:text-white shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={SUPPORT_SERVER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-900 text-neutral-900 hover:text-white dark:bg-[#141416] dark:hover:bg-white dark:text-white dark:hover:text-neutral-950 border border-neutral-200 dark:border-white/[0.1] text-xs font-semibold text-center transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <span>{isTr ? 'Başvuru Yap' : 'Apply in Discord'}</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        ))}
      </div>

      {/* Partnership Application CTA */}
      <div className="rounded-3xl bg-neutral-900 dark:bg-gradient-to-br dark:from-[#161618] dark:via-[#101012] dark:to-[#0a0a0b] text-white p-7 sm:p-9 border border-neutral-800 dark:border-white/[0.12] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {isTr ? 'Sunucunuzu Partner Ağına Ekleyin' : 'Add Your Server to Our Partner Network'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 dark:text-neutral-400 max-w-xl leading-relaxed">
            {isTr
              ? 'Resmi Discord destek sunucumuza katılıp partnerlik kanalından sunucu davet bağlantınızı ve istatistiklerinizi paylaşmanız yeterlidir.'
              : 'Join our official Discord support server and share your server invite link in the partnership channel.'}
          </p>
        </div>
        <a
          href={SUPPORT_SERVER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 shrink-0"
        >
          <span>{isTr ? 'Discord Sunucusuna Katıl' : 'Join Discord Server'}</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
