import { useEffect, useState } from "react";
import "../styles/OrderTracking.css";

export default function OrderTracking() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setOrders(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="order-container">
      <h1>Your Orders</h1>

      {orders.length === 0 && (
        <p className="order-empty">No orders yet</p>
      )}

      {orders.map(order => (
        <div key={order.id} className="order-card">
          <h3>Order #{order.id}</h3>

          <div className="order-info">
            <p><b>Name:</b> {order.customer}</p>
            <p>
              <span className={`order-status status-${order.status}`}>
                {order.status}
              </span>
            </p>
            <p><b>Total:</b> ${Number(order.total).toFixed(2)}</p>
          </div>

          <h4>Items</h4>
          <ul className="order-items">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.name} — Qty {item.quantity} — ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
