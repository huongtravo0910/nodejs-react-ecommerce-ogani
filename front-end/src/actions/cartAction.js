import Axios from "axios";
import Cookie from "js-cookie";

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const response = await Axios.get(
      "http://localhost:5000/api/products/" + productId
    );
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: response.data._id,
        name: response.data.name,
        image: response.image,
        price: response.data.price,
        countInStock: response.data.countInStock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.log(error.message);
  }
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

const saveShipping = (data) => (dispatch) => {
  // console.log(data)
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

export { addToCart, removeFromCart, saveShipping, savePayment };
