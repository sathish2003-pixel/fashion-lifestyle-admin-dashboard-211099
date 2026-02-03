import React, { useState } from 'react';
import { generateDiscounts } from '../utils/mockData';

// PUBLIC_INTERFACE
/**
 * Discounts management page
 * Displays and manages discount codes and promotions
 */
const Discounts = () => {
  const [discounts] = useState(generateDiscounts());
  const [filter, setFilter] = useState('All');

  const filteredDiscounts = discounts.filter(discount => 
    filter === 'All' || discount.status === filter
  );

  const activeDiscounts = discounts.filter(d => d.status === 'Active');
  const totalUses = discounts.reduce((sum, d) => sum + d.uses, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text font-display">Discounts & Promotions</h1>
          <p className="text-text-secondary mt-1">Manage discount codes and promotional campaigns</p>
        </div>
        <button className="btn-retro bg-gradient-to-r from-retro-blue to-retro-purple text-white px-6">
          ➕ Create Discount
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-retro">
          <p className="text-text-secondary text-sm font-medium">Active Discounts</p>
          <p className="text-3xl font-bold text-text mt-2">{activeDiscounts.length}</p>
        </div>
        <div className="card-retro">
          <p className="text-text-secondary text-sm font-medium">Total Uses</p>
          <p className="text-3xl font-bold text-text mt-2">{totalUses.toLocaleString()}</p>
        </div>
        <div className="card-retro">
          <p className="text-text-secondary text-sm font-medium">Avg. Discount</p>
          <p className="text-3xl font-bold text-text mt-2">
            {Math.round(discounts.filter(d => d.type === 'Percentage').reduce((sum, d) => sum + d.value, 0) / 
              discounts.filter(d => d.type === 'Percentage').length)}%
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="card-retro">
        <div className="flex space-x-2">
          {['All', 'Active', 'Expired'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === status
                  ? 'bg-gradient-to-r from-retro-blue to-retro-purple text-white shadow-retro'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Discounts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDiscounts.map((discount) => (
          <div key={discount.id} className="card-retro hover:shadow-retro-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-2xl font-bold text-text font-mono">{discount.code}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    discount.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {discount.status}
                  </span>
                </div>
                <p className="text-text-secondary text-sm">
                  {discount.type === 'Percentage' ? `${discount.value}% Off` : 'Free Shipping'}
                </p>
              </div>
              <button className="btn-retro bg-gradient-to-r from-retro-orange to-retro-pink text-white text-sm px-4 py-2">
                Edit
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-text-secondary text-xs mb-1">Uses</p>
                <p className="text-xl font-bold text-text">
                  {discount.uses}{discount.maxUses ? ` / ${discount.maxUses}` : ''}
                </p>
                {discount.maxUses && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-retro-blue to-retro-purple h-2 rounded-full"
                      style={{ width: `${(discount.uses / discount.maxUses) * 100}%` }}
                    />
                  </div>
                )}
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Valid Period</p>
                <p className="text-sm font-medium text-text">{discount.startDate}</p>
                <p className="text-sm font-medium text-text">to {discount.endDate}</p>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-gray-200 flex space-x-2">
              <button className="flex-1 btn-retro bg-primary text-white text-sm py-2">
                View Details
              </button>
              {discount.status === 'Active' && (
                <button className="btn-retro bg-gray-200 text-text text-sm py-2 px-4">
                  Deactivate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredDiscounts.length === 0 && (
        <div className="card-retro text-center py-12">
          <span className="text-6xl">🏷️</span>
          <p className="text-text-secondary mt-4">No discounts found</p>
        </div>
      )}
    </div>
  );
};

export default Discounts;
