import { useState } from "react";

type Address = {
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
};

type CartItem = {
  description: string;
  type: string;
  id: number;
  name: string;
  URL: string;
  price: number;
  quantity: number;
};

export default function OrderForm() {
  const [billingAddress, setBillingAddress] = useState<Address>({
    street_number: "",
    street_name: "",
    postal_code: "",
    city: "",
  });
  const [shippingAddress, setShippingAddress] = useState<Address>({
    street_number: "",
    street_name: "",
    postal_code: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

    const order = {
      billing_address: billingAddress,
      shipping_address: shippingAddress,
      jewelries: cartItems.map((item: CartItem) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      // Créer la commande dans la base de données
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        },
      );

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la création de la commande certains stocks ne permettent pas d'effecture cet achat",
        );
      }

      const { orderId } = await response.json();

      // Créer la session de paiement avec Stripe
      const formattedCart = cartItems.map((item: CartItem) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        description: item.description,
        type: item.type,
      }));

      const paymentResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId, cart: formattedCart }),
        },
      );

      if (!paymentResponse.ok) {
        throw new Error("Erreur lors de la création de la session de paiement");
      }

      const { paymentUrl } = await paymentResponse.json();

      // Rediriger vers la page de paiement
      window.location.href = paymentUrl;
    } catch (err) {
      setError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Finaliser votre commande</h1>

      <form onSubmit={handleSubmit}>
        {/* Adresse de facturation */}
        <h2>Adresse de Facturation</h2>
        <label>
          Numéro de rue:
          <input
            type="text"
            value={billingAddress.street_number}
            onChange={(e) =>
              setBillingAddress({
                ...billingAddress,
                street_number: e.target.value,
              })
            }
            required
          />
        </label>
        <label>
          Nom de rue:
          <input
            type="text"
            value={billingAddress.street_name}
            onChange={(e) =>
              setBillingAddress({
                ...billingAddress,
                street_name: e.target.value,
              })
            }
            required
          />
        </label>
        <label>
          Code postal:
          <input
            type="text"
            value={billingAddress.postal_code}
            onChange={(e) =>
              setBillingAddress({
                ...billingAddress,
                postal_code: e.target.value,
              })
            }
            required
          />
        </label>
        <label>
          Ville:
          <input
            type="text"
            value={billingAddress.city}
            onChange={(e) =>
              setBillingAddress({ ...billingAddress, city: e.target.value })
            }
            required
          />
        </label>

        {/* Adresse de livraison */}
        <h2>Adresse de Livraison</h2>
        <label>
          Numéro de rue:
          <input
            type="text"
            value={shippingAddress.street_number}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                street_number: e.target.value,
              })
            }
            required
          />
        </label>
        <label>
          Nom de rue:
          <input
            type="text"
            value={shippingAddress.street_name}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                street_name: e.target.value,
              })
            }
            required
          />
        </label>
        <label>
          Code postal:
          <input
            type="text"
            value={shippingAddress.postal_code}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                postal_code: e.target.value,
              })
            }
            required
          />
        </label>
        <label>
          Ville:
          <input
            type="text"
            value={shippingAddress.city}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, city: e.target.value })
            }
            required
          />
        </label>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Traitement..." : "Valider et Payer"}
        </button>
      </form>
    </div>
  );
}
