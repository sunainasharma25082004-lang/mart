import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, X, Image as ImageIcon } from 'lucide-react';
import { API_BASE } from '../config';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Grocery & Staples');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [unit, setUnit] = useState('1 kg');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300');
  const [isDealOfDay, setIsDealOfDay] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products`);
      if (res.data && res.data.length > 0) {
        setProducts(res.data);
      } else {
        useMockProducts();
      }
    } catch (err) {
      useMockProducts();
    }
  };

  const useMockProducts = () => {
    setProducts([
      { _id: 'prod-1', name: 'Aashirvaad Atta 5kg', category: 'Grocery & Staples', price: 249, originalPrice: 285, discountPercent: 13, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300', isDealOfDay: true },
      { _id: 'prod-2', name: 'Fortune Sunflower Oil 1L', category: 'Grocery & Staples', price: 135, originalPrice: 160, discountPercent: 16, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=300', isDealOfDay: true },
      { _id: 'prod-3', name: 'Tata Tea Premium 250g', category: 'Beverages', price: 120, originalPrice: 150, discountPercent: 20, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=300', isDealOfDay: true },
      { _id: 'prod-4', name: 'Surf Excel Matic 2kg', category: 'Household Care', price: 245, originalPrice: 295, discountPercent: 17, image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&q=80&w=300', isDealOfDay: true },
      { _id: 'prod-5', name: 'Good Day Biscuits 200g', category: 'Snacks & Branded', price: 20, originalPrice: 30, discountPercent: 33, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=300', isDealOfDay: true },
      { _id: 'prod-6', name: 'Maggi 2-Min Noodles 4pcs', category: 'Snacks & Branded', price: 56, originalPrice: 65, discountPercent: 15, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=300', isDealOfDay: true }
    ]);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('service_admin_token') || localStorage.getItem('dadamart_admin_token');

    const pPrice = Number(price);
    const pOrigPrice = Number(originalPrice);
    const discountPercent = pOrigPrice > pPrice ? Math.round(((pOrigPrice - pPrice) / pOrigPrice) * 100) : 0;

    const newProd = {
      _id: 'prod-' + Date.now(),
      name,
      category,
      price: pPrice,
      originalPrice: pOrigPrice,
      discountPercent,
      unit,
      image,
      isDealOfDay
    };

    try {
      await axios.post(`${API_BASE}/products`, newProd, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      setProducts(prev => [newProd, ...prev]);
    } finally {
      setIsAddModalOpen(false);
      setName('');
      setPrice('');
      setOriginalPrice('');
    }
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div className="admin-page">
      
      <div className="admin-page-toolbar">
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1F2937' }}>Product Catalog ({products.length})</h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280' }}>Add, edit, or set daily deal discounts on groceries</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            backgroundColor: '#044B29',
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(4,75,41,0.25)'
          }}
        >
          <Plus size={18} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* PRODUCTS TABLE */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div className="admin-table-scroll">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #F3F4F6', color: '#6B7280', backgroundColor: '#FAFAFA' }}>
              <th style={{ padding: '14px 16px' }}>Item</th>
              <th style={{ padding: '14px 16px' }}>Category</th>
              <th style={{ padding: '14px 16px' }}>Offer Price</th>
              <th style={{ padding: '14px 16px' }}>Original Price</th>
              <th style={{ padding: '14px 16px' }}>Discount %</th>
              <th style={{ padding: '14px 16px' }}>Deal of Day</th>
              <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={prod.image} alt={prod.name} style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E5E7EB' }} />
                  <div>
                    <div style={{ fontWeight: 800, color: '#1F2937' }}>{prod.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Unit: {prod.unit || '1 pc'}</div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: '#4B5563' }}>{prod.category}</td>
                <td style={{ padding: '12px 16px', fontWeight: 800, color: '#044B29' }}>₹{prod.price}</td>
                <td style={{ padding: '12px 16px', color: '#9CA3AF', textDecoration: 'line-through' }}>₹{prod.originalPrice}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ backgroundColor: '#FEE2E2', color: '#D93025', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800 }}>
                    -{prod.discountPercent}%
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ backgroundColor: prod.isDealOfDay ? '#E8F5E9' : '#F3F4F6', color: prod.isDealOfDay ? '#044B29' : '#6B7280', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {prod.isDealOfDay ? 'YES' : 'NO'}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button onClick={() => handleDelete(prod._id)} style={{ color: '#D93025', padding: '6px' }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* ADD PRODUCT MODAL */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', maxWidth: '500px', width: '100%', padding: '28px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setIsAddModalOpen(false)} style={{ position: 'absolute', top: '18px', right: '18px', color: '#9CA3AF' }}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#044B29', marginBottom: '16px' }}>Add Product to 24/7 Service</h3>

            <form onSubmit={handleAddProduct}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Product Title</label>
                <input type="text" placeholder="e.g. Aashirvaad Atta 5kg" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} required />
              </div>

              <div className="admin-form-grid-2" style={{ marginBottom: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}>
                    <option value="Grocery & Staples">Grocery &amp; Staples</option>
                    <option value="Dairy & Eggs">Dairy &amp; Eggs</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Snacks & Branded">Snacks &amp; Branded</option>
                    <option value="Fruits & Vegetables">Fruits &amp; Vegetables</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Household Care">Household Care</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Unit / Weight</label>
                  <input type="text" placeholder="e.g. 5 kg" value={unit} onChange={(e) => setUnit(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} />
                </div>
              </div>

              <div className="admin-form-grid-2" style={{ marginBottom: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Offer Price (₹)</label>
                  <input type="number" placeholder="249" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Original Price (₹)</label>
                  <input type="number" placeholder="285" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} required />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Image URL</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB' }} required />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <input type="checkbox" id="deal" checked={isDealOfDay} onChange={(e) => setIsDealOfDay(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#044B29' }} />
                <label htmlFor="deal" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1F2937' }}>Set as "Top Deals Of The Day"</label>
              </div>

              <button type="submit" style={{ width: '100%', backgroundColor: '#044B29', color: '#FFF', padding: '12px', borderRadius: '8px', fontWeight: 800, fontSize: '0.95rem' }}>
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
