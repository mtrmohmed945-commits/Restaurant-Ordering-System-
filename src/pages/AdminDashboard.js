import { useState, useEffect } from "react";
import "../styles/AdminDashboard.css"; // ✅ FIXED IMPORT

export default function AdminDashboard() {
  /* ================= MENU ================= */
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null
  });
  const [editingId, setEditingId] = useState(null);

  /* ================= ORDERS ================= */
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);

  /* ================= LOADERS ================= */
  const loadMenu = async () => {
    const res = await fetch("http://localhost:5000/api/menu");
    setMenu(await res.json());
  };

  const loadOrders = async () => {
    const res = await fetch("http://localhost:5000/api/admin/orders");
    setOrders(await res.json());
  };

  const loadMessages = async () => {
    const res = await fetch("http://localhost:5000/api/contact");
    setMessages(await res.json());
  };

  useEffect(() => {
    loadMenu();
    loadOrders();
    loadMessages();
  }, []);

  /* ================= MENU ACTIONS ================= */
  const submitItem = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));

    const url = editingId
      ? `http://localhost:5000/api/menu/${editingId}`
      : "http://localhost:5000/api/menu";

    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      body: fd
    });

    setForm({ name: "", description: "", price: "", image: null });
    setEditingId(null);
    loadMenu();
  };

  const deleteMenuItem = async (id) => {
    if (!window.confirm("Delete menu item?")) return;
    await fetch(`http://localhost:5000/api/menu/${id}`, { method: "DELETE" });
    loadMenu();
  };

  /* ================= ORDER ACTIONS ================= */
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/admin/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    loadOrders();
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete order?")) return;
    await fetch(`http://localhost:5000/api/admin/orders/${id}`, {
      method: "DELETE"
    });
    loadOrders();
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      {/* ================= MENU ================= */}
      <section className="admin-section">
        <h2>Menu Management</h2>

        <form className="menu-form" onSubmit={submitItem} encType="multipart/form-data">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <input
            type="file"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />

          <button className="primary-btn">
            {editingId ? "Update Item" : "Add Item"}
          </button>
        </form>

        <div className="menu-list">
          {menu.map((item) => (
            <div key={item.id} className="menu-item">
              <span>
                <strong>{item.name}</strong> — ${item.price}
              </span>

              <div className="actions">
                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setForm({
                      name: item.name,
                      description: item.description,
                      price: item.price,
                      image: null
                    });
                  }}
                >
                  Edit
                </button>

                <button className="danger-btn" onClick={() => deleteMenuItem(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ORDERS ================= */}
      <section className="admin-section">
        <h2>Orders Management</h2>

        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order #{order.id}</h3>
            <p><b>Customer:</b> {order.customer || "Guest"}</p>
            <p><b>Total:</b> ${order.total}</p>

            <select
              value={order.status}
              onChange={(e) => updateStatus(order.id, e.target.value)}
            >
              <option>Pending</option>
              <option>Preparing</option>
              <option>Ready</option>
              <option>Delivered</option>
            </select>

            <ul>
              {order.items.map((i, idx) => (
                <li key={idx}>
                  {i.name} × {i.quantity}
                </li>
              ))}
            </ul>

            <button className="danger-btn" onClick={() => deleteOrder(order.id)}>
              Delete Order
            </button>
          </div>
        ))}
      </section>

      {/* ================= CONTACT ================= */}
      <section className="admin-section">
        <h2>Contact Messages</h2>

        {messages.map((msg) => (
          <div key={msg.id} className="contant-card">
            <p><b>Name:</b> {msg.name}</p>
            <p><b>Email:</b> {msg.email}</p>
            <p>{msg.message}</p>

            <button
              className="danger-btn"
              onClick={async () => {
                await fetch(`http://localhost:5000/api/contact/${msg.id}`, {
                  method: "DELETE"
                });
                loadMessages();
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
