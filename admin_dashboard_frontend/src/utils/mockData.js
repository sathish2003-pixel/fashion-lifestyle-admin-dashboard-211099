// PUBLIC_INTERFACE
/**
 * Mock data generator for the admin dashboard
 * Provides realistic sample data for orders, products, customers, inventory, discounts, and analytics
 */

// Generate random data helpers
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

// Sample product names and categories
const productCategories = ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Accessories', 'Shoes', 'Bags'];
const productNames = [
  'Vintage Denim Jacket', 'Floral Maxi Dress', 'Leather Crossbody Bag', 'Platform Sneakers',
  'Silk Blouse', 'High-Waist Trousers', 'Oversized Blazer', 'Mini Skirt', 'Ankle Boots',
  'Statement Necklace', 'Wide-Leg Jeans', 'Crop Top', 'Midi Dress', 'Trench Coat',
  'Tote Bag', 'Sandals', 'Cardigan', 'Wrap Dress', 'Bomber Jacket', 'Clutch',
];

const customerNames = [
  'Emma Johnson', 'Olivia Smith', 'Ava Williams', 'Sophia Brown', 'Isabella Jones',
  'Mia Garcia', 'Charlotte Rodriguez', 'Amelia Martinez', 'Harper Anderson', 'Evelyn Taylor',
];

const orderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const paymentMethods = ['Credit Card', 'PayPal', 'Apple Pay', 'Google Pay'];

// PUBLIC_INTERFACE
/**
 * Generate mock orders data
 * @param {number} count - Number of orders to generate
 * @returns {Array} Array of order objects
 */
export const generateOrders = (count = 50) => {
  const orders = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    const daysAgo = randomInt(0, 90);
    const orderDate = new Date(today);
    orderDate.setDate(orderDate.getDate() - daysAgo);
    
    const itemCount = randomInt(1, 5);
    const total = parseFloat(randomFloat(29.99, 499.99));
    
    orders.push({
      id: `ORD-${10000 + i}`,
      customer: customerNames[randomInt(0, customerNames.length - 1)],
      date: orderDate.toISOString().split('T')[0],
      status: orderStatuses[randomInt(0, orderStatuses.length - 1)],
      items: itemCount,
      total: total,
      paymentMethod: paymentMethods[randomInt(0, paymentMethods.length - 1)],
    });
  }
  
  return orders.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// PUBLIC_INTERFACE
/**
 * Generate mock products data
 * @param {number} count - Number of products to generate
 * @returns {Array} Array of product objects
 */
export const generateProducts = (count = 30) => {
  const products = [];
  
  for (let i = 0; i < count; i++) {
    const category = productCategories[randomInt(0, productCategories.length - 1)];
    const name = productNames[randomInt(0, productNames.length - 1)];
    const sku = `SKU-${1000 + i}`;
    const price = parseFloat(randomFloat(19.99, 299.99));
    const stock = randomInt(0, 200);
    const sold = randomInt(10, 500);
    
    products.push({
      id: i + 1,
      sku,
      name,
      category,
      price,
      stock,
      sold,
      status: stock > 10 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock',
      image: `https://via.placeholder.com/100x100/3b82f6/ffffff?text=${name.substring(0, 2)}`,
    });
  }
  
  return products;
};

// PUBLIC_INTERFACE
/**
 * Generate mock customers data
 * @param {number} count - Number of customers to generate
 * @returns {Array} Array of customer objects
 */
export const generateCustomers = (count = 25) => {
  const customers = [];
  
  for (let i = 0; i < count; i++) {
    const name = customerNames[i % customerNames.length] + (i >= customerNames.length ? ` ${Math.floor(i / customerNames.length) + 1}` : '');
    const email = name.toLowerCase().replace(' ', '.') + '@example.com';
    const orders = randomInt(1, 25);
    const totalSpent = parseFloat(randomFloat(50, 5000));
    const joinDate = new Date();
    joinDate.setDate(joinDate.getDate() - randomInt(30, 730));
    
    customers.push({
      id: i + 1,
      name,
      email,
      orders,
      totalSpent,
      joinDate: joinDate.toISOString().split('T')[0],
      status: Math.random() > 0.1 ? 'Active' : 'Inactive',
    });
  }
  
  return customers.sort((a, b) => b.totalSpent - a.totalSpent);
};

// PUBLIC_INTERFACE
/**
 * Generate mock discounts data
 * @returns {Array} Array of discount objects
 */
export const generateDiscounts = () => {
  return [
    { id: 1, code: 'SUMMER25', type: 'Percentage', value: 25, uses: 145, maxUses: 500, status: 'Active', startDate: '2024-06-01', endDate: '2024-08-31' },
    { id: 2, code: 'WELCOME10', type: 'Percentage', value: 10, uses: 523, maxUses: 1000, status: 'Active', startDate: '2024-01-01', endDate: '2024-12-31' },
    { id: 3, code: 'FREESHIP', type: 'Free Shipping', value: 0, uses: 892, maxUses: null, status: 'Active', startDate: '2024-01-01', endDate: '2024-12-31' },
    { id: 4, code: 'FLASH50', type: 'Percentage', value: 50, uses: 50, maxUses: 50, status: 'Expired', startDate: '2024-05-15', endDate: '2024-05-16' },
    { id: 5, code: 'NEWYEAR20', type: 'Percentage', value: 20, uses: 312, maxUses: 500, status: 'Expired', startDate: '2024-01-01', endDate: '2024-01-15' },
    { id: 6, code: 'VIP30', type: 'Percentage', value: 30, uses: 67, maxUses: 200, status: 'Active', startDate: '2024-01-01', endDate: '2024-12-31' },
  ];
};

// PUBLIC_INTERFACE
/**
 * Generate mock analytics data for charts
 * @returns {Object} Analytics data object with revenue, orders, and traffic data
 */
export const generateAnalytics = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenueData = months.map(month => ({
    month,
    revenue: randomInt(15000, 45000),
    orders: randomInt(200, 800),
  }));
  
  const categoryData = productCategories.map(category => ({
    category,
    sales: randomInt(5000, 25000),
  }));
  
  const trafficData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    visitors: randomInt(500, 2500),
    pageViews: randomInt(1500, 7500),
  }));
  
  return {
    revenueData,
    categoryData,
    trafficData,
    kpis: {
      totalRevenue: 387420,
      totalOrders: 5824,
      averageOrderValue: 66.53,
      conversionRate: 3.42,
      totalCustomers: 2456,
      activeProducts: 287,
      lowStockItems: 18,
      outOfStockItems: 5,
    },
  };
};

// PUBLIC_INTERFACE
/**
 * Generate mock inventory alerts
 * @returns {Array} Array of inventory alert objects
 */
export const generateInventoryAlerts = () => {
  return [
    { id: 1, product: 'Vintage Denim Jacket', sku: 'SKU-1001', stock: 3, threshold: 10, severity: 'critical' },
    { id: 2, product: 'Platform Sneakers', sku: 'SKU-1008', stock: 0, threshold: 10, severity: 'critical' },
    { id: 3, product: 'Leather Crossbody Bag', sku: 'SKU-1003', stock: 8, threshold: 15, severity: 'warning' },
    { id: 4, product: 'Silk Blouse', sku: 'SKU-1005', stock: 5, threshold: 10, severity: 'warning' },
    { id: 5, product: 'Oversized Blazer', sku: 'SKU-1007', stock: 0, threshold: 10, severity: 'critical' },
  ];
};
