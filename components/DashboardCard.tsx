
import React from 'react';
import type { StatCardData } from '../types';

const DashboardCard: React.FC<StatCardData> = ({ title, value, change, icon: Icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{change}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
