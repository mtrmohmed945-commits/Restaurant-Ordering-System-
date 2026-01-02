import { useEffect, useState } from "react";

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
    <div style={{ padding: 30 }}>
      <h1>Your Orders</h1>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map(order => (
        <div key={order.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <h3>Order #{order.id}</h3>

          <p><b>Name:</b> {order.customer}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Total:</b> ${Number(order.total).toFixed(2)}</p>

          <h4>Items</h4>
          <ul>
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
