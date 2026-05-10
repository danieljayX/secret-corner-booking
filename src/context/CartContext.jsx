import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('food-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('food-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (food, quantity = 1, size = 'Regular', addons = []) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === food.id && item.size === size && JSON.stringify(item.addons) === JSON.stringify(addons));
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...food, quantity, size, addons }];
    });
  };

  const updateQuantity = (index, delta) => {
    setCart(prev => {
      const newCart = [...prev];
      newCart[index].quantity += delta;
      if (newCart[index].quantity <= 0) {
        newCart.splice(index, 1);
      }
      return newCart;
    });
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, clearCart, total, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}
