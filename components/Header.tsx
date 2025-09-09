
import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Fix: Added ShoppingCart to the import from 'lucide-react' to resolve reference error.
import { Menu, Search, Bell, LogOut, User, Settings, Package, Users, BarChart2, Home, ShoppingCart, Lightbulb } from 'lucide-react';
import { AuthContext } from '../App';
import type { Notification } from '../types';

// MOCK DATA
const mockNotifications: Notification[] = [
    { id: '1', icon: Package, message: 'New order #ORD015 has been placed.', time: '5m ago', read: false },
    { id: '2', icon: Users, message: 'A new customer "Lucas Garcia" has registered.', time: '1h ago', read: false },
    { id: '3', icon: Package, message: 'Product "Ergonomic Chair" is low on stock.', time: '3h ago', read: true },
    { id: '4', icon: BarChart2, message: 'Your weekly analytics report is ready.', time: '1d ago', read: true },
];

const searchableItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Product Ideas', path: '/product-idea-generator', icon: Lightbulb },
];

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const auth = useContext(AuthContext);

    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const notificationsTrigger = useRef<HTMLButtonElement>(null);
    const notificationsDropdown = useRef<HTMLDivElement>(null);
    const profileTrigger = useRef<HTMLButtonElement>(null);
    const profileDropdown = useRef<HTMLDivElement>(null);
    const searchContainer = useRef<HTMLDivElement>(null);
    
    // Close dropdowns on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!target) return;
            const targetNode = target as Node;

            if (notificationsOpen && notificationsTrigger.current && notificationsDropdown.current &&
                !notificationsTrigger.current.contains(targetNode) && !notificationsDropdown.current.contains(targetNode)) {
                setNotificationsOpen(false);
            }
            if (profileOpen && profileTrigger.current && profileDropdown.current &&
                !profileTrigger.current.contains(targetNode) && !profileDropdown.current.contains(targetNode)) {
                setProfileOpen(false);
            }
            if (searchFocused && searchContainer.current && !searchContainer.current.contains(targetNode)) {
                setSearchFocused(false);
            }
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [notificationsOpen, profileOpen, searchFocused]);


    const filteredSearchItems = searchTerm
        ? searchableItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : [];

    return (
        <header className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 -mb-px">
                    {/* Header: Left side */}
                    <div className="flex">
                        {/* Hamburger button */}
                        <button
                            className="text-gray-500 hover:text-gray-600 lg:hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* Header: Right side */}
                    <div className="flex items-center space-x-3">
                        <div ref={searchContainer} className="relative">
                            <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            <input
                                className="w-full md:w-64 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                                type="search"
                                placeholder="Search..."
                                value={searchTerm}
                                onFocus={() => setSearchFocused(true)}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchFocused && searchTerm && (
                                <div className="absolute mt-2 w-full md:w-80 rounded-lg shadow-lg bg-white dark:bg-gray-800 border dark:border-gray-700 overflow-hidden animate-fade-in-down z-10">
                                    <ul className="max-h-80 overflow-y-auto">
                                        {filteredSearchItems.length > 0 ? (
                                            filteredSearchItems.map(item => (
                                                <li key={item.path}>
                                                    <Link to={item.path} onClick={() => { setSearchFocused(false); setSearchTerm(''); }} className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                                        <item.icon className="w-5 h-5 text-gray-500" />
                                                        <span className="text-sm font-medium">{item.name}</span>
                                                    </Link>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="p-3 text-sm text-center text-gray-500">No results found.</li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                        
                        <div className="relative">
                            <button ref={notificationsTrigger} onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition relative">
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                                <span className="sr-only">View notifications</span>
                                <Bell size={20} />
                            </button>
                            {notificationsOpen && (
                                <div ref={notificationsDropdown} className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 overflow-hidden animate-fade-in-down">
                                    <div className="p-3 font-semibold border-b dark:border-gray-700">Notifications</div>
                                    <ul>
                                        {mockNotifications.map(notif => (
                                            <li key={notif.id} className={`flex items-start gap-3 p-3 border-b dark:border-gray-700/50 ${!notif.read ? 'bg-primary-50 dark:bg-primary-500/10' : ''}`}>
                                                <notif.icon className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                                                <div className="flex-1">
                                                    <p className="text-sm">{notif.message}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{notif.time}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to="/notifications" onClick={() => setNotificationsOpen(false)} className="block p-2 text-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50">View all</Link>
                                </div>
                            )}
                        </div>
                        
                         <div className="relative inline-flex">
                             <button ref={profileTrigger} onClick={() => setProfileOpen(!profileOpen)} className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-primary-500">
                                <img className="h-8 w-8 rounded-full" src="https://picsum.photos/32" width="32" height="32" alt="User" />
                             </button>
                             {profileOpen && (
                                <div ref={profileDropdown} className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 overflow-hidden animate-fade-in-down">
                                    <div className="p-3 border-b dark:border-gray-700">
                                        <div className="font-semibold">Demo User</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">demo@example.com</div>
                                    </div>
                                    <ul className="py-1">
                                        <li><Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><User className="w-4 h-4" /> Profile</Link></li>
                                        <li><Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Settings className="w-4 h-4" /> Settings</Link></li>
                                    </ul>
                                    <div className="p-1">
                                        <button onClick={auth?.logout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors">
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                             )}
                        </div>
                    </div>
                </div>
            </div>
             <style>{`
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.2s ease-out;
                }
            `}</style>
        </header>
    );
};

export default Header;