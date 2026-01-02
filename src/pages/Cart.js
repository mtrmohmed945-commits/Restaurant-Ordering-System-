import "../styles/Cart.css";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, setCart } = useContext(GlobalContext);
  const navigate = useNavigate();

  const increaseQty = (id) => {
    setCart(cart.map(i =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(i =>
      i.id === id && i.quantity > 1
        ? { ...i, quantity: i.quantity - 1 }
        : i
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(i => i.id !== id));
  };

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity, 0
  ).toFixed(2);

 const checkout = async () => {

  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify({
      items: cart,
      total: Number(total)
    })
  });

  if (!res.ok) {
    alert("checkout failed");
    return;
  }

  setCart([]);
  navigate("/order-tracking");
};

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-card">
              <h2>{item.name}</h2>
              <p>${item.price}</p>

              <div className="qty-box">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}

          <h2>Total: ${total}</h2>
          <button onClick={checkout}>Checkout</button>
        </>
      )}
    </div>
  );
}
