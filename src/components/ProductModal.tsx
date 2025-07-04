import React, { useState } from 'react';
import { X, Heart, MapPin, Star, Clock, Users, MessageCircle, ShoppingCart, Gavel } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../contexts/MarketplaceContext';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { useAuth } from '../contexts/AuthContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { toggleFavorite, addBid, addMessage } = useMarketplace();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'bids' | 'messages'>('details');

  const handleFavoriteClick = () => {
    toggleFavorite(product.id);
  };

  const handleBidSubmit = () => {
    if (bidAmount && user) {
      const amount = parseFloat(bidAmount);
      addBid(product.id, amount, user.id, user.username);
      setBidAmount('');
    }
  };

  const handleMessageSubmit = () => {
    if (message.trim() && user) {
      addMessage({
        senderId: user.id,
        receiverId: product.sellerId,
        productId: product.id,
        content: message,
        isRead: false
      });
      setMessage('');
    }
  };

  const getTimeRemaining = (endTime: string) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const difference = end - now;
    
    if (difference <= 0) return 'Ended';
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const highestBid = product.bids.length > 0 
    ? Math.max(...product.bids.map(bid => bid.amount))
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-title font-bold text-gray-900">
                {product.title}
              </h2>
              {product.isAuction && (
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-base">
                  Auction
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleFavoriteClick}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Heart className={`w-5 h-5 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              <div className="mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-primary' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-title font-bold text-gray-900">
                    ◎{highestBid || product.price}
                  </div>
                  {highestBid && (
                    <div className="text-sm text-gray-500 font-base">
                      Starting: ◎{product.price}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 font-base">{product.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 font-base">{product.sellerRating}</span>
                  </div>
                </div>

                {product.isAuction && product.auctionEndTime && (
                  <div className="bg-secondary/10 p-4 rounded-lg mb-4">
                    <div className="flex items-center space-x-2 text-secondary mb-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-base font-bold">
                        {getTimeRemaining(product.auctionEndTime)} remaining
                      </span>
                    </div>
                    {product.bids.length > 0 && (
                      <div className="flex items-center space-x-2 text-purple">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-base">
                          {product.bids.length} bid{product.bids.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-base">
                    {product.category}
                  </span>
                </div>

                <p className="text-gray-600 font-base mb-6">
                  {product.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-base">Condition:</span>
                    <span className="font-base">{product.condition}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-base">Seller:</span>
                    <span className="font-base">{product.sellerName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-base">Delivery:</span>
                    <span className="font-base">{product.deliveryOptions.join(', ')}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {product.isAuction ? (
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Enter bid amount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-base"
                      />
                      <button
                        onClick={handleBidSubmit}
                        className="bg-secondary text-white px-6 py-3 rounded-lg font-base font-bold hover:bg-secondary/90 transition-colors flex items-center space-x-2"
                      >
                        <Gavel className="w-5 h-5" />
                        <span>Bid</span>
                      </button>
                    </div>
                  ) : (
                    <button className="w-full bg-primary text-white px-6 py-3 rounded-lg font-base font-bold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Buy Now</span>
                    </button>
                  )}

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Send a message to seller..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-base"
                    />
                    <button
                      onClick={handleMessageSubmit}
                      className="bg-accent text-white px-6 py-3 rounded-lg font-base font-bold hover:bg-accent/90 transition-colors flex items-center space-x-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 border-t border-gray-200">
            <div className="flex space-x-8 pt-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 border-b-2 font-base ${
                  activeTab === 'details'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('bids')}
                className={`pb-2 border-b-2 font-base ${
                  activeTab === 'bids'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Bids ({product.bids.length})
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`pb-2 border-b-2 font-base ${
                  activeTab === 'messages'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Messages
              </button>
            </div>

            <div className="mt-6">
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-title font-bold text-gray-900 mb-2">Product Details</h4>
                    <p className="text-gray-600 font-base">{product.description}</p>
                  </div>
                  <div>
                    <h4 className="font-title font-bold text-gray-900 mb-2">Delivery Options</h4>
                    <ul className="list-disc list-inside text-gray-600 font-base">
                      {product.deliveryOptions.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'bids' && (
                <div className="space-y-4">
                  {product.bids.length > 0 ? (
                    product.bids.map((bid) => (
                      <div key={bid.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-base font-bold text-gray-900">
                            {bid.bidderName}
                          </div>
                          <div className="text-sm text-gray-600 font-base">
                            {new Date(bid.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-xl font-title font-bold text-gray-900">
                          ◎{bid.amount}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 font-base">No bids yet</p>
                  )}
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <p className="text-gray-600 font-base">
                    Messages will appear here when you contact the seller
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;