import React, { useState, useMemo } from 'react';
import type { Order } from '../types';
import { ShoppingCart, Filter } from 'lucide-react';
import OrderStatusBadge from '../components/OrderStatusBadge';
import Pagination from '../components/Pagination';

const mockOrders: Order[] = [
    { id: 'ORD001', customerName: 'Liam Johnson', customerEmail: 'liam@example.com', product: 'Laptop Pro', amount: 1250.00, status: 'Delivered', date: '2023-10-23' },
    { id: 'ORD002', customerName: 'Olivia Smith', customerEmail: 'olivia@example.com', product: 'Smartphone X', amount: 850.00, status: 'Shipped', date: '2023-10-23' },
    { id: 'ORD003', customerName: 'Noah Williams', customerEmail: 'noah@example.com', product: 'Gaming Chair', amount: 350.00, status: 'Pending', date: '2023-10-22' },
    { id: 'ORD004', customerName: 'Emma Brown', customerEmail: 'emma@example.com', product: 'Wireless Mouse', amount: 75.50, status: 'Delivered', date: '2023-10-21' },
    { id: 'ORD005', customerName: 'Ava Jones', customerEmail: 'ava@example.com', product: 'Mechanical Keyboard', amount: 180.00, status: 'Cancelled', date: '2023-10-20' },
    { id: 'ORD006', customerName: 'James Miller', customerEmail: 'james@example.com', product: '4K Monitor', amount: 650.00, status: 'Delivered', date: '2023-10-19' },
    { id: 'ORD007', customerName: 'Sophia Davis', customerEmail: 'sophia@example.com', product: 'Webcam HD', amount: 95.00, status: 'Shipped', date: '2023-10-18' },
    { id: 'ORD008', customerName: 'Logan Wilson', customerEmail: 'logan@example.com', product: 'USB-C Hub', amount: 45.00, status: 'Pending', date: '2023-10-18' },
    { id: 'ORD009', customerName: 'Isabella Taylor', customerEmail: 'isabella@example.com', product: 'Noise-Cancelling Headphones', amount: 299.99, status: 'Delivered', date: '2023-10-17' },
    { id: 'ORD010', customerName: 'Mason Martinez', customerEmail: 'mason@example.com', product: 'Ergonomic Mousepad', amount: 25.00, status: 'Cancelled', date: '2023-10-16' },
    { id: 'ORD011', customerName: 'Harper Anderson', customerEmail: 'harper@example.com', product: 'Standing Desk', amount: 550.00, status: 'Shipped', date: '2023-10-15' },
    { id: 'ORD012', customerName: 'Ethan Thomas', customerEmail: 'ethan@example.com', product: 'Laptop Stand', amount: 60.00, status: 'Delivered', date: '2023-10-14' },
    { id: 'ORD013', customerName: 'Amelia Hernandez', customerEmail: 'amelia@example.com', product: 'Green Screen', amount: 120.00, status: 'Pending', date: '2023-10-14' },
    { id: 'ORD014', customerName: 'Evelyn Moore', customerEmail: 'evelyn@example.com', product: 'Ring Light', amount: 85.00, status: 'Delivered', date: '2023-10-13' },
    { id: 'ORD015', customerName: 'Lucas Garcia', customerEmail: 'lucas@example.com', product: 'Microphone Arm', amount: 55.00, status: 'Shipped', date: '2023-10-12' },
];

const ITEMS_PER_PAGE = 8;
const STATUS_OPTIONS: (Order['status'] | 'All')[] = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

const OrdersPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<Order['status'] | 'All'>('All');

    const filteredOrders = useMemo(() => {
        if (statusFilter === 'All') {
            return mockOrders;
        }
        return mockOrders.filter(order => order.status === statusFilter);
    }, [statusFilter]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
        return filteredOrders.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredOrders]);

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-primary-500" />
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Manage and track all customer orders.
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <h3 className="text-lg font-semibold">Filter by Status</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                        {STATUS_OPTIONS.map(status => (
                            <button
                                key={status}
                                onClick={() => {
                                    setStatusFilter(status);
                                    setCurrentPage(1); // Reset to first page on filter change
                                }}
                                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                                    statusFilter === status
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Order ID</th>
                                <th scope="col" className="px-6 py-3">Customer</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTableData.map((order) => (
                                <tr key={order.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/50">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{order.id}</td>
                                    <td className="px-6 py-4">{order.customerName}</td>
                                    <td className="px-6 py-4"><OrderStatusBadge status={order.status} /></td>
                                    <td className="px-6 py-4">{order.date}</td>
                                    <td className="px-6 py-4 text-right font-semibold">${order.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {filteredOrders.length === 0 && (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        No orders found for this status.
                    </div>
                 )}
                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredOrders.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default OrdersPage;
