import MenuItemCard from './MenuItemCard.jsx';

function MenuList({ items }) {
  if (items.length === 0) {
    return <p className="muted" style={{ marginTop: '1rem' }}>No items found.</p>;
  }

  return (
    <div className="menu-grid">
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}

export default MenuList;