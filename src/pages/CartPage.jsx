import { useNavigate } from 'react-router';
import CartItem from '../components/CartItem';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../hooks/useCart';

function CartPage() {
  const navigate = useNavigate();
  const { cart, changeQty, removeFromCart, total, placeOrder } = useCart();

  const handlePlaceOrder = (details) => {
    placeOrder(details);
    navigate('/orders');
  };

  if (cart.length === 0) {
    return <p className="muted">Your cart is empty. Pick something from a menu first.</p>;
  }

  return (
    // This wrapper limits the width and centers the merged card
    <div className="cart-merged-container">
      <div className="card cart-merged-card">
        
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Your Order</h2>

        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem
              key={line.item.id}
              line={line}
              onChangeQty={changeQty}
              onRemove={removeFromCart}
            />
          ))}
        </ul>
        
        <p className="cart-total">Total: RM {total.toFixed(2)}</p>
        
        {/* The Divider Line */}
        <hr className="cart-divider" />
        
        {/* Form now sits perfectly underneath the items */}
        <CheckoutForm onPlaceOrder={handlePlaceOrder} />
        
      </div>
    </div>
  );
}

export default CartPage;