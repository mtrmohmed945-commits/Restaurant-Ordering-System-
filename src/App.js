import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import OrderTracking from "./pages/OrderTracking";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
     <GlobalProvider>
    <Router>
      <Navbar />
     <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  <Route path="/" element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  } />

  <Route path="/menu" element={
    <ProtectedRoute>
      <Menu />
    </ProtectedRoute>
  } />

  <Route path="/cart" element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  } />

  <Route path="/orders" element={
    <ProtectedRoute>
      <OrderTracking />
    </ProtectedRoute>
  } />

  <Route path="/contact" element={
    <ProtectedRoute>
      <Contact />
    </ProtectedRoute>
  } />

  <Route path="/about" element={
    <ProtectedRoute>
      <About />
    </ProtectedRoute>
  } />
</Routes>

      <Footer></Footer>
    </Router>

    </GlobalProvider>
  );
}

export default App;
