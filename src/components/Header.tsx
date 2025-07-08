import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Plus, BarChart3, Shield, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, isConnected, connectWallet, disconnectWallet } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: ShoppingBag },
    { name: 'Marketplace', href: '/marketplace', icon: Search },
    { name: 'Create ad', href: '/create-ad', icon: Plus },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    ...(user?.isAdmin ? [{ name: 'Admin', href: '/admin', icon: Shield }] : [])
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-xl font-title font-bold text-gray-900">SolanCoin</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-base">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {!isConnected ? (
              <button
                onClick={connectWallet}
                className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg font-base font-bold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Connect wallet
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full pulse-animation"></div>
                  <span className="text-sm font-base text-gray-700">
                    {user?.walletAddress?.slice(0, 6)}...{user?.walletAddress?.slice(-4)}
                  </span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <nav className="px-4 py-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-base">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;