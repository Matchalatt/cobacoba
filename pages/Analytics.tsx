import React from 'react';
import { BarChart2, TrendingUp, Users, Target } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import AnalyticsLineChart from '../components/AnalyticsLineChart';
import AnalyticsPieChart from '../components/AnalyticsPieChart';
import TopProducts from '../components/TopProducts';
import type { StatCardData } from '../types';

// Fix: Explicitly typed `analyticsCards` with `StatCardData[]` to ensure type compatibility with the `DashboardCard` component.
const analyticsCards: StatCardData[] = [
    { title: 'Average Order Value', value: '$125.50', change: '+5.2% from last month', changeType: 'increase', icon: TrendingUp },
    { title: 'Conversion Rate', value: '3.15%', change: '+1.2% from last month', changeType: 'increase', icon: Target },
    { title: 'New Customers', value: '1,204', change: '+30.5% from last month', changeType: 'increase', icon: Users },
];

const AnalyticsPage: React.FC = () => {
    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center gap-3">
                <BarChart2 className="w-8 h-8 text-primary-500" />
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        In-depth metrics and performance insights.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {analyticsCards.map((card, index) => (
                    <DashboardCard key={index} {...card} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                     <h3 className="text-lg font-semibold mb-4">Sales Trend (Last 30 Days)</h3>
                    <AnalyticsLineChart />
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
                    <AnalyticsPieChart />
                </div>
            </div>
             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <TopProducts />
            </div>

        </div>
    );
};

export default AnalyticsPage;