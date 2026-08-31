import React from 'react';
import { ShoppingCart, Mail, Phone, MapPin, Share2, Globe, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#02361D', color: '#E8F5E9', marginTop: '60px', borderTop: '4px solid #044B29' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '50px 20px 20px 20px' }}>
        
        <div className="footer-grid-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '40px', marginBottom: '40px' }}>
          
          {/* Col 1: About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#8FCE00', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingCart size={22} style={{ color: '#02361D' }} />
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF' }}>
                24/7 <span style={{ color: '#FF5252' }}>SERVICE</span>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#C8E6C9', lineHeight: 1.6, marginBottom: '20px' }}>
              24/7 SERVICE — Sab Kuch, Ek Jagah. Your ultimate destination for fresh groceries, organic daily essentials, beverages, snacks, household care, and personal care items delivered to your doorstep.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#share" style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}><Share2 size={16} /></a>
              <a href="#web" style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}><Globe size={16} /></a>
              <a href="#special" style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}><Sparkles size={16} /></a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF', marginBottom: '16px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li><Link to="/" style={{ color: '#C8E6C9' }}>Home</Link></li>
              <li><Link to="/shop" style={{ color: '#C8E6C9' }}>Shop All Products</Link></li>
              <li><Link to="/offers" style={{ color: '#C8E6C9' }}>Exclusive Offers</Link></li>
              <li><Link to="/about" style={{ color: '#C8E6C9' }}>About 24/7 Service</Link></li>
              <li><Link to="/contact" style={{ color: '#C8E6C9' }}>Contact &amp; Help</Link></li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF', marginBottom: '16px' }}>Categories</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li><Link to="/shop?category=Fruits%20%26%20Vegetables" style={{ color: '#C8E6C9' }}>Fruits &amp; Vegetables</Link></li>
              <li><Link to="/shop?category=Dairy%20%26%20Eggs" style={{ color: '#C8E6C9' }}>Dairy &amp; Eggs</Link></li>
              <li><Link to="/shop?category=Grocery%20%26%20Staples" style={{ color: '#C8E6C9' }}>Grocery &amp; Staples</Link></li>
              <li><Link to="/shop?category=Beverages" style={{ color: '#C8E6C9' }}>Beverages</Link></li>
              <li><Link to="/shop?category=Snacks%20%26%20Branded" style={{ color: '#C8E6C9' }}>Snacks &amp; Branded</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF', marginBottom: '16px' }}>Contact Store</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem', color: '#C8E6C9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} style={{ color: '#8FCE00' }} />
                <span>Sector 22-B, Chandigarh, 160022</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} style={{ color: '#8FCE00' }} />
                <span>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: '#8FCE00' }} />
                <span>support@247service.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '0.8rem', color: '#A5D6A7' }}>
          <div>© {new Date().getFullYear()} 24/7 SERVICE. All Rights Reserved.</div>
          <div>Designed &amp; Built with MERN Stack</div>
        </div>

      </div>
    </footer>
  );
}
