import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import { TabType, FeatureSubTab } from '../types';
import { BOT_COMMANDS, BOT_INVITE_URL, SUPPORT_SERVER_URL } from '../data/commandsData';
import { useLanguage } from '../i18n/translations';
import { commandLocaleExtras } from '../i18n/commandsAndLegal';
import {
  SearchIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  BookOpenIcon,
  TerminalIcon,
  ShieldIcon,
  CoinsIcon,
  TicketIcon,
  BriefcaseIcon,
  StoreIcon,
  WrenchIcon,
  UserIcon,
  CodeIcon,
  CopyIcon,
  CheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
  MenuIcon,
} from './ui/Icons';

interface DocsViewProps {
  onTabChange: (tab: TabType, featureSubTab?: FeatureSubTab) => void;
}

interface DocSectionBlock {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: Array<{ label: string; desc: string }>;
  code?: string;
  callout?: { title: string; body: string };
  commandCategory?: 'moderation' | 'economy' | 'profession' | 'gambling' | 'market' | 'utility' | 'user';
  metrics?: Array<{ label: string; value: string }>;
  table?: { headers: string[]; rows: string[][] };
  quickCards?: Array<{
    title: string;
    desc: string;
    action: () => void;
    icon: React.ReactNode;
  }>;
}

interface DocPage {
  id: string;
  groupId: string;
  groupTitle: string;
  title: string;
  subtitle: string;
  sections: DocSectionBlock[];
}

interface DocGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  pageIds: string[];
}

