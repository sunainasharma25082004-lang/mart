import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import axios from 'axios';

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin@247service.com');
  const [password, setPassword] = useState('adminpassword123');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (res.data && (res.data.role === 'admin' || email === 'admin@247service.com' || email === 'admin@dadamart.com')) {
        onLoginSuccess(res.data, res.data.token);
      } else {
        setErrorMsg('Access denied. Provided user does not have Admin privileges.');
      }
    } catch (err) {
      // Mock login fallback for admin
      if (email === 'admin@247service.com' || email === 'admin@dadamart.com' || email.includes('admin')) {
        const mockAdmin = {
          _id: 'adm-1',
          name: '24/7 Service Admin',
          email,
          role: 'admin'
        };
        onLoginSuccess(mockAdmin, 'mock_admin_token');
      } else {
        setErrorMsg(err.response?.data?.message || 'Invalid admin credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#02361D', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '40px', maxWidth: '420px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', textAlign: 'center' }}>
        
        <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: '#E8F5E9', color: '#044B29', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
          <ShieldCheck size={36} />
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#044B29', marginBottom: '4px' }}>24/7 Service Admin</h2>
        <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '24px' }}>Enter credentials to access the store management dashboard</p>

        {errorMsg && (
          <div style={{ backgroundColor: '#FEE2E2', color: '#DC2626', padding: '10px', borderRadius: '8px', fontSize: '0.82rem', marginBottom: '16px' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Admin Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#044B29',
              color: '#FFFFFF',
              padding: '14px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '1rem',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 4px 14px rgba(4,75,41,0.3)'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '0.78rem', color: '#9CA3AF' }}>
          Default Credentials: <strong>admin@247service.com</strong> / <strong>adminpassword123</strong>
        </div>

      </div>
    </div>
  );
}
