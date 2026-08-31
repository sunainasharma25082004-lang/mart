const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

const initialCategories = [
  { name: 'Fruits & Vegetables', slug: 'fruits-vegetables', icon: 'Apple', description: 'Fresh farm-picked fruits and organic green vegetables' },
  { name: 'Dairy & Eggs', slug: 'dairy-eggs', icon: 'Milk', description: 'Pure milk, butter, cheese, curd and farm fresh eggs' },
  { name: 'Grocery & Staples', slug: 'grocery-staples', icon: 'Wheat', description: 'Atta, rice, pulses, cooking oils, ghee & spices' },
  { name: 'Beverages', slug: 'beverages', icon: 'Coffee', description: 'Tea, coffee, fruit juices, energy drinks & sodas' },
  { name: 'Snacks & Branded', slug: 'snacks-branded', icon: 'Cookie', description: 'Biscuits, noodles, chips, chocolates & instant food' },
  { name: 'Personal Care', slug: 'personal-care', icon: 'Sparkles', description: 'Soaps, shampoos, skincare, oral care & grooming' },
  { name: 'Household Care', slug: 'household-care', icon: 'Home', description: 'Detergents, surface cleaners, dishwash & paper towels' }
];

const initialProducts = [
  {
    name: 'Aashirvaad Atta 5kg',
    slug: 'aashirvaad-atta-5kg',
    category: 'Grocery & Staples',
    price: 249,
    originalPrice: 285,
    discountPercent: 13,
    unit: '5 kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: true,
    description: '100% pure whole wheat flour with 0% maida for soft rotis.'
  },
  {
    name: 'Fortune Sunflower Oil 1L',
    slug: 'fortune-sunflower-oil-1l',
    category: 'Grocery & Staples',
    price: 135,
    originalPrice: 160,
    discountPercent: 16,
    unit: '1 L',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: true,
    description: 'Refined sunflower oil rich in Vitamin E for healthy cooking.'
  },
  {
    name: 'Tata Tea Premium 250g',
    slug: 'tata-tea-premium-250g',
    category: 'Beverages',
    price: 120,
    originalPrice: 150,
    discountPercent: 20,
    unit: '250 g',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: true,
    description: 'Desh ki Chai - perfect blend of big and small tea leaves.'
  },
  {
    name: 'Surf Excel Matic 2kg',
    slug: 'surf-excel-matic-2kg',
    category: 'Household Care',
    price: 245,
    originalPrice: 295,
    discountPercent: 17,
    unit: '2 kg',
    image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: true,
    description: 'Front load liquid & powder detergent for tough stain removal.'
  },
  {
    name: 'Good Day Biscuits 200g',
    slug: 'good-day-biscuits-200g',
    category: 'Snacks & Branded',
    price: 20,
    originalPrice: 30,
    discountPercent: 33,
    unit: '200 g',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: true,
    description: 'Rich butter cookies filled with crunchy cashew nuts.'
  },
  {
    name: 'Maggi 2-Min Noodles 4pcs',
    slug: 'maggi-2-min-noodles-4pcs',
    category: 'Snacks & Branded',
    price: 56,
    originalPrice: 65,
    discountPercent: 15,
    unit: '280 g',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: true,
    description: 'Classic Masala instant noodles made with finest spices.'
  },
  {
    name: 'Amul Taaza Toned Milk 1L',
    slug: 'amul-taaza-toned-milk-1l',
    category: 'Dairy & Eggs',
    price: 54,
    originalPrice: 60,
    discountPercent: 10,
    unit: '1 L',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: false,
    description: 'Pasteurised homogenized toned milk.'
  },
  {
    name: 'Farm Fresh Organic Eggs 6pcs',
    slug: 'farm-fresh-organic-eggs-6pcs',
    category: 'Dairy & Eggs',
    price: 48,
    originalPrice: 60,
    discountPercent: 20,
    unit: '6 pcs',
    image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: false,
    description: 'High-protein farm fresh white eggs.'
  },
  {
    name: 'Fresh Kashmiri Apples 1kg',
    slug: 'fresh-kashmiri-apples-1kg',
    category: 'Fruits & Vegetables',
    price: 140,
    originalPrice: 180,
    discountPercent: 22,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: false,
    description: 'Crisp and juicy sweet red apples.'
  },
  {
    name: 'Dove Cream Beauty Bathing Bar 3x100g',
    slug: 'dove-cream-beauty-bathing-bar',
    category: 'Personal Care',
    price: 165,
    originalPrice: 195,
    discountPercent: 15,
    unit: '3 x 100g',
    image: 'https://images.unsplash.com/photo-1607006482602-76ca0fd2f477?auto=format&fit=crop&q=80&w=400',
    isDealOfDay: false,
    description: 'Contains 1/4 moisturizing cream for soft, smooth skin.'
  }
];

const seedData = async () => {
  await connectDB();
  try {
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    const adminUser = await User.create({
      name: '24/7 Service Admin',
      email: 'admin@247service.com',
      password: 'adminpassword123',
      role: 'admin',
      phone: '9876543210'
    });

    const regularUser = await User.create({
      name: 'Rahul Sharma',
      email: 'user@247service.com',
      password: 'userpassword123',
      role: 'user',
      phone: '9812345678'
    });

    console.log('Seeded Users: Admin & Regular User created');

    await Category.insertMany(initialCategories);
    console.log('Seeded Categories');

    await Product.insertMany(initialProducts);
    console.log('Seeded Products matching pic1.png');

    console.log('Database Seeding Completed Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error Seeding Database:', error);
    process.exit(1);
  }
};

seedData();
