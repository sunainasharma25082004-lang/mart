const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('bcryptjs');

dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Mock Dataset Fallback Middleware when DB buffering/offline
let memoryProducts = [
  {
    _id: 'prod-1',
    name: 'Aashirvaad Atta 5kg',
    slug: 'aashirvaad-atta-5kg',
    category: 'Grocery & Staples',
    price: 249,
    originalPrice: 285,
    discountPercent: 13,
    unit: '5 kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: true,
    description: '100% pure whole wheat flour with 0% maida.'
  },
  {
    _id: 'prod-2',
    name: 'Fortune Sunflower Oil 1L',
    slug: 'fortune-sunflower-oil-1l',
    category: 'Grocery & Staples',
    price: 135,
    originalPrice: 160,
    discountPercent: 16,
    unit: '1 L',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: true,
    description: 'Refined sunflower oil rich in Vitamin E.'
  },
  {
    _id: 'prod-3',
    name: 'Tata Tea Premium 250g',
    slug: 'tata-tea-premium-250g',
    category: 'Beverages',
    price: 120,
    originalPrice: 150,
    discountPercent: 20,
    unit: '250 g',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: true,
    description: 'Desh ki Chai - perfect tea blend.'
  },
  {
    _id: 'prod-4',
    name: 'Surf Excel Matic 2kg',
    slug: 'surf-excel-matic-2kg',
    category: 'Household Care',
    price: 245,
    originalPrice: 295,
    discountPercent: 17,
    unit: '2 kg',
    image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: true,
    description: 'Front load detergent for tough stain removal.'
  },
  {
    _id: 'prod-5',
    name: 'Good Day Biscuits 200g',
    slug: 'good-day-biscuits-200g',
    category: 'Snacks & Branded',
    price: 20,
    originalPrice: 30,
    discountPercent: 33,
    unit: '200 g',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: true,
    description: 'Rich butter cookies with cashew nuts.'
  },
  {
    _id: 'prod-6',
    name: 'Maggi 2-Min Noodles 4pcs',
    slug: 'maggi-2-min-noodles-4pcs',
    category: 'Snacks & Branded',
    price: 56,
    originalPrice: 65,
    discountPercent: 15,
    unit: '280 g',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: true,
    description: 'Classic Masala instant noodles.'
  }
];

let memoryOrders = [
  {
    _id: 'ORD-849201',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul@example.com',
    customerPhone: '9812345678',
    shippingAddress: { address: 'House No. 102, Sector 22-B', city: 'Chandigarh', pincode: '160022' },
    paymentMethod: 'Cash on Delivery',
    subtotal: 629,
    deliveryFee: 0,
    totalAmount: 629,
    discountSaved: 70,
    orderStatus: 'Out for Delivery',
    createdAt: new Date().toISOString(),
    orderItems: [
      { name: 'Aashirvaad Atta 5kg', price: 249, quantity: 1 },
      { name: 'Fortune Sunflower Oil 1L', price: 135, quantity: 1 },
      { name: 'Surf Excel Matic 2kg', price: 245, quantity: 1 }
    ]
  }
];

let memoryCategories = [
  { _id: 'cat-1', name: 'Fruits & Vegetables', slug: 'fruits-vegetables' },
  { _id: 'cat-2', name: 'Dairy & Eggs', slug: 'dairy-eggs' },
  { _id: 'cat-3', name: 'Grocery & Staples', slug: 'grocery-staples' },
  { _id: 'cat-4', name: 'Beverages', slug: 'beverages' },
  { _id: 'cat-5', name: 'Snacks & Branded', slug: 'snacks-branded' },
  { _id: 'cat-6', name: 'Personal Care', slug: 'personal-care' },
  { _id: 'cat-7', name: 'Household Care', slug: 'household-care' }
];

app.get('/', (req, res) => {
  res.json({ message: '24/7 Service API Server is online & ready!' });
});

// Primary Mongoose routes
app.use('/api/auth', authRoutes);

// Fallback aware route handlers
app.get('/api/products', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const Product = require('./models/Product');
      const prods = await Product.find({});
      if (prods.length > 0) return res.json(prods);
    } catch (e) {}
  }
  res.json(memoryProducts);
});

app.post('/api/products', async (req, res) => {
  const newP = {
    _id: 'prod-' + Date.now(),
    ...req.body,
    discountPercent: req.body.originalPrice > req.body.price ? Math.round(((req.body.originalPrice - req.body.price) / req.body.originalPrice) * 100) : 0
  };
  memoryProducts.unshift(newP);
  res.status(201).json(newP);
});

app.get('/api/categories', async (req, res) => {
  res.json(memoryCategories);
});

app.get('/api/orders', async (req, res) => {
  res.json(memoryOrders);
});

app.get('/api/orders/:id', async (req, res) => {
  const ord = memoryOrders.find(o => o._id === req.params.id);
  if (ord) return res.json(ord);
  res.json(memoryOrders[0]);
});

app.post('/api/orders', async (req, res) => {
  const newOrder = {
    _id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    ...req.body,
    orderStatus: 'Pending',
    createdAt: new Date().toISOString()
  };
  memoryOrders.unshift(newOrder);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id/status', async (req, res) => {
  const { orderStatus } = req.body;
  const ord = memoryOrders.find(o => o._id === req.params.id);
  if (ord) {
    ord.orderStatus = orderStatus;
    return res.json(ord);
  }
  res.status(404).json({ message: 'Order not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`24/7 Service Backend Server running on http://localhost:${PORT}`);
});
