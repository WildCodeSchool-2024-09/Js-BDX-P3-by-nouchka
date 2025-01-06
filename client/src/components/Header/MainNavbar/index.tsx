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
          <Link to="/shop" className="link-main-navbar" onClick={closeMenu}>
            shop
          </Link>
        </li>
        <li>
          <Link
            to="/upcycling"
            className="link-main-navbar"
            onClick={closeMenu}
          >
            upcycling
          </Link>
        </li>
        <li>
          <Link to="/about" className="link-main-navbar" onClick={closeMenu}>
            à propos
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
