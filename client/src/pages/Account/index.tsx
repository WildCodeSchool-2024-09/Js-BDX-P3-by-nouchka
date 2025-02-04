import { Link } from "react-router-dom";
import "../../App.css";
import { useAuth } from "../../components/Login/login_persistance/persistance";
import "./style.css";
import ClientLogin from "../../components/Login";

export default function Account() {
  const { isLogged, userFirstName, logout } = useAuth();
  return (
    <>
      {isLogged ? (
        <section className="onceConnected">
          <h2 className="hello">Bonjour {userFirstName} 🩷</h2>
          <h2 className="myOrders">Mes commandes</h2>
          <h2 className="myLikes">Mes likes</h2>
          <button className="btnDisconnection" type="button" onClick={logout}>
            Déconnexion
          </button>
        </section>
      ) : (
        <>
          <ClientLogin />
          <section className="firstPage">
            <Link className="inscription" to="/inscription">
              Inscription
            </Link>
          </section>
        </>
      )}
    </>
  );
}
