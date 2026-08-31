import React, { useState } from 'react';
import { X, MapPin, Check, Compass } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function LocationModal() {
  const { isLocationModalOpen, setIsLocationModalOpen, selectedLocation, setSelectedLocation } = useShop();

  const [pincode, setPincode] = useState(selectedLocation.pincode);
  const [city, setCity] = useState(selectedLocation.city);
  const [detecting, setDetecting] = useState(false);
  const [detectError, setDetectError] = useState('');

  if (!isLocationModalOpen) return null;

  const popularLocations = [
    { city: 'Chandigarh', pincode: '160022' },
    { city: 'Mohali', pincode: '160055' },
    { city: 'Panchkula', pincode: '134109' },
    { city: 'Zirakpur', pincode: '140603' }
  ];

  const handleSelect = (loc) => {
    setSelectedLocation(loc);
    setIsLocationModalOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (city && pincode) {
      setSelectedLocation({ city, pincode });
      setIsLocationModalOpen(false);
    }
  };

  const detectLiveLocation = () => {
    if (!navigator.geolocation) {
      setDetectError('Geolocation is not supported by your browser');
      return;
    }
    setDetecting(true);
    setDetectError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          const address = data.address;
          
          // Fallbacks for missing nominatim location parts
          const userCity = address.city || address.town || address.village || address.state_district || 'My Location';
          const userPincode = address.postcode || '160022';
          
          setCity(userCity);
          setPincode(userPincode);
          setSelectedLocation({ city: userCity, pincode: userPincode });
          setIsLocationModalOpen(false);
        } catch (err) {
          // Nominatim fetch fallback
          setCity('My Location');
          setPincode('160022');
          setSelectedLocation({ city: 'My Location', pincode: '160022' });
          setIsLocationModalOpen(false);
        } finally {
          setDetecting(false);
        }
      },
      (error) => {
        setDetectError('Location access denied. Please enter manually.');
        setDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000000,
      padding: '16px'
    }}>
      <div className="modal-card-box" style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        maxWidth: '440px',
        width: '100%',
        padding: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        position: 'relative'
      }}>
        <button
          onClick={() => setIsLocationModalOpen(false)}
          style={{ position: 'absolute', top: '16px', right: '16px', color: '#9CA3AF' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MapPin size={20} style={{ color: '#044B29' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1F2937' }}>Choose Delivery Location</h3>
            <p style={{ fontSize: '0.76rem', color: '#6B7280' }}>Select your area to see product availability &amp; speed</p>
          </div>
        </div>

        {/* DETECT LIVE LOCATION BUTTON */}
        <button
          type="button"
          onClick={detectLiveLocation}
          disabled={detecting}
          style={{
            width: '100%',
            backgroundColor: '#E8F5E9',
            color: '#044B29',
            border: '2px solid #044B29',
            padding: '10px',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '16px',
            transition: 'all 0.2s',
            cursor: 'pointer'
          }}
        >
          <Compass size={18} className={detecting ? "spin-animation" : ""} />
          <span>{detecting ? 'Detecting Live Location...' : 'Use My Current Location'}</span>
        </button>

        {detectError && (
          <div style={{ color: '#D93025', fontSize: '0.78rem', fontWeight: 600, marginBottom: '14px', textAlign: 'center' }}>
            {detectError}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }}></div>
          <span style={{ fontSize: '0.72rem', color: '#9CA3AF', fontWeight: 700 }}>OR ENTER MANUALLY</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }}></div>
        </div>

        <form onSubmit={handleSave} style={{ marginBottom: '16px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '4px' }}>City Name</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Chandigarh"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
              required
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '4px' }}>Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="e.g. 160022"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#044B29',
              color: '#FFF',
              padding: '11px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.9rem'
            }}
          >
            Confirm Location
          </button>
        </form>

        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6B7280', marginBottom: '8px' }}>Popular Delivery Areas</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {popularLocations.map((loc, idx) => {
              const isSelected = selectedLocation.city === loc.city;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(loc)}
                  style={{
                    border: isSelected ? '2px solid #044B29' : '1px solid #E5E7EB',
                    backgroundColor: isSelected ? '#F0F7F4' : '#FAFAFA',
                    padding: '8px',
                    borderRadius: '8px',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1F2937' }}>{loc.city}</div>
                    <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>{loc.pincode}</div>
                  </div>
                  {isSelected && <Check size={14} style={{ color: '#044B29' }} />}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
