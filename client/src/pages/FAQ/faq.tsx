import "./style.css";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Quels matériaux utilisez-vous pour vos bijoux ?",
    answer:
      "Nos bijoux sont fabriqués à partir de différents matériaux. Acier inoxydable pour les créoles, pendentifs, tiges et anneaux. Pour les perles, vous trouverez des perles d’eau douces sur la majorité de nos bijoux mais aussi des pierres naturelles et d’autres types de perles : en verre, céramique, plastiques.",
  },
  {
    id: 2,
    question: "Qu’est ce que c’est l'upcycling by.Nouchka ?",
    answer:
      "Parce qu’on a tous le droit à une seconde chance, même nos vieux bijoux ! Notre but, chiner des bijoux oubliés pour en sélectionner les meilleures perles et créer des nouveaux bijoux.",
  },
  {
    id: 3,
    question: "Une fois créé, où et comment seront fabriqués les bijoux ?",
    answer:
      "Tous les bijoux sont imaginés, conçus et fabriqués dans mon atelier, avec soin et passion. Chaque pièce est réalisée par mes petites mains, garantissant un travail artisanal.",
  },
  {
    id: 4,
    question: "Vos bijoux sont-ils hypoallergéniques ?",
    answer:
      "L'acier inoxydable est hypoallergénique, donc ne provoque pas de réactions ou irritations sur la peau. Nous conseillons de toujours désinfecter vos oreilles et boucles avant de le mettre.",
  },
  {
    id: 5,
    question: "Proposez-vous des bijoux personnalisés ?",
    answer:
      "Absolument ! Vous pouvez nous écrire sur le site internet ou sur instagram pour personnaliser vos boucles d’oreilles.",
  },
  {
    id: 6,
    question: "Comment passer une commande ?",
    answer:
      "Vous pouvez commander directement sur notre site internet en sélectionnant vos bijoux préférés et en suivant les étapes simples du processus de paiement.",
  },
  {
    id: 7,
    question: "Quels sont les délais de livraison ?",
    answer:
      "Pour les bijoux en stock : 7 jours ouvrables. Pour les bijoux personnalisés : 10 à 15 jours ouvrables.",
  },
  {
    id: 8,
    question: "Comment entretenir mes bijoux pour qu’ils restent éclatants ?",
    answer:
      "Pour préserver l’éclat de vos bijoux :\n- Évitez le contact avec l’eau, les produits chimiques ou les parfums.\n- Rangez-les dans leur pochette ou boîte d’origine lorsqu’ils ne sont pas portés.\n- Nettoyez-les délicatement avec un chiffon doux en microfibre.",
  },
  {
    id: 9,
    question: "Puis-je retourner un bijou s’il ne me convient pas ?",
    answer:
      "Chez by.Nouchka, chaque bijou est conçu avec soin, souvent en pièce unique ou en série limitée, en raison de notre démarche de recyclage. Pour ces raisons, nous ne sommes pas en mesure d'accepter les retours. Cependant, nous sommes toujours disponibles pour répondre à vos questions avant votre achat afin de vous aider à choisir le bijou parfait.",
  },
  {
    id: 10,
    question: "Proposez-vous des cartes cadeaux ?",
    answer:
      "Oui, nous proposons des cartes cadeaux électroniques disponibles dans différentes valeurs. Elles sont idéales pour offrir un bijou tout en laissant le choix au destinataire.",
  },
  {
    id: 11,
    question: "Comment puis-je vous contacter si j’ai une autre question ?",
    answer:
      "Vous pouvez nous joindre via le formulaire de contact sur notre site.",
  },
];

export default function FAQ() {
  return (
    <section className="faq-section">
      <h2 className="faq-title">Foire aux questions</h2>
      <article className="faq-list">
        {faqData.map((item) => (
          <details key={item.id} className="faq-item">
            <summary className="faq-question">{item.question}</summary>
            <p className="faq-answer">{item.answer}</p>
          </details>
        ))}
      </article>
    </section>
  );
}
