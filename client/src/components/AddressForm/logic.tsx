import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAddressForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    street_number: "",
    street_name: "",
    postalCode: "",
    city: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    street_number: "",
    street_name: "",
    postalCode: "",
    city: "",
  });

  const handleChangeShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeBilling = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAddressInfos = async (e: FormEvent) => {
    e.preventDefault();

    const addressData = {
      billingAddress: billingAddress,
      shippingAddress: shippingAddress,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addressData),
        },
      );

      if (!response.ok) {
        const { errorData } = await response.json();
        throw new Error(
          errorData.includes("Duplicate entry")
            ? "Cette adresse est déjà utilisée"
            : "Erreur lors de l'inscription",
        );
      }

      setError("");
      navigate("/");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erreur lors de l'inscription",
      );
    }
  };

  return {
    shippingAddress,
    setShippingAddress,
    billingAddress,
    setBillingAddress,
    error,
    handleChangeShipping,
    handleChangeBilling,
    handleSubmitAddressInfos,
  };
};
