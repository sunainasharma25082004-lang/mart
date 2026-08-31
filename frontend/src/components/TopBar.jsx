import React from 'react';
import { MapPin, Truck, Smartphone, Compass, HelpCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

export default function TopBar() {
  const { selectedLocation, setIsLocationModalOpen } = useShop();

  return (
    <div style={{ backgroundColor: '#02361D', color: '#E8F5E9', fontSize: '0.82rem', padding: '6px 0' }}>
      <div className="topbar-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        
        {/* Location selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={15} style={{ color: '#8FCE00' }} />
          <span>Delivering to: <strong style={{ color: '#FFF' }}>{selectedLocation.city}, {selectedLocation.pincode}</strong></span>
          <button 
            onClick={() => setIsLocationModalOpen(true)}
            style={{ color: '#8FCE00', textDecoration: 'underline', fontWeight: 600, fontSize: '0.8rem', marginLeft: '4px' }}
          >
            Change
          </button>
        </div>

        {/* Free Delivery Banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
          <Truck size={15} style={{ color: '#8FCE00' }} />
          <span>Free Delivery above ₹499</span>
        </div>

        {/* Utilities */}
        <div className="mobile-hide-topbar-utl" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <Link to="/about" style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.9 }}>
            <Smartphone size={14} /> Download App
          </Link>
          <Link to="/track-order" style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.9 }}>
            <Compass size={14} /> Track Order
          </Link>
          <Link to="/contact" style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.9 }}>
            <HelpCircle size={14} /> Help Center
          </Link>
        </div>

      </div>
    </div>
  );
}
