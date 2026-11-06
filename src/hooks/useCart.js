// useContext reads the current context value
import { useContext } from 'react';
// The context object
import { CartContext } from '../context/cart-context';

// Custom hook - a tiny wrapper around useContext with a safety check
export function useCart() {
  const context = useContext(CartContext);
  // If context is null → component is outside CartProvider → throw helpful error
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  // Return the context value (cart, orders, addToCart, etc.)
  return context;
}

// ============================================================
// SUMMARY
// ============================================================
// A shortcut to read the shared cart data:
//   const { cart, addToCart } = useCart();
// Throws a friendly error if you forgot to wrap your app in
// <CartProvider>. Think of it as the delivery door to the warehouse.
// ============================================================