import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import ProfilePage from './pages/ProfilePage';
import CreateAdPage from './pages/CreateAdPage';
import AdminPage from './pages/AdminPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { AuthProvider } from './contexts/AuthContext';
import { MarketplaceProvider } from './contexts/MarketplaceContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 neon-glow">
            <div className="w-8 h-8 bg-primary rounded-full pulse-animation"></div>
          </div>
          <h1 className="text-3xl font-title font-bold text-white mb-2">SolanCoin</h1>
          <p className="text-white/80 font-base">Decentralized Marketplace</p>
        </motion.div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <MarketplaceProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/create-ad" element={<CreateAdPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
              </Routes>
            </AnimatePresence>
          </div>
        </Router>
      </MarketplaceProvider>
    </AuthProvider>
  );
}

export default App;