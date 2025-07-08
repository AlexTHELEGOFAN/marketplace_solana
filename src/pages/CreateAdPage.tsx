import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { useAuth } from '../contexts/AuthContext';

const CreateAdPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useMarketplace();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    deliveryOptions: [] as string[],
    images: [] as string[],
    isAuction: false,
    auctionEndTime: ''
  });

  const categories = [
    'Electronics', 'Music', 'Collectibles', 'Food',
    'Fashion', 'Sports', 'Books', 'Art', 'Jewelry', 'Wearable'
  ];

  const conditions = ['New', 'Like New', 'Excellent', 'Good', 'Fair', 'Poor'];
  const deliveryOptions = ['Pickup', 'Delivery', 'Secure Delivery', 'Registered Mail'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDeliveryOptionChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      deliveryOptions: prev.deliveryOptions.includes(option)
        ? prev.deliveryOptions.filter(o => o !== option)
        : [...prev.deliveryOptions, option]
    }));
  };

  const handleImageAdd = () => {
    // Simulate image upload with stock photos
    const stockImages = [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];
    
    const randomImage = stockImages[Math.floor(Math.random() * stockImages.length)];
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, randomImage]
    }));
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please connect your wallet to create an ad');
      return;
    }

    if (!formData.title || !formData.description || !formData.price || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    addProduct({
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      condition: formData.condition,
      location: formData.location || user.location || 'Unknown',
      deliveryOptions: formData.deliveryOptions,
      images: formData.images.length > 0 ? formData.images : ['https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800'],
      sellerId: user.id,
      sellerName: user.username,
      sellerRating: user.rating,
      isAuction: formData.isAuction,
      auctionEndTime: formData.isAuction ? formData.auctionEndTime : undefined
    });

    navigate('/marketplace');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-title font-bold text-gray-900 mb-8">
            Create New Ad
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-title font-bold text-gray-900 mb-6">
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-base font-bold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-base"
                    placeholder="Enter product title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-base font-bold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-base"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-base font-bold text-gray-700 mb-2">
                    Price (SOL) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-base"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-base font-bold text-gray-700 mb-2">
                    Condition
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-base"
                  >
                    <option value="">Select condition</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-base font-bold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-base"
                    placeholder="Enter location (optional)"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-base font-bold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-base"
                    placeholder="Describe your item in detail..."
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-title font-bold text-gray-900 mb-6">
                Images
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={handleImageAdd}
                  className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-primary transition-colors"
                >
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm font-base text-gray-600">Add Image</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-title font-bold text-gray-900 mb-6">
                Delivery Options
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {deliveryOptions.map(option => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.deliveryOptions.includes(option)}
                      onChange={() => handleDeliveryOptionChange(option)}
                      className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="font-base text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Auction Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-title font-bold text-gray-900 mb-6">
                Auction Settings
              </h2>
              
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isAuction"
                    checked={formData.isAuction}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="font-base font-bold text-gray-700">
                    List as auction
                  </span>
                </label>

                {formData.isAuction && (
                  <div>
                    <label className="block text-sm font-base font-bold text-gray-700 mb-2">
                      Auction End Time
                    </label>
                    <input
                      type="datetime-local"
                      name="auctionEndTime"
                      value={formData.auctionEndTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-base"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/marketplace')}
                className="px-8 py-3 border border-gray-300 rounded-lg font-base font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-base font-bold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Create Ad
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateAdPage;