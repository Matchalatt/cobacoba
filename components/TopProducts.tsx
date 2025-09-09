import React from 'react';
import type { Product } from '../types';

const topProducts: Pick<Product, 'name' | 'imageUrl' | 'price'>[] = [
  { name: 'Laptop Pro X1', imageUrl: 'https://picsum.photos/40?random=1', price: 1499.99 },
  { name: 'Smartphone Z', imageUrl: 'https://picsum.photos/40?random=2', price: 899.00 },
  { name: '4K Ultrawide Monitor', imageUrl: 'https://picsum.photos/40?random=6', price: 799.00 },
  { name: 'Noise-Cancelling Headphones', imageUrl: 'https://picsum.photos/40?random=9', price: 299.99 },
  { name: 'Mechanical Keyboard', imageUrl: 'https://picsum.photos/40?random=5', price: 180.00 },
];

const TopProducts: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">Top Selling Products</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">The most popular items in your store this month.</p>
            </div>
            <div className="space-y-4">
                {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                             <img className="h-10 w-10 rounded-lg object-cover" src={product.imageUrl} alt={product.name} />
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopProducts;
