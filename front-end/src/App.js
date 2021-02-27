import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "./sass/style.scss";

import HomePage from "./pages/HomePage";
import ShoppingPage from "./pages/ShoppingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import OrdersPage from "./pages/OrdersPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import ContactPage from "./pages/ContactPage";

import Header from "./components/Header";
import Hamburger from "./components/Hamburger";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Hamburger />
        <main>
          <Switch>
            <Route path="/contact" component={ContactPage} />
            <PrivateRoute path="/order/:id" children={<OrderPage />} />
            <PrivateRoute path="/orders" children={<OrdersPage />} />
            <PrivateRoute path="/shipping" children={<ShippingPage />} />
            <PrivateRoute path="/payment" children={<PaymentPage />} />
            <PrivateRoute path="/placeorder" children={<PlaceOrderPage />} />
            <PrivateRoute path="/checkout" children={<CheckoutPage />} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/profile" children={<ProfilePage />} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/product/:id" component={ProductDetailPage} />
            <Route path="/shopping" component={ShoppingPage} />
            <Route path="/" exact={true} component={HomePage} />
          </Switch>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function PrivateRoute({ children, ...rest }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userInfo ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}

export default App;
