import React, { useState } from 'react';
import { Search, Filter, Grid3X3, List, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMarketplace } from '../contexts/MarketplaceContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Product } from '../contexts/MarketplaceContext';

const MarketplacePage: React.FC = () => {
  const { products, searchProducts, filterProducts } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const categories = ['All', 'Electronics', 'Music', 'Collectibles', 'Photography', 'Fashion', 'Sports', 'Books', 'Art'];

  const filteredProducts = React.useMemo(() => {
    let result = products;

    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    if (showFavoritesOnly) {
      result = result.filter(product => product.isFavorite);
    }

    return result;
  }, [products, searchQuery, selectedCategory, showFavoritesOnly, searchProducts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-title font-bold text-gray-900 mb-4">
            Marketplace
          </h1>
          <p className="text-xl text-gray-600 font-base">
            Discover unique items from verified sellers worldwide
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-base"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-base"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Favorites Toggle */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
                showFavoritesOnly
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${showFavoritesOnly ? 'fill-red-500' : ''}`} />
              <span className="font-base">Favorites</span>
            </button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 font-base">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 font-base">Sort by:</span>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-base text-sm">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-title font-bold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 font-base">
              Try adjusting your search or filters to find what you're looking for
            </p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default MarketplacePage;