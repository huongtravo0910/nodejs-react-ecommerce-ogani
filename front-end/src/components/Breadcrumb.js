import React from "react";
import "../sass/style.scss";

export default function Breadcrumb() {
  return (
    <section className="breadcrumb-section set-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb__text">
              <h2>Contact Us</h2>
              <div className="breadcrumb__option">
                <a href="./index.html">Home</a>
                <span>Contact Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
