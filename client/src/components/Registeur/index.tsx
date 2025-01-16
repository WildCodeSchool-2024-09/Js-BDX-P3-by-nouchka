import { useState } from "react";
import "../Registeur/style.css";
import { Link } from "react-router-dom";
import { FormEvent } from "react";

interface FormData {
  lastname: string;
  firstname: string;
  mail: string;
  password: string;
}

export default function RegisteurBlock() {
  const [formData, setFormData] = useState<FormData>({
    lastname: "",
    firstname: "",
    mail: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  

    if (name === "mail") {
      validateEmail(value);
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailError(
      !value ? "" : !emailRegex.test(value) ? "Format d'email invalide" : "",
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3310/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Réponse invalide du serveur");
      }

      if (!response.ok) {
        throw new Error ("Erreur de connexion au serveur");
      }

      setFormData({
        lastname: "",
        firstname: "",
        mail: "",
        password: ""
      });
      setError("");
      
    } catch (error: any) {
      console.error("Error:", error);
      setError(error.message || "Erreur lors de l'inscription");
    }
  };
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
