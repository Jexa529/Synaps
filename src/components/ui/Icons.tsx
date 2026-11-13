import React from 'react';

export interface IconProps {
  className?: string;
}

/**
 * Streamline HQ-inspired minimal geometric SVG icon set
 * Crisp 24x24 grid, 1.75px stroke, rounded terminals & joins
 */

export const MenuIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 7h16" />
    <path d="M4 12h12" />
    <path d="M4 17h16" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.5 6.5l-11 11" />
    <path d="M6.5 6.5l11 11" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6.5 9.5l5.5 5.5 5.5-5.5" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="M13.5 6.5L19 12l-5.5 5.5" />
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 12H5" />
    <path d="M10.5 6.5L5 12l5.5 5.5" />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.25l7 3.1v5.4c0 4.55-2.95 8.15-7 9.5-4.05-1.35-7-4.95-7-9.5v-5.4l7-3.1z" />
  </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.25l7 3.1v5.4c0 4.55-2.95 8.15-7 9.5-4.05-1.35-7-4.95-7-9.5v-5.4l7-3.1z" />
    <path d="M9.25 12.25l2 2 3.75-3.75" />
  </svg>
);

export const ShieldAlertIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.25l7 3.1v5.4c0 4.55-2.95 8.15-7 9.5-4.05-1.35-7-4.95-7-9.5v-5.4l7-3.1z" />
    <path d="M12 8.75v4" />
    <circle cx="12" cy="15.75" r="0.65" fill="currentColor" stroke="none" />
  </svg>
);

export const CoinsIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9.75" cy="10.25" r="5.5" />
    <path d="M15.75 9.25a5.5 5.5 0 1 1-4.8 9.25" />
    <path d="M9.75 8.25v4" />
  </svg>
);

export const TicketIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 6.5h15a1.5 1.5 0 0 1 1.5 1.5v2.25a1.75 1.75 0 0 0 0 3.5V16a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16v-2.25a1.75 1.75 0 0 0 0-3.5V8a1.5 1.5 0 0 1 1.5-1.5z" />
    <path d="M10 9.5v5" strokeDasharray="1.5 2.5" />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3.5" y="7.5" width="17" height="12" rx="2.5" />
    <path d="M8.75 7.5V5.75A1.75 1.75 0 0 1 10.5 4h3a1.75 1.75 0 0 1 1.75 1.75V7.5" />
    <path d="M3.5 12.25h17" />
  </svg>
);

export const WrenchIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14.7 6.3a4.5 4.5 0 0 0-5.85 5.85l-4.6 4.6a1.75 1.75 0 0 0 2.48 2.48l4.6-4.6a4.5 4.5 0 0 0 5.85-5.85l-2.3 2.3-2.48-.65-.65-2.48 2.95-1.65z" />
  </svg>
);

export const TerminalIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="3.5" />
    <path d="M3 8.5h18" />
    <circle cx="6.25" cy="6.25" r="0.65" fill="currentColor" stroke="none" />
    <circle cx="8.75" cy="6.25" r="0.65" fill="currentColor" stroke="none" />
    <path d="M7.5 12.25l2.75 2.25-2.75 2.25" />
    <path d="M12.25 16.75h4.25" />
  </svg>
);

export const ZapIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13.25 3.5L5.5 13.25h6l-1 7.25 8-9.75h-6l.75-7.25z" />
  </svg>
);

export const MessageSquareIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5.5 4.75h13a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H9.25L5 20.5v-3.25H5.5a2 2 0 0 1-2-2v-8.5a2 2 0 0 1 2-2z" />
    <path d="M8.5 10h7" />
    <path d="M8.5 13.25h4.5" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.5l1.65 4.85L18.5 10l-4.85 1.65L12 16.5l-1.65-4.85L5.5 10l4.85-1.65L12 3.5z" />
    <path d="M18.5 16l.65 1.85L21 18.5l-1.85.65L18.5 21l-.65-1.85L16 18.5l1.85-.65L18.5 16z" />
  </svg>
);

