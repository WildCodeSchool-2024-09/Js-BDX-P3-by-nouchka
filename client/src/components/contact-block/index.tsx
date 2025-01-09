import { useState } from "react";
import "../contact-block/style.css";

export default function ContactBlock() {
  const [mail, setMail] = useState("");

  const [emailError, setEmailError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userEmail = e.target.value;
    setMail(userEmail);
    validateEmail(userEmail);
  };
  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailError(
      !value ? "" : !emailRegex.test(value) ? "Format d'email invalide" : "",
    );
  };

  return (
    <form action="sumbit" className="contactForm">
      <h2 className="contact">Me Contacter</h2>
      <p className="contactDescription">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque harum
        necessitatibus reprehenderit molestias officiis amet culpa tempora
        asperiores cupiditate debitis, quia vero, alias dignissimos consectetur
        ducimus, doloribus fugiat maxime fugit?
      </p>
      <input
        className="blockName"
        required
        type="text"
        name="firstName"
        placeholder="Nom, Prénom..."
      />
      <input
        className="blockEmail"
        required
        type="email"
        name="email"
        value={mail}
        placeholder="Votre e-mail..."
        onChange={handleChange}
      />
      {emailError && <p className="errorEmail">{emailError}</p>}
      <textarea
        className="blockMessage"
        name="message"
        placeholder="Votre message..."
      />
      <button className="send" type="submit">
        Envoyer
      </button>
    </form>
  );
}
