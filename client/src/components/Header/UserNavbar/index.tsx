import "./style.css";
import { Link } from "react-router-dom";

export default function UserNavbar() {
  return (
    <nav className="user-navbar">
      <ul>
        <li>
          <Link to="/account" className="link-account">
            Compte
          </Link>
        </li>
        <li>
          <Link to="/cart" className="link-cart">
            <img
              src="../src/assets/cart/cart.svg"
              alt="panier"
              className="cart-img"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
