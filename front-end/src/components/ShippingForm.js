import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartAction";
import { withRouter } from "react-router-dom";

function ShippingForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");

  const [orderNote, setOrderNote] = useState("");

  const dispatch = useDispatch();
  let shipping = {receivedUser:{firstName, lastName}, phone, email, address, postalCode, city, country, orderNote};
  useEffect(() => {
    dispatch(saveShipping(shipping));
  }, [shipping]);

  const submitHandler = (e) => {
    console.log("submit");
    e.preventDefault();
    shipping.receivedUser = {
      firstName: firstName,
      lastName: lastName,
    };
    shipping.phone = phone;
    shipping.email = email;
    shipping.address = address;
    shipping.postalCode = postalCode;
    shipping.city = city;
    shipping.country = country;
    shipping.orderNote = orderNote;

    // dispatch(
    //   saveShipping({
    //     firstName,
    //     lastName,
    //     address,
    //     city,
    //     postalCode,
    //     country,
    //     email,
    //     phone,
    //     orderNote,
    //   })
    //);
    props.history.push("/payment");
    console.log("shipping form");
  };

  return (
    <section className="checkout spad">
      <div className="container">
        <div className="checkout__form">
          <h4>Shipping Information</h4>
          <form onSubmit={submitHandler}>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="checkout__input">
                      <p>
                        Fist Name<span>*</span>
                      </p>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="checkout__input">
                      <p>
                        Last Name<span>*</span>
                      </p>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="checkout__input">
                  <p>
                    Country<span>*</span>
                  </p>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                  />
                </div>
                <div className="checkout__input">
                  <p>
                    Address<span>*</span>
                  </p>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    placeholder="Apartment, suite, unite ect (optinal)"
                  />
                </div>
                <div className="checkout__input">
                  <p>
                    Town/City<span>*</span>
                  </p>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
                <div className="checkout__input">
                  <p>
                    Postcode / ZIP<span>*</span>
                  </p>
                  <input
                    type="number"
                    name="postcode"
                    id="postcode"
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                    }}
                  />
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="checkout__input">
                      <p>
                        Phone<span>*</span>
                      </p>
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="checkout__input">
                      <p>
                        Email<span>*</span>
                      </p>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="checkout__input">
                  <p>
                    Order notes<span>*</span>
                  </p>
                  <input
                    type="text"
                    name="orderNote"
                    id="orderNote"
                    onChange={(e) => {
                      setOrderNote(e.target.value);
                    }}
                    placeholder="Notes about your order, e.g. special notes for
                    delivery."
                  />
                </div>
              </div>
              <button className="primary-btn">Next to Payment</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default withRouter(ShippingForm);
