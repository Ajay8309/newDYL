import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Services from './pages/Services';
import TarotGuidance from './pages/services/TarotGuidance';
import AstrologyReading from './pages/services/AstrologyReading';
import AkashicRecords from './pages/services/AkashicRecords';
import Numerology from './pages/services/Numerology';
import ReikiHealing from './pages/services/ReikiHealing';
import CrystalGuidance from './pages/services/CrystalGuidance';
import HealingCodes from './pages/services/HealingCodes';
import IntegratedHealing from './pages/services/IntegratedHealing';
import Booking from './pages/Booking';
import Policies from './pages/Policies';
import Blog from './pages/Blog';
import About from './pages/About';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ArticleEditor from './pages/admin/ArticleEditor';
import ProtectedRoute from './components/ProtectedRoute';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/services/tarot" element={<PageTransition><TarotGuidance /></PageTransition>} />
        <Route path="/services/astrology" element={<PageTransition><AstrologyReading /></PageTransition>} />
        <Route path="/services/akashic" element={<PageTransition><AkashicRecords /></PageTransition>} />
        <Route path="/services/numerology" element={<PageTransition><Numerology /></PageTransition>} />
        <Route path="/services/reiki" element={<PageTransition><ReikiHealing /></PageTransition>} />
        <Route path="/services/crystals" element={<PageTransition><CrystalGuidance /></PageTransition>} />
        <Route path="/services/healing-codes" element={<PageTransition><HealingCodes /></PageTransition>} />
        <Route path="/services/integrated-healing" element={<PageTransition><IntegratedHealing /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/policies" element={<PageTransition><Policies /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:id" element={<PageTransition><BlogPost /></PageTransition>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/article/new" element={
          <ProtectedRoute>
            <ArticleEditor />
          </ProtectedRoute>
        } />
        <Route path="/admin/article/:id" element={
          <ProtectedRoute>
            <ArticleEditor />
          </ProtectedRoute>
        } />

      </Routes>
    </AnimatePresence>
  );
};

import OfferBanner from './components/OfferBanner';

function App() {
  return (
    <Router>
      <div className="bg-[var(--color-primary)] min-h-screen text-[var(--color-text)] font-sans">
        <OfferBanner />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;