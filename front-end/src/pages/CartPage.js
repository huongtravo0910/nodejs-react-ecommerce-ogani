import React from "react";

import ShoppingCart from "../components/ShoppingCart";
import { Hero } from "../components/Hero";

export default function CartPage(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  return (
    <div>
      <Hero />
      <ShoppingCart productId={productId} qty={qty} />
    </div>
  );
}
