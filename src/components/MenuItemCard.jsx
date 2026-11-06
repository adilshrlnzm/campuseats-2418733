import { useState } from 'react';
import { useCart } from '../hooks/useCart';

function MenuItemCard({ item }) {
  const { addToCart, favorites, toggleFavorite } = useCart();
  const isFav = favorites.includes(item.id);

  const [isAdded, setIsAdded] = useState(false);

  const handleAddClick = () => {
    if (!item.available) return;
    
    addToCart(item);        
    setIsAdded(true);       
    
    setTimeout(() => {
      setIsAdded(false);
    }, 500);
  };

  return (
    <div className="card">
      
      <div className="center-image-wrapper">
        {item.image ? (
          <img src={item.image} alt={item.name} className="huge-menu-image" />
        ) : (
          <div className="huge-menu-placeholder">{item.name.charAt(0)}</div>
        )}
      </div>

      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>

      <button
        type="button"
        className="pop-heart-btn"
        onClick={() => toggleFavorite(item.id)}
      >
        {isFav ? '❤️ Favourited' : '🤍 Favourite'}
      </button>

      {/* This line changes the text to "Added" */}
      <button
        type="button"
        className={`btn-outline ${isAdded ? 'btn-added' : ''}`}
        disabled={!item.available}
        onClick={handleAddClick}
      >
        {isAdded ? 'Added' : (item.available ? 'Add to cart' : 'Unavailable')}
      </button>
    </div>
  );
}

export default MenuItemCard;