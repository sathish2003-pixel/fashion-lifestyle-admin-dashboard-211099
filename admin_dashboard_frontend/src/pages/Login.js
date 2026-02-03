import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
/**
 * Login page component
 * Handles user authentication
 */
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="text-5xl">🛍️</span>
          </div>
          <h1 className="text-3xl font-bold text-text font-display">Fashion Admin</h1>
          <p className="text-text-secondary mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="card-retro">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your username"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-retro bg-gradient-to-r from-retro-blue to-retro-purple text-white py-3 text-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-gray-200 text-center">
            <p className="text-sm text-text-secondary">
              Default credentials: <strong>admin / admin123</strong>
            </p>
          </div>
        </div>

        <p className="text-center text-text-secondary text-sm mt-6">
          Fashion & Lifestyle Admin Dashboard
        </p>
      </div>
    </div>
  );
};

export default Login;
