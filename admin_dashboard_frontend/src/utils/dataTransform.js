// PUBLIC_INTERFACE
/**
 * Data transformation utilities
 * Maps backend API responses to frontend data format
 */

/**
 * Transform backend product to frontend format
 */
export const transformProduct = (product) => {
  if (!product) return null;

  return {
    id: product.id,
    sku: product.sku,
    name: product.name,
    category: product.category || 'Uncategorized',
    price: parseFloat(product.price),
    stock: 0, // Will be populated from inventory
    sold: 0, // Calculated from orders
    status: product.is_active ? 'In Stock' : 'Inactive',
    image: product.image_url || `https://via.placeholder.com/100x100/3b82f6/ffffff?text=${product.name.substring(0, 2)}`,
  };
};

/**
 * Transform backend customer to frontend format
 */
export const transformCustomer = (customer) => {
  if (!customer) return null;

  const fullName = `${customer.first_name} ${customer.last_name}`;
  
  return {
    id: customer.id,
    name: fullName,
    email: customer.email,
    orders: customer.total_orders || 0,
    totalSpent: parseFloat(customer.total_spent || 0),
    joinDate: new Date(customer.created_at).toISOString().split('T')[0],
    status: 'Active', // Backend doesn't have status, default to Active
  };
};

/**
 * Transform backend order to frontend format
 */
export const transformOrder = (order, customers = []) => {
  if (!order) return null;

  // Find customer name
  const customer = customers.find(c => c.id === order.customer_id);
  const customerName = customer 
    ? `${customer.first_name} ${customer.last_name}` 
    : `Customer ${order.customer_id}`;

  // Map backend status to frontend status
  const statusMap = {
    'pending': 'Pending',
    'processing': 'Processing',
    'shipped': 'Shipped',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled',
  };

  return {
    id: order.order_number || `ORD-${order.id}`,
    customer: customerName,
    date: new Date(order.created_at).toISOString().split('T')[0],
    status: statusMap[order.status] || 'Pending',
    items: order.items?.length || 0,
    total: parseFloat(order.total_amount || 0),
    paymentMethod: 'Credit Card', // Backend doesn't track this
  };
};

/**
 * Transform backend inventory to frontend product format
 */
export const transformInventory = (inventory, products = []) => {
  if (!inventory) return null;

  const product = products.find(p => p.id === inventory.product_id);
  
  if (!product) return null;

  const stock = inventory.available || 0;
  
  return {
    ...transformProduct(product),
    stock: stock,
    status: stock === 0 ? 'Out of Stock' : stock <= 10 ? 'Low Stock' : 'In Stock',
  };
};

/**
 * Transform backend discount to frontend format
 */
export const transformDiscount = (discount) => {
  if (!discount) return null;

  const startDate = new Date(discount.start_date).toISOString().split('T')[0];
  const endDate = new Date(discount.end_date).toISOString().split('T')[0];
  const now = new Date();
  const endDateTime = new Date(discount.end_date);
  
  const isExpired = endDateTime < now || !discount.is_active;
  const isLimitReached = discount.usage_limit && discount.usage_count >= discount.usage_limit;

  return {
    id: discount.id,
    code: discount.code,
    type: discount.discount_type === 'percentage' ? 'Percentage' : 'Fixed',
    value: parseFloat(discount.discount_value),
    uses: discount.usage_count || 0,
    maxUses: discount.usage_limit || null,
    status: (isExpired || isLimitReached) ? 'Expired' : 'Active',
    startDate: startDate,
    endDate: endDate,
  };
};

/**
 * Transform analytics dashboard stats to frontend format
 */
export const transformDashboardStats = (stats) => {
  if (!stats) return null;

  return {
    totalRevenue: parseFloat(stats.total_revenue || 0),
    totalOrders: parseInt(stats.total_orders || 0),
    averageOrderValue: parseFloat(stats.avg_order_value || 0),
    conversionRate: 3.42, // Not provided by backend
    totalCustomers: parseInt(stats.total_customers || 0),
    activeProducts: parseInt(stats.total_products || 0),
    lowStockItems: 0, // Calculated from inventory
    outOfStockItems: 0, // Calculated from inventory
  };
};

/**
 * Transform analytics revenue data for charts
 */
export const transformRevenueData = (revenueByDay) => {
  if (!revenueByDay || !Array.isArray(revenueByDay)) return [];

  return revenueByDay.map(item => ({
    month: item.period || item.day || 'N/A',
    revenue: parseFloat(item.revenue || 0),
    orders: parseInt(item.orders || 0),
  }));
};

/**
 * Generate category data from products (backend doesn't provide this)
 */
export const generateCategoryData = (products) => {
  if (!products || !Array.isArray(products)) return [];

  const categoryMap = {};
  
  products.forEach(product => {
    const category = product.category || 'Uncategorized';
    if (!categoryMap[category]) {
      categoryMap[category] = 0;
    }
    categoryMap[category] += parseFloat(product.price || 0);
  });

  return Object.entries(categoryMap).map(([category, sales]) => ({
    category,
    sales: Math.round(sales),
  }));
};

/**
 * Generate inventory alerts from inventory data
 */
export const generateInventoryAlerts = (inventoryItems, products) => {
  if (!inventoryItems || !Array.isArray(inventoryItems)) return [];

  return inventoryItems
    .filter(inv => inv.available <= inv.reorder_level)
    .map((inv, index) => {
      const product = products.find(p => p.id === inv.product_id);
      return {
        id: index + 1,
        product: product?.name || `Product ${inv.product_id}`,
        sku: product?.sku || 'N/A',
        stock: inv.available,
        threshold: inv.reorder_level,
        severity: inv.available === 0 ? 'critical' : 'warning',
      };
    })
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 10);
};
