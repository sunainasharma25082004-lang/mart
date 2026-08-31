import React from 'react';
import { Apple, Milk, Wheat, Coffee, Cookie, Sparkles, Home, Grid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function CategoryGrid() {
  const navigate = useNavigate();
  const { setSelectedCategory } = useShop();

  const categories = [
    {
      name: 'Fruits & Veggies',
      fullName: 'Fruits & Vegetables',
      icon: <Apple size={26} style={{ color: '#2E7D32' }} />,
      bg: '#E8F5E9',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Dairy & Eggs',
      fullName: 'Dairy & Eggs',
      icon: <Milk size={26} style={{ color: '#1565C0' }} />,
      bg: '#E3F2FD',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Grocery',
      fullName: 'Grocery & Staples',
      icon: <Wheat size={26} style={{ color: '#EF6C00' }} />,
      bg: '#FFF3E0',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Beverages',
      fullName: 'Beverages',
      icon: <Coffee size={26} style={{ color: '#6A1B9A' }} />,
      bg: '#F3E5F5',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Snacks',
      fullName: 'Snacks & Branded',
      icon: <Cookie size={26} style={{ color: '#C62828' }} />,
      bg: '#FFEBEE',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Personal Care',
      fullName: 'Personal Care',
      icon: <Sparkles size={26} style={{ color: '#00838F' }} />,
      bg: '#E0F7FA',
      image: 'https://images.unsplash.com/photo-1607006482602-76ca0fd2f477?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Household',
      fullName: 'Household Care',
      icon: <Home size={26} style={{ color: '#283593' }} />,
      bg: '#E8EAF6',
      image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'View All',
      fullName: 'All Categories',
      icon: <Grid size={26} style={{ color: '#424242' }} />,
      bg: '#F5F5F5',
      isViewAll: true
    }
  ];

  const handleCategoryClick = (cat) => {
    if (cat.name === 'View All') {
      setSelectedCategory('All Categories');
      navigate('/shop');
    } else {
      setSelectedCategory(cat.fullName);
      navigate(`/shop?category=${encodeURIComponent(cat.fullName)}`);
    }
  };

  return (
    <div className="page-container" style={{ marginTop: '28px' }}>
      <div
        className="category-grid-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: '12px'
        }}
      >
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="product-card-hover category-card-box"
            onClick={() => handleCategoryClick(cat)}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              padding: '12px 6px',
              textAlign: 'center',
              border: '1px solid #F3F4F6',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div className="category-icon-wrapper" style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: cat.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              {cat.image ? (
                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                cat.icon
              )}
            </div>
            <span className="category-title-text" style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#1F2937',
              lineHeight: 1.2
            }}>
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
