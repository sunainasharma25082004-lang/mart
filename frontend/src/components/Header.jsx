import React from 'react';
import { Search, Heart, User, ShoppingBag, ChevronDown, ShoppingCart, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    wishlist,
    cartTotal,
    totalItemsCount,
    setIsAuthModalOpen,
    setIsCartDrawerOpen,
    setIsLocationModalOpen,
    selectedLocation,
    user
  } = useShop();

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(selectedCategory)}`);
  };

  return (
    <header className="header-glass">
      <div className="page-container header-main-layout" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        
        {/* LOGO & MOBILE ACTIONS TOP ROW */}
        <div className="header-brand-row">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img 
              src="/logo.svg" 
              alt="24/7 Service Logo" 
              style={{ 
                height: '46px', 
                objectFit: 'contain'
              }} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/logo.png';
              }}
            />
          </Link>

          {/* Mobile Right Actions (Only visible on mobile) */}
          <div className="header-actions-mobile" style={{ display: 'none' }}>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '3px', backgroundColor: '#E8F5E9', padding: '4px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, color: '#044B29' }}
            >
              <MapPin size={12} />
              <span>{selectedLocation.city}</span>
            </button>

            <button
              onClick={() => setIsCartDrawerOpen(true)}
              style={{
                position: 'relative',
                backgroundColor: '#F0F7F4',
                border: '1px solid #D4EDDA',
                padding: '6px 10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <ShoppingBag size={20} style={{ color: '#044B29' }} />
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: '#D93025',
                color: '#FFF',
                fontSize: '0.65rem',
                fontWeight: 800,
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>

        {/* SEARCH BAR WITH CATEGORY SELECTOR */}
        <form 
          className="header-search-form"
          onSubmit={handleSearchSubmit} 
          style={{ 
            flex: 1, 
            maxWidth: '580px', 
            display: 'flex', 
            alignItems: 'center', 
            border: '2px solid #044B29', 
            borderRadius: '8px', 
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}
        >
          <div style={{ position: 'relative', borderRight: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                padding: '8px 28px 8px 10px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#374151',
                appearance: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All Categories">All</option>
              <option value="Fruits & Vegetables">Vegetables</option>
              <option value="Dairy & Eggs">Dairy</option>
              <option value="Grocery & Staples">Grocery</option>
              <option value="Beverages">Drinks</option>
              <option value="Snacks & Branded">Snacks</option>
              <option value="Personal Care">Personal</option>
              <option value="Household Care">Household</option>
            </select>
            <ChevronDown size={12} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }} />
          </div>

          <input
            type="text"
            placeholder="Search &quot;Milk&quot;, &quot;Atta&quot;, &quot;Maggi&quot;..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              padding: '8px 12px',
              fontSize: '0.86rem',
              color: '#1F2937'
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: '#044B29',
              color: '#FFFFFF',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}
          >
            <Search size={16} />
          </button>
        </form>

        {/* DESKTOP RIGHT ACTIONS */}
        <div className="header-actions-desktop" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          {/* Wishlist */}
          <Link to="/wishlist" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: '#374151' }}>
            <div style={{ position: 'relative' }}>
              <Heart size={22} style={{ color: '#374151' }} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-7px',
                  backgroundColor: '#D93025',
                  color: '#FFF',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlist.length}
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Wishlist</span>
          </Link>

          {/* Account */}
          <button 
            onClick={() => setIsAuthModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={18} style={{ color: '#374151' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#6B7280', fontWeight: 500 }}>Account</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1F2937' }}>
                {user ? user.name.split(' ')[0] : 'Sign In'}
              </div>
            </div>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F0F7F4',
              border: '1px solid #D4EDDA',
              padding: '6px 12px',
              borderRadius: '8px'
            }}
          >
            <div style={{ position: 'relative' }}>
              <ShoppingBag size={22} style={{ color: '#044B29' }} />
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-7px',
                backgroundColor: '#D93025',
                color: '#FFF',
                fontSize: '0.65rem',
                fontWeight: 800,
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {totalItemsCount}
              </span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.68rem', color: '#6B7280', fontWeight: 600 }}>Cart</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#044B29' }}>₹{cartTotal}</div>
            </div>
          </button>

        </div>

      </div>
    </header>
  );
}