export const StoreIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 9.5v9.75a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V9.5" />
    <path d="M3.5 9.5l1.35-4.5h14.3l1.35 4.5a2.25 2.25 0 0 1-4.25.5 2.25 2.25 0 0 1-4.25 0 2.25 2.25 0 0 1-4.25 0 2.25 2.25 0 0 1-4.25-.5z" />
    <path d="M9.75 20.25V14.5h4.5v5.75" />
  </svg>
);

export const CompassIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M15.25 8.75l-1.8 4.7-4.7 1.8 1.8-4.7 4.7-1.8z" />
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.8 12h16.4" />
    <path d="M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5s1.1-6.1 3.5-8.5z" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19.25 14.5A7.25 7.25 0 0 1 9.5 4.75a7.5 7.5 0 1 0 9.75 9.75z" />
  </svg>
);

export const DaySunIcon: React.FC<IconProps> = ({ className = 'w-4 h-4 text-white' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4.5" fill="currentColor" />
    <path
      d="M12 2.75v2M12 19.25v2M4.75 12h-2M21.25 12h-2M5.46 5.46l1.42 1.42M17.12 17.12l1.42 1.42M18.54 5.46l-1.42 1.42M6.88 17.12l-1.42 1.42"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8.75 12.25l2.25 2.25 4.25-4.5" />
  </svg>
);

export const CopyIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="8.5" y="8.5" width="11" height="11" rx="2.2" />
    <path d="M15.5 8.5V6.7A2.2 2.2 0 0 0 13.3 4.5H6.7A2.2 2.2 0 0 0 4.5 6.7v6.6a2.2 2.2 0 0 0 2.2 2.2h1.8" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5.5 12.5l4.25 4.25L18.5 7.5" />
  </svg>
);

export const LockIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.5" />
    <path d="M8 10.5V7.75a4 4 0 0 1 8 0v2.75" />
    <circle cx="12" cy="15.25" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="10.75" cy="10.75" r="6.5" />
    <path d="M15.5 15.5l4.25 4.25" />
  </svg>
);

export const LayoutGridIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
  </svg>
);

export const DiceIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="3.2" />
    <circle cx="9" cy="9" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="15" cy="9" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="9" cy="15" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="15" cy="15" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8.25" r="3.5" />
    <path d="M5.5 19.25a6.5 6.5 0 0 1 13 0" />
  </svg>
);

export const FileTextIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14.5 3.75H7a2 2 0 0 0-2 2v12.5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.25l-4.5-4.5z" />
    <path d="M14.5 3.75V8.25H19" />
    <path d="M8.5 12.25h7" />
    <path d="M8.5 15.5h5" />
  </svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.45 4.75L3.6 17a1.75 1.75 0 0 0 1.55 2.6h13.7A1.75 1.75 0 0 0 20.4 17L13.55 4.75a1.75 1.75 0 0 0-3.1 0z" />
    <path d="M12 9.5v4" />
    <circle cx="12" cy="16.25" r="0.7" fill="currentColor" stroke="none" />
  </svg>
);

export const BotIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4.5v2.75" />
    <circle cx="12" cy="3.75" r="0.85" fill="currentColor" stroke="none" />
    <rect x="4.5" y="7.25" width="15" height="11.5" rx="3.2" />
    <circle cx="9.25" cy="12.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="14.75" cy="12.5" r="1" fill="currentColor" stroke="none" />
    <path d="M9.5 15.5h5" />
  </svg>
);

export const CookieIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5 3.25 3.25 0 0 1-3.25-3.25A3.25 3.25 0 0 1 14 5.5 3.25 3.25 0 0 1 12 3.5z" />
    <circle cx="9.25" cy="10.25" r="0.85" fill="currentColor" stroke="none" />
    <circle cx="14" cy="14.5" r="0.85" fill="currentColor" stroke="none" />
    <circle cx="9.25" cy="15.25" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);

