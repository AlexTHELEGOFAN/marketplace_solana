import React from 'react';
import { Heart, Clock, Users, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../contexts/MarketplaceContext';
import { useMarketplace } from '../contexts/MarketplaceContext';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { toggleFavorite } = useMarketplace();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const getTimeRemaining = (endTime: string) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const difference = end - now;
    
    if (difference <= 0) return 'Ended';
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const highestBid = product.bids.length > 0 
    ? Math.max(...product.bids.map(bid => bid.amount))
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer card-hover"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        
        {product.isAuction && (
          <div className="absolute top-3 left-3 bg-secondary text-white px-3 py-1 rounded-full text-sm font-base">
            Auction
          </div>
        )}
        
        <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 rounded-full text-sm font-base">
          {product.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-title font-bold text-lg text-gray-900 mb-2 line-clamp-1">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 font-base">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 font-base">{product.location}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 font-base">{product.sellerRating}</span>
          </div>
        </div>

        {product.isAuction && product.auctionEndTime && (
          <div className="flex items-center space-x-2 mb-3 text-secondary">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-base">
              {getTimeRemaining(product.auctionEndTime)} left
            </span>
          </div>
        )}

        {product.bids.length > 0 && (
          <div className="flex items-center space-x-2 mb-3 text-purple">
            <Users className="w-4 h-4" />
            <span className="text-sm font-base">
              {product.bids.length} bid{product.bids.length > 1 ? 's' : ''}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-title font-bold text-gray-900">
              ◎{highestBid || product.price}
            </div>
            {highestBid && (
              <div className="text-sm text-gray-500 font-base">
                Starting: ◎{product.price}
              </div>
            )}
          </div>
          
          <div className="text-sm text-gray-500 font-base">
            by {product.sellerName}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;