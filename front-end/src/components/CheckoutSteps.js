import React from "react";

export default function CheckoutSteps(props) {
  const style1 = { "marginBottom": "40" + "px" };
  const active = {
    display: "inline-block",
    borderBottom: "4px solid green",
    width: "100px",
  };
  const normal = {
    display: "inline-block",
    borderBottom: "4px solid #e4e4e4",
    width: "100px",
    marginLeft: "-10px",
  };
  return (
    <div className="processing">
      <div style={style1}>
        <span style={props.login ? active : normal}>Log in</span>
        <span style={props.shipping ? active : normal}>Shipping</span>
        <span style={props.payment ? active : normal}>Payment</span>
        <span style={props.placeOrder ? active : normal}>Place Order</span>
      </div>
    </div>
  );
}
