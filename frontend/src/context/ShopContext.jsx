import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { API_BASE } from '../config';

const ShopContext = createContext();

// Initial default cart matching pic1.png (3 items, subtotal 629, total 629)
const initialCartItems = [
  {
    _id: 'prod-1',
    name: 'Aashirvaad Atta 5kg',
    price: 249,
    originalPrice: 285,
    unit: '5kg',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400'
  },
  {
    _id: 'prod-2',
    name: 'Fortune Sunflower Oil 1L',
    price: 135,
    originalPrice: 160,
    unit: '1L',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400'
  },
  {
    _id: 'prod-4',
    name: 'Surf Excel Matic 2kg',
    price: 245,
    originalPrice: 295,
    unit: '2kg',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&q=80&w=400'
  }
];

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState(initialCartItems);
  const [wishlist, setWishlist] = useState(['prod-1', 'prod-3']);
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState({ city: 'Chandigarh', pincode: '160022' });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Check saved user token
    const token = localStorage.getItem('service_token') || localStorage.getItem('dadamart_token');
    const savedUser = localStorage.getItem('service_user') || localStorage.getItem('dadamart_user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products`);
      if (res.data && res.data.length > 0) {
        setProducts(res.data);
      }
    } catch (err) {
      console.log('Using default mock products dataset');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/categories`);
      if (res.data && res.data.length > 0) {
        setCategories(res.data);
      }
    } catch (err) {
      console.log('Using default mock categories');
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item._id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
      );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const loginUser = (userData, token) => {
    setUser(userData);
    localStorage.setItem('service_user', JSON.stringify(userData));
    localStorage.setItem('service_token', token);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('service_user');
    localStorage.removeItem('service_token');
    localStorage.removeItem('dadamart_user');
    localStorage.removeItem('dadamart_token');
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartOriginalTotal = cart.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0);
  const deliveryFee = cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 40;
  const totalSaved = cartOriginalTotal - cartSubtotal;
  const cartTotal = cartSubtotal + deliveryFee;
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        user,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedLocation,
        setSelectedLocation,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        orders,
        setOrders,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleWishlist,
        loginUser,
        logoutUser,
        cartSubtotal,
        cartTotal,
        deliveryFee,
        totalSaved,
        totalItemsCount
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
