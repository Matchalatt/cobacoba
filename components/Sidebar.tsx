
import React, { useEffect, useRef } from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Package, Users, BarChart2, Lightbulb, X } from 'lucide-react';
import type { NavLink } from '../types';

const navLinks: NavLink[] = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Product Ideas', path: '/product-idea-generator', icon: Lightbulb },
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <>
      {/* Sidebar backdrop */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-auto no-scrollbar w-64 lg:w-20 lg:hover:w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-300 ease-in-out group ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
            <div className="flex items-center gap-2">
                <div className="bg-primary-500 rounded-lg p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.54 2.13a1 1 0 0 0-1.08 0l-7.5 5.25a1 1 0 0 0 .54 1.87l1.4 1.25a1 1 0 0 0 1.12 0l4-2.5a1 1 0 0 1 1.08 0l4 2.5a1 1 0 0 0 1.12 0l1.4-1.25a1 1 0 0 0 .54-1.87l-7.5-5.25Z" /><path d="m5 12 7 4.5 7-4.5" /><path d="M12 22V16.5" /></svg>
                </div>
                 <h1 className="text-xl font-bold lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200">Gemini</h1>
            </div>
            <button
                ref={trigger}
                className="lg:hidden text-gray-500 hover:text-gray-400"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
            >
                <X size={24} />
            </button>
        </div>
        
        <nav className="space-y-2">
            {navLinks.map((link) => (
                <RouterNavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => sidebarOpen && setSidebarOpen(false)}
                    className={({ isActive }) => `flex items-center p-2 text-base font-normal rounded-lg transition-colors duration-200 group ${
                        isActive ? 'bg-primary-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                    <link.icon className="w-6 h-6 shrink-0" />
                    <span className="ml-3 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200">{link.name}</span>
                </RouterNavLink>
            ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;