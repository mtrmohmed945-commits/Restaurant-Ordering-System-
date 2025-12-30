import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null
  });
  const [editingId, setEditingId] = useState(null);

  // Load menu from backend
  const loadMenu = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/menu");
      const data = await res.json();
      if (Array.isArray(data)) setMenu(data);
    } catch (err) {
      console.error(err);
      setMenu([]);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  // Handle file input
  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // Create or Update item
  const submitItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", Number(form.price));
    if (form.image) formData.append("image", form.image);

    const url = editingId
      ? `http://localhost:5000/api/menu/${editingId}`
      : "http://localhost:5000/api/menu";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, { method, body: formData });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Failed to save item");
      return;
    }

    setForm({ name: "", description: "", price: "", image: null });
    setEditingId(null);
    loadMenu();
  };

  // Delete item
  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/api/menu/${id}`, { method: "DELETE" });
    loadMenu();
  };

  // Edit item
  const editItem = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      image: null // new image optional
    });
    setEditingId(item.id); // store the id to update
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin – Menu Manager</h1>

      <form onSubmit={submitItem} encType="multipart/form-data">
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

        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit">{editingId ? "Update Item" : "Add Item"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", description: "", price: "", image: null });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2>Current Menu</h2>

      {menu.length === 0 ? (
        <p>No items yet</p>
      ) : (
        menu.map((item) => (
          <div key={item.id} style={{ marginBottom: "10px" }}>
            <strong>{item.name}</strong> — ${Number(item.price).toFixed(2)}
            {item.image && (
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
                style={{ width: "50px", marginLeft: "10px" }}
              />
            )}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => deleteItem(item.id)}
            >
              Delete
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => editItem(item)}
            >
              Edit
            </button>
          </div>
        ))
      )}
    </div>
  );
}
