import "./style.css";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="logo-link">
      <img src="../src/assets/logo/logo.svg" alt="logo" />
    </Link>
  );
}
