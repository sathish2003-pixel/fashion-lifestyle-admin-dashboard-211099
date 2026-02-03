import React, { useState } from 'react';
import { generateOrders } from '../utils/mockData';

// PUBLIC_INTERFACE
/**
 * Orders management page
 * Displays all orders with filtering, sorting, and status management
 */
const Orders = () => {
  const [orders] = useState(generateOrders(50));
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'All' || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text font-display">Orders</h1>
          <p className="text-text-secondary mt-1">Manage and track all customer orders</p>
        </div>
        <button className="btn-retro bg-gradient-to-r from-retro-blue to-retro-purple text-white px-6">
          📥 Export Orders
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statuses.map((status) => {
          const count = status === 'All' ? orders.length : orders.filter(o => o.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`card-retro text-center transition-all duration-200 ${
                filter === status ? 'ring-4 ring-primary shadow-retro-lg' : 'hover:shadow-retro-lg'
              }`}
            >
              <p className="text-3xl font-bold text-text">{count}</p>
              <p className="text-sm text-text-secondary font-medium mt-1">{status}</p>
            </button>
          );
        })}
      </div>

      {/* Filters & Search */}
      <div className="card-retro">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card-retro">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-900">
                <th className="text-left py-3 px-4 font-semibold text-text">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold text-text">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-text">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-text">Items</th>
                <th className="text-left py-3 px-4 font-semibold text-text">Payment</th>
                <th className="text-left py-3 px-4 font-semibold text-text">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-text">Total</th>
                <th className="text-center py-3 px-4 font-semibold text-text">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-mono text-sm font-semibold">{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4 text-text-secondary">{order.date}</td>
                  <td className="py-3 px-4">{order.items} items</td>
                  <td className="py-3 px-4 text-text-secondary text-sm">{order.paymentMethod}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold">${order.total.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-primary hover:text-primary-dark font-semibold text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl">📦</span>
            <p className="text-text-secondary mt-4">No orders found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
