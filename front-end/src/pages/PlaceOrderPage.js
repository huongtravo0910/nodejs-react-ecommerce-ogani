import React from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import CheckoutSummary from "../components/CheckOutSummary";

export default function PlaceOrderPage() {
  return (
    <div className="container">
      <CheckoutSteps login shipping payment placeOrder />
      <CheckoutSummary />
    </div>
  );
}
