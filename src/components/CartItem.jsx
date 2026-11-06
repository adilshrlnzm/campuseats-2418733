function CartItem({ line, onChangeQty, onRemove }) {
  const { item, qty } = line;

  return (
    <li className="cart-line-modern">
      
      {/* 1. The Food Picture */}
      <div className="cart-image-wrapper">
        {item.image ? (
          <img src={item.image} alt={item.name} className="cart-image" />
        ) : (
          <div className="cart-image-placeholder">{item.name.charAt(0)}</div>
        )}
      </div>

      {/* 2. Name and Price */}
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="muted">RM {item.price.toFixed(2)} each</p>
        <p className="cart-item-total">RM {(item.price * qty).toFixed(2)}</p>
      </div>

      {/* 3. Convenient Controls */}
      <div className="cart-item-actions">
        
        {/* Grouped Quantity Stepper */}
        <div className="qty-stepper">
          <button type="button" onClick={() => onChangeQty(item.id, -1)}>-</button>
          <span>{qty}</span>
          <button type="button" onClick={() => onChangeQty(item.id, 1)}>+</button>
        </div>

        {/* Clean Remove Button */}
        <button type="button" className="remove-btn" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>

    </li>
  );
}

export default CartItem;