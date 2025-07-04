import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  walletAddress: string;
  location?: string;
  phone?: string;
  rating: number;
  isAdmin: boolean;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isConnected: boolean;
  login: (userData: Partial<User>) => void;
  logout: () => void;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    // Simulate wallet connection
    const mockUser: User = {
      id: '1',
      username: 'crypto_trader',
      email: 'trader@example.com',
      walletAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      location: 'Paris, France',
      rating: 4.8,
      isAdmin: false,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'
    };
    
    setUser(mockUser);
    setIsConnected(true);
  };

  const disconnectWallet = () => {
    setUser(null);
    setIsConnected(false);
  };

  const login = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  const logout = () => {
    setUser(null);
    setIsConnected(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isConnected,
      login,
      logout,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </AuthContext.Provider>
  );
};