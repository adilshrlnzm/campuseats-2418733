// Custom hook that fetches the vendor list
import { useVendors } from '../hooks/useVendors';
// Card component for each vendor
import VendorCard from '../components/VendorCard';
// Loading and Error components
import { Loading, ErrorMessage } from '../components/Status';

function HomePage() {
  const { vendors, loading, error, reload } = useVendors();

  // Early return #1 - loading state
  if (loading) return <Loading />;
  // Early return #2 - error state with retry button
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <section>
      <h2 className="section-title">Choose a vendor</h2>
      <div className="vendor-grid">
        {/* .map() over vendors → one VendorCard per vendor.
            key = vendor.id is REQUIRED for React. */}
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;

// ============================================================
// SUMMARY
// ============================================================
// Home page: fetches all vendors and shows a VendorCard for each.
// Handles loading (spinner) and error (retry button) states with
// early returns. Think of it as the directory of restaurants.
// ============================================================