import { Link } from "react-router-dom";
import "./style.css";
export default function Footer() {
  return (
    <>
      <footer className="footer">
        <Link to="/" className="blockLogoFooter">
          {" "}
          <img
            src="src/assets/logo/logo_light.svg"
            alt="retour a la page d'acceuil"
            className="logo-footer"
          />
        </Link>
        <Link to="/cgu" className="blocklink">
          CGV
        </Link>
        <Link to="/cgv" className="blocklink">
          CGU
        </Link>
        <Link to="/faq" className="blocklink">
          FAQ
        </Link>
        <Link to="/legal-mentions" className="blocklink">
          Mentions légales
        </Link>
        <Link to="/privacy-policy" className="blocklink">
          Politique de confidentialité
        </Link>
        <a
          href="https://www.instagram.com/by.nouchka?igsh=MWFiMHZrNThmNzQ2Yw=="
          target="_blank"
          rel="noreferrer"
          className="blocklink"
        >
          <img
            src="src/assets/Icones/instagram.png"
            alt="redirection a la page instagram bynouchka."
            className="instagram-icone"
          />
        </a>
      </footer>
    </>
  );
}
