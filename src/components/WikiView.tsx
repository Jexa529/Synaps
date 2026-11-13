import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BOT_INVITE_URL, SUPPORT_SERVER_URL } from '../data/commandsData';
import { useLanguage } from '../i18n/translations';
import { portalTranslations } from '../i18n/portal';
import {
  SearchIcon,
  CopyIcon,
  CheckIcon,
  ArrowRightIcon,
  CloseIcon,
} from './ui/Icons';

type WikiCategory = 'all' | 'setup' | 'modules' | 'troubleshooting';

interface WikiArticle {
  id: string;
  category: Exclude<WikiCategory, 'all'>;
  index: string;
  title: string;
  summary: string;
  steps?: string[];
  commands?: Array<{ syntax: string; note: string }>;
}

export const WikiView: React.FC = () => {
  const { language } = useLanguage();
  const pt = portalTranslations[language] || portalTranslations.tr;
  const isTr = language === 'tr';

  const [category, setCategory] = useState<WikiCategory>('all');
  const [query, setQuery] = useState('');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (cmd: string) => {
    navigator.clipboard?.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1800);
  };

  const categories: Array<{ id: WikiCategory; label: string }> = [
    { id: 'all', label: isTr ? 'Tümü' : 'All' },
    { id: 'setup', label: isTr ? 'Kurulum' : 'Setup' },
    { id: 'modules', label: isTr ? 'Modüller' : 'Modules' },
    { id: 'troubleshooting', label: isTr ? 'Sorun Giderme' : 'Troubleshooting' },
  ];

  const articles: WikiArticle[] = [
    {
      id: 'onboarding',
      category: 'setup',
      index: '01',
      title: isTr ? 'Sıfırdan Sunucu Kurulumu' : 'Clean Server Onboarding',
      summary: isTr
        ? 'Synaps’ı sunucunuza ekledikten sonra ilk 3 dakika içinde tüm temel sistemleri devreye alma adımları.'
        : 'Get core protection, auto-roles, and tickets operational within 3 minutes of inviting Synaps.',
      steps: isTr
        ? [
            'Resmi davet bağlantısıyla botu sunucunuza ekleyin ve önerilen izinleri onaylayın.',
            'Sunucu Ayarları > Roller ekranından Synaps rolünü yöneteceği üye rollerinin üstüne sürükleyin.',
            'Yönetici kanalında s!protection on komutunu çalıştırarak anti-raid kalkanını başlatın.',
            'Yeni üyeler için s!auto-role @Üye ve destek kanalı için s!ticket-panel #destek komutlarını girin.',
          ]
        : [
            'Invite Synaps via the official OAuth2 link and authorize recommended permissions.',
            'Move the Synaps role above member roles inside Server Settings > Roles.',
            'Run s!protection on in a staff channel to initialize anti-raid and link filtering.',
            'Configure newcomer roles with s!auto-role @Member and deploy s!ticket-panel #support.',
          ],
      commands: [
        { syntax: 's!protection on', note: isTr ? 'Anti-raid ve link filtresini açar' : 'Enables anti-raid and phishing filter' },
        { syntax: 's!auto-role @Üye', note: isTr ? 'Yeni katılanlara otomatik rol verir' : 'Assigns default role on join' },
      ],
    },
    {
      id: 'mod-guide',
      category: 'modules',
      index: '02',
      title: isTr ? 'Otomatik Koruma & Sicil Yönetimi' : 'Auto-Moderation & Case Logs',
      summary: isTr
        ? 'Baskın dalgalarını, toplu etiketleri ve zararlı davet bağlantılarını moderatör müdahalesi olmadan durdurun.'
        : 'Neutralize raid bursts, mass mentions, and scam invites without manual intervention.',
      steps: isTr
        ? [
            's!protection status ile mevcut koruma katmanlarının durumunu kontrol edin.',
            'Kural ihlallerinde s!warn @üye <sebep> komutuyla kalıcı ihtar kaydı oluşturun.',
            'Acil durumlarda s!lock #kanal ile kanalı anında yazışmaya kapatın; normale dönünce s!unlock ile açın.',
          ]
        : [
            'Inspect active protection layers anytime via s!protection status.',
            'Issue permanent audit strikes with s!warn @user <reason>.',
            'Freeze any channel instantly using s!lock #channel and restore via s!unlock.',
          ],
      commands: [
        { syntax: 's!timeout @üye 15m Spam', note: isTr ? 'Üyeyi 15 dakika susturur' : 'Timeouts member for 15 minutes' },
        { syntax: 's!clear 50', note: isTr ? 'Son 50 mesajı toplu temizler' : 'Bulk deletes last 50 messages' },
      ],
    },
    {
      id: 'eco-guide',
      category: 'modules',
      index: '03',
      title: isTr ? 'Kasa Korumalı Ekonomi & Meslekler' : 'Vault Economy & Careers',
      summary: isTr
        ? 'Cüzdan bakiyesini koruma altına alma, günlük seri çarpanları ve meslek terfileri.'
        : 'Protect liquid wallet coins inside vaults while progressing through server careers.',
      steps: isTr
        ? [
            'Üyeler her 24 saatte bir s!daily çalıştırarak günlük seri ödülünü alabilir.',
            'Soygun (s!rob) riskinden kaçınmak için s!deposit all komutuyla bakiyeyi banka kasasına aktarın.',
            's!professions ile meslekleri inceleyin ve s!work ile vardiya XP’si biriktirin.',
          ]
        : [
            'Run s!daily every 24 hours to collect streak rewards.',
            'Transfer funds using s!deposit all to protect savings against s!rob.',
            'Browse careers with s!professions and earn shift XP via s!work.',
          ],
      commands: [
        { syntax: 's!deposit all', note: isTr ? 'Tüm cüzdanı kasaya aktarır' : 'Moves wallet funds into protected vault' },
        { syntax: 's!work', note: isTr ? 'Vardiya tamamlayıp maaş kazandırır' : 'Completes career shift for coins and XP' },
      ],
    },
    {
      id: 'ticket-guide',
      category: 'modules',
      index: '04',
      title: isTr ? 'Destek Talepleri & Market' : 'Support Desks & Storefront',
      summary: isTr
        ? 'Özel izinli ticket odaları, HTML sohbet dökümü ve sunucu içi sanal mağaza akışı.'
        : 'Private staff ticket channels, HTML transcript export, and guild storefront items.',
      steps: isTr
        ? [
            's!ticket-settings komutuyla yetkili rolünü ve kayıt kanalını tanımlayın.',
            's!ticket-panel #destek ile kullanıcıların tek tıkla talep açabileceği paneli yayınlayın.',
            'Üyeler s!market ile sunucu mağazasını gezip kazandıkları altınlarla rol satın alabilir.',
          ]
        : [
            'Bind staff roles and log channels via s!ticket-settings.',
            'Deploy an interactive ticket panel button with s!ticket-panel #support.',
            'Members can browse s!market and redeem earned coins for custom roles.',
          ],
      commands: [
        { syntax: 's!ticket-panel #destek', note: isTr ? 'İnteraktif ticket paneli gönderir' : 'Sends interactive ticket embed' },
        { syntax: 's!market', note: isTr ? 'Sunucu içi mağazayı açar' : 'Opens server storefront catalog' },
      ],
    },
    {
      id: 'trouble-role',
      category: 'troubleshooting',
      index: '05',
      title: isTr ? 'Bot Rol Veremiyor veya Üyeyi Susturamıyor' : 'Bot Cannot Assign Roles or Timeout Members',
      summary: isTr
        ? 'Discord rol hiyerarşisi nedeniyle bot yetki hatası alındığında uygulanacak çözüm.'
        : 'How to resolve permission hierarchy errors when assigning roles or muting.',
      steps: isTr
        ? [
            'Sunucu Ayarları > Roller menüsünü açın.',
            'Synaps rolünü işlem yapılacak tüm üye ve ceza rollerinin fiziksel olarak üstüne taşıyın.',
            'Sunucu sahibine veya yönetici rolüne sahip hesaplara Discord gereği susturma uygulanamaz.',
          ]
        : [
            'Open Server Settings > Roles.',
            'Drag the Synaps role physically above all target member and reward roles.',
            'Note that Discord restricts sanctions on server owners and higher-positioned roles.',
          ],
    },
    {
      id: 'trouble-prefix',
      category: 'troubleshooting',
      index: '06',
      title: isTr ? 'Komutlar Kanalda Yanıt Vermiyor' : 'Commands Not Responding in Channel',
      summary: isTr
        ? 'Kanal izinleri ve komut sözdizimi kontrol listesi.'
        : 'Checklist for channel permissions and prefix syntax.',
      steps: isTr
        ? [
            'Botun ilgili metin kanalında "Mesajları Görüntüle", "Mesaj Gönder" ve "Bağlantı Yerleştir" izinlerine sahip olduğundan emin olun.',
            'Komut başında boşluk bırakmadan s! ön ekini kullanın (örnek: s!ping).',
          ]
        : [
            'Verify Synaps has View Channel, Send Messages, and Embed Links permissions in that channel.',
            'Ensure the s! prefix has no leading space (example: s!ping).',
          ],
      commands: [{ syntax: 's!ping', note: isTr ? 'Bot yanıt süresini test eder' : 'Tests live bot latency' }],
    },
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = category === 'all' || art.category === category;
    const q = query.trim().toLowerCase();
    const matchesSearch =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      (art.steps && art.steps.some((s) => s.toLowerCase().includes(q))) ||
      (art.commands && art.commands.some((c) => c.syntax.toLowerCase().includes(q)));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-10 sm:pt-14 pb-24 px-5 sm:px-10 max-w-5xl mx-auto w-full text-neutral-900 dark:text-neutral-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          {pt.subPages.wikiTitle}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          {pt.subPages.wikiSubtitle}
        </p>
      </motion.div>

      {/* Search + Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-neutral-100 dark:bg-[#0d0d0f] rounded-2xl border border-neutral-200/80 dark:border-white/[0.1]">
          {categories.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`relative z-10 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'text-neutral-950 dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="wiki-category-pill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-white/[0.14] shadow-xs -z-10"
                  />
                )}
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <SearchIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isTr ? 'Wiki içinde ara...' : 'Search wiki...'}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-[#0d0d0f] border border-neutral-200 dark:border-white/[0.1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/15"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800 dark:hover:text-white cursor-pointer"
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-5">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="rounded-3xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                {art.index}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
                {art.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {art.summary}
              </p>
            </div>

            {art.steps && (
              <ol className="space-y-2.5 pt-1">
                {art.steps.map((step, sIdx) => (
                  <li
                    key={sIdx}
                    className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-md bg-neutral-100 dark:bg-[#17171a] border border-neutral-200 dark:border-white/[0.1] font-mono text-[11px] font-bold text-neutral-900 dark:text-white flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            )}

            {art.commands && art.commands.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-neutral-100 dark:border-white/[0.08]">
                {art.commands.map((c) => (
                  <div
                    key={c.syntax}
                    className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-[#121215] border border-neutral-200/70 dark:border-white/[0.08]"
                  >
                    <div className="min-w-0">
                      <code className="font-mono text-xs font-bold text-neutral-950 dark:text-white block truncate">
                        {c.syntax}
                      </code>
                      <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block truncate mt-0.5">
                        {c.note}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(c.syntax)}
                      className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 transition-colors cursor-pointer shrink-0"
                      title={isTr ? 'Kopyala' : 'Copy'}
                    >
                      {copiedCmd === c.syntax ? (
                        <CheckIcon className="w-3.5 h-3.5" />
                      ) : (
                        <CopyIcon className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Quick Actions Footer with Neutral Charcoal-Black Gradient */}
        <div className="rounded-3xl bg-gradient-to-br from-[#161618] via-[#101012] to-[#0a0a0b] text-white border border-neutral-800 dark:border-white/[0.12] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold">
              {isTr ? 'Kurulumda Desteğe mi İhtiyacınız Var?' : 'Need Live Setup Assistance?'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {isTr
                ? 'Topluluk ekibimiz Discord destek sunucumuzda sorularınızı yanıtlar.'
                : 'Our support staff can assist you directly inside our official Discord server.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={BOT_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-semibold transition-colors"
            >
              <span>{isTr ? 'Sunucuna Ekle' : 'Add to Server'}</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={SUPPORT_SERVER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-semibold transition-colors"
            >
              <span>{isTr ? 'Destek Sunucusu' : 'Support Server'}</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