export const LayersIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4.25L4 8.75l8 4.5 8-4.5-8-4.5z" />
    <path d="M4 13l8 4.5 8-4.5" />
    <path d="M4 17.25l8 4.5 8-4.5" />
  </svg>
);

export const EyeOffIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 12s3.25-5.75 8.5-5.75c1.55 0 2.98.5 4.22 1.25" />
    <path d="M20.5 12s-3.25 5.75-8.5 5.75c-1.55 0-2.98-.5-4.22-1.25" />
    <path d="M4.5 4.5l15 15" />
  </svg>
);

export const SlidersIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 7h8.5" />
    <path d="M17.5 7h2" />
    <circle cx="15.25" cy="7" r="2.25" />
    <path d="M4.5 12h3" />
    <path d="M12 12h7.5" />
    <circle cx="9.75" cy="12" r="2.25" />
    <path d="M4.5 17h9.5" />
    <path d="M18.5 17h1" />
    <circle cx="16.25" cy="17" r="2.25" />
  </svg>
);

export const HelpCircleIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.5 9.25a2.6 2.6 0 0 1 5 .75c0 1.75-2.5 2.1-2.5 3.75" />
    <circle cx="12" cy="16.75" r="0.7" fill="currentColor" stroke="none" />
  </svg>
);

export const PenLineIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13.5 5.75l4.75 4.75L8.75 20H4v-4.75l9.5-9.5z" />
    <path d="M11.5 7.75l4.75 4.75" />
    <path d="M13.5 20h6.5" />
  </svg>
);

export const BookOpenIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 6.5c-2.25-1.5-5.25-1.75-8-1v13c2.75-.75 5.75-.5 8 1" />
    <path d="M12 6.5c2.25-1.5 5.25-1.75 8-1v13c-2.75-.75-5.75-.5-8 1" />
    <path d="M12 6.5v13" />
  </svg>
);

export const BookMarkedIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="3.75" width="14" height="16.5" rx="2.2" />
    <path d="M5 16.5h14" />
    <path d="M9 3.75v6l2-1.5 2 1.5v-6" />
  </svg>
);

export const ActivityIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 12h3.5l2.25-6.25 4.5 12.5 2.5-6.25h4.25" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5v4.75l3.25 2" />
  </svg>
);

export const CodeIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8.5 8L4.5 12l4 4" />
    <path d="M15.5 8l4 4-4 4" />
    <path d="M13.25 6.5l-2.5 11" />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12.586 3.586A2 2 0 0 0 11.172 3H5a2 2 0 0 0-2 2v6.172a2 2 0 0 0 .586 1.414l7.5 7.5a2 2 0 0 0 2.828 0l6.172-6.172a2 2 0 0 0 0-2.828l-7.5-7.5z" />
    <circle cx="7.75" cy="7.75" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.75l2.45 5.1 5.6.78-4.08 3.92.98 5.58L12 16.45l-4.95 2.68.98-5.58-4.08-3.92 5.6-.78L12 3.75z" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9.5 6.5l5.5 5.5-5.5 5.5" />
  </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
    <path d="M19.5 4.5v3.75h-3.75" />
  </svg>
);

export const KeyIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8.5" cy="14.5" r="4" />
    <path d="M11.5 11.5l7.5-7.5" />
    <path d="M16.5 6.5l2.25 2.25" />
    <path d="M14.25 8.75l1.75 1.75" />
  </svg>
);

export const DiscordIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 20v-1.75a3.75 3.75 0 0 0-3.75-3.75h-4.5A3.75 3.75 0 0 0 4 18.25V20" />
    <circle cx="10" cy="7.75" r="3.25" />
    <path d="M20 20v-1.5a3.5 3.5 0 0 0-2.6-3.38" />
    <path d="M15.25 4.7a3.25 3.25 0 0 1 0 6.1" />
  </svg>
);


