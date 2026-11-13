import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ShieldCheckIcon,
  CoinsIcon,
  TicketIcon,
  ZapIcon,
  CheckCircleIcon,
  CopyIcon,
  CheckIcon,
} from './ui/Icons';
import { useLanguage } from '../i18n/translations';
import { uiExtras } from '../i18n/extras';

type SuiteTabId = 'security' | 'economy' | 'support' | 'progression';

interface CommandItem {
  command: string;
  description: string;
}

interface SuiteTab {
  id: SuiteTabId;
  label: string;
  icon: React.ReactNode;
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
  const { language, t } = useLanguage();
  const ex = uiExtras[language] || uiExtras.tr;
  const ab = ex.about;

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
      icon: <ShieldCheckIcon className="w-4 h-4" />,
      title: ab.tabs.security.title,
      description: ab.tabs.security.description,
      metrics: ab.tabs.security.metrics,
      commands: ab.tabs.security.commands,
      embedPreview: {
        commandTyped: 's!protection',
        embedTitle: ab.tabs.security.embedTitle,
        embedSubtitle: ab.tabs.security.embedSubtitle,
        fields: ab.tabs.security.fields,
        footer: ab.tabs.security.footer,
      },
    },
    {
      id: 'economy',
      label: t.aboutPage.tabs.economy,
      icon: <CoinsIcon className="w-4 h-4" />,
      title: ab.tabs.economy.title,
      description: ab.tabs.economy.description,
      metrics: ab.tabs.economy.metrics,
      commands: ab.tabs.economy.commands,
      embedPreview: {
        commandTyped: 's!balance',
        embedTitle: ab.tabs.economy.embedTitle,
        embedSubtitle: ab.tabs.economy.embedSubtitle,
        fields: ab.tabs.economy.fields,
        footer: ab.tabs.economy.footer,
      },
    },
    {
      id: 'support',
      label: t.aboutPage.tabs.support,
      icon: <TicketIcon className="w-4 h-4" />,
      title: ab.tabs.support.title,
      description: ab.tabs.support.description,
      metrics: ab.tabs.support.metrics,
      commands: ab.tabs.support.commands,
      embedPreview: {
        commandTyped: 's!ticket-panel',
        embedTitle: ab.tabs.support.embedTitle,
        embedSubtitle: ab.tabs.support.embedSubtitle,
        fields: ab.tabs.support.fields,
        footer: ab.tabs.support.footer,
      },
    },
    {
      id: 'progression',
      label: t.aboutPage.tabs.progression,
      icon: <ZapIcon className="w-4 h-4" />,
      title: ab.tabs.progression.title,
      description: ab.tabs.progression.description,
      metrics: ab.tabs.progression.metrics,
      commands: ab.tabs.progression.commands,
      embedPreview: {
        commandTyped: 's!rank',
        embedTitle: ab.tabs.progression.embedTitle,
        embedSubtitle: ab.tabs.progression.embedSubtitle,
        fields: ab.tabs.progression.fields,
        footer: ab.tabs.progression.footer,
      },
    },
  ];

  const currentTab = suiteTabs.find((tab) => tab.id === activeTab) || suiteTabs[0];

  const coreValues = [
    {
      title: t.aboutPage.val1Title,
      description: t.aboutPage.val1Desc,
    },
    {
      title: t.aboutPage.val2Title,
      description: t.aboutPage.val2Desc,
    },
    {
      title: t.aboutPage.val3Title,
      description: t.aboutPage.val3Desc,
    },
    {
      title: t.aboutPage.val4Title,
      description: t.aboutPage.val4Desc,
    },
  ];

  return (
    <div className="pt-8 sm:pt-14 pb-24 px-6 sm:px-12 max-w-6xl mx-auto text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight leading-tight">
          {t.aboutPage.title}
        </h1>
        <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto font-normal">
          {t.aboutPage.subtitle}
        </p>
      </motion.div>

      {/* The Story & Mission Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 bg-white dark:bg-[#0c0c0e] rounded-3xl border border-neutral-200/80 dark:border-white/[0.12] p-6 sm:p-10 shadow-xs relative overflow-hidden"
      >
        <div className="max-w-3xl relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white tracking-tight">
            {t.aboutPage.storyTitle}
          </h2>
          <div className="mt-4 space-y-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <p>{t.aboutPage.storyP1}</p>
            <p>{t.aboutPage.storyP2}</p>
          </div>
        </div>

        {/* 3 Quick Bot Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-neutral-200/80 dark:border-white/[0.1] relative z-10">
          {[
            { title: t.aboutPage.highlight1Title, desc: t.aboutPage.highlight1Desc },
            { title: t.aboutPage.highlight2Title, desc: t.aboutPage.highlight2Desc },
            { title: t.aboutPage.highlight3Title, desc: t.aboutPage.highlight3Desc },
          ].map((hl, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircleIcon className="w-4 h-4 text-neutral-900 dark:text-white" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                  {hl.title}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {hl.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Comprehensive Community Suite: Interactive Tabbed Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            {ab.suiteTitle}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            {ab.suiteSubtitle}
          </p>
        </div>

        {/* Segmented Tab Navigation Control with Shared layoutId Pill */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-neutral-100 dark:bg-[#0c0c0e] rounded-2xl max-w-2xl mx-auto mb-8 border border-neutral-200 dark:border-white/[0.12]">
          {suiteTabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white dark:text-neutral-950'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-white/[0.06]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="about-suite-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-neutral-950 dark:bg-white shadow-xs -z-10"
                  />
                )}
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content Display (Split Layout) with AnimatePresence */}
        <div className="bg-white dark:bg-[#0c0c0e] rounded-3xl border border-neutral-200/90 dark:border-white/[0.12] p-6 sm:p-9 shadow-md overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
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
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: i * 0.04 }}
                      className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#141416] border border-neutral-200/80 dark:border-white/[0.1] text-center sm:text-left"
                    >
                      <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">{metric.label}</div>
                      <div className="text-sm font-bold text-neutral-950 dark:text-white mt-0.5">{metric.value}</div>
                    </motion.div>
                  ))}
                </div>

              {/* Categorized Command Examples with Click-to-Copy */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase font-mono tracking-wider">
                    {ab.coreCommandsLabel}
                  </span>
                  <span className="text-[11px] text-neutral-400">{ab.clickToCopy}</span>
                </div>

                <div className="space-y-2">
                  {currentTab.commands.map((cmd, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.22, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#141416] border border-neutral-200/80 dark:border-white/[0.1] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-mono font-bold text-neutral-950 dark:text-white text-xs">
                          {cmd.command}
                        </div>
                        <div className="text-neutral-500 dark:text-neutral-400 text-[11px]">
                          {cmd.description}
                        </div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleCopy(cmd.command)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium transition-colors cursor-pointer shadow-2xs shrink-0 flex items-center gap-1.5"
                      >
                        {copiedCmd === cmd.command ? (
                          <>
                            <CheckIcon className="w-3 h-3 text-neutral-900 dark:text-white" />
                            <span>{t.common.copied}</span>
                          </>
                        ) : (
                          <>
                            <CopyIcon className="w-3 h-3 text-neutral-600 dark:text-neutral-400" />
                            <span>{t.common.copy}</span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Discord Embed Response */}
            <div className="lg:col-span-5 space-y-3">
              <div className="rounded-2xl border border-neutral-200 dark:border-white/[0.1] bg-neutral-50/60 dark:bg-[#141416] p-4 sm:p-5 space-y-3 shadow-inner">
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
                      <span className="text-[10px] text-neutral-400">{ab.todayTime}</span>
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
                    <div className="p-3.5 rounded-xl border-l-4 border-l-neutral-950 dark:border-l-white bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-white/[0.1] space-y-2.5 text-xs shadow-2xs">
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
                          <div key={idx} className="p-1.5 rounded-lg bg-neutral-50 dark:bg-[#17171a] border border-neutral-100 dark:border-white/[0.08]">
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
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Why Server Owners Choose Synaps */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <h3 className="text-2xl font-bold text-neutral-950 dark:text-white tracking-tight">
            {t.aboutPage.valuesTitle}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5">
            {t.aboutPage.valuesSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreValues.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white dark:bg-[#0c0c0e] rounded-2xl border border-neutral-200/80 dark:border-white/[0.12] p-5 shadow-xs hover:shadow-md transition-shadow"
            >
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{val.title}</h4>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{val.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Elevated Founder Profile Card: Máve */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white dark:bg-[#0c0c0e] rounded-3xl border border-neutral-200/90 dark:border-white/[0.12] p-8 sm:p-10 shadow-sm hover:shadow-md relative overflow-hidden transition-shadow"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          {/* Founder Avatar */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 shadow-md shrink-0 bg-neutral-100 dark:bg-neutral-800"
          >
            <img
              src="/assets/aistudio/image_e0686a18.png"
              alt="Máve"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2.5 right-2.5 flex h-3.5 w-3.5">
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-neutral-900 dark:bg-white ring-2 ring-white dark:ring-neutral-900" />
            </span>
          </motion.div>

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
      </motion.div>
    </div>
  );
};
