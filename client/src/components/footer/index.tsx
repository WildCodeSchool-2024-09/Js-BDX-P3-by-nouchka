import { Link } from "react-router-dom";
import "./style.css";

export default function Footer() {
  return (
    <>
      <div className="footer">
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
          Mentions Légales
        </Link>
        <Link to="/Politique de confidentialité" className="footerLinks">
          Politique de Confidentialité
        </Link>
        <Link to="/Réseaux sociaux" className="footerLinks">
          Réseaux sociaux
        </Link>
      </div>
    </>
  );
}
