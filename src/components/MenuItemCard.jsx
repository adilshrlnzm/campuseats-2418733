
function MenuItemCard({ item, onAdd, isFavorite, onToggleFavorite }) {
  return (
    <article className="card menu-card" style={{ position: 'relative' }}>
      {/* Heart Button uses the props passed from App.jsx */}
      <button
        onClick={() => onToggleFavorite(item.id)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          padding: '0',
          zIndex: 10,
          color: isFavorite ? 'red' : '#555' // use red color
        }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      <div className="thumb" aria-hidden="true">
        {item.image ? (
          <img src={item.image} alt={item.name} className="thumb-img" />
        ) : (
          item.name.charAt(0)
        )}
      </div>
        
      <p className="tag">{item.category}</p>
      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>
      
      <button className="btn" disabled={!item.available} onClick={() => onAdd(item)}>
        {item.available ? 'Add to cart' : 'Sold out'}
      </button>
    </article>
  );
}

export default MenuItemCard;