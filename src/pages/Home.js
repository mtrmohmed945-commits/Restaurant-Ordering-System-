import "../styles/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">

      <div className="overlay"></div>

      <div className="home-content">
        <h1>Welcome to FoodExpress</h1>
        <p>Your favorite meals delivered hot and fresh!</p>

        <Link to="/menu" className="home-btn">
          View Menu
        </Link>
      </div>

    </div>
  );
}
