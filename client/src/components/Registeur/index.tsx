import { useState } from "react";
import "../Registeur/style.css";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

type FormData = {
  lastname: string;
  firstname: string;
  mail: string;
  password: string;
};

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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/clients`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      response.json();
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Réponse invalide du serveur");
      }

      if (!response.ok) {
        throw new Error("Erreur de connexion au serveur");
      }

      setFormData({
        lastname: "",
        firstname:
          "" /*ajout d'un UseNavigate pour rediriger vers la page de connexion*/,
        mail: "",
        password: "",
      });
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "Erreur lors de l'inscription",
      );
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
