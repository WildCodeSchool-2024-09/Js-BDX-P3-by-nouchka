import "./style.css";
import { Link } from "react-router-dom";

interface MainNavbarProps {
  showLinks: boolean;
  setShowLinks: (value: boolean) => void;
}

export default function MainNavbar({
  showLinks,
  setShowLinks,
}: MainNavbarProps) {
  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };
  const closeMenu = () => {
    setShowLinks(false);
  };
  return (
    <nav className="main-navbar">
      <ul className={`navbar-links ${showLinks ? "show-nav" : "hide-nav"}`}>
        <li>
          <Link to="/shop" className="link" onClick={closeMenu}>
            SHOP
          </Link>
        </li>
        <li>
          <Link to="/upcycling" className="link" onClick={closeMenu}>
            UPCYCLING
          </Link>
        </li>
        <li>
          <Link to="/about" className="link" onClick={closeMenu}>
            À PROPOS
          </Link>
        </li>
      </ul>
      <button
        type="button"
        className="main-navbar-burger"
        onClick={handleShowLinks}
        aria-expanded={showLinks}
      >
        <span className="burger-bar"> </span>
      </button>
    </nav>
  );
}
