import React, { useState } from 'react';
import { Star, MapPin, Calendar, ShoppingBag, Heart, MessageCircle, Settings, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useMarketplace } from '../contexts/MarketplaceContext';
import ProductCard from '../components/ProductCard';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { products, favorites } = useMarketplace();
  const [activeTab, setActiveTab] = useState<'listings' | 'favorites' | 'purchases' | 'sales'>('listings');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-title font-bold text-gray-900 mb-4">
            Please connect your wallet to view your profile
          </h2>
        </div>
      </div>
    );
  }

  const userListings = products.filter(product => product.sellerId === user.id);
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  const tabs = [
    { id: 'listings', label: 'My Listings', count: userListings.length, icon: ShoppingBag },
    { id: 'favorites', label: 'Favorites', count: favoriteProducts.length, icon: Heart },
    { id: 'purchases', label: 'Purchases', count: 0, icon: ShoppingBag },
    { id: 'sales', label: 'Sales', count: 0, icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'}
                alt={user.username}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-title font-bold text-gray-900 mb-2">
                {user.username}
              </h1>
              <p className="text-gray-600 font-base mb-4">
                {user.email}
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-base font-bold text-gray-900">
                    {user.rating}
                  </span>
                  <span className="text-gray-600 font-base">
                    (124 reviews)
                  </span>
                </div>
                
                {user.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 font-base">
                      {user.location}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 font-base">
                    Joined Jan 2024
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 font-base">
                <div>
                  <span className="font-bold text-gray-900">
                    {user.walletAddress?.slice(0, 6)}...{user.walletAddress?.slice(-4)}
                  </span>
                  <span className="ml-2">Wallet</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full pulse-animation"></div>
                <span>Verified</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Settings className="w-5 h-5" />
                <span className="font-base">Edit Profile</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="font-base">Messages</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-title font-bold text-gray-900">
                {userListings.length}
              </span>
            </div>
            <p className="text-gray-600 font-base">Active Listings</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-2xl font-title font-bold text-gray-900">
                47
              </span>
            </div>
            <p className="text-gray-600 font-base">Total Sales</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <span className="text-2xl font-title font-bold text-gray-900">
                {favoriteProducts.length}
              </span>
            </div>
            <p className="text-gray-600 font-base">Favorites</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink/10 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-pink" />
              </div>
              <span className="text-2xl font-title font-bold text-gray-900">
                {user.rating}
              </span>
            </div>
            <p className="text-gray-600 font-base">Rating</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-base ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'listings' && (
              <div>
                {userListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userListings.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-title font-bold text-gray-900 mb-2">
                      No listings yet
                    </h3>
                    <p className="text-gray-600 font-base">
                      Create your first listing to start selling
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                {favoriteProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-title font-bold text-gray-900 mb-2">
                      No favorites yet
                    </h3>
                    <p className="text-gray-600 font-base">
                      Add items to your favorites to see them here
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'purchases' && (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-title font-bold text-gray-900 mb-2">
                  No purchases yet
                </h3>
                <p className="text-gray-600 font-base">
                  Your purchase history will appear here
                </p>
              </div>
            )}

            {activeTab === 'sales' && (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-title font-bold text-gray-900 mb-2">
                  No sales yet
                </h3>
                <p className="text-gray-600 font-base">
                  Your sales history will appear here
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;