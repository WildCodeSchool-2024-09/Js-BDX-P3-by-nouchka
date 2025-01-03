import "./style.css";
import { Link } from "react-router-dom";

export default function UserNavbar() {
  return (
    <nav className="user-navbar">
      <ul>
        <li>
          <Link to="/panier" className="link">
            <img
              src="../src/assets/cart/cart.svg"
              alt="cart"
              className="cart-img"
            />
          </Link>
        </li>
        <li>
          <Link to="/compte" className="link">
            Mon compte
          </Link>
        </li>
      </ul>
    </nav>
  );
}
