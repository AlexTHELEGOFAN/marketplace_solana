import React, { useState } from 'react';
import { Shield, Users, ShoppingBag, Flag, TrendingUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useMarketplace } from '../contexts/MarketplaceContext';

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const { products, deleteProduct } = useMarketplace();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'users' | 'reports'>('overview');

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-title font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 font-base">
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Users', value: '12,458', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Listings', value: products.length.toString(), icon: ShoppingBag, color: 'bg-green-500' },
    { label: 'Reported Items', value: '23', icon: Flag, color: 'bg-yellow-500' },
    { label: 'Monthly Revenue', value: '◎4.2K', icon: TrendingUp, color: 'bg-purple-500' }
  ];

  const recentReports = [
    { id: '1', type: 'Product', item: 'Fake Designer Bag', reporter: 'user123', status: 'pending' },
    { id: '2', type: 'User', item: 'spam_seller', reporter: 'buyer456', status: 'resolved' },
    { id: '3', type: 'Product', item: 'Counterfeit Watch', reporter: 'watch_expert', status: 'investigating' }
  ];

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

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
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 font-base">
            Manage and monitor the DeLeBon marketplace
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-title font-bold text-gray-900">
                    {stat.value}
                  </span>
                </div>
                <p className="text-gray-600 font-base">{stat.label}</p>
              </div>
            );
          })}
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
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'products', label: 'Products', icon: ShoppingBag },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'reports', label: 'Reports', icon: Flag }
              ].map((tab) => {
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
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-title font-bold text-gray-900 mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-base text-gray-600">New user registrations</span>
                        <span className="font-base font-bold text-green-600">+24</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-base text-gray-600">Products listed today</span>
                        <span className="font-base font-bold text-blue-600">+12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-base text-gray-600">Transactions completed</span>
                        <span className="font-base font-bold text-purple-600">+18</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-title font-bold text-gray-900 mb-4">
                      System Status
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-base text-gray-600">Blockchain Connection</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-base text-green-600">Active</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-base text-gray-600">Smart Contracts</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-base text-green-600">Deployed</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-base text-gray-600">API Performance</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="font-base text-yellow-600">Moderate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-title font-bold text-gray-900 mb-4">
                    Product Management
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-base font-bold text-gray-700">Product</th>
                        <th className="text-left py-3 px-4 font-base font-bold text-gray-700">Seller</th>
                        <th className="text-left py-3 px-4 font-base font-bold text-gray-700">Price</th>
                        <th className="text-left py-3 px-4 font-base font-bold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-base font-bold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <div>
                                <div className="font-base font-bold text-gray-900">{product.title}</div>
                                <div className="text-sm text-gray-600 font-base">{product.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-base text-gray-600">{product.sellerName}</td>
                          <td className="py-3 px-4 font-base font-bold text-gray-900">◎{product.price}</td>
                          <td className="py-3 px-4">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-base">
                              Active
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 font-base">
                                View
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-800 font-base"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-title font-bold text-gray-900 mb-4">
                    User Management
                  </h3>
                </div>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-title font-bold text-gray-900 mb-2">
                    User management coming soon
                  </h3>
                  <p className="text-gray-600 font-base">
                    Advanced user management features will be available in the next update
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-title font-bold text-gray-900 mb-4">
                    Content Reports
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-base font-bold text-gray-700">Type</th>
                        <th className="text-left py-3 px-4 font-base font-bold text-gray-700">Item</th>
                        <th className="text-left py-3 px-4 font-base font-bold text-gray-700">Reporter</th>
                        <th className="text-left py-3 px-4 font-base font-bold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-base font-bold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentReports.map((report) => (
                        <tr key={report.id} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-base text-gray-600">{report.type}</td>
                          <td className="py-3 px-4 font-base font-bold text-gray-900">{report.item}</td>
                          <td className="py-3 px-4 font-base text-gray-600">{report.reporter}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-sm font-base ${
                              report.status === 'resolved' 
                                ? 'bg-green-100 text-green-800'
                                : report.status === 'investigating'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button className="text-green-600 hover:text-green-800">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;