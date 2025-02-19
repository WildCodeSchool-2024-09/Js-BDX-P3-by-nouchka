import { useState } from "react";
import "../contact-block/style.css";

interface EmailData {
  to: string;
  subject: string;
  text: string;
}

export default function ContactBlock() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation de l'email avant envoi
    if (emailError) {
      setStatus("❌ Veuillez corriger l'adresse email avant d'envoyer");
      return;
    }

    setStatus("Envoi en cours...");

    const emailData: EmailData = {
      to: email,
      subject: subject,
      text: message,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/mails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        },
      );

      if (response.ok) {
        setStatus("✅ Email envoyé avec succès !");
        setEmail("");
        setFullName("");
        setSubject("");
        setMessage("");
      } else {
        const errorData = await response.json();
        setStatus(
          `❌ Échec de l'envoi: ${errorData.error || "Erreur inconnue"}`,
        );
      }
    } catch (error) {
      console.error("Erreur :", error);
      setStatus("❌ Échec de l'envoi. Vérifiez votre connexion réseau.");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userEmail = e.target.value;
    setEmail(userEmail);
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
      <form onSubmit={handleSubmit} className="contactForm">
        <section className="contactDescription">
          <h3>Une question, une demande spéciale ? ✨</h3>
          <p>
            Que ce soit pour une commande personnalisée, une question, ou
            simplement un petit mot doux, n'hésitez pas à nous écrire. 💌
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
        <label htmlFor="email" className="Email">
          <input
            id="email"
            className="blockEmail"
            required
            type="email"
            name="email"
            value={email}
            placeholder="Votre e-mail..."
            onChange={handleEmailChange}
          />
        </label>
        {emailError && <p className="errorEmail">{emailError}</p>}
        <label htmlFor="subject" className="Subject">
          <input
            id="subject"
            className="blockSubject"
            type="text"
            name="subject"
            value={subject}
            placeholder="Sujet..."
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>
        <label htmlFor="message" className="Message">
          <textarea
            id="message"
            className="blockMessage"
            name="message"
            placeholder="Votre message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button
          className="send"
          type="submit"
          onClick={() => console.log("Bouton cliqué")}
        >
          Envoyer
        </button>
      </form>
      {status && (
        <p
          style={{
            marginTop: "10px",
            color: status.includes("✅") ? "green" : "red",
          }}
        >
          {status}
        </p>
      )}
    </>
  );
}
