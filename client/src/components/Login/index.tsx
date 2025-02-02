import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginClientCheck } from "../../types/LoginClients";
import { useEffect } from "react";
import { useAuth } from "../Login/login_persistance/persistance";

export default function ClientLogin() {
  const { isLogged, setIsLogged, setUserFirstName } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState<LoginClientCheck>({
    mail: "",
    password: "",
  });
  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();
      console.log("==== RÉPONSE API ====");
      console.log("Data complète:", data);
      if (!response.ok) {
        if (data.includes("Duplicate entry") || data.includes("mail")) {
          setEmailError("Erreur lors de l'inscription");
          throw new Error("Erreur lors de l'inscription");
        }
        throw new Error("Erreur de connexion");
      }
      
      localStorage.setItem("token", data.token);
        localStorage.setItem("userFirstName", data.user.firstname);
       
        setIsLogged(true);
        setUserFirstName(data.user.firstname);
      
      setError("");
      navigate("/account");
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
      <h1 className="titleForm">Me Connecter</h1>
      <form className="registerForm" onSubmit={handleSubmit}>
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
          Me Connecter
        </button>
      </form>
    </>
  );
}
