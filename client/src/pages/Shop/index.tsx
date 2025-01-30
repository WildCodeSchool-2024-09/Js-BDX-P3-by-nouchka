import "../../App.css";
import { Link } from "react-router-dom";

export default function Shop() {
  return (
    <>
      <h2>Shop by.Nouchka</h2>
      <Link to="/jewelry/1">Product</Link>
      <Link to="/jewelry/2">Product</Link>
      <Link to="/jewelry/3">Product</Link>
      <Link to="/jewelry/4">Product</Link>
    </>
  );
}
