import { NavLink, Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Restaurant Logo" className="logo-img" />
          <span>FoodExpress</span>
        </Link>

        {/* While auth is loading */}
        {loading && (
          <ul className="nav-links">
            <li>Loading...</li>
          </ul>
        )}

        {/* Auth Loaded */}
        {!loading && (
          <ul className="nav-links">

            {/* LOGGED IN */}
            {user && (
              <>
                <li><NavLink to="/" end>Home</NavLink></li>
                <li><NavLink to="/menu">Menu</NavLink></li>
                <li><NavLink to="/cart">Cart</NavLink></li>
                <li><NavLink to="/orders">Order Tracking</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>

                {/* ADMIN ONLY */}
                {isAdmin && (
                  <li>
                    <NavLink to="/admin" className="admin-link">
                      Admin Panel
                    </NavLink>
                  </li>
                )}

                {/* Show user */}
                <li className="user-info">
                  👤 {user.email} ({user.role})
                </li>

                {/* Logout */}
                <li>
                  <button onClick={logout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* LOGGED OUT */}
            {!user && (
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li>
                  <NavLink to="/signup" className="signup-btn">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}
