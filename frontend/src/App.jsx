import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import LocationModal from './components/LocationModal';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import TrackOrder from './pages/TrackOrder';
import WishlistPage from './pages/WishlistPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Offers from './pages/Offers';

export default function App() {
  return (
    <ShopProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAF9' }}>
          <TopBar />
          <Header />
          <Navbar />

          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>

          <Footer />

          {/* Sticky Mobile Bottom Navigation */}
          <MobileBottomNav />

          {/* Global Modals & Drawers */}
          <LocationModal />
          <AuthModal />
          <CheckoutModal />
          <CartDrawer />
        </div>
      </Router>
    </ShopProvider>
  );
}
