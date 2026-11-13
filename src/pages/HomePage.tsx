import React from 'react';
import { HeroHome } from '../components/HeroHome';
import { FeatureSubTab, TabType } from '../types';

interface HomePageProps {
  onTabChange: (tab: TabType, featureSubTab?: FeatureSubTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onTabChange }) => {
  return <HeroHome onTabChange={onTabChange} />;
};
