import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Package, Users, ArrowUpRight, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [productsCount, setProductsCount] = useState(10);
  const [revenue, setRevenue] = useState(18490);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('service_admin_token') || localStorage.getItem('dadamart_admin_token');
      const res = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data && res.data.length > 0) {
        setOrders(res.data);
        const total = res.data.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        if (total > 0) setRevenue(total);
      }
    } catch (err) {
      // Mock data fallback
      setOrders([
        { _id: 'ORD-849201', customerName: 'Rahul Sharma', customerPhone: '9812345678', totalAmount: 629, orderStatus: 'Out for Delivery', createdAt: '2026-08-31T12:00:00.000Z' },
        { _id: 'ORD-849202', customerName: 'Priya Verma', customerPhone: '9876543210', totalAmount: 380, orderStatus: 'Pending', createdAt: '2026-08-31T11:30:00.000Z' },
        { _id: 'ORD-849203', customerName: 'Amit Kumar', customerPhone: '9811122233', totalAmount: 1240, orderStatus: 'Delivered', createdAt: '2026-08-30T16:20:00.000Z' }
      ]);
    }
  };

  const metrics = [
    { title: 'Total Revenue', value: `₹${revenue.toLocaleString()}`, change: '+14.2%', icon: <DollarSign size={24} style={{ color: '#044B29' }} />, bg: '#E8F5E9' },
    { title: 'Total Orders', value: orders.length > 0 ? orders.length : 24, change: '+8 new today', icon: <ShoppingBag size={24} style={{ color: '#0277BD' }} />, bg: '#E1F5FE' },
    { title: 'Total Products', value: productsCount, change: 'In Stock', icon: <Package size={24} style={{ color: '#EF6C00' }} />, bg: '#FFF3E0' },
    { title: 'Total Customers', value: 18, change: '+5 this week', icon: <Users size={24} style={{ color: '#C62828' }} />, bg: '#FFEBEE' }
  ];

  return (
    <div className="admin-page">
      
      {/* METRIC CARDS */}
      <div className="admin-metrics-grid">
        {metrics.map((m, idx) => (
          <div key={idx} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6B7280' }}>{m.title}</span>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {m.icon}
              </div>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1F2937', marginBottom: '4px' }}>{m.value}</div>
            <div style={{ fontSize: '0.78rem', color: '#044B29', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
              <ArrowUpRight size={14} />
              <span>{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT ORDERS TABLE */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        
        <div className="admin-page-toolbar" style={{ marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1F2937' }}>Recent Customer Orders</h3>
            <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>Monitor and process incoming grocery orders</p>
          </div>
          <Link
            to="/orders"
            style={{ backgroundColor: '#044B29', color: '#FFF', padding: '8px 16px', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem', textAlign: 'center' }}
          >
            Manage All Orders
          </Link>
        </div>

        <div className="admin-table-scroll">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #F3F4F6', color: '#6B7280' }}>
              <th style={{ padding: '12px 14px' }}>Order ID</th>
              <th style={{ padding: '12px 14px' }}>Customer</th>
              <th style={{ padding: '12px 14px' }}>Contact</th>
              <th style={{ padding: '12px 14px' }}>Amount</th>
              <th style={{ padding: '12px 14px' }}>Status</th>
              <th style={{ padding: '12px 14px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '14px', fontWeight: 800, color: '#044B29' }}>#{ord._id}</td>
                <td style={{ padding: '14px', fontWeight: 700, color: '#1F2937' }}>{ord.customerName}</td>
                <td style={{ padding: '14px', color: '#6B7280' }}>{ord.customerPhone}</td>
                <td style={{ padding: '14px', fontWeight: 800, color: '#1F2937' }}>₹{ord.totalAmount}</td>
                <td style={{ padding: '14px' }}>
                  <span style={{
                    backgroundColor: ord.orderStatus === 'Delivered' ? '#E8F5E9' : ord.orderStatus === 'Out for Delivery' ? '#E1F5FE' : '#FFF3E0',
                    color: ord.orderStatus === 'Delivered' ? '#044B29' : ord.orderStatus === 'Out for Delivery' ? '#0277BD' : '#E65100',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.78rem',
                    fontWeight: 700
                  }}>
                    {ord.orderStatus}
                  </span>
                </td>
                <td style={{ padding: '14px' }}>
                  <Link to="/orders" style={{ color: '#044B29', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                    <Eye size={16} /> Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      </div>

    </div>
  );
}
