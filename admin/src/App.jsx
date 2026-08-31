import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Categories from './pages/Categories';

export default function App() {
  const [adminUser, setAdminUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('service_admin_token') || localStorage.getItem('dadamart_admin_token');
    const savedUser = localStorage.getItem('service_admin_user') || localStorage.getItem('dadamart_admin_user');
    if (token && savedUser) {
      setAdminUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('admin-sidebar-lock', sidebarOpen);
    return () => document.body.classList.remove('admin-sidebar-lock');
  }, [sidebarOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1024) setSidebarOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const handleLoginSuccess = (user, token) => {
    setAdminUser(user);
    localStorage.setItem('service_admin_user', JSON.stringify(user));
    localStorage.setItem('service_admin_token', token);
  };

  const handleLogout = () => {
    setSidebarOpen(false);
    setAdminUser(null);
    localStorage.removeItem('service_admin_user');
    localStorage.removeItem('service_admin_token');
    localStorage.removeItem('dadamart_admin_user');
    localStorage.removeItem('dadamart_admin_token');
  };

  if (!adminUser) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Router>
      <div className={`admin-app-shell ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {sidebarOpen && (
          <button
            type="button"
            className="admin-sidebar-overlay"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <AdminSidebar
          onLogout={handleLogout}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="admin-main-shell">
          <AdminHeader
            adminUser={adminUser}
            onMenuClick={() => setSidebarOpen((open) => !open)}
            sidebarOpen={sidebarOpen}
          />
          <div className="admin-page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
