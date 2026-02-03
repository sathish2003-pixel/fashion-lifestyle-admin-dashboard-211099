import React from 'react';
import { NavLink } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Sidebar navigation component with collapsible functionality
 * @param {boolean} collapsed - Whether the sidebar is collapsed
 * @param {Function} setCollapsed - Function to toggle sidebar state
 */
const Sidebar = ({ collapsed, setCollapsed }) => {
  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/orders', icon: '📦', label: 'Orders' },
    { path: '/products', icon: '👕', label: 'Products' },
    { path: '/customers', icon: '👥', label: 'Customers' },
    { path: '/inventory', icon: '📋', label: 'Inventory' },
    { path: '/discounts', icon: '🏷️', label: 'Discounts' },
    { path: '/analytics', icon: '📈', label: 'Analytics' },
  ];

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-surface border-r-4 border-gray-900 transition-all duration-300 flex flex-col shadow-retro`}
    >
      {/* Logo Area */}
      <div className="p-6 border-b-4 border-gray-900 flex items-center justify-between bg-gradient-to-r from-retro-blue to-retro-purple">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🛍️</span>
            <h1 className="text-xl font-bold text-white font-display">Fashion Admin</h1>
          </div>
        )}
        {collapsed && <span className="text-2xl mx-auto">🛍️</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-retro-blue to-retro-purple text-white shadow-retro'
                  : 'text-text-secondary hover:bg-gray-100 hover:text-primary'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Toggle Button */}
      <div className="p-4 border-t-4 border-gray-900">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full btn-retro bg-gradient-to-r from-retro-orange to-retro-pink text-white hover:opacity-90"
        >
          <span className="text-xl">{collapsed ? '→' : '←'}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
