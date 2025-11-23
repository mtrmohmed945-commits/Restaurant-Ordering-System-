import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import OrderTracking from "./pages/OrderTracking";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navbar from "./components/Navbar";

function App() {
  return (
     <GlobalProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderTracking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    </GlobalProvider>
  );
}

export default App;
