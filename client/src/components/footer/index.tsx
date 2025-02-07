import { Link } from "react-router-dom";
import "./style.css";
export default function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="blockLogoFooter">
        {" "}
        <img
          src="src/assets/logo/logo_light.svg"
          alt="retour a la page d'accueil"
          className="logo-footer"
        />
      </Link>
      <Link
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        to="/cgu"
        className="blocklink"
      >
        CGU
      </Link>
      <Link
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        to="/cgv"
        className="blocklink"
      >
        CGV
      </Link>
      <Link
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        to="/faq"
        className="blocklink"
      >
        FAQ
      </Link>
      <Link
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        to="/legal-mentions"
        className="blocklink"
      >
        Mentions légales
      </Link>
      <Link
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        to="/privacy-policy"
        className="blocklink"
      >
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
  );
}
