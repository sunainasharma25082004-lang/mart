import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, CheckCircle2, Clock, Truck, Package, PhoneCall } from 'lucide-react';
import { API_BASE } from '../config';
import axios from 'axios';

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const orderIdParam = searchParams.get('id') || 'ORD-849201';

  const [orderId, setOrderId] = useState(orderIdParam);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrderDetails(orderIdParam);
  }, [orderIdParam]);

  const fetchOrderDetails = async (idToFetch) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/orders/${idToFetch}`);
      if (res.data) {
        setOrderData(res.data);
      }
    } catch (err) {
      // Mock order fallback
      setOrderData({
        _id: idToFetch,
        customerName: 'Rahul Sharma',
        customerPhone: '9812345678',
        orderStatus: 'Out for Delivery',
        totalAmount: 629,
        shippingAddress: {
          address: 'House No. 102, Sector 22-B',
          city: 'Chandigarh',
          pincode: '160022'
        },
        orderItems: [
          { name: 'Aashirvaad Atta 5kg', price: 249, quantity: 1 },
          { name: 'Fortune Sunflower Oil 1L', price: 135, quantity: 1 },
          { name: 'Surf Excel Matic 2kg', price: 245, quantity: 1 }
        ],
        createdAt: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchOrder = (e) => {
    e.preventDefault();
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  };

  const stages = [
    { key: 'Pending', label: 'Order Placed', desc: 'Received & Confirmed by 24/7 Service', icon: <Clock size={20} /> },
    { key: 'Processing', label: 'Packing Items', desc: 'Fresh groceries being packed carefully', icon: <Package size={20} /> },
    { key: 'Out for Delivery', label: 'Out for Delivery', desc: 'Partner is on the way to your doorstep', icon: <Truck size={20} /> },
    { key: 'Delivered', label: 'Delivered', desc: 'Order successfully delivered!', icon: <CheckCircle2 size={20} /> }
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Processing': return 1;
      case 'Out for Delivery': return 2;
      case 'Delivered': return 3;
      default: return 1;
    }
  };

  const currentStageIndex = orderData ? getStageIndex(orderData.orderStatus) : 2;

  return (
    <div className="page-container" style={{ marginTop: '28px', marginBottom: '40px' }}>
      
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
          <Compass size={28} style={{ color: '#044B29' }} />
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#044B29', marginBottom: '6px' }}>Live Order Tracking</h2>
        <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>Track real-time status of your grocery delivery</p>
      </div>

      {/* SEARCH FORM */}
      <form onSubmit={handleSearchOrder} style={{ display: 'flex', gap: '10px', maxWidth: '500px', margin: '0 auto 36px auto' }}>
        <input
          type="text"
          placeholder="Enter Order ID (e.g. ORD-849201)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.92rem' }}
          required
        />
        <button
          type="submit"
          style={{ backgroundColor: '#044B29', color: '#FFF', padding: '12px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '0.92rem' }}
        >
          Track
        </button>
      </form>

      {orderData && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
          
          {/* Order Meta Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', paddingBottom: '20px', marginBottom: '30px', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Tracking Order</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1F2937' }}>#{orderData._id}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600 }}>Estimated Delivery</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#044B29' }}>15 - 30 Minutes</div>
            </div>
          </div>

          <div className="track-timeline-grid" style={{ marginBottom: '40px' }}>
            
            <div className="track-progress-bar-line" style={{ backgroundColor: '#E5E7EB' }}>
              <div style={{
                height: '100%',
                backgroundColor: '#044B29',
                width: `${(currentStageIndex / 3) * 100}%`,
                transition: 'width 0.4s ease'
              }}></div>
            </div>

            {stages.map((stg, idx) => {
              const isCompleted = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div key={idx} style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: isCompleted ? '#044B29' : '#FFFFFF',
                    color: isCompleted ? '#FFFFFF' : '#9CA3AF',
                    border: isCompleted ? '3px solid #044B29' : '3px solid #D1D5DB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                    boxShadow: isCurrent ? '0 0 0 4px rgba(4,75,41,0.2)' : 'none',
                    transition: 'all 0.3s'
                  }}>
                    {stg.icon}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: isCompleted ? '#044B29' : '#6B7280', marginBottom: '2px' }}>
                    {stg.label}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', maxWidth: '160px', margin: '0 auto' }}>
                    {stg.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* DELIVERY DRIVER DETAILS */}
          {orderData.orderStatus === 'Out for Delivery' && (
            <div className="delivery-exec-card" style={{ backgroundColor: '#F0F7F4', borderRadius: '12px', border: '1px solid #D4EDDA', padding: '16px 20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#044B29', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  RK
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1F2937' }}>Ramesh Kumar (Delivery Executive)</div>
                  <div style={{ fontSize: '0.8rem', color: '#044B29', fontWeight: 600 }}>Hero Electric Scooter • PB-65-8821</div>
                </div>
              </div>
              <a
                href="tel:9876543210"
                style={{
                  backgroundColor: '#044B29',
                  color: '#FFF',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <PhoneCall size={16} />
                <span>Call Delivery Rider</span>
              </a>
            </div>
          )}

          {/* ORDER ITEMS RECAP */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1F2937', marginBottom: '12px' }}>Order Details</h4>
            <div style={{ border: '1px solid #F3F4F6', borderRadius: '8px', overflow: 'hidden' }}>
              {orderData.orderItems?.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < orderData.orderItems.length - 1 ? '1px solid #F3F4F6' : 'none', fontSize: '0.88rem' }}>
                  <span style={{ fontWeight: 600, color: '#374151' }}>{item.quantity} x {item.name}</span>
                  <span style={{ fontWeight: 800, color: '#044B29' }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
