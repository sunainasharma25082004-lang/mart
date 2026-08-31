import React, { useState } from 'react';
import { Plus, Trash2, ListTree } from 'lucide-react';

export default function Categories() {
  const [categories, setCategories] = useState([
    { _id: 'cat-1', name: 'Fruits & Vegetables', slug: 'fruits-vegetables', count: 12, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200' },
    { _id: 'cat-2', name: 'Dairy & Eggs', slug: 'dairy-eggs', count: 8, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=200' },
    { _id: 'cat-3', name: 'Grocery & Staples', slug: 'grocery-staples', count: 24, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200' },
    { _id: 'cat-4', name: 'Beverages', slug: 'beverages', count: 15, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=200' },
    { _id: 'cat-5', name: 'Snacks & Branded', slug: 'snacks-branded', count: 30, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=200' },
    { _id: 'cat-6', name: 'Personal Care', slug: 'personal-care', count: 18, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=200' },
    { _id: 'cat-7', name: 'Household Care', slug: 'household-care', count: 14, image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&q=80&w=200' }
  ]);

  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategoryName) {
      setCategories(prev => [
        ...prev,
        {
          _id: 'cat-' + Date.now(),
          name: newCategoryName,
          slug: newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          count: 0
        }
      ]);
      setNewCategoryName('');
    }
  };

  const handleDelete = (id) => {
    setCategories(prev => prev.filter(c => c._id !== id));
  };

  return (
    <div className="admin-category-page">
      <div className="admin-category-header admin-page-toolbar">
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1F2937' }}>Store Categories ({categories.length})</h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280' }}>Manage product classification taxonomy</p>
        </div>
      </div>

      <div className="admin-category-layout">
        <div className="admin-form-panel" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#044B29', marginBottom: '14px' }}>Add Category</h3>
          <form onSubmit={handleAddCategory}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Category Name</label>
              <input
                type="text"
                placeholder="e.g. Frozen Foods"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                required
              />
            </div>
            <button
              type="submit"
              style={{ width: '100%', backgroundColor: '#044B29', color: '#FFF', padding: '10px', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <Plus size={18} />
              <span>Create Category</span>
            </button>
          </form>
        </div>

        <div className="admin-category-table-wrap" style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div className="admin-category-table-scroll">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F3F4F6', color: '#6B7280', backgroundColor: '#FAFAFA' }}>
                  <th style={{ padding: '14px 16px' }}>Category Name</th>
                  <th style={{ padding: '14px 16px' }}>URL Slug</th>
                  <th style={{ padding: '14px 16px' }}>Total Items</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat._id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#1F2937' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 4px 12px rgba(17,24,39,0.08)' }}
                          />
                        ) : (
                          <ListTree size={18} style={{ color: '#044B29' }} />
                        )}
                        <span>{cat.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#6B7280', fontFamily: 'monospace' }}>/{cat.slug}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#044B29' }}>{cat.count} Products</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <button onClick={() => handleDelete(cat._id)} style={{ color: '#D93025' }}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
