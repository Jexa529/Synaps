export type TabType =
  | 'home'
  | 'about'
  | 'features'
  | 'commands'
  | 'cookie-policy'
  | 'terms-of-service'
  | 'privacy-policy'
  | 'acceptable-use'
  | 'ai-moderation'
  | 'discord-tos';

export type FeatureSubTab = 'moderation' | 'economy' | 'tickets' | 'jobs' | 'market';

export interface BotCommand {
  name: string;
  category: 'economy' | 'profession' | 'gambling' | 'market' | 'utility' | 'moderation' | 'user';
  description: string;
  usage: string;
  permissions?: string;
  options?: { name: string; description: string; required?: boolean }[];
}

export interface BotFeature {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: string;
  stats?: string;
}
