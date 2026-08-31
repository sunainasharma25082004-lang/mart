import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import axios from 'axios';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, user, loginUser, logoutUser } = useShop();

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        loginUser(res.data, res.data.token);
        setIsAuthModalOpen(false);
      } else {
        const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, phone });
        loginUser(res.data, res.data.token);
        setIsAuthModalOpen(false);
      }
    } catch (err) {
      if (mode === 'login') {
        const mockUser = {
          _id: 'usr-1',
          name: email.split('@')[0] || 'Rahul Sharma',
          email,
          role: email.includes('admin') ? 'admin' : 'user'
        };
        loginUser(mockUser, 'mock_token_123');
        setIsAuthModalOpen(false);
      } else {
        setErrorMsg(err.response?.data?.message || 'Authentication failed. Please check credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000000,
      padding: '16px'
    }}>
      <div className="modal-card-box" style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        maxWidth: '420px',
        width: '100%',
        padding: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        position: 'relative'
      }}>
        <button
          onClick={() => setIsAuthModalOpen(false)}
          style={{ position: 'absolute', top: '16px', right: '16px', color: '#9CA3AF' }}
        >
          <X size={20} />
        </button>

        {user ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#E8F5E9', color: '#044B29', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto', fontSize: '1.4rem', fontWeight: 800 }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1F2937' }}>{user.name}</h3>
              <p style={{ fontSize: '0.82rem', color: '#6B7280' }}>{user.email}</p>
              <div style={{ display: 'inline-block', backgroundColor: user.role === 'admin' ? '#FEE2E2' : '#E8F5E9', color: user.role === 'admin' ? '#DC2626' : '#044B29', padding: '2px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700, marginTop: '6px' }}>
                Role: {user.role.toUpperCase()}
              </div>
            </div>

            {user.role === 'admin' && (
              <a
                href="http://localhost:5174"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: '#D93025',
                  color: '#FFF',
                  padding: '11px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  marginBottom: '10px',
                  textAlign: 'center'
                }}
              >
                <ShieldCheck size={18} />
                <span>Open Admin Portal</span>
              </a>
            )}

            <button
              onClick={() => {
                logoutUser();
                setIsAuthModalOpen(false);
              }}
              style={{
                width: '100%',
                backgroundColor: '#F3F4F6',
                color: '#374151',
                padding: '11px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.88rem'
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#044B29', marginBottom: '4px' }}>
                {mode === 'login' ? 'Welcome Back to 24/7 Service' : 'Create Account'}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                {mode === 'login' ? 'Sign in to access orders & wishlist' : 'Sign up for best grocery deals daily'}
              </p>
            </div>

            <div style={{ display: 'flex', backgroundColor: '#F3F4F6', borderRadius: '8px', padding: '3px', marginBottom: '16px' }}>
              <button
                onClick={() => { setMode('login'); setErrorMsg(''); }}
                style={{
                  flex: 1,
                  padding: '7px 0',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  backgroundColor: mode === 'login' ? '#FFFFFF' : 'transparent',
                  color: mode === 'login' ? '#044B29' : '#6B7280'
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => { setMode('register'); setErrorMsg(''); }}
                style={{
                  flex: 1,
                  padding: '7px 0',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  backgroundColor: mode === 'register' ? '#FFFFFF' : 'transparent',
                  color: mode === 'register' ? '#044B29' : '#6B7280'
                }}
              >
                Sign Up
              </button>
            </div>

            {errorMsg && (
              <div style={{ backgroundColor: '#FEE2E2', color: '#DC2626', padding: '8px', borderRadius: '6px', fontSize: '0.78rem', marginBottom: '12px', textAlign: 'center' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {mode === 'register' && (
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '4px' }}>Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px 9px 32px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem' }}
                      required
                    />
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '4px' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px 9px 32px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem' }}
                    required
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '4px' }}>Phone Number</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input
                      type="text"
                      placeholder="e.g. 9812345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px 9px 32px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem' }}
                    />
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '4px' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px 9px 32px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem' }}
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
                  color: '#FFF',
                  padding: '11px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div style={{ marginTop: '14px', textAlign: 'center', fontSize: '0.76rem', color: '#6B7280' }}>
              Are you an Admin?{' '}
              <a
                href="http://localhost:5174"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#D93025', fontWeight: 700, textDecoration: 'underline' }}
              >
                Admin Login
              </a>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
