import { TabType, FeatureSubTab } from './types';
import { PolicyKey } from './components/LegalPolicyPage';

export const TAB_PATHS: Record<TabType, string> = {
  home: '/',
  about: '/about',
  features: '/features',
  commands: '/commands',
  market: '/market',
  premium: '/premium',
  ads: '/ads',
  partner: '/partner',
  changelog: '/changelog',
  faq: '/faq',
  wiki: '/wiki',
  status: '/status',
  feedback: '/feedback',
  docs: '/docs',
  'api-keys': '/api-anahtarlari',
  'cookie-policy': '/cookie-policy',
  'terms-of-service': '/terms-of-service',
  'privacy-policy': '/privacy-policy',
  'acceptable-use': '/acceptable-use',
  'ai-moderation': '/ai-moderation',
  'discord-tos': '/discord-tos',
  login: '/login',
};

const FEATURE_SUBTABS: FeatureSubTab[] = ['moderation', 'economy', 'tickets', 'jobs', 'market'];

export function getPathForTab(tab: TabType, featureSubTab?: FeatureSubTab): string {
  if (tab === 'features' && featureSubTab && FEATURE_SUBTABS.includes(featureSubTab)) {
    return `/features/${featureSubTab}`;
  }
  return TAB_PATHS[tab] || '/';
}

export function getTabFromPath(pathname: string): {
  tab: TabType;
  featureSubTab: FeatureSubTab;
} {
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean === '/features') {
    return { tab: 'features', featureSubTab: 'moderation' };
  }

  if (clean.startsWith('/features/')) {
    const sub = clean.slice('/features/'.length) as FeatureSubTab;
    return {
      tab: 'features',
      featureSubTab: FEATURE_SUBTABS.includes(sub) ? sub : 'moderation',
    };
  }

  if (clean === '/reklamlar') {
    return { tab: 'ads', featureSubTab: 'moderation' };
  }

  if (clean === '/partnerlik') {
    return { tab: 'partner', featureSubTab: 'moderation' };
  }

  if (clean === '/api-keys') {
    return { tab: 'api-keys', featureSubTab: 'moderation' };
  }

  const matched = (Object.entries(TAB_PATHS) as [TabType, string][]).find(
    ([, path]) => path === clean
  );

  return {
    tab: matched ? matched[0] : 'home',
    featureSubTab: 'moderation',
  };
}

export function getLegalPolicyKey(tab: TabType): PolicyKey | null {
  switch (tab) {
    case 'terms-of-service':
      return 'terms';
    case 'privacy-policy':
      return 'privacy';
    case 'acceptable-use':
      return 'acceptable-use';
    case 'ai-moderation':
      return 'ai-moderation';
    case 'discord-tos':
      return 'discord-tos';
    case 'cookie-policy':
      return 'cookie';
    default:
      return null;
  }
}
