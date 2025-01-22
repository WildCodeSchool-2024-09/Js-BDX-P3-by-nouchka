import "../Registeur/style.css";
import { Link } from "react-router-dom";
import { useRegisteurForm } from "./RegisteurLogic";

export default function RegisteurBlock() {
  const { formData, emailError, error, handleChange, handleSubmit } =
    useRegisteurForm();

  return (
    <>
      <h2 className="titleForm">Créer un compte</h2>
      <form className="registeurForm" onSubmit={handleSubmit}>
        <label htmlFor="registeur" className="registeurName">
          <input
            className="registeurBlockName"
            required
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Nom..."
          />
        </label>
        <label htmlFor="registeurFirstName" className="registeurFirstName">
          <input
            className="registeurBlockFirstName"
            required
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Prénom..."
          />
        </label>
        <label htmlFor="email" className="registeurEmail">
          <input
            className="registeurBlockEmail"
            required
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            placeholder="Votre e-mail..."
          />
        </label>
        {emailError && <p className="errorEmail">{emailError}</p>}
        <label htmlFor="pasword" className="registeurPassword">
          <input
            className="password"
            required
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Votre mots de passe..."
          />
        </label>
        {error && <p className="errorMessage">{error}</p>}

        <button className="registeurSend" type="submit">
          Créer
        </button>

        <Link to="/shop" className="linkShop">
          Retour à la boutique
        </Link>
      </form>
    </>
  );
}
