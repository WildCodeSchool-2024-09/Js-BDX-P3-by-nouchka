import { Link } from "react-router-dom";
import "./style.css";
import SocialMedia from "../../pages/social-media/SocialMedia";
export default function Footer() {
  return (
    <>
      <footer className="footer">
        <Link to="/">
          {" "}
          <img
            src="src/assets/logo/logo-lightPink.svg"
            alt="Retour a la page d'accueil"
            className="logo-footer"
          />
        </Link>
        <Link to="/cgu" className="footerLinks">
          CGV
        </Link>
        <Link to="/cgv" className="footerLinks">
          CGU
        </Link>
        <Link to="/faq" className="footerLinks">
          FAQ
        </Link>
        <Link to="/legal-mentions" className="footerLinks">
          Mentions légales
        </Link>
        <Link to="/privacy-policy" className="footerLinks">
          Politique de confidentialité
        </Link>
        <SocialMedia />
      </footer>
    </>
  );
}
