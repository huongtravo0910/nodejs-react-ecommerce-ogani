import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "../sass/style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Tab } from "semantic-ui-react";

function ProductDetails(props) {
  console.log(props.history);
  const [qty, setQty] = useState(1);
  const qtyValue = useRef(null);

  //Tab
  const panes = [
    {
      menuItem: "Description",
      render: () => (
        <Tab.Pane attached={false}>
          <h6>Products Infomation</h6>
          <p>{props.description}</p>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Information",
      render: () => (
        <Tab.Pane attached={false}>
          <h6>Products KKK</h6>
          <p>{props.description}</p>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Review",
      render: () => (
        <Tab.Pane attached={false}>
          <h6>Products jn</h6>
          <p>{props.description}</p>
        </Tab.Pane>
      ),
    },
  ];

  const TabExampleSecondaryPointing = () => (
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  );

  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };
  return (
    <section className="product-details spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="product__details__pic">
              <div className="product__details__pic__item">
                <img
                  className="product__details__pic__item--large"
                  src={process.env.PUBLIC_URL + "/img/product/" + props.image}
                  alt=""
                />
              </div>
              <div className="product__details__pic__slider owl-carousel">
                <img
                  src={require("../img/product/details/thumb-1.jpg")}
                  alt=""
                />
                <img
                  data-imgbigurl="img/product/details/product-details-3.jpg"
                  src={require("../img/product/details/thumb-2.jpg")}
                  alt=""
                />
                <img
                  data-imgbigurl="img/product/details/product-details-5.jpg"
                  src={require("../img/product/details/thumb-3.jpg")}
                  alt=""
                />
                <img
                  data-imgbigurl="img/product/details/product-details-4.jpg"
                  src={require("../img/product/details/thumb-4.jpg")}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="product__details__text">
              <h3>{props.title}</h3>
              <div className="product__details__rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half-o"></i>
                <span>({props.numReviews} reviews)</span>
              </div>
              <div className="product__details__price">${props.price}</div>
              <p>{props.description}</p>
              <div className="product__details__quantity">
                <div className="quantity">
                  <div className="pro-qty">
                    <span
                      className="dec qtybtn"
                      onClick={() => {
                        if (qty > 0) {
                          setQty(qty - 1);
                        }
                        setQty(0);
                      }}
                    >
                      -
                    </span>
                    <input type="text" value={qty} ref={qtyValue} />
                    <span
                      className="inc qtybtn"
                      onClick={() => setQty(qty + 1)}
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>
              <span
                className="primary-btn"
                onClick={handleAddToCart}
              >
                <Link to="/cart" style={{ color: "white" }}>
                  ADD TO CARD
                </Link>
              </span>

              <div className="heart-icon">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="icon"
                  size="sm"
                  className="icon"
                />
              </div>
              <ul>
                <li>
                  <b>Availability</b> <span>In Stock</span>
                </li>
                <li>
                  <b>Shipping</b>{" "}
                  <span>
                    01 day shipping. <samp>Free pickup today</samp>
                  </span>
                </li>
                <li>
                  <b>Weight</b> <span>0.5 kg</span>
                </li>
                <li>
                  <b>Share on</b>
                  <div className="share">
                    <a href="#">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faPinterest} />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="product__details__tab">
              <TabExampleSecondaryPointing />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default withRouter(ProductDetails);

export const ProductCard = (props) => {
  const productUrl = "/product/" + props.id;
  return (
    <div class="col-lg-4 col-md-6 col-sm-6">
      <div class="product__item">
        <div class="product__item__pic set-bg">
          <img
            src={process.env.PUBLIC_URL + "../img/product/" + props.image}
            alt={props.image}
          />
          <ul class="product__item__pic__hover">
            <li>
              <a href="#">
                <i class="fa fa-heart"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-retweet"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-shopping-cart"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="product__item__text">
          <h6>
            <Link to={productUrl}>{props.name}</Link>
          </h6>
          <h5>{props.price}</h5>
        </div>
      </div>
    </div>
  );
};
