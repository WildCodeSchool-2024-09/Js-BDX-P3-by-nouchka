import { Link } from "react-router-dom";
import "./style.css";
import SocialMedia from "../../pages/Reseaux-sociaux/reseauxSociaux";
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
        <Link to="/CGV" className="footerLinks">
          CGV
        </Link>
        <Link to="/CGU" className="footerLinks">
          CGU
        </Link>
        <Link to="/FAQ" className="footerLinks">
          FAQ
        </Link>
        <Link to="/Mentions légales" className="footerLinks">
          Mentions légales
        </Link>
        <Link to="/Politique de confidentialité" className="footerLinks">
          Politique de confidentialité
        </Link>
        <SocialMedia />
      </footer>
    </>
  );
}
