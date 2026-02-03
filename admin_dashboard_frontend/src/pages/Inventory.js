import React, { useState } from 'react';
import { generateProducts, generateInventoryAlerts } from '../utils/mockData';

// PUBLIC_INTERFACE
/**
 * Inventory management page
 * Displays stock levels, alerts, and inventory operations
 */
const Inventory = () => {
  const [products] = useState(generateProducts(30));
  const [alerts] = useState(generateInventoryAlerts());
  const [filter, setFilter] = useState('All');

  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 10);
  const outOfStockProducts = products.filter(p => p.stock === 0);

  const filteredProducts = products.filter(product => {
    if (filter === 'All') return true;
    if (filter === 'Low Stock') return product.stock > 0 && product.stock <= 10;
    if (filter === 'Out of Stock') return product.stock === 0;
    return product.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text font-display">Inventory</h1>
          <p className="text-text-secondary mt-1">Monitor stock levels and manage inventory</p>
        </div>
        <button className="btn-retro bg-gradient-to-r from-retro-blue to-retro-purple text-white px-6">
          📊 Generate Report
        </button>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="card-retro border-l-4 border-retro-orange bg-orange-50">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1">
              <h3 className="font-bold text-text mb-2">Inventory Alerts</h3>
              <div className="space-y-2">
                {alerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between text-sm">
                    <span>
                      <strong>{alert.product}</strong> ({alert.sku}) - 
                      {alert.stock === 0 ? ' Out of Stock' : ` Only ${alert.stock} left`}
                    </span>
                    <button className="text-primary font-semibold hover:underline">Restock</button>
                  </div>
                ))}
              </div>
              {alerts.length > 3 && (
                <p className="text-text-secondary text-sm mt-2">+ {alerts.length - 3} more alerts</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <button
          onClick={() => setFilter('All')}
          className={`card-retro text-left transition-all ${filter === 'All' ? 'ring-4 ring-primary' : 'hover:shadow-retro-lg'}`}
        >
          <p className="text-text-secondary text-sm font-medium">Total Products</p>
          <p className="text-3xl font-bold text-text mt-2">{products.length}</p>
        </button>
        <button
          onClick={() => setFilter('In Stock')}
          className={`card-retro text-left transition-all ${filter === 'In Stock' ? 'ring-4 ring-primary' : 'hover:shadow-retro-lg'}`}
        >
          <p className="text-text-secondary text-sm font-medium">In Stock</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{products.filter(p => p.status === 'In Stock').length}</p>
        </button>
        <button
          onClick={() => setFilter('Low Stock')}
          className={`card-retro text-left transition-all ${filter === 'Low Stock' ? 'ring-4 ring-primary' : 'hover:shadow-retro-lg'}`}
        >
          <p className="text-text-secondary text-sm font-medium">Low Stock</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{lowStockProducts.length}</p>
        </button>
        <button
          onClick={() => setFilter('Out of Stock')}
          className={`card-retro text-left transition-all ${filter === 'Out of Stock' ? 'ring-4 ring-primary' : 'hover:shadow-retro-lg'}`}
        >
          <p className="text-text-secondary text-sm font-medium">Out of Stock</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{outOfStockProducts.length}</p>
        </button>
      </div>

      {/* Inventory Table */}
      <div className="card-retro">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text font-display">
            {filter === 'All' ? 'All Products' : filter}
          </h2>
          <span className="text-text-secondary">{filteredProducts.length} products</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-900">
                <th className="text-left py-3 px-4 font-semibold text-text">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-text">SKU</th>
                <th className="text-left py-3 px-4 font-semibold text-text">Category</th>
                <th className="text-center py-3 px-4 font-semibold text-text">Current Stock</th>
                <th className="text-center py-3 px-4 font-semibold text-text">Sold (Total)</th>
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
                  <td className="py-3 px-4 text-center">
                    <span className={`font-bold ${
                      product.stock === 0 ? 'text-red-600' :
                      product.stock <= 10 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
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
                    <button className="btn-retro bg-gradient-to-r from-retro-orange to-retro-pink text-white text-sm px-4 py-1">
                      Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
