import React, { createContext, useContext, useEffect, useState } from 'react';


export interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}


interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  
  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(prevItem => prevItem.id === item.id);
      if (existingItem) {
        return prevItems.map(prevItem =>
          prevItem.id === item.id ? { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

 
  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems =>
      prevItems.map(prevItem =>
        prevItem.id === itemId ? { ...prevItem, quantity: prevItem.quantity - 1 } : prevItem
      ).filter(prevItem => prevItem.quantity > 0)
    );
  };

  
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
