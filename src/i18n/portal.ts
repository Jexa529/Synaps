import { Language } from './types';

export interface PortalTranslation {
  nav: {
    market: string;
    other: string;
    marketDropdown: {
      marketTitle: string;
      marketDesc: string;
      premiumTitle: string;
      premiumDesc: string;
      adsTitle: string;
      adsDesc: string;
      partnerTitle: string;
      partnerDesc: string;
    };
    otherDropdown: {
      faqTitle: string;
      faqDesc: string;
      changelogTitle: string;
      changelogDesc: string;
      wikiTitle: string;
      wikiDesc: string;
      statusTitle: string;
      statusDesc: string;
      feedbackTitle: string;
      feedbackDesc: string;
      docsTitle: string;
      docsDesc: string;
      apiTitle: string;
      apiDesc: string;
      premiumTitle: string;
      premiumDesc: string;
    };
  };
  marketPage: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyDesc: string;
    browseCommands: string;
    backHome: string;
  };
  statusPage: {
    title: string;
    subtitle: string;
    refresh: string;
    refreshing: string;
    lastChecked: string;
    botIdentity: string;
    botIdLabel: string;
    verifiedBadge: string;
    createdAt: string;
    apiHealth: string;
    gatewayHealth: string;
    operational: string;
    degraded: string;
    latencyUnit: string;
    discordPlatform: string;
    infraHealthLabel: string;
    servicesActiveSuffix: string;
    errorBanner: string;
    retry: string;
    inviteBot: string;
  };
  subPages: {
    premiumTitle: string;
    premiumSubtitle: string;
    premiumEmptyNotice: string;
    adsTitle: string;
    adsSubtitle: string;
    adsDesc: string;
    adsStep1Title: string;
    adsStep1Desc: string;
    adsStep2Title: string;
    adsStep2Desc: string;
    adsStep3Title: string;
    adsStep3Desc: string;
    changelogTitle: string;
    changelogSubtitle: string;
    faqTitle: string;
    faqSubtitle: string;
    faqSearchPlaceholder: string;
    wikiTitle: string;
    wikiSubtitle: string;
    docsTitle: string;
    docsSubtitle: string;
    apiKeysTitle: string;
    apiKeysSubtitle: string;
    apiKeysJoinTitle: string;
    apiKeysJoinDesc: string;
    apiKeysJoinBtn: string;
    apiKeysJoinSteps: [string, string, string];
    feedbackTitle: string;
    feedbackSubtitle: string;
    feedbackTypeLabel: string;
    feedbackTypes: [string, string, string];
    feedbackContactPlaceholder: string;
    feedbackSubjectPlaceholder: string;
    feedbackMessagePlaceholder: string;
    feedbackSubmit: string;
    feedbackSending: string;
    feedbackSuccess: string;
    feedbackError: string;
  };
}

