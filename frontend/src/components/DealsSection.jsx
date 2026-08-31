import React, { useState, useEffect } from 'react';
import { Plus, Minus, Heart, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

export default function DealsSection() {
  const { products, cart, addToCart, updateQuantity, wishlist, toggleWishlist } = useShop();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 45, seconds: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.length > 0
    ? products.filter(p => p.isDealOfDay).slice(0, 6)
    : [
        { _id: 'prod-1', name: 'Aashirvaad Atta 5kg', price: 249, originalPrice: 285, discountPercent: 13, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300' },
        { _id: 'prod-2', name: 'Fortune Sunflower Oil 1L', price: 135, originalPrice: 160, discountPercent: 16, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=300' },
        { _id: 'prod-3', name: 'Tata Tea Premium 250g', price: 120, originalPrice: 150, discountPercent: 20, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=300' },
        { _id: 'prod-4', name: 'Surf Excel Matic 2kg', price: 245, originalPrice: 295, discountPercent: 17, image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&q=80&w=300' },
        { _id: 'prod-5', name: 'Good Day Biscuits 200g', price: 20, originalPrice: 30, discountPercent: 33, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=300' },
        { _id: 'prod-6', name: 'Maggi 2-Min Noodles 4pcs', price: 56, originalPrice: 65, discountPercent: 15, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=300' }
      ];

  const formatDigit = (num) => String(num).padStart(2, '0');

  return (
    <div className="page-container" style={{ marginTop: '36px' }}>
      
      {/* SECTION TITLE & TIMER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1F2937' }}>Top Deals Of The Day</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#F3F4F6', padding: '3px 8px', borderRadius: '6px' }}>
            <span style={{ backgroundColor: '#1F2937', color: '#FFF', padding: '2px 5px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>
              {formatDigit(timeLeft.hours)}
            </span>
            <span style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.8rem' }}>:</span>
            <span style={{ backgroundColor: '#1F2937', color: '#FFF', padding: '2px 5px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>
              {formatDigit(timeLeft.minutes)}
            </span>
            <span style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.8rem' }}>:</span>
            <span style={{ backgroundColor: '#1F2937', color: '#FFF', padding: '2px 5px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>
              {formatDigit(timeLeft.seconds)}
            </span>
          </div>
        </div>

        <button 
          onClick={() => navigate('/shop?deal=true')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#044B29', fontWeight: 700, fontSize: '0.85rem' }}
        >
          <span>View All</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* MAIN GRID + PROMO BANNER */}
      <div className="deals-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', alignItems: 'stretch' }}>
        
        {/* 6 PRODUCT CARDS GRID */}
        <div className="deals-product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px' }}>
          {dealProducts.map((product) => {
            const cartItem = cart.find(item => item._id === product._id);
            const inWishlist = wishlist.includes(product._id);

            return (
              <div
                key={product._id}
                className="product-card-hover product-card-box"
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
                {/* Discount Badge */}
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  backgroundColor: '#D93025',
                  color: '#FFFFFF',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '2px 5px',
                  borderRadius: '4px',
                  zIndex: 2
                }}>
                  -{product.discountPercent}%
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product._id)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    color: inWishlist ? '#D93025' : '#9CA3AF',
                    zIndex: 2
                  }}
                >
                  <Heart size={16} fill={inWishlist ? '#D93025' : 'none'} />
                </button>

                {/* Product Image */}
                <div className="product-img-box" style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', padding: '4px' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>

                {/* Title & Price */}
                <div>
                  <h4 className="product-title-text" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1F2937', marginBottom: '6px', lineHeight: 1.25, height: '32px', overflow: 'hidden' }}>
                    {product.name}
                  </h4>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '10px' }}>
                    <span className="product-price-text" style={{ fontSize: '0.92rem', fontWeight: 800, color: '#044B29' }}>
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span style={{ fontSize: '0.74rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Interactive Add To Cart Button */}
                {cartItem ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#044B29',
                    color: '#FFFFFF',
                    borderRadius: '6px',
                    padding: '4px 6px'
                  }}>
                    <button onClick={() => updateQuantity(product._id, -1)} style={{ color: '#FFF' }}>
                      <Minus size={12} />
                    </button>
                    <span style={{ fontWeight: 800, fontSize: '0.82rem' }}>{cartItem.quantity}</span>
                    <button onClick={() => updateQuantity(product._id, 1)} style={{ color: '#FFF' }}>
                      <Plus size={12} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      width: '100%',
                      backgroundColor: '#E8F5E9',
                      color: '#044B29',
                      border: 'none',
                      padding: '7px 0',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.8rem',
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

        {/* PROMO SIDEBAR BANNER */}
        <div style={{
          backgroundColor: '#FCE4EC',
          borderRadius: '16px',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid #F8BBD0'
        }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1F2937', lineHeight: 1.2, marginBottom: '4px' }}>
              Big Savings on Daily Essentials
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#D93025', marginBottom: '16px' }}>
              Upto 30% OFF
            </div>
            <button
              onClick={() => navigate('/shop')}
              style={{
                backgroundColor: '#D93025',
                color: '#FFFFFF',
                padding: '8px 20px',
                borderRadius: '6px',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}
            >
              Shop Now
            </button>
          </div>

          <div style={{ position: 'relative', height: '120px', marginTop: '12px', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=300"
              alt="Promo Essentials"
              style={{ width: '160px', height: '100px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
