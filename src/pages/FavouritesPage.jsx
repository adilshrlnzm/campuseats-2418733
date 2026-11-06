// useCart → read favourites array
import { useCart } from '../hooks/useCart';
// useVendors → fetch vendors (to look up the actual items)
import { useVendors } from '../hooks/useVendors';
// Reuse MenuItemCard for each favourite
import MenuItemCard from '../components/MenuItemCard';
// Loading / Error components
import { Loading, ErrorMessage } from '../components/Status';

function FavouritesPage() {
  // favourites = array of item IDs (not full items)
  const { favorites } = useCart();
  // Fetch vendors to look up the real item objects
  const { vendors, loading, error, reload } = useVendors();

  // Loading / error guards
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  // 1. flatten every vendor's menu into one array
  const allItems = vendors.flatMap((vendor) => vendor.menu || []);

  // 2. Keep only items whose id is in favorites
  const favoriteItems = allItems.filter((item) => favorites.includes(item.id));

  return (
    <div>
      <h2 className="section-title">My Favourites</h2>

      {/* Empty state vs list */}
      {favoriteItems.length === 0 ? (
        <p className="muted">You haven't hearted any food yet!</p>
      ) : (
        <div className="menu-grid">
          {favoriteItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavouritesPage;

// ============================================================
// SUMMARY
// ============================================================
// Collects every menu item from every vendor (flatMap), keeps only
// the ones in the favourites list, and shows them as MenuItemCards.
// Shows "You haven't hearted any food yet!" if the list is empty.
// Think of it as your "saved for later" board.
// ============================================================