// NavLink - like Link but adds an "active" class when URL matches
import { NavLink } from 'react-router';
// useCart gives the live cart count for the badge
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'


function Header() {
  // Pull count from context (auto re-renders when cart changes)
  const { count } = useCart();
  const { user, logout } = useAuth()
const navigate = useNavigate()

async function handleLogout() {
 await logout()
 navigate('/')
}

  return (
    <header className="header">
      {/* Logo is a NavLink to home */}
      <h1 className="logo"><NavLink to="/" className="logo-link">CampusEats</NavLink></h1>
      <nav className="nav">
        {/* "end" means "/" only active for exactly "/" */}
        <NavLink to="/" end className="link">Vendors</NavLink>
        <NavLink to="/favourites" className="link">Favourites</NavLink>
        {/* Cart link with live badge */}
        <NavLink to="/cart" className="link">Cart <span className="badge">{count}</span></NavLink>
        {user ? (
        <>
        <span className="user-name">Hi, {user.displayName || user.email}</span>
        <button type="button" className="link" onClick={handleLogout}>Log out</button>
        </>
        ) : (
        <NavLink to="/login">Log in</NavLink>
        )} 
        <NavLink to="/orders" className="link">Orders</NavLink>
      </nav>
    </header>
  );
}

export default Header;

// ============================================================
// SUMMARY
// ============================================================
// The top navigation bar: logo + 4 links (Vendors, Favourites,
// Cart, Orders). The Cart link shows a live badge with the item
// count taken from context. NavLink auto-underlines the current page.
// Think of it as the app's navigation bar.
// ============================================================