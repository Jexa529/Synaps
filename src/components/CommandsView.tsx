import React, { useState } from 'react';
import {
  Search,
  Copy,
  Check,
  LayoutGrid,
  Coins,
  Briefcase,
  Dice5,
  Store,
  Wrench,
  Shield,
  User,
  X,
} from 'lucide-react';
import { BOT_COMMANDS } from '../data/commandsData';
import { useLanguage } from '../i18n/translations';

export const CommandsView: React.FC = () => {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: t.commandsPage.categories.all, icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: 'economy', label: t.commandsPage.categories.economy, icon: <Coins className="w-3.5 h-3.5" /> },
    { id: 'profession', label: t.commandsPage.categories.profession, icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'gambling', label: t.commandsPage.categories.gambling, icon: <Dice5 className="w-3.5 h-3.5" /> },
    { id: 'market', label: t.commandsPage.categories.market, icon: <Store className="w-3.5 h-3.5" /> },
    { id: 'utility', label: t.commandsPage.categories.utility, icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'moderation', label: t.commandsPage.categories.moderation, icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'user', label: t.commandsPage.categories.user, icon: <User className="w-3.5 h-3.5" /> },
  ];

  const filteredCommands = BOT_COMMANDS.filter((cmd) => {
    const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
    const matchesSearch =
      cmd.name.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase()) ||
      cmd.usage.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (usage: string, name: string) => {
    navigator.clipboard.writeText(usage);
    setCopiedCommand(name);
    setTimeout(() => {
      setCopiedCommand(null);
    }, 2000);
  };

  return (
    <div className="pt-8 sm:pt-12 pb-24 px-6 sm:px-12 max-w-6xl mx-auto text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      {/* Top Banner / Heading */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          {t.commandsPage.title}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl mx-auto">
          {t.commandsPage.subtitle}
        </p>
      </div>

      {/* Catalog Search & Filter Controls */}
      <div className="space-y-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.commandsPage.searchPlaceholder}
              className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white dark:bg-[#0e0f14] border border-neutral-200 dark:border-white/[0.12] text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/15 focus:border-neutral-900 dark:focus:border-white/40 shadow-xs transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium self-end sm:self-auto font-mono">
            {t.commandsPage.showing} <span className="font-bold text-neutral-900 dark:text-white">{filteredCommands.length}</span> {t.commandsPage.verifiedCommands}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-neutral-100 dark:bg-[#0e0f14] rounded-2xl border border-neutral-200/80 dark:border-white/[0.12] overflow-x-auto shadow-xs">
          {categories.map((cat) => {
            const count =
              cat.id === 'all'
                ? BOT_COMMANDS.length
                : BOT_COMMANDS.filter((c) => c.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white dark:bg-[#1a1c24] text-neutral-900 dark:text-white shadow-xs border border-neutral-200 dark:border-white/[0.15] font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-white/[0.06]'
                }`}
              >
                <span className={`w-4 h-4 rounded-md flex items-center justify-center ${isSelected ? 'bg-neutral-100 dark:bg-white/[0.1]' : 'bg-neutral-200/60 dark:bg-white/[0.05]'}`}>
                  {React.cloneElement(cat.icon, { className: 'w-3 h-3 text-neutral-900 dark:text-white' })}
                </span>
                <span>{cat.label}</span>
                <span className={`text-[10px] ml-0.5 ${isSelected ? 'text-neutral-900 dark:text-white font-bold' : 'text-neutral-500 dark:text-neutral-400'}`}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Command Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCommands.map((cmd) => (
          <div
            key={cmd.name}
            className="group bg-white dark:bg-[#0e0f14] rounded-2xl border border-neutral-200/80 dark:border-white/[0.12] hover:dark:border-white/[0.22] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header: Syntax + Copy Button */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-[#050507] border border-neutral-200 dark:border-white/[0.1] px-2.5 py-1 rounded-lg">
                  {cmd.usage}
                </span>
                <button
                  onClick={() => handleCopy(cmd.usage, cmd.name)}
                  title="Copy command syntax"
                  className="p-1.5 rounded-lg bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 transition-all cursor-pointer shadow-xs"
                >
                  {copiedCommand === cmd.name ? (
                    <Check className="w-3.5 h-3.5 text-white dark:text-neutral-950 stroke-[3]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-white dark:text-neutral-950 stroke-[2.5]" />
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed mt-2">
                {t.commandsPage.descriptions?.[cmd.name] || cmd.description}
              </p>

              {/* Parameters / Arguments */}
              {cmd.options && cmd.options.length > 0 && (
                <div className="mt-3 pt-3 border-t border-neutral-200/80 dark:border-neutral-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                    {language === 'tr' ? 'Parametreler:' : language === 'de' ? 'Parameter:' : language === 'fr' ? 'Paramètres :' : language === 'es' ? 'Parámetros:' : language === 'ar' ? 'المعاملات:' : 'Parameters:'}
                  </span>
                  <div className="space-y-1">
                    {cmd.options.map((opt, oIdx) => (
                      <div key={oIdx} className="text-xs text-neutral-700 dark:text-neutral-300 flex items-baseline gap-2">
                        <code className="font-mono text-[11px] text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded font-medium border border-neutral-200 dark:border-neutral-700">
                          {opt.required ? `<${opt.name}>` : `[${opt.name}]`}
                        </code>
                        <span className="text-[11px] text-neutral-500 dark:text-neutral-400">{opt.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Meta Bar: Category & Permissions */}
            <div className="mt-4 pt-3 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
              <span className="capitalize font-medium text-neutral-600 dark:text-neutral-300">
                {t.commandsPage.categories[cmd.category as keyof typeof t.commandsPage.categories] || cmd.category}
              </span>
              <span>
                {cmd.permissions
                  ? `${t.commandsPage.requiredPermission}: ${cmd.permissions}`
                  : (language === 'tr' ? 'Herkese Açık' : language === 'de' ? 'Öffentlich' : language === 'fr' ? 'Public' : language === 'es' ? 'Público' : language === 'ar' ? 'عام للجميع' : language === 'ja' ? '全員利用可能' : language === 'ko' ? '모두 이용 가능' : language === 'ru' ? 'Общедоступно' : language === 'pt' ? 'Público' : language === 'it' ? 'Pubblico' : language === 'nl' ? 'Openbaar' : 'Public')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredCommands.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-[#0e0f14] rounded-2xl border border-neutral-200 dark:border-white/[0.12]">
          <Search className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <h3 className="font-bold text-neutral-900 dark:text-white text-sm">{t.commandsPage.noResults}</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{t.commandsPage.noResultsDesc}</p>
        </div>
      )}
    </div>
  );
};
