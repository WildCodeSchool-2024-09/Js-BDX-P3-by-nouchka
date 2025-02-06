import "./style.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cancel() {
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
      <h3 className="successTitle">Commande annulée</h3>
      <p className="successText">Le paiement n'a pas pu être effectué ❌.</p>
      <p className="successText">
        Vous pouvez essayer à nouveau ou revenir au panier pour modifier votre
        commande.
      </p>
      <button
        className="button-back-toCart"
        type="button"
        onClick={() => navigate("/cart")}
      >
        Retour au panier
      </button>
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
