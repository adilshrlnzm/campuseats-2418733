// useLocalStorage - custom hook that syncs a state value to localStorage
import { useLocalStorage } from '../hooks/useLocalStorage';
// The context object we created earlier
import { CartContext } from './cart-context';

// CartProvider wraps the app and shares cart/orders/favourites to all children
export function CartProvider({ children }) {
  // cart = array of { item, qty } lines (persisted)
  const [cart, setCart] = useLocalStorage('campus-cart', []);
  // orders = array of placed orders (persisted)
  const [orders, setOrders] = useLocalStorage('campus-orders', []);
  // favorites = array of item IDs the user hearted (persisted)
  const [favorites, setFavorites] = useLocalStorage('campus-favorites', []);

  // Total number of items (sum of qty) - for the header badge
  const count = cart.reduce((n, line) => n + line.qty, 0);
  // Total money (price * qty for every line)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  // Add item (or bump qty if it's already in the cart)
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        // Found → increment qty on that line
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        );
      }
      // Not found → append a new line with qty 1
      return [...prev, { item, qty: 1 }];
    });
  };

  // Change qty by delta (+1 or -1). Removes line if qty hits 0.
  const changeQty = (itemId, delta) => {
    setCart((prev) =>
      prev
        // Update the matching line's qty
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        // Remove any line whose qty became 0
        .filter((line) => line.qty > 0)
    );
  };

  // Remove a whole line (regardless of qty)
  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  };

  // Turn the cart into a stored order, then clear the cart
  const placeOrder = (details) => {
    // Snapshot the cart + total + timestamp + form details
    const newOrder = { ...details, cart: [...cart], total, date: new Date().toISOString() };
    // Append to orders array (persisted)
    setOrders((prev) => [...prev, newOrder]);
    // Empty the cart
    setCart([]);
    // Return it so caller could use it if needed
    return newOrder;
  };

  // Add or remove an item id from favourites
  const toggleFavorite = (itemId) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)   // Already → remove
        : [...prev, itemId]                  // Not yet → add
    );
  };

  // The value object every consumer gets from useContext(CartContext)
  return (
    <CartContext.Provider
      value={{ cart, orders, count, total, addToCart, changeQty, removeFromCart, placeOrder, favorites, toggleFavorite }}
    >
      {children} {/* Render whatever is nested inside */}
    </CartContext.Provider>
  );
}

// ============================================================
// SUMMARY
// ============================================================
// The brain of the shared state. Holds cart, orders, favourites and
// gives you functions to change them (addToCart, changeQty, removeFromCart,
// placeOrder, toggleFavorite). Saves everything to localStorage so it
// survives page refresh. Think of it as the warehouse: it stores the goods
// and the workers who move them.
// ============================================================