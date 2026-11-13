import React from 'react';
import { LegalPolicyPage, PolicyKey } from '../components/LegalPolicyPage';
import { FeatureSubTab, TabType } from '../types';

interface LegalPageProps {
  currentPolicy: PolicyKey;
  onSelectPolicy: (tab: TabType, featureSubTab?: FeatureSubTab) => void;
  onBackToHome: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  currentPolicy,
  onSelectPolicy,
  onBackToHome,
}) => {
  return (
    <div className="flex-1 w-full bg-[#fbfbfd] dark:bg-black">
      <LegalPolicyPage
        currentPolicy={currentPolicy}
        onSelectPolicy={onSelectPolicy}
        onBackToHome={onBackToHome}
      />
    </div>
  );
};