export const DocsView: React.FC<DocsViewProps> = ({ onTabChange }) => {
  const { language, t } = useLanguage();
  const cmdEx = commandLocaleExtras[language] || commandLocaleExtras.tr;
  const isTr = language === 'tr';

  const [activePageId, setActivePageId] = useState<string>('intro');
  const [searchQuery, setSearchQuery] = useState('');
  const [cmdFilter, setCmdFilter] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    start: true,
    dev: true,
    commands: true,
    systems: true,
    server: true,
  });

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  const docGroups: DocGroup[] = useMemo(
    () => [
      {
        id: 'start',
        title: isTr ? 'Başlangıç' : 'Getting Started',
        icon: <BookOpenIcon className="w-4 h-4" />,
        pageIds: ['intro', 'quickstart'],
      },
      {
        id: 'dev',
        title: isTr ? 'Geliştirici' : 'Developer',
        icon: <CodeIcon className="w-4 h-4" />,
        pageIds: ['api-access'],
      },
      {
        id: 'commands',
        title: isTr ? 'Komutlar' : 'Commands',
        icon: <TerminalIcon className="w-4 h-4" />,
        pageIds: [
          'cmd-overview',
          'cmd-moderation',
          'cmd-economy',
          'cmd-profession',
          'cmd-gambling',
          'cmd-market',
          'cmd-utility',
          'cmd-user',
        ],
      },
      {
        id: 'systems',
        title: isTr ? 'Sistemler' : 'Systems',
        icon: <ShieldIcon className="w-4 h-4" />,
        pageIds: ['sys-protection', 'sys-economy', 'sys-tickets', 'sys-careers'],
      },
      {
        id: 'server',
        title: isTr ? 'Bu Sunucuda' : 'Server Setup',
        icon: <WrenchIcon className="w-4 h-4" />,
        pageIds: ['srv-permissions', 'srv-ads'],
      },
    ],
    [isTr]
  );

  const pages: DocPage[] = useMemo(
    () => [
      {
        id: 'intro',
        groupId: 'start',
        groupTitle: isTr ? 'Başlangıç' : 'Getting Started',
        title: isTr ? 'Synaps Dokümantasyon' : 'Synaps Documentation',
        subtitle: isTr
          ? 'Bot, komut sözdizimi ve sistem modülleri için resmi başvuru rehberi.'
          : 'Official reference guide for bot setup, command syntax, and core modules.',
        sections: [
          {
            id: 'welcome',
            heading: isTr ? 'Hoş Geldin' : 'Welcome',
            paragraphs: [
              isTr
                ? 'Kurulum notları, komut parametreleri ve sistem özetleri burada yer alır; adım adım rehberler ve modül kılavuzları için Wiki sayfasını inceleyebilirsiniz.'
                : 'Setup notes, command parameters, and module specifications live here; check the Wiki page for step-by-step operational guides.',
            ],
            metrics: [
              { label: isTr ? 'Doğrulanmış Komut' : 'Verified Commands', value: `${BOT_COMMANDS.length}+` },
              { label: isTr ? 'Ana Kategori' : 'Categories', value: '7' },
              { label: isTr ? 'Komut Öneki' : 'Command Prefix', value: 's!' },
              { label: isTr ? 'Tepki Süresi' : 'Response Latency', value: '< 45ms' },
            ],
            bullets: [
              {
                label: isTr ? 'Komutlar' : 'Commands',
                desc: isTr ? 'Tüm s! ön ekli bot komutlarının tam listesi' : 'Full catalog of s! prefix commands',
              },
              {
                label: 'Wiki',
                desc: isTr ? 'Adım adım kurulum ve izin rehberleri' : 'Step-by-step installation & permission manuals',
              },
              {
                label: isTr ? 'Sistemler' : 'Systems',
                desc: isTr ? 'Moderasyon, ekonomi, ticket ve kariyer modülleri' : 'Moderation, economy, tickets, and careers',
              },
              {
                label: 'API',
                desc: isTr ? 'Geliştirici erişimi ve destek sunucusu doğrulaması' : 'Developer access via official Discord server',
              },
            ],
            quickCards: [
              {
                title: isTr ? 'Komut Listesi' : 'Command Catalog',
                desc: isTr ? 'Aranabilir tüm s! komutlarını ve izinleri görüntüle.' : 'Search every s! command and required permission.',
                action: () => onTabChange('commands'),
                icon: <TerminalIcon className="w-4 h-4" />,
              },
              {
                title: 'Wiki',
                desc: isTr ? 'Kurulum adımları ve modül kullanım kılavuzlarını incele.' : 'Explore setup steps and module usage manuals.',
                action: () => onTabChange('wiki'),
                icon: <BookOpenIcon className="w-4 h-4" />,
              },
              {
                title: isTr ? 'Özellik Vitrini' : 'Feature Modules',
                desc: isTr ? 'Ekonomi ve bilet simülatörlerini canlı test et.' : 'Try interactive economy and ticket simulations.',
                action: () => onTabChange('features', 'moderation'),
                icon: <ShieldIcon className="w-4 h-4" />,
              },
              {
                title: isTr ? 'Destek Sunucusu' : 'Support Server',
                desc: isTr ? 'Canlı yardım ve API erişimi için topluluğa katıl.' : 'Join our community for live help and API access.',
                action: () => window.open(SUPPORT_SERVER_URL, '_blank', 'noopener,noreferrer'),
                icon: <UserIcon className="w-4 h-4" />,
              },
            ],
          },
          {
            id: 'syntax',
            heading: isTr ? 'Sözdizimi Kuralları' : 'Syntax Conventions',
            paragraphs: [
              isTr
                ? 'Synaps tüm komutlarda s! ön ekini kullanır. Açılı parantezler (<...>) zorunlu parametreleri, köşeli parantezler ([...]) ise isteğe bağlı parametreleri belirtir.'
                : 'Synaps uses the s! prefix across all commands. Angle brackets (<...>) indicate required inputs while square brackets ([...]) indicate optional arguments.',
            ],
            code: 's!<komut> <zorunlu_parametre> [istege_bagli]',
            table: {
              headers: isTr
                ? ['İfade', 'Anlamı', 'Örnek']
                : ['Token', 'Meaning', 'Example'],
              rows: isTr
                ? [
                    ['<parametre>', 'Zorunlu giriş alanı', 's!ban <@üye> <sebep>'],
                    ['[parametre]', 'İsteğe bağlı alan', 's!daily [bonus]'],
                    ['@üye / ID', 'Discord kullanıcı etiketi veya kimliği', '@Máve'],
                    ['#kanal', 'Metin veya destek kanalı referansı', '#destek'],
                  ]
                : [
                    ['<param>', 'Required input argument', 's!ban <@user> <reason>'],
                    ['[param]', 'Optional input argument', 's!daily [bonus]'],
                    ['@user / ID', 'Discord mention or user ID', '@Máve'],
                    ['#channel', 'Target Discord text channel', '#support'],
                  ],
            },
          },
        ],
      },
      {
        id: 'quickstart',
        groupId: 'start',
        groupTitle: isTr ? 'Başlangıç' : 'Getting Started',
        title: isTr ? 'Hızlı Kurulum' : 'Quick Setup',
        subtitle: isTr
          ? 'Synaps’ı sunucunuza 3 adımda sorunsuz şekilde entegre edin.'
          : 'Integrate Synaps into your Discord server cleanly in 3 steps.',
        sections: [
          {
            id: 'invite-bot',
            heading: isTr ? '1. Botu Sunucuya Davet Etme' : '1. Inviting the Bot',
            paragraphs: [
              isTr
                ? 'Resmi OAuth2 davet bağlantısını kullanarak Synaps’ı yönetici olduğunuz sunucuya ekleyin. Bot rolünün otomatik oluşturulması için tüm önerilen izinleri onaylayın.'
                : 'Use the official OAuth2 invite URL to authorize Synaps in a server where you hold Manage Server permissions.',
            ],
            callout: {
              title: isTr ? 'Rol Sıralaması Notu' : 'Role Hierarchy Note',
              body: isTr
                ? 'Sunucu Ayarları > Roller bölümünden Synaps rolünü moderasyon uygulayacağı ve otorol atayacağı üye rollerinin üzerine taşıyın.'
                : 'Move the Synaps role above member roles in Server Settings > Roles so auto-roles and sanctions work reliably.',
            },
          },
          {
            id: 'initial-cmds',
            heading: isTr ? '2. İlk Yapılandırma Komutları' : '2. Initial Commands',
            paragraphs: [
              isTr
                ? 'Kurulum sonrası koruma kalkanını etkinleştirmek ve destek panelini oluşturmak için aşağıdaki başlangıç komutlarını çalıştırın.'
                : 'Execute the following commands right after onboarding to enable shields and initialize support channels.',
            ],
            code: 's!protection on\ns!auto-role @Üye\ns!ticket-panel #destek',
          },
        ],
      },
      {
        id: 'api-access',
        groupId: 'dev',
        groupTitle: isTr ? 'Geliştirici' : 'Developer',
        title: isTr ? 'API Erişimi' : 'API Access',
        subtitle: isTr
          ? 'Geliştirici entegrasyonları ve erişim koşulları.'
          : 'Developer integrations and access policy.',
        sections: [
          {
            id: 'discord-required',
            heading: isTr ? 'Discord Sunucusu Katılım Şartı' : 'Discord Server Requirement',
            paragraphs: [
              isTr
                ? 'Synaps web portalı üzerinden herkese açık API anahtarı dağıtılmaz. Geliştirici erişimi ve özel entegrasyon talepleri yalnızca resmi Discord sunucumuz üzerinden değerlendirilir.'
                : 'Synaps does not distribute public API keys directly on the web. Developer access and custom integrations are granted exclusively inside our official Discord server.',
            ],
            callout: {
              title: isTr ? 'Nasıl Başvurulur?' : 'How to Apply',
              body: isTr
                ? 'Resmi Discord destek sunucumuza (discord.gg/synap) katılın ve geliştirici/destek kanallarından ekibimizle iletişime geçin.'
                : 'Join our official Discord server (discord.gg/synap) and open a request in the developer support channel.',
            },
            quickCards: [
              {
                title: isTr ? 'Discord Sunucusuna Katıl' : 'Join Discord Server',
                desc: 'discord.gg/synap',
                action: () => window.open(SUPPORT_SERVER_URL, '_blank', 'noopener,noreferrer'),
                icon: <ArrowRightIcon className="w-4 h-4" />,
              },
            ],
          },
        ],
      },
      {
        id: 'cmd-overview',
        groupId: 'commands',
        groupTitle: isTr ? 'Komutlar' : 'Commands',
        title: isTr ? 'Komutlara Genel Bakış' : 'Commands Overview',
        subtitle: isTr
          ? 'Slash gecikmesi olmayan yüksek hızlı s! komut mimarisi.'
          : 'Sub-second prefix command architecture without slash menu delays.',
        sections: [
          {
            id: 'categories',
            heading: isTr ? 'Komut Kategorileri' : 'Command Categories',
            paragraphs: [
              isTr
                ? `Synaps toplam ${BOT_COMMANDS.length} doğrulanmış komutla 7 ana kategori altında çalışır. Aşağıdan bir kategori seçerek tüm komutları, parametre tablolarını ve yetki gereksinimlerini inceleyebilirsiniz.`
                : `Synaps ships with ${BOT_COMMANDS.length} verified commands organized into 7 categories. Pick a category below to inspect syntax, parameter tables, and permissions.`,
            ],
            code: 's!help [kategori | komut]',
            quickCards: [
              {
                title: `${t.commandsPage.categories.moderation} (${BOT_COMMANDS.filter((c) => c.category === 'moderation').length})`,
                desc: isTr ? 'Güvenlik, anti-raid, kanal kilitleme ve sicil.' : 'Security, anti-raid, locks, and strikes.',
                action: () => selectDocPage('cmd-moderation'),
                icon: <ShieldIcon className="w-4 h-4" />,
              },
              {
                title: `${t.commandsPage.categories.economy} (${BOT_COMMANDS.filter((c) => c.category === 'economy').length})`,
                desc: isTr ? 'Cüzdan, korumalı kasa, günlük ve transfer.' : 'Wallet, vault storage, daily, and pay.',
                action: () => selectDocPage('cmd-economy'),
                icon: <CoinsIcon className="w-4 h-4" />,
              },
              {
                title: `${t.commandsPage.categories.profession} (${BOT_COMMANDS.filter((c) => c.category === 'profession').length})`,
                desc: isTr ? 'Kariyer seçimi, vardiya ve XP.' : 'Careers, work shifts, and XP.',
                action: () => selectDocPage('cmd-profession'),
                icon: <BriefcaseIcon className="w-4 h-4" />,
              },
              {
                title: `${t.commandsPage.categories.market} (${BOT_COMMANDS.filter((c) => c.category === 'market').length})`,
                desc: isTr ? 'Sunucu mağazası, envanter ve borsa.' : 'Guild store, inventory, and stocks.',
                action: () => selectDocPage('cmd-market'),
                icon: <StoreIcon className="w-4 h-4" />,
              },
              {
                title: `${t.commandsPage.categories.gambling} (${BOT_COMMANDS.filter((c) => c.category === 'gambling').length})`,
                desc: isTr ? 'Yazı tura, zar ve mini oyunlar.' : 'Coinflip, dice, and mini-games.',
                action: () => selectDocPage('cmd-gambling'),
                icon: <CoinsIcon className="w-4 h-4" />,
              },
              {
                title: `${t.commandsPage.categories.utility} (${BOT_COMMANDS.filter((c) => c.category === 'utility').length})`,
                desc: isTr ? 'Anket, hatırlatıcı ve bilgi araçları.' : 'Polls, reminders, and diagnostics.',
                action: () => selectDocPage('cmd-utility'),
                icon: <WrenchIcon className="w-4 h-4" />,
              },
              {
                title: `${t.commandsPage.categories.user} (${BOT_COMMANDS.filter((c) => c.category === 'user').length})`,
                desc: isTr ? 'Profil kartı, rozetler ve sıralama.' : 'Profile cards, badges, and ranks.',
                action: () => selectDocPage('cmd-user'),
                icon: <UserIcon className="w-4 h-4" />,
              },
            ],
          },
          {
            id: 'ticket-quick',
            heading: isTr ? 'Destek Bilet Komutları' : 'Support Ticket Commands',
            paragraphs: [
              isTr
                ? 'Destek kanalı oluşturma ve panel kurulum komutları için Sistemler altındaki Destek Biletleri rehberine geçebilirsiniz.'
                : 'See the Support Desk Tickets guide under Systems for panel deployment and transcript archival.',
            ],
            quickCards: [
              {
                title: isTr ? 'Destek Biletleri Rehberi' : 'Support Desk Guide',
                desc: 's!ticket-panel · s!ticket-settings',
                action: () => selectDocPage('sys-tickets'),
                icon: <TicketIcon className="w-4 h-4" />,
              },
              {
                title: isTr ? 'Tüm Komut Gezgini' : 'Full Command Explorer',
                desc: isTr ? 'Arama ve izin filtreli komut listesi' : 'Filterable command catalog view',
                action: () => onTabChange('commands'),
                icon: <TerminalIcon className="w-4 h-4" />,
              },
            ],
          },
        ],
      },
      {
        id: 'cmd-moderation',
        groupId: 'commands',
        groupTitle: isTr ? 'Komutlar' : 'Commands',
        title: t.commandsPage.categories.moderation,
        subtitle: isTr
          ? 'Sunucu güvenliği, anti-raid koruma, ihtar sicili ve kanal kilitleme komutları.'
          : 'Server security, anti-raid protection, strike records, and channel locks.',
        sections: [
          {
            id: 'mod-list',
            heading: isTr ? 'Moderasyon Komutları' : 'Moderation Commands',
            paragraphs: [
              isTr
                ? 'Aşağıdaki komutlar Discord rol izinleri doğrulanarak anında uygulanır.'
                : 'Commands below execute with Discord permission verification.',
            ],
            commandCategory: 'moderation',
          },
        ],
      },
      {
        id: 'cmd-economy',
        groupId: 'commands',
        groupTitle: isTr ? 'Komutlar' : 'Commands',
        title: t.commandsPage.categories.economy,
        subtitle: isTr
          ? 'Cüzdan, korumalı banka kasası, günlük seri ve transfer komutları.'
          : 'Wallet, protected bank vault, daily streaks, and transfers.',
        sections: [
          {
            id: 'eco-list',
            heading: isTr ? 'Ekonomi Komutları' : 'Economy Commands',
            paragraphs: [
              isTr
                ? 'Üyelerin günlük aktivitesini artıran sanal ekonomi komutları.'
                : 'Virtual economy commands powering daily guild engagement.',
            ],
            commandCategory: 'economy',
          },
        ],
      },
      {
        id: 'cmd-profession',
        groupId: 'commands',
        groupTitle: isTr ? 'Komutlar' : 'Commands',
        title: t.commandsPage.categories.profession,
        subtitle: isTr
          ? 'Meslek seçimi, vardiya tamamlama ve kariyer gelişimi komutları.'
          : 'Career selection, shift completion, and progression commands.',
        sections: [
          {
            id: 'prof-list',
            heading: isTr ? 'Meslek Komutları' : 'Profession Commands',
            paragraphs: [
              isTr
                ? 'Düzenli vardiya ile maaş ve kariyer XP’si kazandıran komutlar.'
                : 'Commands for working shifts and unlocking higher career tiers.',
            ],
            commandCategory: 'profession',
          },
        ],
      },
      {
        id: 'cmd-gambling',
        groupId: 'commands',
        groupTitle: isTr ? 'Komutlar' : 'Commands',
        title: t.commandsPage.categories.gambling,
        subtitle: isTr
          ? 'Yazı tura, zar, rulet ve şans tabanlı mini oyun komutları.'
          : 'Coinflip, dice, roulette, and chance-based mini-game commands.',
        sections: [
          {
            id: 'gamb-list',
            heading: isTr ? 'Şans Oyunları Komutları' : 'Gambling Commands',
            paragraphs: [
              isTr
                ? 'Tamamen sanal sunucu bakiyesi ile çalışan adil mini oyunlar.'
                : 'Fair mini-games operating solely with virtual guild balance.',
            ],
            commandCategory: 'gambling',
          },
        ],
      },
      {
        id: 'cmd-market',
        groupId: 'commands',
        groupTitle: isTr ? 'Komutlar' : 'Commands',
        title: t.commandsPage.categories.market,
        subtitle: isTr
          ? 'Mağaza, envanter yönetimi, takviye kullanımı ve borsa komutları.'
          : 'Storefront, inventory management, boosters, and stock market commands.',
        sections: [
          {
            id: 'mkt-list',
            heading: isTr ? 'Market & Envanter Komutları' : 'Market & Inventory Commands',
            paragraphs: [
              isTr
                ? 'Sunucu içi rol ödülleri ve profil öğelerini yöneten komutlar.'
                : 'Commands managing guild role rewards and profile items.',
            ],
            commandCategory: 'market',
          },
        ],
      },
      {
        id: 'cmd-utility',
        groupId: 'commands',
        groupTitle: isTr ? 'Komutlar' : 'Commands',
        title: t.commandsPage.categories.utility,
        subtitle: isTr
          ? 'Bilgi sorgulama, anket, hatırlatıcı ve tanılama araçları.'
          : 'Diagnostics, polls, reminders, and utility inspection commands.',
        sections: [
          {
            id: 'util-list',
            heading: isTr ? 'Araç Komutları' : 'Utility Commands',
            paragraphs: [
              isTr
                ? 'Sunucu ve üye istatistiklerini hızlıca görüntüleyen yardımcı komutlar.'
                : 'Utility tools for server metrics, user lookups, and polls.',
            ],
            commandCategory: 'utility',
          },
        ],
      },
      {
        id: 'cmd-user',
        groupId: 'commands',
        groupTitle: isTr ? 'Komutlar' : 'Commands',
        title: t.commandsPage.categories.user,
        subtitle: isTr
          ? 'Özel profil kartı, seviye sıralaması, rozetler ve sosyal komutlar.'
          : 'Custom profile cards, rank progress, badges, and social commands.',
        sections: [
          {
            id: 'usr-list',
            heading: isTr ? 'Kullanıcı & Sosyal Komutları' : 'User & Social Commands',
            paragraphs: [
              isTr
                ? 'Üyelerin seviye, rozet ve profil özelleştirmelerini yöneten komutlar.'
                : 'Commands for inspecting ranks, badges, and social cards.',
            ],
            commandCategory: 'user',
          },
        ],
      },
      {
        id: 'sys-protection',
        groupId: 'systems',
        groupTitle: isTr ? 'Sistemler' : 'Systems',
        title: isTr ? 'Otomatik Koruma Sistemi' : 'Automated Protection',
        subtitle: isTr
          ? 'Anti-raid, kimlik avı engelleme ve hız sınırı koruması.'
          : 'Anti-raid burst locks, phishing neutralization, and rate limits.',
        sections: [
          {
            id: 'prot-how',
            heading: isTr ? 'Nasıl Çalışır?' : 'How It Works',
            paragraphs: [
              isTr
                ? 'Koruma motoru sohbet mesajlarını ve yeni üye katılımlarını gerçek zamanlı analiz eder. Şüpheli bağlantıları siler, seri etiket saldırılarında kullanıcıyı otomatik susturur.'
                : 'The inspection engine monitors messages and join bursts in real time, purging malicious domains and applying sub-second timeouts on spam floods.',
            ],
            code: 's!protection on\ns!protection status',
          },
        ],
      },
      {
        id: 'sys-economy',
        groupId: 'systems',
        groupTitle: isTr ? 'Sistemler' : 'Systems',
        title: isTr ? 'Banka Kasaları & Ekonomi' : 'Bank Vaults & Economy',
        subtitle: isTr
          ? 'Soygun korumalı kasa altyapısı ve günlük seri bonusları.'
          : 'Rob-proof vault storage and compounding daily streak rewards.',
        sections: [
          {
            id: 'vault-rules',
            heading: isTr ? 'Cüzdan ve Kasa Farkı' : 'Wallet vs. Vault',
            paragraphs: [
              isTr
                ? 'Cüzdanda tutulan bakiyeler harcama ve oyunlar için hazırdır ancak s!rob hedefi olabilir. s!deposit komutuyla kasaya aktarılan altınlar tamamen güvendedir.'
                : 'Liquid wallet funds are usable in games and shops, whereas funds transferred via s!deposit into the vault are 100% protected from robbery.',
            ],
            code: 's!daily\ns!deposit all\ns!bank',
          },
        ],
      },
      {
        id: 'sys-tickets',
        groupId: 'systems',
        groupTitle: isTr ? 'Sistemler' : 'Systems',
        title: isTr ? 'Destek Biletleri (Ticket)' : 'Support Desk Tickets',
        subtitle: isTr
          ? 'Özel izinli destek odaları ve kapanış HTML transkriptleri.'
          : 'Isolated support channels with automated HTML transcript archival.',
        sections: [
          {
            id: 'ticket-setup',
            heading: isTr ? 'Panel Kurulumu' : 'Panel Setup',
            paragraphs: [
              isTr
                ? 'Önce s!ticket-settings ile yetkili rolünü ve kategori konteynerini belirleyin, ardından hedef kanalda s!ticket-panel komutunu çalıştırın.'
                : 'Configure staff roles and target category via s!ticket-settings, then deploy the interactive embed using s!ticket-panel.',
            ],
            code: 's!ticket-settings role @DestekEkibi\ns!ticket-panel #destek',
          },
        ],
      },
      {
        id: 'sys-careers',
        groupId: 'systems',
        groupTitle: isTr ? 'Sistemler' : 'Systems',
        title: isTr ? 'Kariyer & XP Sistemi' : 'Careers & XP System',
        subtitle: isTr
          ? '4 kademeli meslek ilerlemesi ve otomatik rol ödülleri.'
          : '4-tier career progression ladder with automatic role rewards.',
        sections: [
          {
            id: 'career-loop',
            heading: isTr ? 'İlerleme Döngüsü' : 'Progression Loop',
            paragraphs: [
              isTr
                ? 'Üyeler s!professions ile mevcut meslekleri inceleyip vardiya tamamladıkça XP kazanır. Üst kademeler daha yüksek maaş ve daha kısa bekleme süresi sunar.'
                : 'Members browse careers via s!professions and accumulate XP on each s!work shift to unlock higher wages and shorter cooldowns.',
            ],
            code: 's!professions\ns!work\ns!myjob',
          },
        ],
      },
      {
        id: 'srv-permissions',
        groupId: 'server',
        groupTitle: isTr ? 'Bu Sunucuda' : 'Server Setup',
        title: isTr ? 'Yetki Ayarları' : 'Permission Settings',
        subtitle: isTr
          ? 'Botun tüm modülleri çalıştırabilmesi için gereken Discord izinleri.'
          : 'Discord permissions required for Synaps modules.',
        sections: [
          {
            id: 'perm-list',
            heading: isTr ? 'Temel İzinler' : 'Core Permissions',
            paragraphs: [
              isTr
                ? 'Moderasyon, destek kanalı oluşturma ve otorol özellikleri için aşağıdaki izinlerin aktif olması gerekir.'
                : 'Ensure these core permissions are enabled for moderation, tickets, and auto-roles.',
            ],
            bullets: [
              {
                label: 'Manage Roles',
                desc: isTr ? 'Otomatik üye rolleri ve mağaza rol teslimatları için' : 'For auto-roles and store role delivery',
              },
              {
                label: 'Manage Channels',
                desc: isTr ? 'Destek bileti kanalları açma ve kanal kilitleme için' : 'For creating ticket rooms and locking channels',
              },
              {
                label: 'Moderate Members',
                desc: isTr ? 'Otomatik ve manuel zaman aşımı (timeout) işlemleri için' : 'For automated and manual timeouts',
              },
              {
                label: 'Manage Messages & Embed Links',
                desc: isTr ? 'Spam temizleme ve zengin embed kartları gönderme için' : 'For message purges and rich embed cards',
              },
            ],
          },
        ],
      },
      {
        id: 'srv-ads',
        groupId: 'server',
        groupTitle: isTr ? 'Bu Sunucuda' : 'Server Setup',
        title: isTr ? 'Reklam & Katılım Şartı' : 'Ads & Join Gate',
        subtitle: isTr
          ? 'Komut kullanım şartı olarak sunucunuza katılma yapılandırması.'
          : 'Require joining your server before running selected commands.',
        sections: [
          {
            id: 'ads-flow',
            heading: isTr ? 'Doğrulama Akışı' : 'Verification Flow',
            paragraphs: [
              isTr
                ? 'Reklam modülü, belirlenen komutlar çalıştırılmadan önce kullanıcının hedef sunucuda üye olup olmadığını anlık kontrol eder. Kullanıcı sunucuya katıldığı saniye kilit açılır.'
                : 'The join gate checks guild membership before selected commands execute. Once a member joins, access unlocks immediately.',
            ],
            quickCards: [
              {
                title: isTr ? 'Reklamlar Sayfasını Gör' : 'View Ads Page',
                desc: isTr ? '3 adımlı katılım doğrulama akışını incele.' : 'Inspect the 3-step join verification flow.',
                action: () => onTabChange('ads'),
                icon: <ArrowRightIcon className="w-4 h-4" />,
              },
            ],
          },
        ],
      },
    ],
    [isTr, t, onTabChange]
  );

  const filteredPages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return pages;
    return pages.filter((p) => {
      const pageMatches =
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.sections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            s.paragraphs.some((para) => para.toLowerCase().includes(q))
        );
      if (pageMatches) return true;

      const cmdMatch = p.sections.some(
        (s) =>
          s.commandCategory &&
          BOT_COMMANDS.some(
            (c) =>
              c.category === s.commandCategory &&
              (c.name.toLowerCase().includes(q) ||
                c.usage.toLowerCase().includes(q) ||
                c.description.toLowerCase().includes(q))
          )
      );
      return cmdMatch;
    });
  }, [pages, searchQuery]);

  const activePage = useMemo(
    () => pages.find((p) => p.id === activePageId) || pages[0],
    [pages, activePageId]
  );

  const activeIndex = pages.findIndex((p) => p.id === activePage.id);
  const prevPage = activeIndex > 0 ? pages[activeIndex - 1] : null;
  const nextPage = activeIndex < pages.length - 1 ? pages[activeIndex + 1] : null;

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const selectDocPage = (pageId: string) => {
    setActivePageId(pageId);
    setCmdFilter('');
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const matchedCommands = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return BOT_COMMANDS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.usage.toLowerCase().includes(q) ||
        (t.commandsPage.descriptions?.[c.name] || c.description).toLowerCase().includes(q)
    ).slice(0, 6);
  }, [searchQuery, t]);

  const selectCommandFromSearch = (category: string, cmdName: string) => {
    setActivePageId(`cmd-${category}`);
    setCmdFilter(cmdName);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(`doc-sec-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sidebarContent = (
    <div className="space-y-5">
      {/* Sidebar Header + Search (⌘ K) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-neutral-950 dark:text-white tracking-tight">
            {isTr ? 'Dokümantasyon' : 'Documentation'}
          </span>
          <a
            href={BOT_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors"
          >
            {isTr ? 'Botu Ekle' : 'Add Bot'}
          </a>
        </div>

        <div className="relative">
          <SearchIcon className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isTr ? 'Dokümanlarda ara...' : 'Search docs...'}
            className="w-full pl-8 pr-12 py-2 rounded-lg bg-neutral-100/90 dark:bg-[#0c0c0e] border border-neutral-200/90 dark:border-white/[0.1] text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/15"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800 dark:hover:text-white cursor-pointer"
            >
              <CloseIcon className="w-3 h-3" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-white dark:bg-white/[0.06] border border-neutral-200 dark:border-white/[0.1] text-[10px] font-mono text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              ⌘ K
            </kbd>
          )}
        </div>

        {matchedCommands.length > 0 && (
          <div className="rounded-xl bg-neutral-50 dark:bg-[#121215] border border-neutral-200/80 dark:border-white/[0.1] p-2 space-y-1">
            <div className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              {isTr ? 'Komut Eşleşmeleri' : 'Command Matches'}
            </div>
            {matchedCommands.map((cmd) => (
              <button
                key={cmd.name}
                type="button"
                onClick={() => selectCommandFromSearch(cmd.category, cmd.name)}
                className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-neutral-200/70 dark:hover:bg-[#17171a] transition-colors cursor-pointer flex items-center justify-between gap-2"
              >
                <span className="font-mono text-[11px] font-semibold text-neutral-900 dark:text-white truncate">
                  {cmd.name}
                </span>
                <ChevronRightIcon className="w-3 h-3 text-neutral-400 shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Collapsible Sidebar Tree */}
      <nav className="space-y-3" aria-label="Documentation navigation">
        {docGroups.map((group) => {
          const groupPages = group.pageIds
            .map((pid) => filteredPages.find((p) => p.id === pid))
            .filter((p): p is DocPage => Boolean(p));

          if (groupPages.length === 0) return null;

          const isOpen = searchQuery.trim() ? true : openGroups[group.id] !== false;

          return (
            <div key={group.id} className="space-y-1">
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.06] hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="text-neutral-500 dark:text-neutral-400 shrink-0">
                    {group.icon}
                  </span>
                  <span className="truncate">{group.title}</span>
                </span>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-150 shrink-0 ${
                    isOpen ? '' : '-rotate-90'
                  }`}
                />
              </button>

              {isOpen && (
                <div className="ml-3 pl-3 border-l border-neutral-200 dark:border-white/[0.1] space-y-0.5">
                  {groupPages.map((page) => {
                    const isActive = page.id === activePage.id;
                    const cmdCat = page.sections.find((s) => s.commandCategory)?.commandCategory;
                    const catCount = cmdCat
                      ? BOT_COMMANDS.filter((c) => c.category === cmdCat).length
                      : null;

                    return (
                      <button
                        type="button"
                        key={page.id}
                        onClick={() => selectDocPage(page.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                          isActive
                            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.06] hover:text-neutral-950 dark:hover:text-white'
                        }`}
                      >
                        <span className="truncate">{page.title}</span>
                        {catCount !== null && (
                          <span className="text-[10px] font-mono tabular-nums opacity-70 shrink-0">
                            {catCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {filteredPages.length === 0 && matchedCommands.length === 0 && (
        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#121215] border border-neutral-200/80 dark:border-white/[0.08] text-center space-y-2">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {isTr ? 'Eşleşen başlık bulunamadı.' : 'No matching pages found.'}
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="px-3 py-1 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-[11px] font-semibold cursor-pointer"
          >
            {isTr ? 'Aramayı Temizle' : 'Clear Search'}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10 pb-24 text-neutral-900 dark:text-neutral-100">
      {/* Mobile Docs Sub-Header */}
      <div className="lg:hidden mb-5">
        <button
          type="button"
          onClick={() => setMobileNavOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-white/[0.12] text-xs font-semibold cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <MenuIcon className="w-4 h-4" />
            <span>
              {activePage.groupTitle} / {activePage.title}
            </span>
          </span>
          <ChevronDownIcon
            className={`w-3.5 h-3.5 transition-transform ${mobileNavOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {mobileNavOpen && (
          <div className="mt-2 p-4 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-white/[0.12] shadow-lg">
            {sidebarContent}
          </div>
        )}
      </div>

      {/* 3-Column Fumadocs Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Sidebar Tree */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 pr-4 border-r border-neutral-200/70 dark:border-white/[0.08] max-h-[calc(100vh-7rem)] overflow-y-auto">
          {sidebarContent}
        </aside>

        {/* Center Article Content */}
        <motion.article
          key={activePage.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 min-w-0 space-y-8"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
            <span>{isTr ? 'Dokümantasyon' : 'Docs'}</span>
            <ChevronRightIcon className="w-3 h-3" />
            <span>{activePage.groupTitle}</span>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-neutral-900 dark:text-white font-medium">{activePage.title}</span>
          </div>

          {/* Page Header */}
          <header className="space-y-2 pb-6 border-b border-neutral-200/80 dark:border-white/[0.08]">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              {activePage.title}
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {activePage.subtitle}
            </p>
          </header>

          {/* Sections */}
          <div className="space-y-9">
            {activePage.sections.map((section) => {
              const catCommands = section.commandCategory
                ? BOT_COMMANDS.filter((c) => c.category === section.commandCategory)
                : [];

              return (
                <section
                  key={section.id}
                  id={`doc-sec-${section.id}`}
                  className="scroll-mt-24 space-y-4"
                >
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white tracking-tight">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="space-y-2 pt-1">
                      {section.bullets.map((b, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-baseline gap-2.5 text-sm text-neutral-600 dark:text-neutral-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0 translate-y-[-1px]" />
                          <span>
                            <strong className="text-neutral-950 dark:text-white font-semibold">
                              {b.label}
                            </strong>{' '}
                            — {b.desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.metrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                      {section.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-3.5 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/90 dark:border-white/[0.1] space-y-0.5 shadow-xs"
                        >
                          <div className="text-lg font-extrabold font-mono text-neutral-950 dark:text-white tracking-tight">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.table && (
                    <div className="rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/90 dark:border-white/[0.1] overflow-x-auto shadow-xs">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-neutral-50/90 dark:bg-[#17171a] border-b border-neutral-200 dark:border-white/[0.08] text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            {section.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-4 py-3 font-semibold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-white/[0.06]">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-neutral-50/60 dark:hover:bg-white/[0.02]">
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`px-4 py-3 ${
                                    cIdx === 0 || cIdx === 2
                                      ? 'font-mono text-xs font-semibold text-neutral-950 dark:text-white whitespace-nowrap'
                                      : 'text-neutral-600 dark:text-neutral-300'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {section.code && (
                    <div className="relative rounded-xl bg-neutral-900 dark:bg-[#121215] border border-neutral-800 dark:border-white/[0.1] p-4 font-mono text-xs text-neutral-100 overflow-x-auto">
                      <button
                        type="button"
                        onClick={() => handleCopy(section.code!)}
                        className="absolute right-3 top-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        title={isTr ? 'Kopyala' : 'Copy'}
                      >
                        {copiedCode === section.code ? (
                          <CheckIcon className="w-3.5 h-3.5" />
                        ) : (
                          <CopyIcon className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <pre className="whitespace-pre-wrap pr-10 leading-relaxed">{section.code}</pre>
                    </div>
                  )}

                  {section.callout && (
                    <div className="rounded-2xl bg-neutral-50 dark:bg-[#0c0c0e] border border-neutral-200 dark:border-white/[0.12] p-4 sm:p-5 space-y-1.5">
                      <div className="text-xs font-bold text-neutral-950 dark:text-white">
                        {section.callout.title}
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {section.callout.body}
                      </p>
                    </div>
                  )}

                  {catCommands.length > 0 && (
                    <div className="space-y-4 pt-1">
                      {/* Category-local quick filter */}
                      <div className="relative max-w-sm">
                        <SearchIcon className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={cmdFilter}
                          onChange={(e) => setCmdFilter(e.target.value)}
                          placeholder={isTr ? 'Bu kategoride komut ara...' : 'Filter commands...'}
                          className="w-full pl-8 pr-8 py-2 rounded-xl bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-white/[0.12] text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/15"
                        />
                        {cmdFilter && (
                          <button
                            type="button"
                            onClick={() => setCmdFilter('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                          >
                            <CloseIcon className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-3.5">
                        {catCommands
                          .filter((cmd) => {
                            const q = cmdFilter.trim().toLowerCase();
                            if (!q) return true;
                            const desc =
                              t.commandsPage.descriptions?.[cmd.name] ||
                              cmdEx.descriptions[cmd.name] ||
                              cmd.description;
                            return (
                              cmd.name.toLowerCase().includes(q) ||
                              cmd.usage.toLowerCase().includes(q) ||
                              desc.toLowerCase().includes(q)
                            );
                          })
                          .map((cmd) => {
                            const desc =
                              t.commandsPage.descriptions?.[cmd.name] ||
                              cmdEx.descriptions[cmd.name] ||
                              cmd.description;
                            return (
                              <div
                                key={cmd.name}
                                className="rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/90 dark:border-white/[0.12] p-5 space-y-3.5 shadow-xs"
                              >
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <code className="font-mono text-xs sm:text-[13px] font-bold text-neutral-950 dark:text-white bg-neutral-100 dark:bg-[#17171a] border border-neutral-200 dark:border-white/[0.1] px-2.5 py-1 rounded-lg">
                                    {cmd.usage}
                                  </code>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                                      {cmd.permissions
                                        ? cmdEx.permissions[cmd.permissions] || cmd.permissions
                                        : isTr
                                          ? 'Herkese Açık'
                                          : 'Public'}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleCopy(cmd.usage)}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.15] text-neutral-800 dark:text-white text-[11px] font-medium transition-colors cursor-pointer"
                                      title={isTr ? 'Kopyala' : 'Copy'}
                                    >
                                      {copiedCode === cmd.usage ? (
                                        <>
                                          <CheckIcon className="w-3 h-3" />
                                          <span>{isTr ? 'Kopyalandı' : 'Copied'}</span>
                                        </>
                                      ) : (
                                        <>
                                          <CopyIcon className="w-3 h-3" />
                                          <span>{isTr ? 'Kopyala' : 'Copy'}</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>

                                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                  {desc}
                                </p>

                                {cmd.options && cmd.options.length > 0 && (
                                  <div className="pt-3 border-t border-neutral-100 dark:border-white/[0.08] overflow-x-auto">
                                    <table className="w-full text-left border-collapse text-xs">
                                      <thead>
                                        <tr className="text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 border-b border-neutral-100 dark:border-white/[0.06]">
                                          <th className="pb-1.5 pr-4 font-semibold">
                                            {isTr ? 'Parametre' : 'Parameter'}
                                          </th>
                                          <th className="pb-1.5 pr-4 font-semibold">
                                            {isTr ? 'Durum' : 'Status'}
                                          </th>
                                          <th className="pb-1.5 font-semibold">
                                            {isTr ? 'Açıklama' : 'Description'}
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-neutral-100/80 dark:divide-white/[0.05]">
                                        {cmd.options.map((opt, oIdx) => (
                                          <tr key={oIdx}>
                                            <td className="py-2 pr-4 font-mono font-semibold text-neutral-950 dark:text-white whitespace-nowrap">
                                              {opt.required ? `<${opt.name}>` : `[${opt.name}]`}
                                            </td>
                                            <td className="py-2 pr-4 font-mono text-[11px] text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                                              {opt.required
                                                ? isTr
                                                  ? 'Zorunlu'
                                                  : 'Required'
                                                : isTr
                                                  ? 'İsteğe bağlı'
                                                  : 'Optional'}
                                            </td>
                                            <td className="py-2 text-neutral-600 dark:text-neutral-300">
                                              {cmdEx.options[opt.description] || opt.description}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {section.quickCards && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {section.quickCards.map((card, cIdx) => (
                        <button
                          type="button"
                          key={cIdx}
                          onClick={card.action}
                          className="group text-left p-4 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/90 dark:border-white/[0.12] hover:border-neutral-400 dark:hover:border-white/25 transition-all cursor-pointer space-y-2"
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/[0.1] flex items-center justify-center text-neutral-900 dark:text-white group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-950 transition-colors">
                            {card.icon}
                          </div>
                          <div className="text-sm font-bold text-neutral-950 dark:text-white">
                            {card.title}
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-snug">
                            {card.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Bottom Prev / Next Doc Pagination */}
          <div className="pt-8 mt-10 border-t border-neutral-200/80 dark:border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prevPage ? (
              <button
                type="button"
                onClick={() => selectDocPage(prevPage.id)}
                className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1] hover:border-neutral-400 dark:hover:border-white/25 text-left transition-colors cursor-pointer space-y-1"
              >
                <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                  <ArrowLeftIcon className="w-3 h-3" />
                  <span>{isTr ? 'Önceki' : 'Previous'}</span>
                </span>
                <div className="text-sm font-bold text-neutral-950 dark:text-white truncate">
                  {prevPage.title}
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextPage && (
              <button
                type="button"
                onClick={() => selectDocPage(nextPage.id)}
                className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-neutral-200/80 dark:border-white/[0.1] hover:border-neutral-400 dark:hover:border-white/25 text-right transition-colors cursor-pointer space-y-1"
              >
                <span className="inline-flex items-center justify-end gap-1 text-[11px] text-neutral-500 dark:text-neutral-400 w-full">
                  <span>{isTr ? 'Sonraki' : 'Next'}</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </span>
                <div className="text-sm font-bold text-neutral-950 dark:text-white truncate">
                  {nextPage.title}
                </div>
              </button>
            )}
          </div>
        </motion.article>

        {/* Right "Bu Sayfada" TOC */}
        <aside className="hidden xl:block xl:col-span-2 sticky top-24 space-y-3 pl-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {isTr ? 'Bu Sayfada' : 'On This Page'}
          </div>
          <ul className="space-y-2 border-l border-neutral-200 dark:border-white/[0.1] pl-3">
            {activePage.sections.map((sec) => (
              <li key={sec.id}>
                <button
                  type="button"
                  onClick={() => scrollToHeading(sec.id)}
                  className="text-left text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer leading-snug"
                >
                  {sec.heading}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};
