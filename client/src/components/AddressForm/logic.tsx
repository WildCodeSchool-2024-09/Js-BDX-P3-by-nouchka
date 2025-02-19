import { useState } from "react";
import type { CartItem } from "../../types/cartItem";

export const useOrderForm = () => {
  const [shippingAddress, setShippingAddress] = useState({
    street_number: "",
    street_name: "",
    postal_code: "",
    city: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    street_number: "",
    street_name: "",
    postal_code: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangeShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeBilling = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

    const addressData = {
      billing_address: billingAddress,
      shipping_address: shippingAddress,
      jewelries: cartItems.map((item: CartItem) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addressData),
        },
      );

      if (!response.ok) {
        throw new Error(
          response.status === 400
            ? "Stock insuffisant pour certains articles"
            : "Erreur lors de la création de la commande",
        );
      }

      const { orderId } = await response.json();

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
        throw new Error("Erreur while creating payment session");
      }

      const { paymentUrl } = await paymentResponse.json();
      window.location.href = paymentUrl;
    } catch (err) {
      setError("Paiment Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    shippingAddress,
    billingAddress,
    setShippingAddress,
    setBillingAddress,
    error,
    isSubmitting,
    handleChangeShipping,
    handleChangeBilling,
    handleSubmit,
  };
};
