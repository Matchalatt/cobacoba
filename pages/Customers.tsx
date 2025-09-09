import React, { useState, useMemo } from 'react';
import type { Customer } from '../types';
import { Users, Search } from 'lucide-react';
import Pagination from '../components/Pagination';

const mockCustomers: Customer[] = [
  { id: 'CUST001', name: 'Liam Johnson', avatarUrl: 'https://picsum.photos/40?random=21', email: 'liam@example.com', phone: '202-555-0101', totalSpent: 2500.50, joinDate: '2023-01-15' },
  { id: 'CUST002', name: 'Olivia Smith', avatarUrl: 'https://picsum.photos/40?random=22', email: 'olivia@example.com', phone: '202-555-0102', totalSpent: 1850.75, joinDate: '2023-02-20' },
  { id: 'CUST003', name: 'Noah Williams', avatarUrl: 'https://picsum.photos/40?random=23', email: 'noah@example.com', phone: '202-555-0103', totalSpent: 3200.00, joinDate: '2022-11-05' },
  { id: 'CUST004', name: 'Emma Brown', avatarUrl: 'https://picsum.photos/40?random=24', email: 'emma@example.com', phone: '202-555-0104', totalSpent: 850.25, joinDate: '2023-03-10' },
  { id: 'CUST005', name: 'Ava Jones', avatarUrl: 'https://picsum.photos/40?random=25', email: 'ava@example.com', phone: '202-555-0105', totalSpent: 4500.00, joinDate: '2022-09-01' },
  { id: 'CUST006', name: 'James Miller', avatarUrl: 'https://picsum.photos/40?random=26', email: 'james@example.com', phone: '202-555-0106', totalSpent: 120.00, joinDate: '2023-05-22' },
  { id: 'CUST007', name: 'Sophia Davis', avatarUrl: 'https://picsum.photos/40?random=27', email: 'sophia@example.com', phone: '202-555-0107', totalSpent: 990.80, joinDate: '2023-04-18' },
  { id: 'CUST008', name: 'Logan Wilson', avatarUrl: 'https://picsum.photos/40?random=28', email: 'logan@example.com', phone: '202-555-0108', totalSpent: 5300.50, joinDate: '2021-12-30' },
  { id: 'CUST009', name: 'Isabella Taylor', avatarUrl: 'https://picsum.photos/40?random=29', email: 'isabella@example.com', phone: '202-555-0109', totalSpent: 750.00, joinDate: '2023-06-01' },
  { id: 'CUST010', name: 'Mason Martinez', avatarUrl: 'https://picsum.photos/40?random=30', email: 'mason@example.com', phone: '202-555-0110', totalSpent: 2100.00, joinDate: '2023-01-25' },
];

const ITEMS_PER_PAGE = 8;

const CustomersPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = useMemo(() => {
        return mockCustomers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
        return filteredCustomers.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredCustomers]);

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary-500" />
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        View and manage your customers.
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                 <div className="mb-4">
                     <div className="relative">
                        <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search customers by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Customer Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Join Date</th>
                                <th scope="col" className="px-6 py-3 text-right">Total Spent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTableData.map((customer) => (
                                <tr key={customer.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/50">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex items-center gap-3">
                                            <img src={customer.avatarUrl} alt={customer.name} className="w-8 h-8 rounded-full" />
                                            <span>{customer.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{customer.email}</td>
                                    <td className="px-6 py-4">{customer.joinDate}</td>
                                    <td className="px-6 py-4 text-right font-semibold">${customer.totalSpent.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {filteredCustomers.length === 0 && (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        No customers found.
                    </div>
                 )}
                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredCustomers.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default CustomersPage;
