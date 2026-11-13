import React from 'react';
import { CommandsView } from '../components/CommandsView';

export const CommandsPage: React.FC = () => {
  return (
    <div className="flex-1 w-full bg-[#fbfbfd] dark:bg-black">
      <CommandsView />
    </div>
  );
};
