"use client";

import React from 'react';

interface TabNavigationProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 1, label: 'Basics' },
    { id: 2, label: 'Details' },
    { id: 3, label: 'Sales/Income' },
    { id: 4, label: 'Expenses' },
    { id: 5, label: 'Additional Info' },
    { id: 6, label: 'Accessibility' },
    { id: 7, label: 'Photos' },
    { id: 8, label: 'Activities' },
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {tabs.map((tab) => (
          <li key={tab.id} className="mr-2">
            <button
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                activeTab === tab.id
                  ? 'text-[#9A2236] border-[#9A2236] active'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabNavigation;
