export interface AddressData {
  shippingAddress: {
    street_number: string;
    street_name: string;
    postalCode: string;
    city: string;
  };
  billingAddress: {
    street_number: string;
    street_name: string;
    postalCode: string;
    city: string;
  };
}
