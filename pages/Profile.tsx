
import React, { useState } from 'react';
import { User, Mail, Calendar, Edit, Save, X } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Demo User');
  const [tempName, setTempName] = useState('Demo User');

  const handleEdit = () => {
    setTempName(name);
    setIsEditing(true);
  };

  const handleSave = () => {
    setName(tempName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <User className="w-8 h-8 text-primary-500" />
            <div>
                <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Manage your personal information.
                </p>
            </div>
        </div>
        {isEditing ? (
            <div className="flex items-center gap-2">
                 <button onClick={handleSave} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <Save className="mr-2 h-4 w-4" />
                    Save
                </button>
                 <button onClick={handleCancel} className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                </button>
            </div>
        ) : (
            <button onClick={handleEdit} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
            </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6">
            <img 
                className="h-24 w-24 rounded-full" 
                src="https://picsum.photos/96" 
                alt="User Avatar" 
            />
            <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                    <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="text-2xl font-bold bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 border rounded-md px-2 py-1"
                    />
                ) : (
                    <h3 className="text-2xl font-bold">{name}</h3>
                )}
                <p className="text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium">demo@example.com</p>
                </div>
            </div>
             <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Joined Date</p>
                    <p className="font-medium">January 1, 2023</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
