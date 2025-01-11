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
      
      <p className="contactDescription">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque harum
        necessitatibus reprehenderit molestias officiis amet culpa tempora
        asperiores cupiditate debitis, quia vero, alias dignissimos consectetur
        ducimus, doloribus fugiat maxime fugit?
      </p>
      <label className="Name">
      <input
        className="blockName"
        required
        type="text"
        name="firstName"
        placeholder="Nom, Prénom..."
      />
      </label>
      <label className="Email">
      <input
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
      <label className="Message">
      <textarea
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
