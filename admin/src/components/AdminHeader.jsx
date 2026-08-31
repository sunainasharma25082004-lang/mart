import React from 'react';
import { Bell, Menu, X } from 'lucide-react';

export default function AdminHeader({ adminUser, onMenuClick, sidebarOpen }) {
  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button
          type="button"
          className="admin-hamburger"
          onClick={onMenuClick}
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className="admin-header-copy">
          <h2 className="admin-header-title">24/7 Service Management Portal</h2>
          <p className="admin-header-subtitle">Real-time inventory, products, orders &amp; customer analytics</p>
        </div>
      </div>

      <div className="admin-header-actions">
        <div className="admin-notification-badge">
          <Bell size={20} style={{ color: '#374151' }} />
          <span className="admin-notification-dot"></span>
        </div>

        <div className="admin-user-chip">
          <div className="admin-user-avatar">
            {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
          </div>
          <div className="admin-user-meta">
            <div className="admin-user-name">{adminUser?.name || 'Administrator'}</div>
            <div className="admin-user-role">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
