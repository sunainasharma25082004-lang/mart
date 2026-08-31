import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle, ChevronDown } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How fast will my order arrive?',
      a: 'We deliver most grocery orders within 15 to 30 minutes in our Chandigarh, Mohali, and Panchkula service zones!'
    },
    {
      q: 'What is the minimum order amount for Free Delivery?',
      a: 'Orders above ₹499 qualify for 100% Free Delivery! A nominal ₹40 delivery fee applies for smaller orders.'
    },
    {
      q: 'How do I return an item if I am not satisfied?',
      a: 'You can initiate an instant return directly through the Track Order page or by contacting our 24/7 helpline at +91 98765 43210.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm), and major Credit/Debit Cards.'
    }
  ];

  return (
    <div className="page-container" style={{ marginTop: '28px', marginBottom: '40px' }}>
      
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
          <MessageSquare size={28} style={{ color: '#044B29' }} />
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1F2937', marginBottom: '8px' }}>Get in Touch with 24/7 Service</h1>
        <p style={{ fontSize: '0.95rem', color: '#6B7280' }}>Have a question or need help with your grocery order? We are here 24/7!</p>
      </div>

      <div className="contact-main-grid" style={{ marginBottom: '60px', alignItems: 'start' }}>
        
        {/* CONTACT FORM */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#044B29', marginBottom: '16px' }}>Send Us a Message</h2>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <CheckCircle size={48} style={{ color: '#044B29', margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1F2937', marginBottom: '8px' }}>Thank You for Reaching Out!</h3>
              <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>Our customer support team will get back to you within 30 minutes.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div className="contact-inputs-grid" style={{ marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Phone Number</label>
                  <input
                    type="text"
                    placeholder="9812345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Your Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help you today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#044B29',
                  color: '#FFFFFF',
                  padding: '14px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '1rem',
                  boxShadow: '0 4px 14px rgba(4,75,41,0.25)'
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* STORE CONTACT CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #E5E7EB', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MapPin size={24} style={{ color: '#044B29' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1F2937' }}>Store Address</div>
              <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>Sector 22-B, Main Market, Chandigarh, 160022</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #E5E7EB', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Phone size={24} style={{ color: '#044B29' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1F2937' }}>Helpline Number</div>
              <div style={{ fontSize: '0.85rem', color: '#044B29', fontWeight: 700 }}>+91 98765 43210 (Toll Free 24/7)</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #E5E7EB', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Mail size={24} style={{ color: '#044B29' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1F2937' }}>Email Support</div>
              <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>support@247service.com</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #E5E7EB', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock size={24} style={{ color: '#044B29' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1F2937' }}>Store Operating Hours</div>
              <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>Open 7 Days a Week: 6:00 AM – 11:30 PM</div>
            </div>
          </div>

        </div>

      </div>

      {/* FAQ SECTION */}
      <div>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1F2937' }}>Frequently Asked Questions</h2>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((f, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: '#1F2937',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{f.q}</span>
                  <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: '#044B29' }} />
                </button>

                {isOpen && (
                  <div style={{ padding: '0 20px 16px 20px', fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.5, borderTop: '1px solid #F3F4F6' }}>
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
