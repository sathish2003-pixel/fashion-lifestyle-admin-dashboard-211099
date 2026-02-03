import React from 'react';

// PUBLIC_INTERFACE
/**
 * Header component with search bar and user profile
 */
const Header = () => {
  return (
    <header className="bg-surface border-b-4 border-gray-900 px-6 py-4 shadow-retro">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              className="w-full px-4 py-2 pl-10 border-3 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
            <span className="absolute left-3 top-2.5 text-xl">🔍</span>
          </div>
        </div>

        {/* Right Side - Notifications & Profile */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-2xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-retro-pink rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l-3 border-gray-300">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-retro-purple to-retro-blue flex items-center justify-center text-white font-bold text-lg shadow-retro">
              A
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-text">Admin User</p>
              <p className="text-xs text-text-secondary">admin@fashion.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