const trPortal: PortalTranslation = {
  nav: {
    market: 'Market',
    other: 'Diğer',
    marketDropdown: {
      marketTitle: 'Market',
      marketDesc: 'Mağaza ürünleri ve satın alma',
      premiumTitle: 'Premium',
      premiumDesc: 'Premium planlar ve özellikler',
      adsTitle: 'Reklamlar',
      adsDesc: 'Komut kullanım şartı olarak sunucunuza katılma.',
      partnerTitle: 'Partnerlik',
      partnerDesc: 'Sunucu iş birlikleri ve ortak topluluk büyümesi.',
    },
    otherDropdown: {
      faqTitle: 'SSS',
      faqDesc: 'Sık sorulan sorular ve kısa yanıtlar',
      changelogTitle: 'Changelog',
      changelogDesc: 'Duyurular, rehberler ve güncellemeler',
      wikiTitle: 'Wiki',
      wikiDesc: 'Kurulum ve özellik dokümantasyonu',
      statusTitle: 'Durum',
      statusDesc: 'Bot ve servis sağlık durumu',
      feedbackTitle: 'Öneri / Hata',
      feedbackDesc: 'Geri bildirim ve hata bildirimi gönder',
      docsTitle: 'Dokümantasyon',
      docsDesc: 'Ürün dokümantasyonu',
      apiTitle: 'API',
      apiDesc: 'API erişimi ve destek sunucusu bilgileri',
      premiumTitle: 'Premium',
      premiumDesc: 'Premium planlar ve özellikler',
    },
  },
  marketPage: {
    title: 'Market',
    subtitle: 'Mağaza ürünleri ve satın alma',
    emptyTitle: 'Henüz bir şey eklenmemiş',
    emptyDesc:
      'Şu anda mağaza kataloğunda listelenen aktif bir ürün bulunmuyor. Yeni ürünler eklendiğinde burada görüntülenecektir.',
    browseCommands: 'Komutları İncele',
    backHome: 'Ana Sayfaya Dön',
  },
  statusPage: {
    title: 'Sistem ve Bot Durumu',
    subtitle: 'Canlı Discord API, Gateway gecikmesi ve platform servis sağlığı',
    refresh: 'Yenile',
    refreshing: 'Güncelleniyor...',
    lastChecked: 'Son kontrol:',
    botIdentity: 'Discord Uygulama Kimliği',
    botIdLabel: 'Bot ID',
    verifiedBadge: 'Doğrulanmış Bot',
    createdAt: 'Oluşturulma Tarihi',
    apiHealth: 'Discord Uygulama API',
    gatewayHealth: 'Discord Gateway',
    operational: 'Çalışıyor',
    degraded: 'Kısıtlı / Hata',
    latencyUnit: 'ms',
    discordPlatform: 'Discord Altyapı Durumu',
    infraHealthLabel: 'Genel Altyapı Sağlığı',
    servicesActiveSuffix: 'Servis Aktif',
    errorBanner: 'Discord verileri alınırken bir bağlantı sorunu oluştu.',
    retry: 'Tekrar Dene',
    inviteBot: 'Botu Sunucuna Ekle',
  },
  subPages: {
    premiumTitle: 'Synaps Premium',
    premiumSubtitle: 'Premium planlar ve özellikler',
    premiumEmptyNotice:
      'Premium paketler şu anda hazırlanıyor. Sunucu içi özel limitler, gelişmiş yedekleme ve öncelikli destek ayrıcalıkları yakında açılacaktır.',
    adsTitle: 'Reklamlar',
    adsSubtitle: 'Komut kullanım şartı olarak sunucunuza katılma.',
    adsDesc:
      'Topluluğunuzu organik olarak büyütmek için belirli komutların kullanımı öncesinde kullanıcıların destek sunucunuza veya partner sunucunuza katılmasını zorunlu tutan akıllı doğrulama akışı.',
    adsStep1Title: '1. Hedef Sunucu Tanımlama',
    adsStep1Desc: 'Botun bulunduğu sunucunuzun davet bağlantısını ve hedef sunucu kimliğini bağlayın.',
    adsStep2Title: '2. Komut Koşulu Seçimi',
    adsStep2Desc: 'Hangi komutların veya ekonomi işlemlerinin sunucu katılım şartı gerektireceğini belirleyin.',
    adsStep3Title: '3. Anlık Üyelik Doğrulama',
    adsStep3Desc: 'Kullanıcı sunucuya katıldığı anda komut kilidi otomatik olarak açılır ve işlem devam eder.',
    changelogTitle: 'Değişiklik Günlüğü',
    changelogSubtitle: 'Synaps güncellemeleri, yeni modüller ve sistem iyileştirmeleri',
    faqTitle: 'Sık Sorulan Sorular',
    faqSubtitle: 'Synaps bot kurulumu, komutlar ve gizlilik hakkında kısa yanıtlar',
    faqSearchPlaceholder: 'Sorularda ara...',
    wikiTitle: 'Synaps Wiki',
    wikiSubtitle: 'Kurulum adımları, rol mimarisi ve modül kullanım kılavuzları',
    docsTitle: 'Dokümantasyon',
    docsSubtitle: 'Komut sözdizimi, parametre kuralları ve bot entegrasyon referansı',
    apiKeysTitle: 'API Erişimi',
    apiKeysSubtitle: 'Geliştirici API erişimi için resmi Discord sunucumuza katılmanız gerekmektedir',
    apiKeysJoinTitle: 'Discord Sunucusu Üzerinden Erişim',
    apiKeysJoinDesc:
      'Synaps web üzerinde açık API anahtarı veya uç noktası dağıtmaz. Geliştirici erişimi, entegrasyon talepleri ve dokümantasyon desteği yalnızca resmi Discord destek sunucumuz üzerinden sağlanmaktadır.',
    apiKeysJoinBtn: 'Discord Sunucusuna Katıl',
    apiKeysJoinSteps: [
      'Resmi Synaps Discord destek sunucusuna katılın.',
      'Geliştirici veya destek kanalı üzerinden entegrasyon talebi oluşturun.',
      'Ekibimiz projeniz için gereken doğrulama adımlarını sunucu içinden iletir.',
    ],
    feedbackTitle: 'Öneri ve Hata Bildirimi',
    feedbackSubtitle: 'Geri bildirim, yeni özellik önerisi veya hata kaydı gönderin',
    feedbackTypeLabel: 'Bildirim Türü',
    feedbackTypes: ['Özellik Önerisi', 'Hata Bildirimi', 'Komut İyileştirmesi'],
    feedbackContactPlaceholder: 'Discord kullanıcı adınız (isteğe bağlı)',
    feedbackSubjectPlaceholder: 'Kısa başlık (örn: s!bank komutu hakkında öneri)',
    feedbackMessagePlaceholder: 'Detayları, yeniden oluşturma adımlarını veya önerinizi yazın...',
    feedbackSubmit: 'Discord Ekibine Gönder',
    feedbackSending: 'Gönderiliyor...',
    feedbackSuccess: 'Bildiriminiz başarıyla Discord destek kanalımıza iletildi.',
    feedbackError: 'Gönderim sırasında bir sorun oluştu. Lütfen biraz sonra tekrar deneyin.',
  },
};

