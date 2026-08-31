import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist, products, toggleWishlist, addToCart } = useShop();

  const allProductsList = products.length > 0 ? products : [
    { _id: 'prod-1', name: 'Aashirvaad Atta 5kg', price: 249, originalPrice: 285, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300' },
    { _id: 'prod-2', name: 'Fortune Sunflower Oil 1L', price: 135, originalPrice: 160, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=300' },
    { _id: 'prod-3', name: 'Tata Tea Premium 250g', price: 120, originalPrice: 150, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=300' }
  ];

  const wishlistProducts = allProductsList.filter(p => wishlist.includes(p._id));

  return (
    <div className="page-container" style={{ marginTop: '28px', marginBottom: '40px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <Heart size={26} style={{ color: '#D93025' }} fill="#D93025" />
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1F2937' }}>My Wishlist ({wishlistProducts.length})</h2>
      </div>

      {wishlistProducts.length === 0 ? (
        <div style={{ 
          backgroundColor: '#FFFFFF', 
          borderRadius: '16px', 
          padding: '60px 20px', 
          textAlign: 'center', 
          border: '1px solid #E5E7EB', 
          color: '#6B7280',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <Heart size={44} style={{ color: '#D1D5DB', marginBottom: '14px' }} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', color: '#1F2937' }}>Your wishlist is empty</h3>
          <p style={{ fontSize: '0.85rem', marginBottom: '20px' }}>Explore products and save your favorite daily essentials</p>
          <Link
            to="/shop"
            style={{ 
              backgroundColor: '#044B29', 
              color: '#FFF', 
              padding: '11px 24px', 
              borderRadius: '8px', 
              fontWeight: 700, 
              fontSize: '0.9rem', 
              display: 'inline-block',
              boxShadow: '0 4px 10px rgba(4,75,41,0.2)'
            }}
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="wishlist-products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {wishlistProducts.map((product) => (
            <div
              key={product._id}
              className="product-card-hover product-card-box"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                padding: '12px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              {/* Remove Trash Button */}
              <button
                onClick={() => toggleWishlist(product._id)}
                style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  color: '#9CA3AF',
                  zIndex: 3
                }}
              >
                <Trash2 size={16} />
              </button>

              {/* Product Image */}
              <div className="product-img-box" style={{ height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <img src={product.image} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
              </div>

              {/* Text content */}
              <div>
                <h4 className="product-title-text" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1F2937', marginBottom: '6px', lineHeight: 1.25, height: '32px', overflow: 'hidden' }}>
                  {product.name}
                </h4>
                <div className="product-price-text" style={{ fontSize: '0.95rem', fontWeight: 800, color: '#044B29', marginBottom: '12px' }}>
                  ₹{product.price}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product)}
                style={{
                  width: '100%',
                  backgroundColor: '#E8F5E9',
                  color: '#044B29',
                  border: 'none',
                  padding: '8px 0',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={14} />
                <span>Add to Cart</span>
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
