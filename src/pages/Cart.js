import "../styles/Cart.css";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, setCart, orders, setOrders } = useContext(GlobalContext);
  const navigate = useNavigate();

  const increaseQty = (id) => {
    setCart(
      cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map(item =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const checkout = () => {
    if (cart.length === 0) return;

    const newOrders = cart.map(item => ({
      id: Date.now() + Math.random(),
      name: item.name,
      status: "Preparing"
    }));

    setOrders([...orders, ...newOrders]);
    setCart([]); // empty cart
    navigate("/order-tracking");
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p className="empty">Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
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

                <button className="remove-btn" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h2>Total: ${total}</h2>
            <button className="checkout-btn" onClick={checkout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
