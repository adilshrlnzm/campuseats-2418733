// Link for the empty-state / back button
import { Link } from 'react-router';
// useCart - read the orders array
import { useCart } from '../hooks/useCart';

function OrdersPage() {
  // orders = array of { name, mahallah, pickupTime, cart, total, date }
  const { orders } = useCart();

  // Empty state
  if (orders.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>No orders yet</h2>
        <Link to="/">Go to menu</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="section-title">My Orders</h2>
      <ul className="order-list">
        {/* One card per order. index as key is fine (orders never reorder). */}
        {orders.map((order, index) => (
          <li key={index} className="card" style={{ marginBottom: '1rem' }}>
            <h3>Order #{index + 1}</h3>
            {/* Pickup details */}
            <p className="muted">Pickup at: {order.mahallah} at {order.pickupTime}</p>
            {/* Total */}
            <p className="price">Total: RM {order.total.toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <Link to="/" className="btn">Back to Menu</Link>
    </div>
  );
}

export default OrdersPage;

// ============================================================
// SUMMARY
// ============================================================
// Shows a list of past orders (mahallah, pickup time, total).
// Shows "No orders yet" if the list is empty. Data comes from
// the orders array in context (persisted via localStorage).
// Think of it as your order history.
// ============================================================