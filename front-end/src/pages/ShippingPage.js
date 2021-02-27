import React from "react";
import ShippingForm from "../components/ShippingForm";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingPage() {
  return (
    <div className="container">
      <CheckoutSteps login shipping />
      <ShippingForm />
    </div>
  );
}
