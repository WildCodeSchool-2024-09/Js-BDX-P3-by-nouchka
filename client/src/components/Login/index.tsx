import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginClientCheck } from "../../types/LoginClients";

export default function ClientLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState<LoginClientCheck>({
    mail: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajout du Bearer token
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json(); // Stockage de la réponse

      if (!response.ok) {
        if (data.includes("Duplicate entry") || data.includes("mail")) {
          setEmailError("Erreur lors de l'inscription");
          throw new Error("Erreur lors de l'inscription");
        }
        throw new Error("Erreur de connexion");
      }

      localStorage.setItem("token", data.token);

      setError("");
      navigate("/");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erreur lors de l'inscription",
      );
    }
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <>
      <h1 className="titleLogin">Me Connecter</h1>
      <form className="loginBlock" onSubmit={handleSubmit}>
        <label htmlFor="email" className="loginEmail">
          <input
            id="email"
            className="loginBlockEmail"
            required
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            placeholder="Votre e-mail..."
          />
        </label>
        {emailError && <p className="errorEmail">{emailError}</p>}
        <label htmlFor="password" className="loginPassword">
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
        <button type="submit" className="btnLogin">
          Se connecter
        </button>
      </form>
    </>
  );
}
