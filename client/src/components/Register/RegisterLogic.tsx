import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormData } from "../../types/Registeur_type/index";
import { validateEmail, validatePassword } from "../Register/Validation";

export const useRegisterForm = () => {
  const navigate = useNavigate();
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
      const emailError = validateEmail(value);
      setEmailError(emailError);
    } else if (name === "password") {
      const passwordError = validatePassword(value);
      setError(passwordError);
    }
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
      if (!response.ok) {
        const errorData = await response.json();
        if (
          errorData.includes("Duplicate entry") ||
          errorData.includes("mail")
        ) {
          throw new Error("Cette adresse email est déjà utilisée");
        }
        throw new Error("Erreur lors de l'inscription");
      }

      setError("");

      navigate("/");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erreur lors de l'inscription",
      );
    }
  };

  return {
    formData,
    emailError,
    error,
    handleChange,
    handleSubmit,
  };
};
