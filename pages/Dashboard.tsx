
import React from 'react';
import { DollarSign, ShoppingCart, Users, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { StatCardData } from '../types';
import DashboardCard from '../components/DashboardCard';
import SalesChart from '../components/SalesChart';
import RecentOrders from '../components/RecentOrders';

const statCards: StatCardData[] = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1% from last month',
    changeType: 'increase',
    icon: DollarSign,
  },
  {
    title: 'Subscriptions',
    value: '+2350',
    change: '+180.1% from last month',
    changeType: 'increase',
    icon: Users,
  },
  {
    title: 'Sales',
    value: '+12,234',
    change: '+19% from last month',
    changeType: 'increase',
    icon: CreditCard,
  },
  {
    title: 'Active Now',
    value: '+573',
    change: '+201 since last hour',
    changeType: 'increase',
    icon: ShoppingCart,
  },
];


const DashboardPage: React.FC = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Overview</h3>
          <SalesChart />
        </div>
        <div className="col-span-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
