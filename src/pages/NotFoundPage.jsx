// Link for the "go home" button
import { Link } from 'react-router';

function NotFoundPage() {
  return (
    // Centered card with a 404 message
    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>404 - Page Not Found</h2>
      {/* Styled as a button but implemented as a Link */}
      <Link to="/" className="btn" style={{ display: 'inline-block', marginTop: '1rem' }}>Go back home</Link>
    </div>
  );
}

export default NotFoundPage;

// ============================================================
// SUMMARY
// ============================================================
// The 404 page for any unmatched URL. Shows a message and a
// "Go back home" link. Used by the catch-all "*" route in App.jsx.
// Think of it as the "wrong turn" sign.
// ============================================================