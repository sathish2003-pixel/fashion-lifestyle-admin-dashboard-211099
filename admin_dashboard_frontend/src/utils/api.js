// PUBLIC_INTERFACE
/**
 * API utility for backend communication
 * Handles authentication, request/response formatting, and error handling
 */

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

/**
 * Get authentication token from localStorage
 */
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Set authentication token in localStorage
 */
const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

/**
 * Remove authentication token from localStorage
 */
const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

/**
 * Make authenticated API request
 * @param {string} endpoint - API endpoint path
 * @param {object} options - Fetch options
 * @returns {Promise} - API response
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    
    // Handle 401 Unauthorized - token expired or invalid
    if (response.status === 401) {
      removeAuthToken();
      window.location.href = '/login';
      throw new Error('Authentication required');
    }

    // Handle other error responses
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || error.detail || `HTTP ${response.status}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  register: async (userData) => {
    return apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await apiRequest('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (response.access_token) {
      setAuthToken(response.access_token);
    }

    return response;
  },

  getCurrentUser: async () => {
    return apiRequest('/api/auth/me');
  },

  logout: () => {
    removeAuthToken();
  },
};

// Products API
export const productsAPI = {
  getAll: async (skip = 0, limit = 100) => {
    return apiRequest(`/api/products/?skip=${skip}&limit=${limit}`);
  },

  getById: async (id) => {
    return apiRequest(`/api/products/${id}`);
  },

  create: async (productData) => {
    return apiRequest('/api/products/', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  update: async (id, productData) => {
    return apiRequest(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/api/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Customers API
export const customersAPI = {
  getAll: async (skip = 0, limit = 100) => {
    return apiRequest(`/api/customers/?skip=${skip}&limit=${limit}`);
  },

  getById: async (id) => {
    return apiRequest(`/api/customers/${id}`);
  },

  create: async (customerData) => {
    return apiRequest('/api/customers/', {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
  },

  update: async (id, customerData) => {
    return apiRequest(`/api/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customerData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/api/customers/${id}`, {
      method: 'DELETE',
    });
  },
};

// Orders API
export const ordersAPI = {
  getAll: async (skip = 0, limit = 100) => {
    return apiRequest(`/api/orders/?skip=${skip}&limit=${limit}`);
  },

  getById: async (id) => {
    return apiRequest(`/api/orders/${id}`);
  },

  create: async (orderData) => {
    return apiRequest('/api/orders/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  update: async (id, orderData) => {
    return apiRequest(`/api/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/api/orders/${id}`, {
      method: 'DELETE',
    });
  },
};

// Inventory API
export const inventoryAPI = {
  getAll: async (skip = 0, limit = 100) => {
    return apiRequest(`/api/inventory/?skip=${skip}&limit=${limit}`);
  },

  getById: async (id) => {
    return apiRequest(`/api/inventory/${id}`);
  },

  getByProductId: async (productId) => {
    return apiRequest(`/api/inventory/product/${productId}`);
  },

  create: async (inventoryData) => {
    return apiRequest('/api/inventory/', {
      method: 'POST',
      body: JSON.stringify(inventoryData),
    });
  },

  update: async (id, inventoryData) => {
    return apiRequest(`/api/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(inventoryData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/api/inventory/${id}`, {
      method: 'DELETE',
    });
  },
};

// Discounts API
export const discountsAPI = {
  getAll: async (skip = 0, limit = 100) => {
    return apiRequest(`/api/discounts/?skip=${skip}&limit=${limit}`);
  },

  getActive: async () => {
    return apiRequest('/api/discounts/active');
  },

  getById: async (id) => {
    return apiRequest(`/api/discounts/${id}`);
  },

  create: async (discountData) => {
    return apiRequest('/api/discounts/', {
      method: 'POST',
      body: JSON.stringify(discountData),
    });
  },

  update: async (id, discountData) => {
    return apiRequest(`/api/discounts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(discountData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/api/discounts/${id}`, {
      method: 'DELETE',
    });
  },
};

// Analytics API
export const analyticsAPI = {
  getAll: async () => {
    return apiRequest('/api/analytics/');
  },

  getDashboardStats: async () => {
    return apiRequest('/api/analytics/dashboard');
  },
};

export { getAuthToken, setAuthToken, removeAuthToken };
