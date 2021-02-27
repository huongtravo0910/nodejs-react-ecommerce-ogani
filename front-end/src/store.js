import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import {
  userLoginReducer,
  userUpdateReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import {
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryListReducer,
  categorySaveReducer,
} from "./reducers/categoyReducers";

import {
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productSaveReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDetailsReducer,
  orderPayReducer,
  ordersListReducer,
  myOrdersListReducer,
} from "./reducers/orderReducers";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userLogin: { userInfo },
};
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userUpdate: userUpdateReducer,
  userRegister: userRegisterReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categorySave: categorySaveReducer,
  categoryDelete: categoryDeleteReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  ordersList: ordersListReducer,
  myOrdersList: myOrdersListReducer,
  orderPay: orderPayReducer,
  orderDelete: orderDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
