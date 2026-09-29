import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, name: 'INR' },
  USD: { symbol: '$', rate: 0.012, name: 'USD' },
  EUR: { symbol: '€', rate: 0.011, name: 'EUR' },
  GBP: { symbol: '£', rate: 0.0095, name: 'GBP' },
  AED: { symbol: 'AED ', rate: 0.044, name: 'AED' },
};

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('atelier_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState('INR');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBespokeOpen, setIsBespokeOpen] = useState(false);
  const [bespokeProduct, setBespokeProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const openBespoke = (product = null) => {
    setBespokeProduct(product || selectedProduct);
    setIsBespokeOpen(true);
  };

  useEffect(() => {
    localStorage.setItem('atelier_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('atelier_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product, selectedColor, selectedSize, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && 
                item.selectedColor?.name === (selectedColor?.name || product.colors[0]?.name) &&
                item.selectedSize === (selectedSize || product.sizes[0])
      );

      const color = selectedColor || product.colors[0];
      const size = selectedSize || product.sizes[0];

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, {
          ...product,
          selectedColor: color,
          selectedSize: size,
          quantity,
          cartItemId: `${product.id}-${color.name}-${size}-${Date.now()}`
        }];
      }
    });

    showToast(`Added "${product.name}" to your Atelier Bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist`);
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Saved to Wishlist`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const formatPrice = (inrPrice) => {
    const cur = CURRENCIES[currency] || CURRENCIES.INR;
    const converted = Math.round(inrPrice * cur.rate);
    return `${cur.symbol}${converted.toLocaleString()}`;
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const clearCart = () => setCart([]);

  return (
    <ShopContext.Provider value={{
      cart,
      wishlist,
      currency,
      setCurrency,
      currencies: CURRENCIES,
      formatPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      isCartOpen,
      setIsCartOpen,
      isWishlistOpen,
      setIsWishlistOpen,
      isSearchOpen,
      setIsSearchOpen,
      isBespokeOpen,
      setIsBespokeOpen,
      bespokeProduct,
      openBespoke,
      selectedProduct,
      setSelectedProduct,
      cartTotal,
      cartCount,
      toastMessage,
      showToast
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
}
