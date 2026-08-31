import React from 'react';
import { ShieldCheck, Truck, Headphones, Lock, AlertTriangle } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: <ShieldCheck size={24} style={{ color: '#044B29' }} />,
      title: '100% Original Products',
      subtitle: 'Trusted & Authentic'
    },
    {
      icon: <Truck size={24} style={{ color: '#044B29' }} />,
      title: 'On Time Delivery',
      subtitle: 'Fast & Reliable'
    },
    {
      icon: <Headphones size={24} style={{ color: '#044B29' }} />,
      title: '24/7 Support',
      subtitle: 'We are here to help'
    },
    {
      icon: <Lock size={24} style={{ color: '#044B29' }} />,
      title: 'Secure Payments',
      subtitle: 'Safe & Encrypted'
    }
  ];

  return (
    <div className="page-container" style={{ marginTop: '32px' }}>
      
      {/* 4 BADGES CONTAINER */}
      <div 
        className="trust-badges-grid"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          padding: '18px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          marginBottom: '16px'
        }}
      >
        {badges.map((b, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#E8F5E9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {b.icon}
            </div>
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#1F2937' }}>{b.title}</div>
              <div style={{ fontSize: '0.74rem', color: '#6B7280' }}>{b.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* DEVELOPMENT ALERT BAR */}
      <div style={{
        backgroundColor: '#FFC107',
        color: '#212529',
        padding: '12px 20px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 700,
        fontSize: '0.88rem',
        textAlign: 'center'
      }}>
        <AlertTriangle size={18} style={{ flexShrink: 0 }} />
        <span>Website is Under Development — We are working hard to serve you better.</span>
      </div>

    </div>
  );
}
