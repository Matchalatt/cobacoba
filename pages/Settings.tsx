
import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Bell, CheckCircle } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [fullName, setFullName] = useState('Demo User');
  const [email, setEmail] = useState('demo@example.com');
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [reportNotifications, setReportNotifications] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a server
    console.log('Saved settings:', { fullName, email, orderNotifications, reportNotifications });
    setShowConfirmation(true);
  };
  
  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmation]);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="w-8 h-8 text-primary-500" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your account and preferences.
          </p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><User className="w-5 h-5" /> Account Information</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium">Full Name</label>
              <input 
                id="fullName" 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full md:w-1/2 rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
              <input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full md:w-1/2 rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
            </div>
            <div className="flex items-center gap-4">
                 <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Save Changes</button>
                 {showConfirmation && (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 animate-fade-in">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Changes saved!</span>
                    </div>
                 )}
            </div>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><Bell className="w-5 h-5" /> Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Email notifications for new orders</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={orderNotifications} onChange={() => setOrderNotifications(!orderNotifications)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Weekly analytics report</span>
               <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={reportNotifications} onChange={() => setReportNotifications(!reportNotifications)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
       <style>{`
          @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
          }
          .animate-fade-in {
              animation: fade-in 0.3s ease-out;
          }
      `}</style>
    </div>
  );
};

export default SettingsPage;
