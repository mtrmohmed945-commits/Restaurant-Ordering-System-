import { useState } from "react";
import "../styles/OrderTracking.css";

export default function OrderTracking() {
  const [orders, setOrders] = useState([
    { id: 1, name: "Classic Burger", status: "Preparing" },
    { id: 2, name: "Crispy Fries", status: "Delivered" },
    { id: 3, name: "Chicken Nuggets", status: "On the way" },
  ]);

  const [newOrderName, setNewOrderName] = useState("");

  // Update order status
  const updateStatus = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === id) {
          const nextStatus =
            order.status === "Preparing"
              ? "On the way"
              : order.status === "On the way"
              ? "Delivered"
              : "Preparing";
          return { ...order, status: nextStatus };
        }
        return order;
      })
    );
  };

  // Add a new order
  const addOrder = (e) => {
    e.preventDefault();
    if (newOrderName.trim() === "") return;

    const newOrder = {
      id: orders.length ? orders[orders.length - 1].id + 1 : 1,
      name: newOrderName,
      status: "Preparing",
    };

    setOrders([...orders, newOrder]);
    setNewOrderName("");
  };

  return (
    <div className="tracking-container">
      <h1>Order Tracking</h1>

      <form className="add-order-form" onSubmit={addOrder}>
        <input
          type="text"
          placeholder="Enter order name"
          value={newOrderName}
          onChange={(e) => setNewOrderName(e.target.value)}
        />
        <button type="submit">Add Order</button>
      </form>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet!</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h2>{order.name}</h2>
              <p>
                Status:{" "}
                <span
                  className={`status ${order.status
                    .replace(" ", "-")
                    .toLowerCase()}`}
                >
                  {order.status}
                </span>
              </p>
              <button onClick={() => updateStatus(order.id)}>
                Update Status
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
