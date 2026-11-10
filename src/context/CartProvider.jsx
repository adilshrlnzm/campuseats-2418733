import { useLocalStorage } from '../hooks/useLocalStorage';
import { CartContext } from './cart-context';
import { useAuth } from '../hooks/useAuth'; // Import useAuth

export function CartProvider({ children }) {
  const { user } = useAuth(); // Get the logged-in user
  const isGuest = !user; // Check if they are a guest

  // Generate keys ending in user.uid (or 'guest' if not logged in)
  const cartKey = user ? `ce-cart-${user.uid}` : 'ce-cart-guest';
  const ordersKey = user ? `ce-orders-${user.uid}` : 'ce-orders-guest';
  const favsKey = user ? `ce-favs-${user.uid}` : 'ce-favs-guest';

  // Pass isGuest to skipSave
  const [cart, setCart] = useLocalStorage(cartKey, [], isGuest);
  const [orders, setOrders] = useLocalStorage(ordersKey, [], isGuest);
  const [favorites, setFavorites] = useLocalStorage(favsKey, [], isGuest);

  const count = cart.reduce((n, line) => n + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const changeQty = (itemId, delta) => {
    setCart((prev) =>
      prev.map((line) =>
        line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
      ).filter((line) => line.qty > 0)
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  };

  const placeOrder = (details) => {
    const newOrder = { ...details, cart: [...cart], total, date: new Date().toISOString() };
    setOrders((prev) => [...prev, newOrder]);
    setCart([]);
    return newOrder;
  };

  const toggleFavorite = (itemId) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, orders, count, total, addToCart, changeQty, removeFromCart, placeOrder, favorites, toggleFavorite }}
    >
      {children}
    </CartContext.Provider>
  );
}