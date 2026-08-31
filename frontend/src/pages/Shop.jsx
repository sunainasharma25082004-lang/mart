import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Plus, Minus, Heart, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const { products, cart, addToCart, updateQuantity, wishlist, toggleWishlist } = useShop();

  const categoryParam = searchParams.get('category') || 'All Categories';
  const searchParam = searchParams.get('search') || '';
  const dealParam = searchParams.get('deal') === 'true';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [query, setQuery] = useState(searchParam);
  const [priceLimit, setPriceLimit] = useState(500);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
    if (searchParam) setQuery(searchParam);
  }, [categoryParam, searchParam]);

  const categories = [
    'All Categories',
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Grocery & Staples',
    'Beverages',
    'Snacks & Branded',
    'Personal Care',
    'Household Care'
  ];

  const allProductsList = products.length > 0 ? products : [
    { _id: 'prod-1', name: 'Aashirvaad Atta 5kg', category: 'Grocery & Staples', price: 249, originalPrice: 285, discountPercent: 13, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300', isDealOfDay: true },
    { _id: 'prod-2', name: 'Fortune Sunflower Oil 1L', category: 'Grocery & Staples', price: 135, originalPrice: 160, discountPercent: 16, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=300', isDealOfDay: true },
    { _id: 'prod-3', name: 'Tata Tea Premium 250g', category: 'Beverages', price: 120, originalPrice: 150, discountPercent: 20, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=300', isDealOfDay: true },
    { _id: 'prod-4', name: 'Surf Excel Matic 2kg', category: 'Household Care', price: 245, originalPrice: 295, discountPercent: 17, image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&q=80&w=300', isDealOfDay: true },
    { _id: 'prod-5', name: 'Good Day Biscuits 200g', category: 'Snacks & Branded', price: 20, originalPrice: 30, discountPercent: 33, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=300', isDealOfDay: true },
    { _id: 'prod-6', name: 'Maggi 2-Min Noodles 4pcs', category: 'Snacks & Branded', price: 56, originalPrice: 65, discountPercent: 15, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=300', isDealOfDay: true },
    { _id: 'prod-7', name: 'Amul Taaza Toned Milk 1L', category: 'Dairy & Eggs', price: 54, originalPrice: 60, discountPercent: 10, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=300', isDealOfDay: false },
    { _id: 'prod-8', name: 'Farm Fresh Organic Eggs 6pcs', category: 'Dairy & Eggs', price: 48, originalPrice: 60, discountPercent: 20, image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&q=80&w=300', isDealOfDay: false },
    { _id: 'prod-9', name: 'Fresh Kashmiri Apples 1kg', category: 'Fruits & Vegetables', price: 140, originalPrice: 180, discountPercent: 22, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=300', isDealOfDay: false },
    { _id: 'prod-10', name: 'Dove Bathing Soap 3x100g', category: 'Personal Care', price: 165, originalPrice: 195, discountPercent: 15, image: 'https://images.unsplash.com/photo-1607006482602-76ca0fd2f477?auto=format&fit=crop&q=80&w=300', isDealOfDay: false }
  ];

  const filteredProducts = allProductsList.filter(product => {
    const matchesCategory = activeCategory === 'All Categories' || product.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesQuery = !query || product.name.toLowerCase().includes(query.toLowerCase());
    const matchesDeal = !dealParam || product.isDealOfDay;
    const matchesPrice = product.price <= priceLimit;
    return matchesCategory && matchesQuery && matchesDeal && matchesPrice;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '24px auto', padding: '0 16px' }}>
      
      {/* MOBILE FILTER TOGGLE BUTTON */}
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D1D5DB',
            padding: '10px 16px',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '0.9rem',
            color: '#044B29',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} />
            <span>Filter Products ({activeCategory})</span>
          </div>
          {showMobileFilter ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <div className="shop-page-grid" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* FILTER SIDEBAR (Collapsible on mobile via toggle state or class) */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          display: showMobileFilter || window.innerWidth > 900 ? 'block' : 'none'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #E5E7EB', paddingBottom: '12px', marginBottom: '16px' }}>
            <Filter size={18} style={{ color: '#044B29' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1F2937' }}>Filter Products</h3>
          </div>

          {/* Search Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Search Keyword</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search items..."
                style={{ width: '100%', padding: '8px 12px 8px 32px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
              />
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            </div>
          </div>

          {/* Category List */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '8px' }}>Categories</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveCategory(cat);
                    setShowMobileFilter(false);
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    fontSize: '0.84rem',
                    fontWeight: activeCategory === cat ? 800 : 500,
                    backgroundColor: activeCategory === cat ? '#E8F5E9' : 'transparent',
                    color: activeCategory === cat ? '#044B29' : '#4B5563',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              <span>Max Price:</span>
              <span style={{ color: '#044B29' }}>₹{priceLimit}</span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              value={priceLimit}
              onChange={(e) => setPriceLimit(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#044B29' }}
            />
          </div>

        </div>

        {/* PRODUCTS GRID */}
        <div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1F2937' }}>
              {activeCategory} {dealParam && '— Top Deals'}
            </h2>
            <span style={{ fontSize: '0.82rem', color: '#6B7280', fontWeight: 600 }}>
              Showing {filteredProducts.length} items
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '60px 20px', textAlign: 'center', color: '#6B7280', border: '1px solid #E5E7EB' }}>
              <h3>No products found</h3>
              <p style={{ fontSize: '0.88rem', marginTop: '6px' }}>Try selecting another category or increasing the price filter</p>
            </div>
          ) : (
            <div className="shop-products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {filteredProducts.map((product) => {
                const cartItem = cart.find(item => item._id === product._id);
                const inWishlist = wishlist.includes(product._id);

                return (
                  <div
                    key={product._id}
                    className="product-card-hover"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      padding: '12px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    {product.discountPercent > 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        backgroundColor: '#D93025',
                        color: '#FFFFFF',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        zIndex: 2
                      }}>
                        -{product.discountPercent}%
                      </div>
                    )}

                    <button
                      onClick={() => toggleWishlist(product._id)}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        color: inWishlist ? '#D93025' : '#9CA3AF',
                        zIndex: 2
                      }}
                    >
                      <Heart size={16} fill={inWishlist ? '#D93025' : 'none'} />
                    </button>

                    <div style={{ height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                      <img src={product.image} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>
                        {product.category}
                      </div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1F2937', marginBottom: '6px', lineHeight: 1.25, height: '32px', overflow: 'hidden' }}>
                        {product.name}
                      </h4>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.98rem', fontWeight: 800, color: '#044B29' }}>₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <span style={{ fontSize: '0.78rem', color: '#9CA3AF', textDecoration: 'line-through' }}>₹{product.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    {cartItem ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#044B29',
                        color: '#FFFFFF',
                        borderRadius: '6px',
                        padding: '4px 8px'
                      }}>
                        <button onClick={() => updateQuantity(product._id, -1)} style={{ color: '#FFF' }}><Minus size={14} /></button>
                        <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>{cartItem.quantity}</span>
                        <button onClick={() => updateQuantity(product._id, 1)} style={{ color: '#FFF' }}><Plus size={14} /></button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        style={{
                          width: '100%',
                          backgroundColor: '#E8F5E9',
                          color: '#044B29',
                          border: 'none',
                          padding: '8px 0',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          textAlign: 'center'
                        }}
                      >
                        Add to Cart
                      </button>
                    )}

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
