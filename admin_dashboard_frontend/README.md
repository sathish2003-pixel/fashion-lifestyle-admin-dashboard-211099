# Fashion & Lifestyle Admin Dashboard

A professional, desktop-optimized e-commerce admin dashboard built with React and Tailwind CSS, featuring a retro theme with modern SaaS design patterns.

## 🎨 Features

### Design & Layout
- **Retro Theme**: Bold borders, custom shadows, vibrant gradient accents
- **Collapsible Sidebar**: Space-efficient navigation with icon-only mode
- **Responsive Header**: Search functionality and user profile
- **Desktop-Optimized**: Designed for professional desktop use
- **Color Scheme**: 
  - Primary: `#3b82f6` (Blue)
  - Accent: `#06b6d4` (Cyan)
  - Background: `#f9fafb` (Light Gray)
  - Surface: `#ffffff` (White)
  - Text: `#111827` (Dark Gray)

### Dashboard Pages

#### 1. **Dashboard (Home)**
- Key Performance Indicators (KPIs)
  - Total Revenue
  - Total Orders
  - Average Order Value
  - Total Customers
- Revenue & Orders trend chart (12 months)
- Sales by Category bar chart
- Recent orders table
- Visual trends with percentage changes

#### 2. **Orders**
- Complete order management
- Filter by status (Pending, Processing, Shipped, Delivered, Cancelled)
- Search by order ID or customer name
- Order statistics overview
- Detailed order information including payment method
- Export functionality

#### 3. **Products**
- Product catalog management
- Grid and Table view modes
- Category filtering
- Search by product name or SKU
- Stock status indicators
- Product images and pricing
- Add/Edit product capabilities

#### 4. **Customers**
- Customer database
- Total spending tracking
- Order history
- Customer status (Active/Inactive)
- Join date tracking
- Search and filter functionality
- Customer analytics

#### 5. **Inventory**
- Real-time stock monitoring
- Low stock alerts
- Out of stock tracking
- Inventory status overview
- Restock functionality
- Product-wise inventory management
- Critical alerts for urgent restocking

#### 6. **Discounts**
- Discount code management
- Promotion tracking
- Usage statistics
- Active/Expired status
- Percentage and Free Shipping discounts
- Usage limits and progress bars
- Create new discount codes

#### 7. **Analytics**
- Comprehensive metrics dashboard
- Revenue trends (Area chart)
- Category performance (Bar chart)
- Sales distribution (Pie chart)
- Website traffic monitoring
- Conversion rates
- Customer retention metrics
- Export data functionality

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd admin_dashboard_frontend

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📦 Dependencies

### Core Dependencies
- `react: 18.3.1` - UI library
- `react-dom: 18.3.1` - React DOM rendering
- `react-router-dom: 6.21.3` - Client-side routing
- `recharts: 2.10.3` - Charts and data visualization
- `react-scripts: 5.0.1` - Build tooling

### Development Dependencies
- `tailwindcss: 3.4.1` - Utility-first CSS framework
- `postcss: 8.4.35` - CSS transformation
- `autoprefixer: 10.4.17` - CSS vendor prefixing
- `cross-env: 7.0.3` - Cross-platform environment variables

## 🎯 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Top navigation header
│   └── Sidebar.js      # Collapsible sidebar navigation
├── pages/              # Page components
│   ├── Dashboard.js    # Main dashboard with KPIs
│   ├── Orders.js       # Order management
│   ├── Products.js     # Product catalog
│   ├── Customers.js    # Customer management
│   ├── Inventory.js    # Stock monitoring
│   ├── Discounts.js    # Promotion management
│   └── Analytics.js    # Analytics & reports
├── utils/              # Utility functions
│   └── mockData.js     # Mock data generators
├── App.js              # Main app component with routing
├── index.js            # Application entry point
└── index.css           # Global styles with Tailwind
```

## 🎨 Customization

### Tailwind Configuration
The theme can be customized in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',
      accent: '#06b6d4',
      retro: {
        orange: '#ff6b35',
        pink: '#ff006e',
        purple: '#8338ec',
        blue: '#3a86ff',
        yellow: '#ffbe0b',
      }
    }
  }
}
```

### Custom Retro Styles
Retro button and card styles are defined in `src/index.css`:
- `.btn-retro` - Retro-styled buttons with shadow effects
- `.card-retro` - Card containers with border and shadow
- `.custom-scrollbar` - Styled scrollbars

## 📊 Mock Data

The dashboard uses realistic mock data for demonstration purposes:
- 50 sample orders
- 30 sample products across 7 categories
- 25 sample customers
- 6 discount codes
- 12 months of revenue data
- 30 days of traffic data

All mock data is generated in `src/utils/mockData.js` and can be easily replaced with real API calls.

## 🔌 API Integration

To connect to a real backend:

1. Replace mock data imports with API calls
2. Use environment variables for API endpoints (e.g., `REACT_APP_API_BASE`)
3. Implement authentication and authorization
4. Add error handling and loading states

Example:
```javascript
// Replace this:
const [orders] = useState(generateOrders(50));

// With this:
const [orders, setOrders] = useState([]);
useEffect(() => {
  fetch(`${process.env.REACT_APP_API_BASE}/orders`)
    .then(res => res.json())
    .then(data => setOrders(data));
}, []);
```

## 🌐 Environment Variables

Create a `.env` file in the project root:

```
REACT_APP_API_BASE=http://localhost:3001/api
REACT_APP_BACKEND_URL=http://localhost:3001
REACT_APP_FRONTEND_URL=http://localhost:3000
```

## 🏗️ Building for Production

```bash
# Create production build
npm run build

# The build folder will contain optimized static files
# Deploy the contents of the build folder to your hosting service
```

## 🎯 Best Practices

- **Component Structure**: Small, focused components with single responsibility
- **State Management**: React Hooks (useState, useEffect) for local state
- **Routing**: React Router for client-side navigation
- **Styling**: Tailwind utility classes for consistent design
- **Code Quality**: ESLint configuration for code standards
- **Accessibility**: Semantic HTML and ARIA labels where needed

## 📱 Responsive Design

While optimized for desktop, the dashboard includes responsive breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔐 Security Considerations

When integrating with a real backend:
- Implement proper authentication (JWT, OAuth)
- Validate user permissions for each action
- Sanitize user inputs
- Use HTTPS in production
- Implement CSRF protection
- Store sensitive data securely

## 🚀 Deployment

The dashboard can be deployed to:
- **Vercel**: Zero-config deployment for React apps
- **Netlify**: Continuous deployment from Git
- **AWS S3 + CloudFront**: Static hosting with CDN
- **Docker**: Containerized deployment

## 📄 License

This project is part of the Kavia AI platform.

## 🤝 Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**Built with ❤️ using React, Tailwind CSS, and Recharts**
