import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderAction";
import { withRouter } from "react-router-dom";

function CheckoutSummary(props) {
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { cartItems, shipping, payment } = cart;
  // console.log(cart);
  // console.log(orderCreate);
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    console.log("createPlaceOrder");
    dispatch(
      createOrder({
        cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
    // console.log(success );
    // console.log(orderCreate)
  };
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }
  }, [success]);
  return (
    <section className="checkout spad">
      <div className="container">
        <div className="row"></div>
        <div className="checkout__form">
          <h4>Billing Details</h4>
          <div className="row">
            <div className="col-lg-8 col-md-6">
              <div className="row">
                <div className="col-lg-12">
                  <div className="checkout__input">
                    <h5>
                      <strong>Shipping details</strong>
                    </h5>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <p>Fist Name</p>
                    <input
                      type="text"
                      value={shipping.receivedUser.firstName}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <p>Last Name</p>
                    <input
                      type="text"
                      value={shipping.receivedUser.lastName}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="checkout__input">
                <p>Country</p>
                <input type="text" value={shipping.country} readOnly />
              </div>
              <div className="checkout__input">
                <p>Address</p>
                <input
                  type="text"
                  value={shipping.address}
                  readOnly
                  className="checkout__input__add"
                />
              </div>
              <div className="checkout__input">
                <p>Town/City</p>
                <input type="text" value={shipping.city} readOnly />
              </div>
              <div className="checkout__input">
                <p>Postcode / ZIP</p>
                <input type="text" value={shipping.postalCode} readOnly />
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <p>Phone</p>
                    <input type="text" value={shipping.phone} readOnly />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <p>Email</p>
                    <input type="text" value={shipping.email} readOnly />
                  </div>
                </div>
              </div>

              <div className="checkout__input">
                <p>
                  Order notes<span>*</span>
                </p>
                <input type="text" value={shipping.orderNote} readOnly />
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="checkout__order">
                <h4>Your Order</h4>
                <div className="checkout__order__products">
                  Products <span>Total</span>
                </div>
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      {item.name}
                      <span>{item.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="checkout__order__products">
                  Subtotal <span>${itemsPrice}</span>
                </div>
                <div className="checkout__order__products">
                  Tax <span>${itemsPrice}</span>
                </div>
                <div className="checkout__order__products">
                  Shipping price <span>${shippingPrice}</span>
                </div>
                <div className="checkout__order__total">
                  Total <span>${totalPrice}</span>
                </div>
                <button className="site-btn" onClick={placeOrderHandler}>
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-6">
              <div className="row">
                <div className="col-lg-12">
                  <div className="checkout__input">
                    <h5>
                      <strong>Payment</strong>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="row">
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <div>Payment method</div>
                    <input value={payment.paymentMethod} readOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withRouter(CheckoutSummary);
