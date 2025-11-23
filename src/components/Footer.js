import "../styles/Footer.css";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h3>FoodExpress</h3>
          <p>Your favorite meals delivered fast & fresh.</p>

          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">
              <FaTiktok />
            </a>
          </div>
        </div>

        <div className="footer-center">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/order-tracking">Order Tracking</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <h4>Contact</h4>
          <p>Email: support@foodexpress.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FoodExpress. All rights reserved.</p>
      </div>
    </footer>
  );
}
