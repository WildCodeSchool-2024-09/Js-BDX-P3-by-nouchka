import { useState } from "react";
import "../Register/style.css";
import { useAddressForm } from "../AddressForm/logic.tsx";

export default function AddressRegister() {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const {
    shippingAddress,
    billingAddress,
    setShippingAddress,
    error,
    handleChangeShipping,
    handleChangeBilling,
    handleSubmitAddressInfos,
  } = useAddressForm();

  const handleCheckboxChange = () => {
    setSameAsShipping(!sameAsShipping);
    if (!sameAsShipping) {
      setShippingAddress({ ...billingAddress });
    }
  };

  return (
    <>
      <h2 className="titleForm">Adresse de livraison</h2>
      <form className="registerForm" onSubmit={handleSubmitAddressInfos}>
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
        <label htmlFor="shipping-postalCode" className="registerPassword">
          <input
            id="shipping-postalCode"
            className="registerAddress"
            required
            type="text"
            name="postalCode"
            value={shippingAddress.postalCode}
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
            <label htmlFor="billing-postalCode" className="registerPassword">
              <input
                id="billing-postalCode"
                className="registerAddress"
                required
                type="text"
                name="postalCode"
                value={billingAddress.postalCode}
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
        <button className="registerSend" type="submit">
          valider
        </button>
      </form>
    </>
  );
}
