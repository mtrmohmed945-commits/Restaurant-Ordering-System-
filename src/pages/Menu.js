import { useState } from "react";
import "../styles/Menu.css";

import burger from "../assets/burger.jpg";
import fries from "../assets/fries.jpg";
import nuggets from "../assets/nuggets.jpg";
import pizza from "../assets/pizza.jpg";
import cola from "../assets/cola.jpg";

export default function Menu() {
  const [cart, setCart] = useState([]);

  const menuItems = [
    { id: 1, name: "Classic Burger", price: 8.99, desc: "Juicy beef patty with lettuce, tomato, and cheese.", img: burger },
    { id: 2, name: "Crispy Fries", price: 3.49, desc: "Golden, crunchy, and perfectly salted.", img: fries },
    { id: 3, name: "Chicken Nuggets", price: 5.99, desc: "6-piece crispy chicken nuggets with sauce.", img: nuggets },
    { id: 4, name: "Cheese Pizza Slice", price: 4.5, desc: "Hot cheesy goodness with soft crust.", img: pizza },
    { id: 5, name: "Cola Drink", price: 1.99, desc: "Refreshing cold soda.", img: cola }
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="menu-container">
      <h1>Our Menu</h1>

      
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div className="menu-card" key={item.id}>
            <img src={item.img} alt={item.name} className="menu-img" />

            <h2>{item.name}</h2>
            <p className="menu-desc">{item.desc}</p>
            <p className="menu-price">${item.price.toFixed(2)}</p>

            <button className="menu-btn" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* MINI CART */}
      {cart.length > 0 && (
        <div className="cart-box">
          <h2>Your Cart ({cart.length})</h2>

          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.img} alt={item.name} className="cart-img" />

              <div className="cart-info">
                <p className="cart-name">{item.name}</p>
                <p className="cart-desc">{item.desc}</p>
              </div>

              <span className="cart-price">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
