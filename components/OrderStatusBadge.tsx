import React from 'react';
import type { Order } from '../types';

interface OrderStatusBadgeProps {
  status: Order['status'];
}

const statusStyles: Record<Order['status'], string> = {
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  Shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  Delivered: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium rounded-full inline-flex items-center gap-1.5 ${statusStyles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${statusStyles[status].replace(/text-\w+-\d+/g, '').replace('bg-', 'bg-dot-')}`}>
          <style>{`
              .bg-dot-yellow-100 { background-color: #f59e0b; }
              .bg-dot-blue-100 { background-color: #3b82f6; }
              .bg-dot-green-100 { background-color: #22c55e; }
              .bg-dot-gray-100 { background-color: #6b7280; }
          `}</style>
      </span>
      {status}
    </span>
  );
};

export default OrderStatusBadge;