const enPortal: PortalTranslation = {
  nav: {
    market: 'Market',
    other: 'More',
    marketDropdown: {
      marketTitle: 'Market',
      marketDesc: 'Store items and purchases',
      premiumTitle: 'Premium',
      premiumDesc: 'Premium plans and features',
      adsTitle: 'Ads',
      adsDesc: 'Join your server as a command usage requirement.',
      partnerTitle: 'Partnership',
      partnerDesc: 'Server collaborations and cross-community growth.',
    },
    otherDropdown: {
      faqTitle: 'FAQ',
      faqDesc: 'Frequently asked questions and quick answers',
      changelogTitle: 'Changelog',
      changelogDesc: 'Announcements, guides, and updates',
      wikiTitle: 'Wiki',
      wikiDesc: 'Setup and feature documentation',
      statusTitle: 'Status',
      statusDesc: 'Bot and service health status',
      feedbackTitle: 'Feedback / Bug',
      feedbackDesc: 'Submit feedback and bug reports',
      docsTitle: 'Documentation',
      docsDesc: 'Product documentation',
      apiTitle: 'API',
      apiDesc: 'API access and support server details',
      premiumTitle: 'Premium',
      premiumDesc: 'Premium plans and features',
    },
  },
  marketPage: {
    title: 'Market',
    subtitle: 'Store items and purchases',
    emptyTitle: 'Nothing added yet',
    emptyDesc:
      'There are currently no active items listed in the store catalog. New items will appear here once added.',
    browseCommands: 'Browse Commands',
    backHome: 'Back to Home',
  },
  statusPage: {
    title: 'System & Bot Status',
    subtitle: 'Live Discord API, Gateway latency, and platform service health',
    refresh: 'Refresh',
    refreshing: 'Refreshing...',
    lastChecked: 'Last checked:',
    botIdentity: 'Discord Application Identity',
    botIdLabel: 'Bot ID',
    verifiedBadge: 'Verified Bot',
    createdAt: 'Created At',
    apiHealth: 'Discord Application API',
    gatewayHealth: 'Discord Gateway',
    operational: 'Operational',
    degraded: 'Degraded',
    latencyUnit: 'ms',
    discordPlatform: 'Discord Infrastructure Status',
    infraHealthLabel: 'Overall Infrastructure',
    servicesActiveSuffix: 'Services Active',
    errorBanner: 'Could not reach Discord API cleanly.',
    retry: 'Retry',
    inviteBot: 'Add Bot to Server',
  },
  subPages: {
    premiumTitle: 'Synaps Premium',
    premiumSubtitle: 'Premium plans and features',
    premiumEmptyNotice:
      'Premium tiers are currently being prepared. Elevated server limits, automated backups, and priority support perks will open soon.',
    adsTitle: 'Ads & Join Gate',
    adsSubtitle: 'Join your server as a command usage requirement.',
    adsDesc:
      'Grow your Discord community organically by requiring members to join your designated server before running selected commands.',
    adsStep1Title: '1. Target Server Binding',
    adsStep1Desc: 'Link your server invite link and verified guild ID where Synaps is active.',
    adsStep2Title: '2. Command Condition Selection',
    adsStep2Desc: 'Choose which commands or economy actions require server membership.',
    adsStep3Title: '3. Instant Membership Check',
    adsStep3Desc: 'As soon as a user joins the server, the command unlocks automatically.',
    changelogTitle: 'Changelog',
    changelogSubtitle: 'Synaps updates, new modules, and platform improvements',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Quick answers on Synaps setup, commands, and privacy',
    faqSearchPlaceholder: 'Search questions...',
    wikiTitle: 'Synaps Wiki',
    wikiSubtitle: 'Setup steps, permission guidelines, and module manuals',
    docsTitle: 'Documentation',
    docsSubtitle: 'Command syntax, parameter rules, and integration reference',
    apiKeysTitle: 'API Access',
    apiKeysSubtitle: 'Joining our official Discord server is required for developer API access',
    apiKeysJoinTitle: 'Access via Discord Support Server',
    apiKeysJoinDesc:
      'Synaps does not distribute API keys or public endpoints on the web. Developer access, integration onboarding, and technical assistance are handled exclusively inside our official Discord server.',
    apiKeysJoinBtn: 'Join Discord Server',
    apiKeysJoinSteps: [
      'Join the official Synaps Discord support server.',
      'Open a developer inquiry in the support channels.',
      'Our team will guide you through verification directly in Discord.',
    ],
    feedbackTitle: 'Feedback & Bug Report',
    feedbackSubtitle: 'Share suggestions, feature requests, or bug reports',
    feedbackTypeLabel: 'Report Type',
    feedbackTypes: ['Feature Request', 'Bug Report', 'Command Improvement'],
    feedbackContactPlaceholder: 'Your Discord username (optional)',
    feedbackSubjectPlaceholder: 'Short title (e.g. Suggestion for s!bank command)',
    feedbackMessagePlaceholder: 'Describe the details, reproduction steps, or your idea...',
    feedbackSubmit: 'Send to Discord Team',
    feedbackSending: 'Sending...',
    feedbackSuccess: 'Your report has been delivered directly to our Discord feedback channel.',
    feedbackError: 'Delivery failed. Please try again in a moment.',
  },
};

export const portalTranslations: Record<Language, PortalTranslation> = {
  tr: trPortal,
  en: enPortal,
  de: enPortal,
  fr: enPortal,
  es: enPortal,
  it: enPortal,
  ar: enPortal,
  ko: enPortal,
  ja: enPortal,
  ru: enPortal,
  pt: enPortal,
  nl: enPortal,
};
