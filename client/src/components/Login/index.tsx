import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginClientCheck } from "../../types/LoginClients";
import { useAuth } from "../Login/login_persistance/persistance";

interface ClientLoginProps {
  isAdmin?: boolean;
  onLoginSuccess?: () => void;
}

export default function ClientLogin({
  isAdmin = false,
  onLoginSuccess,
}: ClientLoginProps) {
  const { login } = useAuth();
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
      const loginURL = `${import.meta.env.VITE_API_URL}/api/auth/login`;

      const response = await fetch(loginURL, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Data from login response:', data); // Ajouté
      console.log('User info:', data.user);; 
      if (!response.ok) {
        throw new Error("Erreur de connexion");
      }

      const [, payload] = data.token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      const isUserAdmin = decodedPayload.isAdmin;
      console.log('Decoded payload:', decodedPayload);
      if (isAdmin && !isUserAdmin) {
        setError("Vous n'avez pas les droits administrateur");
        return;
      }

      const role = isUserAdmin ? "admin" : "client";

      login(data.token, data.user.firstname, role, data.user.id);
      console.log('LocalStorage after login:', { // Ajouté
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        firstName: localStorage.getItem('userFirstName'),
        role: localStorage.getItem('userRole')
      });
      setError("");
      setEmailError(undefined);

      if (isUserAdmin) {
        navigate("/backoffice");
      } else {
        navigate("/account");
      }

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError(
        error instanceof Error ? error.message : "Erreur lors de la connexion",
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
        <label htmlFor="loginEmail" className="registerEmail">
          <input
            id="LoginEmail"
            className="registerBlockEmail"
            required
            type="loginEmail"
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
            placeholder="Votre mot de passe..."
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
