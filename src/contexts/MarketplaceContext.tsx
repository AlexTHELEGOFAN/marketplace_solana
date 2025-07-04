import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  images: string[];
  location: string;
  condition: string;
  deliveryOptions: string[];
  createdAt: string;
  bids: Bid[];
  isAuction: boolean;
  auctionEndTime?: string;
  isFavorite: boolean;
}

export interface Bid {
  id: string;
  amount: number;
  bidderId: string;
  bidderName: string;
  timestamp: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  productId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface MarketplaceContextType {
  products: Product[];
  messages: Message[];
  favorites: string[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'bids' | 'isFavorite'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addBid: (productId: string, amount: number, bidderId: string, bidderName: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  toggleFavorite: (productId: string) => void;
  searchProducts: (query: string) => Product[];
  filterProducts: (category: string) => Product[];
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'MacBook Pro M3 14" - Like New',
    description: 'Excellent condition MacBook Pro with M3 chip, 16GB RAM, 512GB SSD. Used for only 3 months.',
    price: 1800,
    category: 'Electronics',
    sellerId: '1',
    sellerName: 'TechGuru',
    sellerRating: 4.9,
    images: ['https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800'],
    location: 'Paris, France',
    condition: 'Like New',
    deliveryOptions: ['Pickup', 'Delivery'],
    createdAt: '2024-01-15T10:00:00Z',
    bids: [],
    isAuction: false,
    isFavorite: false
  },
  {
    id: '2',
    title: 'Vintage Gibson Les Paul Guitar',
    description: 'Beautiful vintage Gibson Les Paul from 1979. Perfect for collectors and musicians.',
    price: 3500,
    category: 'Music',
    sellerId: '2',
    sellerName: 'MusicLover',
    sellerRating: 4.7,
    images: ['https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800'],
    location: 'Lyon, France',
    condition: 'Good',
    deliveryOptions: ['Pickup', 'Secure Delivery'],
    createdAt: '2024-01-14T15:30:00Z',
    bids: [
      { id: '1', amount: 3200, bidderId: '3', bidderName: 'GuitarCollector', timestamp: '2024-01-15T12:00:00Z' },
      { id: '2', amount: 3400, bidderId: '4', bidderName: 'RockStar', timestamp: '2024-01-15T14:00:00Z' }
    ],
    isAuction: true,
    auctionEndTime: '2024-01-20T20:00:00Z',
    isFavorite: false
  },
  {
    id: '3',
    title: 'Rare Pokémon Card Collection',
    description: 'Complete set of first generation Pokémon cards, mint condition. Perfect for collectors.',
    price: 2500,
    category: 'Collectibles',
    sellerId: '3',
    sellerName: 'CardMaster',
    sellerRating: 4.8,
    images: ['https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=800'],
    location: 'Marseille, France',
    condition: 'Mint',
    deliveryOptions: ['Registered Mail', 'Secure Delivery'],
    createdAt: '2024-01-13T09:00:00Z',
    bids: [],
    isAuction: false,
    isFavorite: false
  },
  {
    id: '4',
    title: 'Professional Camera Setup',
    description: 'Canon EOS R5 with 24-70mm lens, tripod, and accessories. Perfect for professional photography.',
    price: 2800,
    category: 'Photography',
    sellerId: '4',
    sellerName: 'PhotoPro',
    sellerRating: 4.9,
    images: ['https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=800'],
    location: 'Nice, France',
    condition: 'Excellent',
    deliveryOptions: ['Pickup', 'Delivery', 'Secure Delivery'],
    createdAt: '2024-01-12T11:00:00Z',
    bids: [],
    isAuction: false,
    isFavorite: false
  }
];

export const MarketplaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [messages, setMessages] = useState<Message[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'bids' | 'isFavorite'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      bids: [],
      isFavorite: false
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const addBid = (productId: string, amount: number, bidderId: string, bidderName: string) => {
    const newBid: Bid = {
      id: Date.now().toString(),
      amount,
      bidderId,
      bidderName,
      timestamp: new Date().toISOString()
    };

    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, bids: [...product.bids, newBid] }
        : product
    ));
  };

  const addMessage = (messageData: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      
      setProducts(products => products.map(product => 
        product.id === productId 
          ? { ...product, isFavorite: newFavorites.includes(productId) }
          : product
      ));
      
      return newFavorites;
    });
  };

  const searchProducts = (query: string) => {
    return products.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filterProducts = (category: string) => {
    return category === 'All' 
      ? products 
      : products.filter(product => product.category === category);
  };

  return (
    <MarketplaceContext.Provider value={{
      products,
      messages,
      favorites,
      addProduct,
      updateProduct,
      deleteProduct,
      addBid,
      addMessage,
      toggleFavorite,
      searchProducts,
      filterProducts
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};