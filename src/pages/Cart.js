import { useState } from "react";
import "../styles/Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Classic Burger",
      desc: "Juicy beef patty with lettuce, tomato, and cheese.",
      price: 8.99,
      img: "/assets/burger.jpg",
      quantity: 1
    },
    {
      id: 2,
      name: "Crispy Fries",
      desc: "Golden, crunchy, and perfectly salted.",
      price: 3.49,
      img: "/assets/fries.jpg",
      quantity: 2
    }
  ]);

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p className="empty">Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>
                <img src={item.img} alt={item.name} className="cart-img" />

                <div className="cart-info">
                  <h2>{item.name}</h2>
                  <p className="cart-desc">{item.desc}</p>
                  <p className="cart-price">${item.price}</p>

                  <div className="qty-box">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h2>Total: ${total}</h2>
            <button className="checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
