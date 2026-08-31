import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CartDrawer() {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartTotal,
    deliveryFee,
    totalSaved,
    setIsCheckoutModalOpen
  } = useShop();

  if (!isCartDrawerOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 10000000,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxWidth: '420px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
        position: 'relative'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#044B29',
          color: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Your Shopping Cart</h3>
          </div>
          <button onClick={() => setIsCartDrawerOpen(false)} style={{ color: '#FFFFFF' }}>
            <X size={22} />
          </button>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B7280' }}>
              <ShoppingBag size={48} style={{ color: '#D1D5DB', marginBottom: '12px' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Your cart is empty</div>
              <p style={{ fontSize: '0.85rem' }}>Explore deals and add daily essentials to your cart</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #E5E7EB',
                    backgroundColor: '#FAFAFA'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                  />

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1F2937', marginBottom: '4px' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#044B29' }}>
                      ₹{item.price} <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 400 }}>/ {item.unit || '1 pc'}</span>
                    </div>
                  </div>

                  {/* Quantity Controller */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <button onClick={() => removeFromCart(item._id)} style={{ color: '#9CA3AF' }}>
                      <Trash2 size={16} />
                    </button>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #044B29',
                      borderRadius: '6px',
                      padding: '2px 6px'
                    }}>
                      <button onClick={() => updateQuantity(item._id, -1)} style={{ color: '#044B29' }}>
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#044B29' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, 1)} style={{ color: '#044B29' }}>
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div style={{ padding: '20px', borderTop: '1px solid #E5E7EB', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#6B7280', marginBottom: '6px' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 700, color: '#1F2937' }}>₹{cartSubtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#6B7280', marginBottom: '6px' }}>
              <span>Delivery Fee</span>
              <span style={{ fontWeight: 700, color: '#044B29' }}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            {totalSaved > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#D93025', fontWeight: 700, marginBottom: '8px' }}>
                <span>Discount Savings</span>
                <span>-₹{totalSaved}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#1F2937', marginBottom: '16px', paddingTop: '8px', borderTop: '1px dashed #E5E7EB' }}>
              <span>Total Amount</span>
              <span style={{ color: '#044B29' }}>₹{cartTotal}</span>
            </div>

            <button
              onClick={() => {
                setIsCartDrawerOpen(false);
                setIsCheckoutModalOpen(true);
              }}
              style={{
                width: '100%',
                backgroundColor: '#044B29',
                color: '#FFFFFF',
                padding: '14px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(4,75,41,0.25)'
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
