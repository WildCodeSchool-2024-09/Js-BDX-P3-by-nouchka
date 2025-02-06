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
    <>
      <h2 className="contact">Me Contacter</h2>
      <form action="sumbit" className="contactForm">
        <section className="contactDescription">
          <h3>Une question, une demande spéciale ? ✨</h3>
          <p>
            Que ce soit pour une commande personnalisée, une question, ou
            simplement un petit mot doux, n’hésitez pas à nous écrire. 💌
          </p>
          <p>📩 Réponse rapide et bienveillante garantie !</p>
        </section>
        <label htmlFor="fullName" className="Name">
          <input
            id="fullName"
            className="blockName"
            required
            type="text"
            name="fullName"
            placeholder="Nom Prénom..."
          />
        </label>
        <label htmlFor="email" className="Email">
          <input
            id="email"
            className="blockEmail"
            required
            type="email"
            name="email"
            value={mail}
            placeholder="Votre e-mail..."
            onChange={handleChange}
          />
        </label>
        {emailError && <p className="errorEmail">{emailError}</p>}
        <label htmlFor="message" className="Message">
          <textarea
            id="message"
            className="blockMessage"
            name="message"
            placeholder="Votre message..."
          />
        </label>
        <button className="send" type="submit">
          Envoyer
        </button>
      </form>
    </>
  );
}
