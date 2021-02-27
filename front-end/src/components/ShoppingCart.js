import React, { useEffect, useState, useRef } from "react";
import { addToCart, removeFromCart } from "../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../sass/style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ShoppingCart(props) {
  const cart = useSelector((state) => state.cart);
  const { productId, qty } = props;
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  return (
    <section className="shoping-cart spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping__cart__table">
              <table>
                <thead>
                  <tr>
                    <th className="shoping__product">Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length === 0 ? (
                    <div>Cart is empty</div>
                  ) : (
                    cartItems.map((item) => (
                      <Item key={item.product} item={item} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping__cart__btns">
              <span href="#" className="primary-btn cart-btn">
                <Link to={"/shopping"}>CONTINUE SHOPPING</Link>
              </span>
              <a href="#" className="primary-btn cart-btn cart-btn-right">
                <span className="icon_loading"></span>
                Update Cart
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="shoping__continue">
              <div className="shoping__discount">
                <h5>Discount Codes</h5>
                <form action="#">
                  <input type="text" placeholder="Enter your coupon code" />
                  <button type="submit" className="site-btn">
                    APPLY COUPON
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="shoping__checkout">
              <h5>Cart Total</h5>
              <ul>
                <li>
                  Subtotal <span>$454.98</span>
                </li>
                <li>
                  Total <span>$454.98</span>
                </li>
              </ul>
              <span href="#" className="primary-btn">
                <Link to="/shipping">PROCEED TO CHECKOUT</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Item(props) {
  const { item } = props;
  const qtyValue = useRef();
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <tr key={item.product}>
      <td className="shoping__cart__item">
        <img src={process.env.PUBLIC_URL + "/img/product/" + item.image} />
        <h5>
          <Link to={"/product/" + item.product}>{item.name}</Link>
        </h5>
      </td>
      <td className="shoping__cart__price">${item.price}</td>
      <td className="shoping__cart__quantity">
        <div className="quantity">
          <div className="pro-qty">
            <span
              className="dec qtybtn"
              onClick={() => {
                const newQty =
                  qtyValue.current.value > 1
                    ? `${parseInt(qtyValue.current.value) - 1}`
                    : 1;
                dispatch(addToCart(item.product, newQty));
              }}
            >
              -
            </span>
            <input type="text" value={item.qty} ref={qtyValue} readOnly />
            <span
              className="inc qtybtn"
              onClick={() => {
                const newQty =
                  qtyValue.current.value < item.countInStock
                    ? `${parseInt(qtyValue.current.value) + 1}`
                    : item.countInStock;
                dispatch(addToCart(item.product, newQty));
              }}
            >
              +
            </span>
          </div>
        </div>
      </td>
      <td className="shoping__cart__total">${item.price * item.qty}</td>
      <td className="shoping__cart__item__close">
        <span
          className="icon_close"
          onClick={() => removeFromCartHandler(item.product)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </td>
    </tr>
  );
}
