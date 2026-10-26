import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import VendorCard from './components/VendorCard.jsx';
import MenuList from './components/MenuList.jsx';
import Footer from './components/Footer.jsx';
import { Loading, ErrorMessage } from './components/Status.jsx';
import CartPage from './components/CartPage.jsx'; 

function App() {
  // 1. Data Fetching States
  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  // 2. Cart & View States
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('menu'); 
  const [lastOrder, setLastOrder] = useState(null); 

  // --- NEW FOR B6 FEATURE 3 (2418733) ---
  const [favorites, setFavorites] = useState([]); // Array of item IDs
  const [showFavOnly, setShowFavOnly] = useState(false); // Toggle state

  // 3. Fetch Effect  
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVendors(data);
        if (data && data.length > 0) setSelectedVendorId(data[0].id);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  // 4. Derived Values
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId);
  const cartCount = cart.reduce((n, line) => n + line.qty, 0);

  // --- NEW: Filter menu based on toggle ---
  const menuItems = selectedVendor?.menu || [];
  const filteredMenu = showFavOnly 
    ? menuItems.filter((item) => favorites.includes(item.id)) 
    : menuItems;

  // 5. Handlers
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existingLine = prev.find((line) => line.item.id === item.id);
      if (existingLine) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const handleChangeQty = (itemId, delta) => {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0) 
    );
  };

  const handleRemove = (itemId) => {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  };

  const handlePlaceOrder = (details) => {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);
    setLastOrder({ ...details, total });
    setCart([]);
    setView('done');
  };

  // --- NEW: Toggle favorite handler ---
  const handleToggleFavorite = (itemId) => {
    setFavorites((prev) => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    );
  };

  // 6. Rendering Logic
  let content;
  
  if (view === 'cart') {
    content = (
      <CartPage 
        cart={cart} 
        onChangeQty={handleChangeQty} 
        onRemove={handleRemove} 
        onPlaceOrder={handlePlaceOrder} 
      />
    );
  } else if (view === 'done') {
    content = (
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Order placed!</h2>
        <p>Thank you, <strong>{lastOrder?.name}</strong>.</p>
        <p>Pickup at: <strong>{lastOrder?.mahallah}</strong> at <strong>{lastOrder?.pickupTime}</strong></p>
        <p>Total paid: <strong>RM {lastOrder?.total.toFixed(2)}</strong></p>
        <button className="btn" onClick={() => setView('menu')} style={{ marginTop: '1rem' }}>
          Back to menu
        </button>
      </div>
    );
  } else if (loading) {
    content = <Loading />;
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={() => setReloadKey(k => k + 1)} />;
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        
        <section>
          {/* --- NEW: Toggle Checkbox --- */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
            <h2 className="section-title" style={{ margin: 0 }}>Menu: {selectedVendor?.name}</h2>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
              <input 
                type="checkbox" 
                checked={showFavOnly} 
                onChange={(e) => setShowFavOnly(e.target.checked)} 
                style={{ width: '18px', height: '18px' }}
              />
              Favourites only
            </label>
          </div>

          {/* Use filteredMenu instead of selectedVendor?.menu */}
          <MenuList 
            items={filteredMenu} 
            onAdd={handleAddToCart} 
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </section>
      </>
    );
  }

  return (
    <>
      <Header 
        cartCount={cartCount}
        onShowMenu={() => setView('menu')} 
        onShowCart={() => setView('cart')} 
      />
      <main className="container">
        {content}
      </main>
      <Footer />
    </>
  );
}

export default App;