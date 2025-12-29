import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Restaurant Logo" className="logo-img" />
          <span>FoodExpress</span>
        </Link>

        {/* Navigation Links */}
        <ul className="nav-links">

          {/* USER LOGGED IN */}
          {user && (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/orders">Order Tracking</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/about">About</Link></li>
              <li>
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          )}

          {/* USER LOGGED OUT */}
          {!user && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li>
                <Link to="/signup" className="signup-btn">
                  Sign Up
                </Link>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}
