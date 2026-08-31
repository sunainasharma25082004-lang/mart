import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Offers() {
  const [copiedCode, setCopiedCode] = useState(null);

  const coupons = [
    {
      code: 'WELCOME50',
      title: 'Flat ₹50 Instant Discount',
      desc: 'Valid on your first order above ₹299 on 24/7 Service',
      expiry: 'Valid till 30 Sep 2026',
      bg: '#E8F5E9',
      border: '#C8E6C9',
      tagColor: '#044B29'
    },
    {
      code: 'SERVICE100',
      title: 'Flat ₹100 Super Savings',
      desc: 'Save ₹100 on monthly grocery & atta purchase above ₹999',
      expiry: 'Valid till 15 Oct 2026',
      bg: '#FFF8E1',
      border: '#FFE082',
      tagColor: '#B78103'
    },
    {
      code: 'FREEDEL',
      title: '100% Free Express Delivery',
      desc: 'Zero delivery fee on any order placed today',
      expiry: 'Valid Today Only',
      bg: '#E1F5FE',
      border: '#B3E5FC',
      tagColor: '#0277BD'
    },
    {
      code: 'DAILY20',
      title: 'Flat 20% OFF Daily Essentials',
      desc: 'Applicable on Dairy, Eggs, Milk & Beverages',
      expiry: 'Valid till 31 Oct 2026',
      bg: '#FCE4EC',
      border: '#F8BBD0',
      tagColor: '#C2185B'
    }
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="page-container" style={{ marginTop: '28px', marginBottom: '40px' }}>
      
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
          <Percent size={24} style={{ color: '#EF6C00' }} />
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1F2937', marginBottom: '6px' }}>Exclusive Coupon Codes &amp; Offers</h1>
        <p style={{ fontSize: '0.88rem', color: '#6B7280' }}>Apply these promo codes at checkout to unlock instant discounts</p>
      </div>

      {/* COUPONS GRID */}
      <div className="offers-coupons-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {coupons.map((c, idx) => {
          const isCopied = copiedCode === c.code;
          return (
            <div
              key={idx}
              className="coupon-card-responsive"
              style={{
                backgroundColor: c.bg,
                border: `2px dashed ${c.border}`,
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '14px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#FFFFFF', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800, color: c.tagColor, marginBottom: '8px' }}>
                  <Tag size={12} />
                  <span>PROMO CODE</span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1F2937', marginBottom: '4px' }}>{c.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#4B5563', marginBottom: '8px' }}>{c.desc}</p>
                <div style={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 600 }}>{c.expiry}</div>
              </div>

              <button
                onClick={() => handleCopy(c.code)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: `2px solid ${c.tagColor}`,
                  color: c.tagColor,
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  flexShrink: 0
                }}
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                <span>{isCopied ? 'COPIED!' : c.code}</span>
              </button>

            </div>
          );
        })}
      </div>

      {/* CTA SHOPPING CARD */}
      <div style={{
        backgroundColor: '#044B29',
        color: '#FFFFFF',
        borderRadius: '20px',
        padding: '30px 20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
      }}>
        <Sparkles size={28} style={{ color: '#8FCE00' }} />
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Ready to Save Big on Fresh Groceries?</h2>
        <p style={{ fontSize: '0.88rem', color: '#E8F5E9', maxWidth: '580px' }}>
          Explore our wide range of fruits, vegetables, dairy, household items and apply your favorite coupon code at checkout!
        </p>
        <Link
          to="/shop"
          style={{
            backgroundColor: '#8FCE00',
            color: '#02361D',
            padding: '12px 28px',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '0.9rem',
            marginTop: '6px'
          }}
        >
          Shop Products Now
        </Link>
      </div>

    </div>
  );
}
