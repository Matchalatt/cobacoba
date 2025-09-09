
import React from 'react';
import type { Order } from '../types';

const recentOrders: Order[] = [
    { id: '1', customerName: 'Liam Johnson', customerEmail: 'liam@example.com', product: 'Laptop Pro', amount: 250.00, status: 'Delivered', date: '2023-10-23' },
    { id: '2', customerName: 'Olivia Smith', customerEmail: 'olivia@example.com', product: 'Smartphone', amount: 150.00, status: 'Shipped', date: '2023-10-23' },
    { id: '3', customerName: 'Noah Williams', customerEmail: 'noah@example.com', product: 'Gaming Chair', amount: 350.00, status: 'Pending', date: '2023-10-22' },
    { id: '4', customerName: 'Emma Brown', customerEmail: 'emma@example.com', product: 'Wireless Mouse', amount: 450.00, status: 'Delivered', date: '2023-10-21' },
    { id: '5', customerName: 'Ava Jones', customerEmail: 'ava@example.com', product: 'Keyboard', amount: 550.00, status: 'Cancelled', date: '2023-10-20' },
];

const RecentOrders: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">Recent Sales</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">You made 265 sales this month.</p>
            </div>
            <div className="space-y-4">
                {recentOrders.map((order, index) => (
                    <div key={order.id} className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                             <img className="h-10 w-10 rounded-full" src={`https://picsum.photos/40?random=${index}`} alt={order.customerName} />
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{order.customerName}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{order.customerEmail}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">+${order.amount.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentOrders;
