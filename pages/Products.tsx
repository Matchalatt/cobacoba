import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import { Package, Search, PlusCircle } from 'lucide-react';
import ProductStatusBadge from '../components/ProductStatusBadge';
import Pagination from '../components/Pagination';

const mockProducts: Product[] = [
  { id: 'PROD001', name: 'Laptop Pro X1', imageUrl: 'https://picsum.photos/40?random=1', category: 'Electronics', price: 1499.99, stock: 50, status: 'In Stock' },
  { id: 'PROD002', name: 'Smartphone Z', imageUrl: 'https://picsum.photos/40?random=2', category: 'Electronics', price: 899.00, stock: 120, status: 'In Stock' },
  { id: 'PROD003', name: 'Ergonomic Chair', imageUrl: 'https://picsum.photos/40?random=3', category: 'Furniture', price: 350.00, stock: 8, status: 'Low Stock' },
  { id: 'PROD004', name: 'Wireless Mouse', imageUrl: 'https://picsum.photos/40?random=4', category: 'Accessories', price: 75.50, stock: 0, status: 'Out of Stock' },
  { id: 'PROD005', name: 'Mechanical Keyboard', imageUrl: 'https://picsum.photos/40?random=5', category: 'Accessories', price: 180.00, stock: 35, status: 'In Stock' },
  { id: 'PROD006', name: '4K Ultrawide Monitor', imageUrl: 'https://picsum.photos/40?random=6', category: 'Electronics', price: 799.00, stock: 22, status: 'In Stock' },
  { id: 'PROD007', name: 'Designer Coffee Mug', imageUrl: 'https://picsum.photos/40?random=7', category: 'Home Goods', price: 25.00, stock: 200, status: 'In Stock' },
  { id: 'PROD008', name: 'Standing Desk', imageUrl: 'https://picsum.photos/40?random=8', category: 'Furniture', price: 550.00, stock: 3, status: 'Low Stock' },
  { id: 'PROD009', name: 'Noise-Cancelling Headphones', imageUrl: 'https://picsum.photos/40?random=9', category: 'Electronics', price: 299.99, stock: 0, status: 'Out of Stock' },
  { id: 'PROD010', name: 'Leatherbound Journal', imageUrl: 'https://picsum.photos/40?random=10', category: 'Stationery', price: 45.00, stock: 80, status: 'In Stock' },
  { id: 'PROD011', name: 'Smart Watch 2', imageUrl: 'https://picsum.photos/40?random=11', category: 'Electronics', price: 250.00, stock: 60, status: 'In Stock' },
  { id: 'PROD012', name: 'Yoga Mat', imageUrl: 'https://picsum.photos/40?random=12', category: 'Sports', price: 40.00, stock: 5, status: 'Low Stock' },
];

const ITEMS_PER_PAGE = 8;

const ProductsPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = useMemo(() => {
        return mockProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
        return filteredProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredProducts]);

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Package className="w-8 h-8 text-primary-500" />
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Manage your product inventory.
                        </p>
                    </div>
                </div>
                <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Product
                </button>
            </div>


            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                 <div className="mb-4">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products by name or category..."
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
                                <th scope="col" className="px-6 py-3">Product Name</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3 text-right">Stock</th>
                                <th scope="col" className="px-6 py-3 text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTableData.map((product) => (
                                <tr key={product.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/50">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex items-center gap-3">
                                            <img src={product.imageUrl} alt={product.name} className="w-8 h-8 rounded-full object-cover" />
                                            <span>{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className="px-6 py-4"><ProductStatusBadge status={product.status} /></td>
                                    <td className="px-6 py-4 text-right">{product.stock}</td>
                                    <td className="px-6 py-4 text-right font-semibold">${product.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {filteredProducts.length === 0 && (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        No products found.
                    </div>
                 )}
                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredProducts.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ProductsPage;
