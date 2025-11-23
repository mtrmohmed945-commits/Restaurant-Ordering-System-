import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <GlobalContext.Provider value={{ cart, setCart, orders, setOrders }}>
      {children}
    </GlobalContext.Provider>
  );
}
