
import React from 'react';
import { Bell, Package, Users, BarChart2 } from 'lucide-react';
import type { Notification } from '../types';

const mockNotifications: Notification[] = [
    { id: '1', icon: Package, message: 'New order #ORD015 has been placed.', time: '5m ago', read: false },
    { id: '2', icon: Users, message: 'A new customer "Lucas Garcia" has registered.', time: '1h ago', read: false },
    { id: '3', icon: Package, message: 'Product "Ergonomic Chair" is low on stock.', time: '3h ago', read: true },
    { id: '4', icon: BarChart2, message: 'Your weekly analytics report is ready.', time: '1d ago', read: true },
    { id: '5', icon: Package, message: 'Order #ORD014 has been delivered.', time: '2d ago', read: true },
    { id: '6', icon: Users, message: 'Customer "Ava Jones" updated their profile.', time: '3d ago', read: true },
    { id: '7', icon: Package, message: 'Order #ORD012 has been shipped.', time: '4d ago', read: true },
];

const NotificationsPage: React.FC = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-3">
        <Bell className="w-8 h-8 text-primary-500" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-gray-500 dark:text-gray-400">
            View all your recent notifications here.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {mockNotifications.map(notif => (
            <li key={notif.id} className={`flex items-start gap-4 p-4 transition-colors duration-200 rounded-md ${!notif.read ? 'bg-primary-50 dark:bg-primary-500/10' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
              <div className="bg-primary-100 dark:bg-primary-900/70 p-2 rounded-full mt-1">
                <notif.icon className="w-5 h-5 text-primary-600 dark:text-primary-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 dark:text-gray-200">{notif.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
              </div>
              {!notif.read && (
                <div className="w-2.5 h-2.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" title="Unread"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsPage;
