import React from 'react';
import { Language } from '../i18n/types';

export const FlagIcon: React.FC<{ code: Language; className?: string }> = ({
  code,
  className = 'w-4 h-4 rounded-full overflow-hidden shrink-0 ring-1 ring-black/10 dark:ring-white/15',
}) => {
  switch (code) {
    case 'tr':
      return (
        <svg className={className} viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="#e30a17" />
          <circle cx="14" cy="16" r="7" fill="#ffffff" />
          <circle cx="16" cy="16" r="5.6" fill="#e30a17" />
          <polygon
            fill="#ffffff"
            points="20.5,16 22.8,17.7 21.9,15 24.2,13.3 21.4,13.3 20.5,10.6 19.6,13.3 16.8,13.3 19.1,15 18.2,17.7"
            transform="rotate(-15 20.5 16)"
          />
        </svg>
      );
    case 'en':
      return (
        <svg className={className} viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="#012169" />
          <path d="M0,0 L32,32 M32,0 L0,32" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L32,32 M32,0 L0,32" stroke="#c8102e" strokeWidth="2.5" />
          <path d="M16,0 V32 M0,16 H32" stroke="#fff" strokeWidth="10" />
          <path d="M16,0 V32 M0,16 H32" stroke="#c8102e" strokeWidth="6" />
        </svg>
      );
    case 'de':
      return (
        <svg className={className} viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="#ffce00" />
          <path d="M0,0 H32 V21.3 H0 Z" fill="#dd0000" />
          <path d="M0,0 H32 V10.6 H0 Z" fill="#000000" />
        </svg>
      );
    case 'fr':
      return (
        <svg className={className} viewBox="0 0 32 32">
          <rect x="0" y="0" width="10.7" height="32" fill="#0055a4" />
          <rect x="10.7" y="0" width="10.7" height="32" fill="#ffffff" />
          <rect x="21.3" y="0" width="10.7" height="32" fill="#ef4135" />
        </svg>
      );
    case 'es':
      return (
        <svg className={className} viewBox="0 0 32 32">
          <rect x="0" y="0" width="32" height="8" fill="#aa151b" />
          <rect x="0" y="8" width="32" height="16" fill="#f1bf00" />
          <rect x="0" y="24" width="32" height="8" fill="#aa151b" />
          <circle cx="10.5" cy="16" r="3" fill="#aa151b" />
        </svg>
      );
    case 'it':
      return (
        <svg className={className} viewBox="0 0 32 32">
          <rect x="0" y="0" width="10.7" height="32" fill="#009246" />
          <rect x="10.7" y="0" width="10.7" height="32" fill="#ffffff" />
          <rect x="21.3" y="0" width="10.7" height="32" fill="#ce2b37" />
        </svg>
      );
    case 'ar':
      return (
        <svg className={className} viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="#006c35" />
          <path d="M8,13.5 H24 M10,10.5 H22" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M9,20.5 H23" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M21,19 L23,20.5 L21,22" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'ko':
      return (
        <svg className={className} viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="#ffffff" />
          <g transform="rotate(-35 16 16)">
            <path d="M16,9.5 A6.5,6.5 0 0,1 16,22.5 A3.25,3.25 0 0,1 16,16 A3.25,3.25 0 0,0 16,9.5 Z" fill="#cd2e3a" />
            <path d="M16,22.5 A6.5,6.5 0 0,1 16,9.5 A3.25,3.25 0 0,1 16,16 A3.25,3.25 0 0,0 16,22.5 Z" fill="#0047a0" />
          </g>
          <path d="M6,9 L9,6 M7.2,10.2 L10.2,7.2" stroke="#111" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M23,6 L26,9 M21.8,7.2 L24.8,10.2" stroke="#111" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M6,23 L9,26 M7.2,21.8 L10.2,24.8" stroke="#111" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M23,26 L26,23 M21.8,24.8 L24.8,21.8" stroke="#111" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case 'ja':
      return (
        <svg className={className} viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="#ffffff" />
          <circle cx="16" cy="16" r="7.5" fill="#bc002d" />
        </svg>
      );
    case 'ru':
      return (
        <svg className={className} viewBox="0 0 32 32">
          <rect x="0" y="0" width="32" height="10.7" fill="#ffffff" />
          <rect x="0" y="10.7" width="32" height="10.7" fill="#0039a6" />
          <rect x="0" y="21.3" width="32" height="10.7" fill="#d52b1e" />
        </svg>
      );
    case 'pt':
      return (
        <svg className={className} viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="#009c3b" />
          <polygon points="16,5 28,16 16,27 4,16" fill="#ffdf00" />
          <circle cx="16" cy="16" r="5.5" fill="#002776" />
          <path d="M11,15 Q16,13.5 21,17.5" stroke="#ffffff" strokeWidth="1.2" fill="none" />
        </svg>
      );
    case 'nl':
      return (
        <svg className={className} viewBox="0 0 32 32">
          <rect x="0" y="0" width="32" height="10.7" fill="#ae1c28" />
          <rect x="0" y="10.7" width="32" height="10.7" fill="#ffffff" />
          <rect x="0" y="21.3" width="32" height="10.7" fill="#21468b" />
        </svg>
      );
    default:
      return null;
  }
};
