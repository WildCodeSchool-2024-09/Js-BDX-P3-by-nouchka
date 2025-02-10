import { useState } from "react";
import { useOrderForm } from "./logic";

export default function AddressRegister() {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const {
    shippingAddress,
    billingAddress,
    setBillingAddress,
    error,
    isSubmitting,
    handleChangeShipping,
    handleChangeBilling,
    handleSubmit,
  } = useOrderForm();

  const handleCheckboxChange = () => {
    setSameAsShipping(!sameAsShipping);
    if (!sameAsShipping) {
      setBillingAddress(shippingAddress);
    }
  };

  return (
    <>
      <h2 className="titleForm">Adresse de livraison</h2>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="shipping-street-number" className="registerPassword">
          <input
            id="shipping-street-number"
            className="registerAddress"
            required
            type="text"
            name="street_number"
            value={shippingAddress.street_number}
            onChange={handleChangeShipping}
            placeholder="Numéro de voie..."
          />
        </label>
        <label htmlFor="shipping-street-name" className="registerPassword">
          <input
            id="shipping-street-name"
            className="registerAddress"
            required
            type="text"
            name="street_name"
            value={shippingAddress.street_name}
            onChange={handleChangeShipping}
            placeholder="Nom de voie..."
          />
        </label>
        <label htmlFor="shipping-postal_code" className="registerPassword">
          <input
            id="shipping-postal_code"
            className="registerAddress"
            required
            type="text"
            name="postal_code"
            value={shippingAddress.postal_code}
            onChange={handleChangeShipping}
            placeholder="Code postal..."
          />
        </label>
        <label htmlFor="shipping-city" className="registerPassword">
          <input
            type="text"
            id="shipping-city"
            className="registerAddress"
            required
            name="city"
            value={shippingAddress.city}
            onChange={handleChangeShipping}
            placeholder="Votre ville..."
          />
        </label>
        {error && <p className="errorMessage">{error}</p>}
        <label>
          <input
            type="checkbox"
            checked={sameAsShipping}
            onChange={handleCheckboxChange}
          />
          L'adresse de facturation est la même
        </label>

        {!sameAsShipping && (
          <>
            <h2 className="titleForm">Informations de facturation</h2>
            <label htmlFor="billing-street-number" className="registerPassword">
              <input
                id="billing-street-number"
                className="registerAddress"
                required
                type="text"
                name="street_number"
                value={billingAddress.street_number}
                onChange={handleChangeBilling}
                placeholder="Numéro de voie..."
              />
            </label>
            <label htmlFor="billing-street-name" className="registerPassword">
              <input
                id="billing-street-name"
                className="registerAddress"
                required
                type="text"
                name="street_name"
                value={billingAddress.street_name}
                onChange={handleChangeBilling}
                placeholder="Nom de voie..."
              />
            </label>
            <label htmlFor="billing-postal_code" className="registerPassword">
              <input
                id="billing-postal_code"
                className="registerAddress"
                required
                type="text"
                name="postal_code"
                value={billingAddress.postal_code}
                onChange={handleChangeBilling}
                placeholder="Code postal..."
              />
            </label>
            <label htmlFor="billing-city" className="registerPassword">
              <input
                type="text"
                id="billing-city"
                className="registerAddress"
                required
                name="city"
                value={billingAddress.city}
                onChange={handleChangeBilling}
                placeholder="Votre ville..."
              />
            </label>
          </>
        )}
        <button className="registerSend" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "En cours..." : "Valider"}
        </button>
      </form>
    </>
  );
}
