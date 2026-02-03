import React from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateAnalytics } from '../utils/mockData';

// PUBLIC_INTERFACE
/**
 * Analytics page component
 * Displays comprehensive analytics with multiple chart types
 */
const Analytics = () => {
  const analytics = generateAnalytics();

  const COLORS = ['#3b82f6', '#06b6d4', '#ff6b35', '#8338ec', '#ffbe0b', '#ff006e', '#3a86ff'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text font-display">Analytics</h1>
          <p className="text-text-secondary mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
          <button className="btn-retro bg-gradient-to-r from-retro-blue to-retro-purple text-white px-6">
            📥 Export Data
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-retro">
          <p className="text-text-secondary text-sm font-medium">Conversion Rate</p>
          <p className="text-3xl font-bold text-text mt-2">{analytics.kpis.conversionRate}%</p>
          <p className="text-sm text-green-600 font-semibold mt-2">+0.5% vs last month</p>
        </div>
        <div className="card-retro">
          <p className="text-text-secondary text-sm font-medium">Avg Order Value</p>
          <p className="text-3xl font-bold text-text mt-2">${analytics.kpis.averageOrderValue}</p>
          <p className="text-sm text-green-600 font-semibold mt-2">+2.1% vs last month</p>
        </div>
        <div className="card-retro">
          <p className="text-text-secondary text-sm font-medium">Active Products</p>
          <p className="text-3xl font-bold text-text mt-2">{analytics.kpis.activeProducts}</p>
          <p className="text-sm text-text-secondary mt-2">{analytics.kpis.lowStockItems} low stock</p>
        </div>
        <div className="card-retro">
          <p className="text-text-secondary text-sm font-medium">Customer Retention</p>
          <p className="text-3xl font-bold text-text mt-2">68.5%</p>
          <p className="text-sm text-green-600 font-semibold mt-2">+4.2% vs last month</p>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="card-retro">
        <h2 className="text-xl font-bold text-text mb-4 font-display">Revenue Trend (12 Months)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={analytics.revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <div className="card-retro">
          <h2 className="text-xl font-bold text-text mb-4 font-display">Category Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#64748b" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '2px solid #000', 
                  borderRadius: '8px',
                  boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar dataKey="sales" radius={[8, 8, 0, 0]}>
                {analytics.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Distribution */}
        <div className="card-retro">
          <h2 className="text-xl font-bold text-text mb-4 font-display">Sales Distribution by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="sales"
              >
                {analytics.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '2px solid #000', 
                  borderRadius: '8px',
                  boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="card-retro">
        <h2 className="text-xl font-bold text-text mb-4 font-display">Website Traffic (Last 30 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analytics.trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#64748b" label={{ value: 'Day of Month', position: 'insideBottom', offset: -5 }} />
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
            <Line type="monotone" dataKey="visitors" stroke="#ff6b35" strokeWidth={3} name="Visitors" />
            <Line type="monotone" dataKey="pageViews" stroke="#8338ec" strokeWidth={3} name="Page Views" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-retro">
          <h3 className="font-semibold text-text mb-3">Top Selling Category</h3>
          <p className="text-2xl font-bold text-primary">
            {analytics.categoryData.reduce((max, cat) => cat.sales > max.sales ? cat : max).category}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            ${analytics.categoryData.reduce((max, cat) => cat.sales > max.sales ? cat : max).sales.toLocaleString()} in sales
          </p>
        </div>
        <div className="card-retro">
          <h3 className="font-semibold text-text mb-3">Peak Revenue Month</h3>
          <p className="text-2xl font-bold text-primary">
            {analytics.revenueData.reduce((max, month) => month.revenue > max.revenue ? month : max).month}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            ${analytics.revenueData.reduce((max, month) => month.revenue > max.revenue ? month : max).revenue.toLocaleString()} revenue
          </p>
        </div>
        <div className="card-retro">
          <h3 className="font-semibold text-text mb-3">Total Page Views</h3>
          <p className="text-2xl font-bold text-primary">
            {analytics.trafficData.reduce((sum, day) => sum + day.pageViews, 0).toLocaleString()}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            {Math.round(analytics.trafficData.reduce((sum, day) => sum + day.pageViews, 0) / 30).toLocaleString()} avg per day
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
