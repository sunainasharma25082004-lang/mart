import React, { useState } from 'react';
import { Menu, ChevronDown, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function Navbar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const location = useLocation();
  const { setSelectedCategory } = useShop();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Deals', path: '/shop?deal=true' },
    { label: 'Offers', path: '/offers' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const categories = [
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Grocery & Staples',
    'Beverages',
    'Snacks & Branded',
    'Personal Care',
    'Household Care'
  ];

  return (
    <nav style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', position: 'relative' }}>
      <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
        
        {/* LEFT: CATEGORIES BUTTON & LINKS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, overflow: 'hidden' }}>
          
          {/* Browse Categories Dropdown */}
          <div className="browse-categories-btn" style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              style={{
                backgroundColor: '#044B29',
                color: '#FFFFFF',
                padding: '10px 18px',
                borderRadius: '6px 6px 0 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.88rem'
              }}
            >
              <Menu size={16} />
              <span>Browse Categories</span>
              <ChevronDown size={14} style={{ marginLeft: '4px', transform: isCategoryOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {isCategoryOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '230px',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0 0 8px 8px',
                  zIndex: 200,
                  overflow: 'hidden'
                }}
              >
                {categories.map((cat, idx) => (
                  <Link
                    key={idx}
                    to={`/shop?category=${encodeURIComponent(cat)}`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsCategoryOpen(false);
                    }}
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: idx < categories.length - 1 ? '1px solid #F3F4F6' : 'none'
                    }}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* MAIN NAV LINKS */}
          <div className="navbar-links-container" style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, minWidth: 0 }}>
            {navLinks.map((link, idx) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={idx}
                  to={link.path}
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? '#044B29' : '#374151',
                    padding: '10px 0',
                    borderBottom: isActive ? '3px solid #044B29' : '3px solid transparent',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

        </div>

        {/* RIGHT: FEATURE HIGHLIGHTS (Desktop Only) */}
        <div className="navbar-features-highlights" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={14} style={{ color: '#044B29' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1F2937' }}>Free Delivery</div>
              <div style={{ fontSize: '0.68rem', color: '#6B7280' }}>On orders &gt; ₹499</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={14} style={{ color: '#044B29' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1F2937' }}>Easy Returns</div>
              <div style={{ fontSize: '0.68rem', color: '#6B7280' }}>Hassle free</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={14} style={{ color: '#044B29' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1F2937' }}>Secure Checkout</div>
              <div style={{ fontSize: '0.68rem', color: '#6B7280' }}>100% safe</div>
            </div>
          </div>

        </div>

      </div>
    </nav>
  );
}
