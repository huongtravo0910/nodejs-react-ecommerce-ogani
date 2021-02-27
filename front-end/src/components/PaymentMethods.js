import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePayment, saveShipping } from "../actions/cartAction";
import { withRouter } from "react-router-dom";

function PaymentMethod(props) {
  const cart = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push("/placeorder")
  };
  console.log(cart);
  return (
    <section className="checkout spad">
      <div className="container">
        <div className="checkout__form">
          <h4>Payment</h4>
          <form onSubmit={submitHandler}>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="checkout__input">
                      <div>Choose one payment method</div>
                      <select
                        name="paymentMethod"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <option value="moca">Moca</option>
                        <option value="zalopay">Zalo</option>
                        <option value="ngan-luong">Ngan Luong</option>
                        <option value="ATM">ATM</option>
                        <option value="VisaCard">Visa Card</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <button className="primary-btn">Continue</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default withRouter(PaymentMethod);
