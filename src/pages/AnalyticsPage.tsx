import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign, BarChart3, PieChart, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const AnalyticsPage: React.FC = () => {
  const metrics = [
    { label: 'Total Volume', value: '◎247.8K', change: '+12.5%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Active Users', value: '12,458', change: '+8.2%', icon: Users, color: 'text-blue-600' },
    { label: 'Total Listings', value: '8,921', change: '+15.3%', icon: ShoppingBag, color: 'text-purple-600' },
    { label: 'Conversion Rate', value: '3.4%', change: '+0.8%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const categoryData = [
    { category: 'Electronics', volume: 45.2, color: 'bg-primary' },
    { category: 'Fashion', volume: 28.7, color: 'bg-secondary' },
    { category: 'Collectibles', volume: 15.8, color: 'bg-accent' },
    { category: 'Music', volume: 10.3, color: 'bg-pink' }
  ];

  const transactionData = [
    { month: 'Jan', volume: 45 },
    { month: 'Feb', volume: 52 },
    { month: 'Mar', volume: 48 },
    { month: 'Apr', volume: 61 },
    { month: 'May', volume: 58 },
    { month: 'Jun', volume: 67 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-title font-bold text-gray-900 mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-xl text-gray-600 font-base">
            Track marketplace performance and user behavior
          </p>
        </motion.div>

        {/* Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <span className={`text-sm font-base ${metric.color}`}>
                    {metric.change}
                  </span>
                </div>
                <div className="text-2xl font-title font-bold text-gray-900 mb-2">
                  {metric.value}
                </div>
                <p className="text-gray-600 font-base">{metric.label}</p>
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transaction Volume Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-title font-bold text-gray-900">
                Monthly Transaction Volume
              </h3>
              <BarChart3 className="w-6 h-6 text-gray-400" />
            </div>
            <div className="space-y-4">
              {transactionData.map((item, index) => (
                <div key={item.month} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-base text-gray-600">
                    {item.month}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${item.volume}%` }}
                    ></div>
                  </div>
                  <div className="text-sm font-base text-gray-900">
                    ◎{item.volume}K
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-title font-bold text-gray-900">
                Category Distribution
              </h3>
              <PieChart className="w-6 h-6 text-gray-400" />
            </div>
            <div className="space-y-4">
              {categoryData.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className="font-base text-gray-700">{item.category}</span>
                  </div>
                  <div className="text-sm font-base font-bold text-gray-900">
                    {item.volume}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Top Sellers */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-title font-bold text-gray-900 mb-6">
              Top Sellers
            </h3>
            <div className="space-y-4">
              {[
                { name: 'TechGuru', sales: 45, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100' },
                { name: 'MusicLover', sales: 32, avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100' },
                { name: 'CardMaster', sales: 28, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100' }
              ].map((seller, index) => (
                <div key={seller.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={seller.avatar}
                      alt={seller.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-base text-gray-700">{seller.name}</span>
                  </div>
                  <div className="text-sm font-base font-bold text-gray-900">
                    {seller.sales} sales
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-title font-bold text-gray-900 mb-6">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                { action: 'New listing created', time: '2 min ago' },
                { action: 'Auction completed', time: '15 min ago' },
                { action: 'User registered', time: '1 hour ago' },
                { action: 'Product sold', time: '2 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-base text-gray-700">{activity.action}</span>
                  </div>
                  <div className="text-sm font-base text-gray-500">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-title font-bold text-gray-900 mb-6">
              Performance Metrics
            </h3>
            <div className="space-y-4">
              {[
                { metric: 'Average Sale Price', value: '◎18.4' },
                { metric: 'Time to Sale', value: '3.2 days' },
                { metric: 'User Retention', value: '78%' },
                { metric: 'Platform Fee', value: '2.5%' }
              ].map((item, index) => (
                <div key={item.metric} className="flex items-center justify-between">
                  <span className="font-base text-gray-700">{item.metric}</span>
                  <span className="font-base font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;