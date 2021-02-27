import React from "react";
import PaymentMethods from "../components/PaymentMethods";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentPage() {
  return (
    <div className="container">
      <CheckoutSteps login shipping payment/>
      <PaymentMethods />
    </div>
  );
}
