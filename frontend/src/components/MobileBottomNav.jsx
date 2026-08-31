import React from 'react';
import { Home, ShoppingBag, Tag, Compass, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function MobileBottomNav() {
  const location = useLocation();
  const { wishlist } = useShop();

  return (
    <div className="mobile-bottom-nav">
      <Link to="/" className={`mobile-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <Home size={20} />
        <span>Home</span>
      </Link>

      <Link to="/shop" className={`mobile-nav-item ${location.pathname === '/shop' ? 'active' : ''}`}>
        <ShoppingBag size={20} />
        <span>Shop</span>
      </Link>

      <Link to="/offers" className={`mobile-nav-item ${location.pathname === '/offers' ? 'active' : ''}`}>
        <Tag size={20} />
        <span>Offers</span>
      </Link>

      <Link to="/wishlist" className={`mobile-nav-item ${location.pathname === '/wishlist' ? 'active' : ''}`}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={20} />
          {wishlist.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-6px',
              backgroundColor: '#D93025',
              color: '#FFF',
              fontSize: '0.6rem',
              fontWeight: 800,
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {wishlist.length}
            </span>
          )}
        </div>
        <span>Wishlist</span>
      </Link>

      <Link to="/track-order" className={`mobile-nav-item ${location.pathname === '/track-order' ? 'active' : ''}`}>
        <Compass size={20} />
        <span>Track</span>
      </Link>
    </div>
  );
}
