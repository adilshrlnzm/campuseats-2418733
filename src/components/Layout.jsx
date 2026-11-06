// Outlet renders whichever child route matched (Home, Cart, etc.)
import { Outlet } from 'react-router';
// Shared chrome
import Header from './Header';
import Footer from './Footer';

// The shared "shell" every page uses
function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        {/* Child routes render inside Outlet */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;

// ============================================================
// SUMMARY
// ============================================================
// The page frame: Header on top, <Outlet /> (current page) in the
// middle, Footer at the bottom. Every route in App.jsx is nested
// inside this Layout so the chrome appears on every page.
// Think of it as a picture frame — the photo inside changes,
// the frame stays.
// ============================================================