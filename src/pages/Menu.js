import { useState, useEffect, useContext } from "react";
import "../styles/Menu.css";
import { GlobalContext } from "../context/GlobalContext";

export default function Menu() {
  const { cart, setCart } = useContext(GlobalContext);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMenu(data);
        } else {
          console.error("Menu API error:", data);
          setMenu([]);
        }
      });
  }, []);

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  return (
<div className="menu-grid">
  {menu.map((item) => (
    <div className="menu-card" key={item.id}>
      {item.image && (
        <img
          src={`http://localhost:5000/uploads/${item.image}`}
          alt={item.name}
          className="menu-img"
        />
      )}
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>${Number(item.price).toFixed(2)}</p>
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  ))}
</div>
  )
}
