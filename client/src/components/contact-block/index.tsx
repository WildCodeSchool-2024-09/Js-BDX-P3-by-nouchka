import { useState } from "react";
import "./App.css";

export default function ContactBlock() {
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    email: "",
    message: "",
  });

  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
    if (name === "email") {
      validateEmail(value);
    }
  };
  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailError(
      !value
        ? "Email requis"
        : !emailRegex.test(value)
          ? "Format d'email invalide"
          : "",
    );
  };

  return (
    <section className="contactFrom">
      <h2 className="contact">Contact</h2>
      <h3>Nom, Prénom:</h3>
      <input
        type="text"
        name="firstName"
        value={contactInfo.firstName}
        onChange={handleChange}
      />
      <h3>Email:</h3>
      <input
        type="email"
        name="email"
        value={contactInfo.email}
        onChange={handleChange}
      />
      {emailError && <p className="errorEmail">Error</p>}
      <h3> Message: </h3>
      <textarea
        name="message"
        value={contactInfo.message}
        onChange={handleChange}
      />
      <button className="send" type="submit">
        Envoyer
      </button>
    </section>
  );
}
