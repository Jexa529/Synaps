import React, { useState, useRef, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  SearchIcon,
  CopyIcon,
  CheckIcon,
  LayoutGridIcon,
  CoinsIcon,
  BriefcaseIcon,
  DiceIcon,
  StoreIcon,
  WrenchIcon,
  ShieldIcon,
  UserIcon,
  CloseIcon,
} from './ui/Icons';
import { BOT_COMMANDS } from '../data/commandsData';
import { useLanguage } from '../i18n/translations';
import { uiExtras } from '../i18n/extras';
import { commandLocaleExtras } from '../i18n/commandsAndLegal';

type AccessFilter = 'all' | 'public' | 'restricted';
type SortMode = 'default' | 'alpha' | 'params';

export const CommandsView: React.FC = () => {
  const { t, language } = useLanguage();
  const ex = uiExtras[language] || uiExtras.tr;
  const cmdEx = commandLocaleExtras[language] || commandLocaleExtras.tr;
  const isTr = language === 'tr';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [accessFilter, setAccessFilter] = useState<AccessFilter>('all');
  const [sortMode, setSortMode] = useState<SortMode>('default');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const categories = [
    { id: 'all', label: t.commandsPage.categories.all, icon: <LayoutGridIcon className="w-3.5 h-3.5" /> },
    { id: 'economy', label: t.commandsPage.categories.economy, icon: <CoinsIcon className="w-3.5 h-3.5" /> },
    { id: 'profession', label: t.commandsPage.categories.profession, icon: <BriefcaseIcon className="w-3.5 h-3.5" /> },
    { id: 'gambling', label: t.commandsPage.categories.gambling, icon: <DiceIcon className="w-3.5 h-3.5" /> },
    { id: 'market', label: t.commandsPage.categories.market, icon: <StoreIcon className="w-3.5 h-3.5" /> },
    { id: 'utility', label: t.commandsPage.categories.utility, icon: <WrenchIcon className="w-3.5 h-3.5" /> },
    { id: 'moderation', label: t.commandsPage.categories.moderation, icon: <ShieldIcon className="w-3.5 h-3.5" /> },
    { id: 'user', label: t.commandsPage.categories.user, icon: <UserIcon className="w-3.5 h-3.5" /> },
  ];

  const getCommandDescription = (cmdName: string, fallbackDesc: string) =>
    t.commandsPage.descriptions?.[cmdName] || cmdEx.descriptions[cmdName] || fallbackDesc;

  const filteredCommands = useMemo(() => {
    const list = BOT_COMMANDS.filter((cmd) => {
      const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
      const matchesAccess =
        accessFilter === 'all'
          ? true
          : accessFilter === 'public'
            ? !cmd.permissions
            : Boolean(cmd.permissions);

      const localizedDesc = getCommandDescription(cmd.name, cmd.description).toLowerCase();
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        cmd.name.toLowerCase().includes(query) ||
        localizedDesc.includes(query) ||
        cmd.description.toLowerCase().includes(query) ||
        cmd.usage.toLowerCase().includes(query) ||
        (cmd.options?.some(
          (o) =>
            o.name.toLowerCase().includes(query) ||
            o.description.toLowerCase().includes(query)
        ) ??
          false);

      return matchesCategory && matchesAccess && matchesSearch;
    });

    if (sortMode === 'alpha') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortMode === 'params') {
      return [...list].sort((a, b) => (b.options?.length ?? 0) - (a.options?.length ?? 0));
    }
    return list;
  }, [selectedCategory, accessFilter, search, sortMode, t, cmdEx]);

  const handleCopy = (usage: string, name: string) => {
    navigator.clipboard?.writeText(usage);
    setCopiedCommand(name);
    setTimeout(() => {
      setCopiedCommand(null);
    }, 1800);
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setAccessFilter('all');
    setSortMode('default');
  };

  return (
    <div className="pt-8 sm:pt-12 pb-24 px-5 sm:px-10 max-w-6xl mx-auto text-neutral-900 dark:text-neutral-100 transition-colors duration-200 w-full">
      {/* Top Heading */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          {t.commandsPage.title}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl mx-auto">
          {t.commandsPage.subtitle}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <span>
            {BOT_COMMANDS.length} {isTr ? 'Doğrulanmış Komut' : 'Verified Commands'}
          </span>
          <span aria-hidden="true">·</span>
          <span>7 {isTr ? 'Modül Kategorisi' : 'Module Categories'}</span>
          <span aria-hidden="true">·</span>
          <span>{isTr ? 'Önek: s!' : 'Prefix: s!'}</span>
          <span aria-hidden="true">·</span>
          <span>{isTr ? '<zorunlu> · [isteğe_bağlı]' : '<required> · [optional]'}</span>
        </div>
      </motion.div>

      {/* Catalog Search, Filters, Sort & Category Bar */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-4 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.commandsPage.searchPlaceholder}
              className="w-full pl-9 pr-12 py-2.5 rounded-xl bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-white/[0.1] text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/15 focus:border-neutral-900 dark:focus:border-white/40 shadow-xs transition-colors"
            />
            {search ? (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                aria-label="Clear search"
              >
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-[#17171a] border border-neutral-200 dark:border-white/[0.1] text-[10px] font-mono text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                /
              </kbd>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2.5">
            {/* Access Level Filter */}
            <div className="inline-flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1]">
              {(
                [
                  { id: 'all', label: isTr ? 'Tümü' : 'All' },
                  { id: 'public', label: ex.commands.publicLabel },
                  { id: 'restricted', label: isTr ? 'Yetkili' : 'Staff' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setAccessFilter(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    accessFilter === tab.id
                      ? 'bg-white dark:bg-[#17171a] text-neutral-950 dark:text-white shadow-xs font-semibold'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort Filter */}
            <div className="inline-flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1]">
              {(
                [
                  { id: 'default', label: isTr ? 'Varsayılan' : 'Default' },
                  { id: 'alpha', label: 'A–Z' },
                  { id: 'params', label: isTr ? 'Parametreli' : 'Most Params' },
                ] as const
              ).map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSortMode(s.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    sortMode === s.id
                      ? 'bg-white dark:bg-[#17171a] text-neutral-950 dark:text-white shadow-xs font-semibold'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium font-mono tabular-nums pl-1">
              {t.commandsPage.showing}{' '}
              <span className="font-bold text-neutral-950 dark:text-white">
                {filteredCommands.length}
              </span>
            </div>
          </div>
        </div>

        {/* Popular Command Quick Jumps */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 mr-1">
            {isTr ? 'Hızlı Seçim:' : 'Quick Filter:'}
          </span>
          {['s!daily', 's!bank', 's!work', 's!market', 's!warn', 's!ticket', 's!protection', 's!profile'].map((quick) => {
            const qClean = quick.replace('s!', '');
            const isQuickActive = search.toLowerCase() === qClean;
            return (
              <button
                key={quick}
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setAccessFilter('all');
                  setSearch(isQuickActive ? '' : qClean);
                }}
                className={`font-mono text-[11px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                  isQuickActive
                    ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-950 dark:border-white font-semibold'
                    : 'bg-white dark:bg-[#0c0c0e] text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-white/[0.1] hover:border-neutral-400 dark:hover:border-white/25'
                }`}
              >
                {quick}
              </button>
            );
          })}
        </div>

        {/* Category Tabs with Shared layoutId Pill */}
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-neutral-100 dark:bg-[#0c0c0e] rounded-2xl border border-neutral-200/80 dark:border-white/[0.1] overflow-x-auto shadow-xs">
          {categories.map((cat) => {
            const count =
              cat.id === 'all'
                ? BOT_COMMANDS.length
                : BOT_COMMANDS.filter((c) => c.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'text-neutral-950 dark:text-white font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-white/[0.06]'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="commands-category-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-white dark:bg-[#17171a] shadow-xs border border-neutral-200 dark:border-white/[0.15] -z-10"
                  />
                )}
                <span className="w-4 h-4 flex items-center justify-center opacity-80">
                  {React.cloneElement(cat.icon, { className: 'w-3.5 h-3.5 text-current' })}
                </span>
                <span>{cat.label}</span>
                <span className="text-[10px] font-mono tabular-nums opacity-65">
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Command Cards Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredCommands.map((cmd, idx) => {
            const isCopied = copiedCommand === cmd.name;
            const categoryLabel =
              t.commandsPage.categories[cmd.category as keyof typeof t.commandsPage.categories] ||
              cmd.category;

            return (
              <motion.div
                key={cmd.name}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.24,
                  delay: Math.min(idx * 0.02, 0.2),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group bg-white dark:bg-[#0c0c0e] rounded-2xl border border-neutral-200/90 dark:border-white/[0.1] hover:border-neutral-400 dark:hover:border-white/25 p-5 sm:p-6 shadow-xs transition-colors flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  {/* Top Row: Syntax & Copy Button */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                        {cmd.name}
                      </div>
                      <code className="inline-block font-mono text-xs sm:text-[13px] font-bold text-neutral-950 dark:text-white bg-neutral-100 dark:bg-[#141416] border border-neutral-200/90 dark:border-white/[0.1] px-2.5 py-1.5 rounded-lg break-all">
                        {cmd.usage}
                      </code>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleCopy(cmd.usage, cmd.name)}
                      title={ex.commands.copyTooltip}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-[11px] font-semibold transition-colors cursor-pointer shrink-0 shadow-xs"
                    >
                      {isCopied ? (
                        <>
                          <CheckIcon className="w-3 h-3" />
                          <span>{isTr ? 'Kopyalandı' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon className="w-3 h-3" />
                          <span className="hidden sm:inline">{isTr ? 'Kopyala' : 'Copy'}</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {getCommandDescription(cmd.name, cmd.description)}
                  </p>

                  {/* Structured Parameters */}
                  {cmd.options && cmd.options.length > 0 && (
                    <div className="pt-3 border-t border-neutral-100 dark:border-white/[0.08] space-y-2">
                      <div className="text-[10px] font-bold uppercase text-neutral-400 dark:text-neutral-500 tracking-wider">
                        {ex.commands.paramsLabel} ({cmd.options.length})
                      </div>
                      <div className="space-y-1.5">
                        {cmd.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className="flex flex-wrap items-baseline gap-2 text-xs"
                          >
                            <code className="font-mono text-[11px] text-neutral-950 dark:text-white bg-neutral-100 dark:bg-[#141416] px-1.5 py-0.5 rounded border border-neutral-200/80 dark:border-white/[0.1] font-semibold">
                              {opt.required ? `<${opt.name}>` : `[${opt.name}]`}
                            </code>
                            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                              {cmdEx.options[opt.description] || opt.description}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400 ml-auto">
                              {opt.required
                                ? isTr
                                  ? 'Zorunlu'
                                  : 'Required'
                                : isTr
                                  ? 'İsteğe bağlı'
                                  : 'Optional'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Meta Bar */}
                <div className="pt-3 border-t border-neutral-100 dark:border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                    {categoryLabel}
                  </span>
                  <span>
                    {cmd.permissions
                      ? `${t.commandsPage.requiredPermission}: ${cmdEx.permissions[cmd.permissions] || cmd.permissions}`
                      : ex.commands.publicLabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {filteredCommands.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="text-center py-16 bg-white dark:bg-[#0c0c0e] rounded-2xl border border-neutral-200 dark:border-white/[0.12] space-y-3"
          >
            <SearchIcon className="w-8 h-8 text-neutral-400 mx-auto" />
            <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
              {t.commandsPage.noResults}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {t.commandsPage.noResultsDesc}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-2 px-4 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            >
              {isTr ? 'Filtreleri Sıfırla' : 'Reset Filters'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
