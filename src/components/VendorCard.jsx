// Link - client-side navigation (no full page reload)
import { Link } from 'react-router';

function VendorCard({ vendor }) {
  return (
    // Whole card links to that vendor's menu page
    <Link to={`/vendor/${vendor.id}`} className="card vendor-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      {/* Thumbnail: image if provided, otherwise first letter of name */}
      <div className="thumb">
        {vendor.image ? <img src={vendor.image} alt={vendor.name} className="thumb-img" /> : vendor.name.charAt(0)}
      </div>
      <div>
        {/* Name, location, hours */}
        <h3>{vendor.name}</h3>
        <p className="muted">{vendor.location}</p>
        <p className="muted">Open: {vendor.openHours}</p>
      </div>
    </Link>
  );
}
export default VendorCard;

// ============================================================
// SUMMARY
// ============================================================
// One clickable card per vendor: image, name, location, hours.
// Clicking navigates to /vendor/:id so you see that vendor's menu.
// Think of it as a restaurant sign on the street.
// ============================================================