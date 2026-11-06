function Footer() {
  return (
    <footer className="footer">
      {/* &copy; = ©, &middot; = ·  new Date().getFullYear() = current year */}
      <p>&copy; {new Date().getFullYear()} CampusEats &middot; BICS 3301, IIUM</p>
    </footer>
  );
}
export default Footer;

// ============================================================
// SUMMARY
// ============================================================
// The bottom copyright line with the current year calculated
// automatically. Think of it as the small print at the bottom.
// ============================================================