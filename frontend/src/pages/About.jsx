import React from 'react';
import { ShieldCheck, Truck, Clock, Sparkles, HeartHandshake, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { label: 'Happy Customers', value: '50,000+' },
    { label: 'Products in Catalog', value: '5,000+' },
    { label: 'Avg Delivery Time', value: '15 Mins' },
    { label: 'Pincodes Covered', value: '120+' }
  ];

  const values = [
    {
      icon: <ShieldCheck size={32} style={{ color: '#044B29' }} />,
      title: '100% Quality Guaranteed',
      description: 'Every product is handpicked and double-checked for quality, freshness, and safety before delivery.'
    },
    {
      icon: <Clock size={32} style={{ color: '#044B29' }} />,
      title: 'Superfast 15-Min Delivery',
      description: 'Our hyper-local dark stores ensure your daily essential groceries arrive in record time.'
    },
    {
      icon: <Sparkles size={32} style={{ color: '#044B29' }} />,
      title: 'Best Prices Everyday',
      description: 'Direct sourcing from farm suppliers means maximum discount savings passed straight to your family.'
    },
    {
      icon: <HeartHandshake size={32} style={{ color: '#044B29' }} />,
      title: 'Customer Satisfaction First',
      description: 'Instant 100% hassle-free returns with zero questions asked if you are ever unsatisfied.'
    }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* HERO BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #044B29 0%, #0A5D36 50%, #02361D 100%)',
        color: '#FFFFFF',
        borderRadius: '24px',
        padding: '60px 40px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(4,75,41,0.2)',
        marginBottom: '50px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '16px' }}>
            <Award size={16} style={{ color: '#8FCE00' }} />
            <span>Chandigarh’s #1 Trusted Quick Grocery App</span>
          </div>

          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.15, marginBottom: '16px' }}>
            Sab Kuch, Ek Jagah. <br /> Delivered Fresh to Your Doorstep.
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#E8F5E9', lineHeight: 1.6, marginBottom: '28px' }}>
            24/7 SERVICE is on a mission to deliver farm-fresh fruits, vegetables, pure dairy, groceries, and daily essential items to your family within minutes with unbeatable prices.
          </p>

          <Link
            to="/shop"
            style={{
              backgroundColor: '#8FCE00',
              color: '#02361D',
              padding: '14px 32px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '1rem',
              display: 'inline-block',
              boxShadow: '0 4px 15px rgba(143,206,0,0.4)'
            }}
          >
            Start Shopping Now
          </Link>
        </div>
      </div>

      {/* METRICS ROW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '60px'
      }}>
        {stats.map((st, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#044B29', marginBottom: '4px' }}>
              {st.value}
            </div>
            <div style={{ fontSize: '0.88rem', color: '#6B7280', fontWeight: 600 }}>
              {st.label}
            </div>
          </div>
        ))}
      </div>

      {/* OUR CORE VALUES */}
      <div style={{ marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1F2937', marginBottom: '8px' }}>Why Families Choose 24/7 Service</h2>
          <p style={{ fontSize: '0.95rem', color: '#6B7280' }}>Our promise of quality, speed, and affordability</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {values.map((v, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '28px',
                border: '1px solid #E5E7EB',
                display: 'flex',
                gap: '20px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                backgroundColor: '#E8F5E9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {v.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1F2937', marginBottom: '8px' }}>{v.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6 }}>{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
