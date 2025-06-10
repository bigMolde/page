import { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('jump_comics_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jump_comics_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1) => {
    // 単品限購10個チェック
    const existingItem = cartItems.find(item => item.product.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    
    if (currentQuantity + quantity > 10) {
      alert('申し訳ございません。この商品は1人10個までの限定販売となっております。');
      return false;
    }

    // 在庫チェック
    if (product.stock_quantity < quantity) {
      alert('申し訳ございません。在庫が不足しています。');
      return false;
    }

    setCartItems(prevItems => {
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });

    return true;
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    // 限購10個チェック
    if (quantity > 10) {
      alert('申し訳ございません。この商品は1人10個までの限定販売となっております。');
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // 配送期別に分ける（異なる配送期の商品は分単が必要）
  const getGroupedByShipping = () => {
    const groups: { [key: string]: CartItem[] } = {};
    
    cartItems.forEach(item => {
      const shippingKey = item.product.status === 'preorder' 
        ? `preorder_${item.product.release_date}` 
        : 'normal';
      
      if (!groups[shippingKey]) {
        groups[shippingKey] = [];
      }
      groups[shippingKey].push(item);
    });

    return groups;
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    getGroupedByShipping,
  };
};