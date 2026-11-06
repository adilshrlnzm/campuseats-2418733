// createContext - creates a Context object for sharing state across the tree
import { createContext } from 'react';

// Create the context with `null` as default.
// Components call useContext(CartContext) to read what the Provider gives.
export const CartContext = createContext(null);

// ============================================================
// SUMMARY
// ============================================================
// Creates the "shared box" (Context) where cart/orders/favourites
// will live. It's just an empty box with a name — the actual data
// is put inside by CartProvider.jsx.
// Think of it as an empty box waiting to be filled.
// ============================================================