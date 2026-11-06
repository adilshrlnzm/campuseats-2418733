// useState - for the "favourites only" toggle
import { useState } from 'react';
// useParams reads ":id" from URL. Link for navigation.
import { useParams, Link } from 'react-router';
// useVendors fetches vendors. useCart reads favourites.
import { useVendors } from '../hooks/useVendors';
import { useCart } from '../hooks/useCart';
// MenuList renders the grid of items
import MenuList from '../components/MenuList';
// Loading / Error components
import { Loading, ErrorMessage } from '../components/Status';

function VendorPage() {
  // Grab id from URL, e.g. /vendor/abc → id="abc"
  const { id } = useParams();
  const { vendors, loading, error, reload } = useVendors();
  const { favorites } = useCart();

  // Local state for the checkbox
  const [showFavOnly, setShowFavOnly] = useState(false);

  // Loading / error guards
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  // Find the vendor whose id matches the URL
  const vendor = vendors.find((v) => v.id === id);

  // If no match → friendly message
  if (!vendor) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>Vendor not found</h2>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  // Safety net: treat missing menu as empty array
  const menuItems = vendor.menu || [];
  // If checkbox on, keep only favourited items; else show all
  const filteredMenu = showFavOnly
    ? menuItems.filter((item) => favorites.includes(item.id))
    : menuItems;

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>Menu: {vendor.name}</h2>

        {/* Controlled checkbox - checked mirrors state, onChange updates it */}
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

      {/* Pass the (possibly filtered) menu to MenuList */}
      <MenuList items={filteredMenu} />
    </section>
  );
}

export default VendorPage;

// ============================================================
// SUMMARY
// ============================================================
// One vendor's menu page. Reads :id from the URL, finds that
// vendor in the vendors list, and shows their menu via MenuList.
// A checkbox lets the user show only favourites. Think of it as
// one restaurant's menu page.
// ============================================================