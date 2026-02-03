import React, { useState } from 'react';
import { generateCustomers } from '../utils/mockData';

// PUBLIC_INTERFACE
/**
 * Customers management page
 * Displays customer information with filtering and search
 */
const Customers = () => {
  const [customers] = useState(generateCustomers(25));
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text font-display">Customers</h1>
          <p className="text-text-secondary mt-1">Manage your customer base</p>
        </div>
        <button className="btn-retro bg-gradient-to-r from-retro-blue to-retro-purple text-white px-6">
          📥 Export Customers
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-retro">
          <p className="text-text-secondary text-sm font-medium">Total Customers</p>
          <p className="text-3xl font-bold text-text mt-2">{customers.length}</p>
        </div>
        <div className="card-retro">
          <p className="text-text-secondary text-sm font-medium">Active Customers</p>
          <p className="text-3xl font-bold text-text mt-2">{customers.filter(c => c.status === 'Active').length}</p>
        </div>
        <div className="card-retro">
          <p className="text-text-secondary text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-text mt-2">${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</p>
        </div>
        <div className="card-retro">
          <p className="text-text-secondary text-sm font-medium">Avg Lifetime Value</p>
          <p className="text-3xl font-bold text-text mt-2">${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card-retro">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card-retro">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-900">
                <th className="text-left py-3 px-4 font-semibold text-text">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-text">Email</th>
                <th className="text-center py-3 px-4 font-semibold text-text">Orders</th>
                <th className="text-right py-3 px-4 font-semibold text-text">Total Spent</th>
                <th className="text-left py-3 px-4 font-semibold text-text">Join Date</th>
                <th className="text-left py-3 px-4 font-semibold text-text">Status</th>
                <th className="text-center py-3 px-4 font-semibold text-text">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-retro-purple to-retro-blue flex items-center justify-center text-white font-bold shadow-retro">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">{customer.email}</td>
                  <td className="py-3 px-4 text-center font-semibold">{customer.orders}</td>
                  <td className="py-3 px-4 text-right font-semibold">${customer.totalSpent.toFixed(2)}</td>
                  <td className="py-3 px-4 text-text-secondary">{customer.joinDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-primary hover:text-primary-dark font-semibold text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl">👥</span>
            <p className="text-text-secondary mt-4">No customers found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
