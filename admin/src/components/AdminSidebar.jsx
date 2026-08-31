import React from 'react';
import { LayoutDashboard, ShoppingBag, Package, ListTree, LogOut, ExternalLink, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar({ onLogout, isOpen, onClose }) {
  const location = useLocation();

  const menu = [
    { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { label: 'Products', path: '/products', icon: <Package size={20} /> },
    { label: 'Orders', path: '/orders', icon: <ShoppingBag size={20} /> },
    { label: 'Categories', path: '/categories', icon: <ListTree size={20} /> }
  ];

  return (
    <aside className={`admin-sidebar ${isOpen ? 'is-open' : ''}`}>
      <div>
        <div className="admin-brand-wrap">
          <div className="admin-brand-mark">24/7</div>
          <div>
            <div className="admin-brand-name">SERVICE</div>
            <div className="admin-brand-tag">Admin</div>
          </div>
          <button
            type="button"
            className="admin-sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="admin-sidebar-menu">
          {menu.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                className={`admin-sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="admin-sidebar-cta"
        >
          <ExternalLink size={16} />
          <span>Open User Storefront</span>
        </a>

        <button
          onClick={onLogout}
          className="admin-logout-btn"
        >
          <LogOut size={18} />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </aside>
  );
}
