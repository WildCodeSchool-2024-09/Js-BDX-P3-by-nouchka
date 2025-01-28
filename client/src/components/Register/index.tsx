import "../Register/style.css";
import { Link } from "react-router-dom";
import { useRegisterForm } from "./RegisterLogic";

export default function RegisteurBlock() {
  const { formData, emailError, error, handleChange, handleSubmit } =
    useRegisterForm();

  return (
    <>
      <h2 className="titleForm">Créer un compte</h2>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="register" className="registerName">
          <input
            id="lastname"
            className="registerBlockName"
            required
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Nom..."
          />
        </label>
        <label htmlFor="registerFirstName" className="registerFirstName">
          <input
            id="firstname"
            className="registerBlockFirstName"
            required
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Prénom..."
          />
        </label>
        <label htmlFor="email" className="registerEmail">
          <input
            id="email"
            className="registerBlockEmail"
            required
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            placeholder="Votre e-mail..."
          />
        </label>
        {emailError && <p className="errorEmail">{emailError}</p>}
        <label htmlFor="password" className="registerPassword">
          <input
            id="password"
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

        <button className="registerSend" type="submit">
          Créer
        </button>

        <Link to="/shop" className="linkShop">
          Retour à la boutique
        </Link>
      </form>
    </>
  );
}
