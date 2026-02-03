import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateAnalytics, generateOrders } from '../utils/mockData';

// PUBLIC_INTERFACE
/**
 * Main Dashboard page component
 * Displays KPIs, charts, and recent activity
 */
const Dashboard = () => {
  const analytics = generateAnalytics();
  const recentOrders = generateOrders(5);

  const kpiCards = [
    { label: 'Total Revenue', value: `$${analytics.kpis.totalRevenue.toLocaleString()}`, icon: '💰', color: 'from-retro-blue to-retro-purple', change: '+12.5%' },
    { label: 'Total Orders', value: analytics.kpis.totalOrders.toLocaleString(), icon: '📦', color: 'from-retro-orange to-retro-pink', change: '+8.2%' },
    { label: 'Avg Order Value', value: `$${analytics.kpis.averageOrderValue}`, icon: '💳', color: 'from-retro-purple to-retro-pink', change: '+3.1%' },
    { label: 'Total Customers', value: analytics.kpis.totalCustomers.toLocaleString(), icon: '👥', color: 'from-retro-yellow to-retro-orange', change: '+15.3%' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text font-display">Dashboard</h1>
          <p className="text-text-secondary mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <button className="btn-retro bg-gradient-to-r from-retro-blue to-retro-purple text-white px-6">
          📥 Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <div key={index} className="card-retro hover:shadow-retro-lg transition-all duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">{kpi.label}</p>
                <p className="text-3xl font-bold text-text mt-2">{kpi.value}</p>
                <p className="text-sm text-green-600 font-semibold mt-2">{kpi.change} vs last month</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${kpi.color} flex items-center justify-center text-2xl shadow-retro`}>
                {kpi.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card-retro">
          <h2 className="text-xl font-bold text-text mb-4 font-display">Revenue & Orders (Last 12 Months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '2px solid #000', 
                  borderRadius: '8px',
                  boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue ($)" />
              <Line type="monotone" dataKey="orders" stroke="#06b6d4" strokeWidth={3} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Sales Chart */}
        <div className="card-retro">
          <h2 className="text-xl font-bold text-text mb-4 font-display">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '2px solid #000', 
                  borderRadius: '8px',
                  boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar dataKey="sales" fill="#ff6b35" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="card-retro">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text font-display">Recent Orders</h2>
          <a href="/orders" className="text-primary font-semibold hover:underline">View All →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-900">
                <th className="text-left py-3 px-4 font-semibold text-text">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold text-text">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-text">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-text">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-text">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-mono text-sm">{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4 text-text-secondary">{order.date}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
