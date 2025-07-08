import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Globe, Users, TrendingUp, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMarketplace } from '../contexts/MarketplaceContext';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const { products } = useMarketplace();
  const featuredProducts = products.slice(0, 3);

  const stats = [
    { label: 'Active Users', value: '12,458', icon: Users },
    { label: 'Total Sales', value: '◎2.4M', icon: TrendingUp },
    { label: 'Products Listed', value: '8,921', icon: Star },
    { label: 'Countries', value: '25', icon: Globe }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Smart contracts lock funds until delivery confirmation'
    },
    {
      icon: Zap,
      title: 'Fast & Low Cost',
      description: 'Powered by Solana for instant, low-fee transactions'
    },
    {
      icon: Globe,
      title: 'Global Marketplace',
      description: 'Buy and sell with anyone, anywhere in the world'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Reputation system builds trust through user ratings'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-title font-bold text-white mb-6">
              The future of
              <span className="block bg-gradient-to-r from-cyan to-pink bg-clip-text text-transparent">
                decentralized commerce
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 font-base">
              Buy and sell with confidence on the world's first truly decentralized marketplace. 
              Powered by Solana blockchain for secure, fast, and transparent transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/marketplace"
                className="bg-white text-primary px-8 py-4 rounded-lg font-base font-bold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Explore marketplace</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/create-ad"
                className="bg-white/10 text-white px-8 py-4 rounded-lg font-base font-bold hover:bg-white/20 transition-all duration-200 border border-white/20 flex items-center justify-center space-x-2"
              >
                <span>List your item</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-title font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-base">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-title font-bold text-gray-900 mb-6">
              Why choose SolanCoin ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-base">
              Experience the benefits of blockchain technology with our innovative marketplace platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-title font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-base">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-title font-bold text-gray-900 mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-base">
              Discover unique items from our verified sellers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/marketplace"
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-base font-bold hover:shadow-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-dark to-darkPurple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-title font-bold text-white mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 font-base">
              Join thousands of users who trust SolanCoin for their decentralized commerce needs
            </p>
            <Link
              to="/create-ad"
              className="bg-white text-primary px-8 py-4 rounded-lg font-base font-bold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Start Selling Today</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;