import React, { useState } from 'react';
import { generateProducts } from '../utils/mockData';

// PUBLIC_INTERFACE
/**
 * Products management page
 * Displays all products with filtering, search, and CRUD operations
 */
const Products = () => {
  const [products] = useState(generateProducts(30));
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Accessories', 'Shoes', 'Bags'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text font-display">Products</h1>
          <p className="text-text-secondary mt-1">Manage your product catalog</p>
        </div>
        <button className="btn-retro bg-gradient-to-r from-retro-blue to-retro-purple text-white px-6">
          ➕ Add Product
        </button>
      </div>

      {/* Filters & Controls */}
      <div className="card-retro">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex gap-4 items-center">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <div className="flex border-2 border-gray-900 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-text hover:bg-gray-100'}`}
              >
                ⊞ Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 border-l-2 border-gray-900 ${viewMode === 'table' ? 'bg-primary text-white' : 'bg-white text-text hover:bg-gray-100'}`}
              >
                ☰ Table
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card-retro hover:shadow-retro-lg transition-all duration-200 group">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden border-2 border-gray-900">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
              </div>
              <h3 className="font-semibold text-text mb-2">{product.name}</h3>
              <p className="text-sm text-text-secondary mb-2">{product.sku}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-text-secondary">{product.category}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  product.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                  product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {product.status}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
                <div>
                  <p className="text-xl font-bold text-text">${product.price}</p>
                  <p className="text-xs text-text-secondary">Stock: {product.stock}</p>
                </div>
                <button className="btn-retro bg-gradient-to-r from-retro-orange to-retro-pink text-white text-sm px-4 py-2">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-retro">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-900">
                  <th className="text-left py-3 px-4 font-semibold text-text">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">SKU</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Category</th>
                  <th className="text-right py-3 px-4 font-semibold text-text">Price</th>
                  <th className="text-center py-3 px-4 font-semibold text-text">Stock</th>
                  <th className="text-center py-3 px-4 font-semibold text-text">Sold</th>
                  <th className="text-left py-3 px-4 font-semibold text-text">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-text">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg border-2 border-gray-900" />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">{product.sku}</td>
                    <td className="py-3 px-4 text-text-secondary">{product.category}</td>
                    <td className="py-3 px-4 text-right font-semibold">${product.price}</td>
                    <td className="py-3 px-4 text-center">{product.stock}</td>
                    <td className="py-3 px-4 text-center text-text-secondary">{product.sold}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                        product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="text-primary hover:text-primary-dark font-semibold text-sm mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-700 font-semibold text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="card-retro text-center py-12">
          <span className="text-6xl">👕</span>
          <p className="text-text-secondary mt-4">No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Products;
