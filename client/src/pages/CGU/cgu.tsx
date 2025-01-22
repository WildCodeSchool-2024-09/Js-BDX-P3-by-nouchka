import "./style.css";

export default function CGU() {
  return (
    <section className="legalmentions-container">
      <h2 className="secondary-title">
        Conditions générales d'utilisation (CGU)
      </h2>
      <p className="legalMentions-text">
        Article 1 : Objet des CGU Les présentes Conditions Générales
        d'Utilisation (CGU) ont pour objet de définir les règles d’utilisation
        du site e-commerce by.Nouchka (ci-après "le Site") et les obligations
        respectives des utilisateurs et de l’exploitant du Site.
      </p>{" "}
      <p className="legalMentions-text">
        Article 2 : Public visé Le Site est accessible à tout public. Les
        mineurs doivent obtenir une autorisation parentale avant tout achat.
      </p>{" "}
      <p className="legalMentions-text">
        {" "}
        Article 3 : Fonctionnalités du Site Le Site permet :
        <ul>
          <li>De naviguer librement sur le catalogue de bijoux.</li>
          <li>
            {" "}
            D’acheter des produits avec ou sans création de compte utilisateur.
          </li>
          <li>
            {" "}
            De bénéficier d'un espace personnel pour les utilisateurs inscrits,
            facilitant le suivi des commandes et la gestion des préférences.
          </li>
        </ul>
      </p>
      <p className="legalMentions-text">
        Article 4 : Responsabilités de l’exploitant by.Nouchka s’engage à :
        <ul>
          <li>
            {" "}
            Maintenir le Site accessible 24h/24 et 7j/7, sauf en cas de
            maintenance ou de force majeure.
          </li>{" "}
          <li>
            Mettre à jour les stocks régulièrement pour éviter les ruptures de
            stock.
          </li>{" "}
          <li>
            {" "}
            Toutefois, en cas d’erreur exceptionnelle, le client sera informé
            rapidement et remboursé le cas échéant.
          </li>{" "}
          <li>
            Assurer la sécurité des données personnelles des utilisateurs
            conformément au RGPD.
          </li>
        </ul>
      </p>
      <p className="legalMentions-text">
        Article 5 : Responsabilités des utilisateurs Les utilisateurs s’engagent
        à :
        <ul>
          <li>
            Utiliser le Site de manière conforme à la loi et aux présentes CGU.
          </li>
          <li>
            Fournir des informations exactes lors de l’achat ou de la création
            d’un compte.
          </li>{" "}
          <li>
            Ne pas tenter d’altérer le fonctionnement du Site ou de ses contenus
            (piratage, injection de code malveillant, etc.).
          </li>
        </ul>
      </p>
      <p className="legalMentions-text">
        Article 6 : Propriété intellectuelle Tous les contenus présents sur le
        Site (textes, images, logos, designs) sont protégés par les lois sur la
        propriété intellectuelle. Toute reproduction, même partielle, sans
        autorisation écrite est interdite.
      </p>
      <p className="legalMentions-text">
        Article 7 : Modifications des CGU Les présentes CGU peuvent être
        modifiées à tout moment par by.Nouchka. Les utilisateurs seront informés
        par une notification sur le Site.
      </p>
    </section>
  );
}
