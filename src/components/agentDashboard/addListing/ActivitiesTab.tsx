"use client";

import React from 'react';

interface ActivitiesTabProps {
  activities?: Array<{
    timestamp: string;
    message: string;
    user: string;
  }>;
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ activities = [] }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Activities</h2>
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-400">
          All activities related to this listing will be recorded here. This helps you track the history of changes and interactions.
        </p>
      </div>
      
      {activities.length === 0 ? (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          No activities recorded yet.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="border-l-4 border-[#9A2236] pl-4 py-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {activity.timestamp}
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                {activity.message}
              </div>
              <div className="text-sm font-medium text-[#9A2236]">
                {activity.user}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitiesTab;
