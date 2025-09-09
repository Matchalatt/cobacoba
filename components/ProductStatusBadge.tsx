import React from 'react';
import type { Product } from '../types';

interface ProductStatusBadgeProps {
  status: Product['status'];
}

const statusStyles: Record<Product['status'], string> = {
  'In Stock': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'Low Stock': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'Out of Stock': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const ProductStatusBadge: React.FC<ProductStatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium rounded-full inline-flex items-center gap-1.5 ${statusStyles[status]}`}
    >
       <span className={`h-1.5 w-1.5 rounded-full ${statusStyles[status].replace(/text-\w+-\d+/g, '').replace('bg-', 'bg-dot-')}`}>
          <style>{`
              .bg-dot-green-100 { background-color: #22c55e; }
              .bg-dot-yellow-100 { background-color: #f59e0b; }
              .bg-dot-red-100 { background-color: #ef4444; }
          `}</style>
      </span>
      {status}
    </span>
  );
};

export default ProductStatusBadge;
