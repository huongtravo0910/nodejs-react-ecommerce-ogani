import React from "react";
import { HeroForHomePage } from "../components/Hero";
import Hamburger from "../components/Hamburger";
import Footer from "../components/Footer";
import { ContactInfo, ContactForm } from "../components/Contact";

import ShoppingCart from "../components/ShoppingCart";
import Breadcrumb from "../components/Breadcrumb";
import CheckOut from "../components/CheckOut";
import Banner from "../components/Banner";

import ProductDetails, {ProductCard } from "../components/Product";

export default function HomePage() {
  const style = {
    backgroundImage: "url('../img/featured/feature-1.jpg')",
  };
  return (
    <div>
      <HeroForHomePage />
      <Breadcrumb />
      <Banner />
      <ProductDetails />
      <ProductCard />
      <ShoppingCart />
      <CheckOut />
    </div>
  );
}
