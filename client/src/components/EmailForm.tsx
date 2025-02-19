import axios from "axios";
import { useState } from "react";

interface EmailData {
  to: string;
  subject: string;
  text: string;
}

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    const emailData: EmailData = { to: email, subject, text: message };

    try {
      await axios.post("http://localhost:3310/api/mails", emailData);
      setStatus("✅ Email envoyé avec succès !");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Erreur :", error);
      setStatus("❌ Échec de l'envoi.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>Envoyer un Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email du destinataire"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Sujet"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{
            width: "100%",
            height: "100px",
            marginBottom: "10px",
            padding: "8px",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
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
    </div>
  );
};

export default EmailForm;
