import "./style.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const sessionId = queryParams.get("session_id");

  useEffect(() => {
    localStorage.removeItem("cart");
    if (sessionId) {
    }
  }, [sessionId]);

  return (
    <section>
      <h4 className="successTitle">Merci pour votre commande !</h4>
      <p className="successText">
        Votre paiement a été effectué avec succès ✅.
      </p>
      <p className="successText">Nous vous remercions pour votre achat.</p>
      <button
        className="button-backHome"
        type="button"
        onClick={() => navigate("/")}
      >
        Retour à l'accueil
      </button>
    </section>
  );
}
