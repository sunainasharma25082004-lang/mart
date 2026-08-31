import React from 'react';
import { ShoppingBag, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

export default function HeroBanner() {
  const { cart, removeFromCart, cartSubtotal, cartTotal, totalSaved, totalItemsCount, setIsCheckoutModalOpen } = useShop();
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ marginTop: '20px' }}>
      <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'stretch' }}>
        
        {/* HERO SLIDER CARD */}
        <div className="hero-card-padding" style={{
          background: 'linear-gradient(135deg, #F0F7F4 0%, #FFFFFF 100%)',
          borderRadius: '20px',
          padding: '36px 40px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid #E2F0EA',
          boxShadow: '0 8px 24px rgba(4,75,41,0.05)'
        }}>
          
          <div className="hero-inner-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', alignItems: 'center', height: '100%' }}>
            
            {/* LEFT TEXT CONTENT */}
            <div style={{ zIndex: 2 }}>
              <div className="hero-text-heading" style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1.12, marginBottom: '14px', letterSpacing: '-0.5px' }}>
                <span style={{ color: '#044B29', display: 'block' }}>Sab Kuch,</span>
                <span style={{ color: '#D93025', display: 'block' }}>Ek Jagah</span>
              </div>

              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                Fresh Groceries • Daily Essentials • Best Prices
              </div>
              <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '22px' }}>
                Delivered to Your Doorstep in 15-30 Minutes
              </div>

              <button
                onClick={() => navigate('/shop')}
                style={{
                  backgroundColor: '#044B29',
                  color: '#FFFFFF',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 16px rgba(4,75,41,0.25)'
                }}
              >
                <span>Shop Now</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* RIGHT BASKET GRAPHIC */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              
              {/* Floating Pill Badges (Hidden on mobile to prevent overflow) */}
              <div className="hero-floating-badges">
                <div className="floating-badge-1" style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '0px',
                  backgroundColor: '#FFF8E1',
                  border: '1.5px solid #FFE082',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#856404',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  zIndex: 3
                }}>
                  Best Prices Everyday
                </div>

                <div className="floating-badge-2" style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '-10px',
                  backgroundColor: '#E1F5FE',
                  border: '1.5px solid #B3E5FC',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#0277BD',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  zIndex: 3
                }}>
                  Free Delivery above ₹499
                </div>

                <div className="floating-badge-3" style={{
                  position: 'absolute',
                  top: '30px',
                  right: '-10px',
                  backgroundColor: '#FCE4EC',
                  border: '1.5px solid #F8BBD0',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#C2185B',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  zIndex: 3
                }}>
                  Fresh &amp; Healthy
                </div>
              </div>

              {/* Shopping Basket Visual */}
              <div className="hero-basket-wrapper" style={{
                width: '260px',
                height: '220px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600"
                  alt="24/7 Service Grocery Basket"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.12)'
                  }}
                />
                
                <div style={{
                  position: 'absolute',
                  backgroundColor: 'rgba(4,75,41,0.95)',
                  color: '#FFF',
                  padding: '4px 14px',
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  letterSpacing: '0.8px',
                  bottom: '12px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                }}>
                  24/7 SERVICE
                </div>
              </div>

            </div>

          </div>

          {/* CAROUSEL PAGINATION DOTS */}
          <div style={{ display: 'flex', gap: '6px', marginTop: '16px' }}>
            <span style={{ width: '24px', height: '6px', borderRadius: '4px', backgroundColor: '#044B29' }}></span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#CBD5E1' }}></span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#CBD5E1' }}></span>
          </div>

        </div>

        {/* RIGHT SIDEBAR CART PREVIEW (Desktop Only) */}
        <div className="side-cart-desktop" style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E5E7EB',
          padding: '18px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #F3F4F6', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={18} style={{ color: '#044B29' }} />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1F2937' }}>Your Cart ({totalItemsCount})</h3>
              </div>
              <button 
                onClick={() => navigate('/shop')}
                style={{ fontSize: '0.8rem', color: '#044B29', fontWeight: 700 }}
              >
                View Cart
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#9CA3AF', padding: '20px 0', fontSize: '0.85rem' }}>
                  Your cart is empty
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', paddingBottom: '6px', borderBottom: '1px dashed #F3F4F6' }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #F3F4F6' }} 
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1F2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>
                        {item.quantity} x ₹{item.price}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#044B29' }}>
                        ₹{item.price * item.quantity}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        style={{ color: '#9CA3AF', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={{ marginTop: '14px', borderTop: '1px solid #E5E7EB', paddingTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#6B7280', marginBottom: '4px' }}>
              <span>Sub Total</span>
              <span style={{ fontWeight: 700, color: '#1F2937' }}>₹{cartSubtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#6B7280', marginBottom: '6px' }}>
              <span>Delivery Fee</span>
              <span style={{ fontWeight: 700, color: '#044B29' }}>FREE</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 800, color: '#1F2937', marginBottom: '12px', paddingTop: '6px', borderTop: '1px dashed #E5E7EB' }}>
              <span>Total</span>
              <span style={{ color: '#044B29' }}>₹{cartTotal}</span>
            </div>

            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              style={{
                width: '100%',
                backgroundColor: '#044B29',
                color: '#FFFFFF',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.9rem',
                textAlign: 'center',
                boxShadow: '0 4px 10px rgba(4,75,41,0.25)',
                marginBottom: '8px'
              }}
            >
              Checkout
            </button>

            <div style={{
              backgroundColor: '#E8F5E9',
              borderRadius: '6px',
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: '#044B29',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              <Sparkles size={14} style={{ color: '#044B29' }} />
              <span>You saved ₹{totalSaved > 0 ? totalSaved : 70} on this order</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
