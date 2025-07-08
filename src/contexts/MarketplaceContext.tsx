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
    price: 180,
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
    title: 'Flipper Zero',
    description: "Il peut être connecté à n'importe quel matériel utilisant GPIO pour le contrôler avec des boutons, exécuter votre propre code et imprimer des messages de débogage sur l'écran LCD. Il peut également être utilisé comme adaptateur USB",
    price: 2,
    category: 'Electronics',
    sellerId: '2',
    sellerName: 'Hakim69',
    sellerRating: 4.7,
    images: ['https://m.media-amazon.com/images/I/51mgZxXJWdL._UF1000,1000_QL80_.jpg'],
    location: 'Lyon, France',
    condition: 'Good',
    deliveryOptions: ['Pickup', 'Secure Delivery'],
    createdAt: '2025-01-14T15:30:00Z',
    bids: [
      { id: '1', amount: 3.25, bidderId: '3', bidderName: 'AnonymousLyonnais', timestamp: '2024-01-15T12:00:00Z' },
      { id: '2', amount: 3.5, bidderId: '4', bidderName: 'EthicalHacker', timestamp: '2024-01-15T14:00:00Z' }
    ],
    isAuction: true,
    auctionEndTime: '2025-01-20T20:00:00Z',
    isFavorite: false
  },
  {
    id: '3',
    title: 'ULTRA MEGA RARE LABUBU',
    description: 'Ultra rare Labubu ! Only 5 ever made !!!',
    price: 500,
    category: 'Collectibles',
    sellerId: '3',
    sellerName: 'LabubuHater',
    sellerRating: 4.8,
    images: ['https://images.lifestyleasia.com/wp-content/uploads/sites/2/2025/02/25161615/labubu-rarest-and-most-expensive-top-5-10-list-info-004-1024x1024.jpg'],
    location: 'Beijing, China',
    condition: 'New',
    deliveryOptions: ['Registered Mail', 'Secure Delivery'],
    createdAt: '2025-01-13T09:00:00Z',
    bids: [],
    isAuction: true,
    auctionEndTime: '2025-07-08T20:00:00Z',
    isFavorite: false
  },
  {
    id: '4',
    title: 'POKEMON GOLDEN TICKET',
    description: 'YEN BILL GOLDEN TICKET POKEMON FIGURE PIKACHU CARD COLLECTOR GOLD',
    price: 200,
    category: 'Collectibles',
    sellerId: '4',
    sellerName: 'Sacha',
    sellerRating: 4.9,
    images: ['https://i.ebayimg.com/images/g/jqsAAOSwv6Rgyv~-/s-l1200.jpg'],
    location: 'Texas, USA',
    condition: 'Excellent',
    deliveryOptions: ['Registered Mail', 'Pickup', 'Delivery', 'Secure Delivery'],
    createdAt: '2025-01-12T11:00:00Z',
    bids: [],
    isAuction: false,
    isFavorite: false
  },
  {
    id: '5',
    title: "Rare 'Ku Klux Klan' Kinder toy ",
    description: 'Kinder toy banned in the world.',
    price: 40,
    category: 'Collectibles',
    sellerId: '5',
    sellerName: 'KinderLover',
    sellerRating: 4.0,
    images: ['https://images-cdn.ubuy.com.eg/63548b4d99e3241a2b5aad5f-kinderino-with-blue-kkk-balloons-se301.jpg'],
    location: 'Caracas, Venezuela',
    condition: 'Used',
    deliveryOptions: ['Registered Mail', 'Delivery'],
    createdAt: '2025-04-08T20:00:00Z',
    bids: [],
    isAuction: false,
    isFavorite: false
  },
  {
    id: '6',
    title: "Tetris Atari arcade",
    description: 'Rare tetris arcade machine.',
    price: 50,
    category: 'Electronics',
    sellerId: '6',
    sellerName: 'Tetriminos',
    sellerRating: 3.2,
    images: ['https://i.ebayimg.com/images/g/LcoAAOSwR6ti7sW8/s-l1200.jpg'],
    location: 'Florida, USA',
    condition: 'Used',
    deliveryOptions: ['Registered Mail', 'Delivery'],
    createdAt: '2025-02-01T09:00:00Z',
    bids: [],
    isAuction: false,
    isFavorite: false
  },
  {
    id: '7',
    title: "MrBeast Feastables-chocolate-bar-crunch-small",
    description: 'MrBeast Feastables chocolate bar crunch small format',
    price: 4,
    category: 'Food',
    sellerId: '7',
    sellerName: 'MrBeast',
    sellerRating: 5.0,
    images: ['https://www.myamericanshop.com/cdn/shop/files/mr-beast-feastables-chocolate-bar-crunch-small-1230000168229-52882418401611.jpg?v=1711711576'],
    location: 'Texas, USA',
    condition: 'New',
    deliveryOptions: ['Registered Mail', 'Delivery'],
    createdAt: '2025-05-01T09:00:00Z',
    bids: [],
    isAuction: false,
    isFavorite: false
  },
  {
    id: '8',
    title: "Cosplay Master Chief",
    description: 'Cosplay de Master Chief en carton peint fait avec mon pote dans le sous-sol de ma baraque.',
    price: 15,
    category: 'Wearable',
    sellerId: '8',
    sellerName: 'HaloFan56',
    sellerRating: 5.0,
    images: ['https://i.etsystatic.com/53570092/r/il/42ab8c/6236191601/il_fullxfull.6236191601_t3te.jpg'],
    location: 'Morbihan, France',
    condition: 'New',
    deliveryOptions: ['Registered Mail', 'Delivery'],
    createdAt: '2025-07-01T09:00:00Z',
    bids: [],
    isAuction: false,
    isFavorite: false
  },
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