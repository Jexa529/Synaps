import React from 'react';
import { useParams } from 'react-router-dom';
import { Features } from '../components/Features';
import { FeatureSubTab } from '../types';

const VALID_SUBTABS: FeatureSubTab[] = ['moderation', 'economy', 'tickets', 'jobs', 'market'];

interface FeaturesPageProps {
  defaultTab?: FeatureSubTab;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ defaultTab = 'moderation' }) => {
  const { subTab } = useParams<{ subTab?: string }>();
  const resolvedTab: FeatureSubTab =
    subTab && VALID_SUBTABS.includes(subTab as FeatureSubTab)
      ? (subTab as FeatureSubTab)
      : defaultTab;

  return (
    <div className="flex-1 w-full bg-[#fbfbfd] dark:bg-black">
      <Features initialTab={resolvedTab} />
    </div>
  );
};
