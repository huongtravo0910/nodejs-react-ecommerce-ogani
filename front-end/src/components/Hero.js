import React, { useRef } from "react";
import "../sass/style.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPhone } from "@fortawesome/free-solid-svg-icons";

export function HeroForHomePage(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const url = "/cart/" + userInfo._id;
  // console.log(userLogin);
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="hero__categories">
              <div className="hero__categories__all">
                <FontAwesomeIcon icon={faBars} className="icon" />
                <span>All departments</span>
              </div>
              <ul>
                <li>
                  <a href="#">Fresh Meat</a>
                </li>
                <li>
                  <a href="#">Vegetables</a>
                </li>
                <li>
                  <a href="#">Fruit & Nut Gifts</a>
                </li>
                <li>
                  <a href="#">Fresh Berries</a>
                </li>
                <li>
                  <a href="#">Ocean Foods</a>
                </li>
                <li>
                  <a href="#">Butter & Eggs</a>
                </li>
                <li>
                  <a href="#">Fastfood</a>
                </li>
                <li>
                  <a href="#">Fresh Onion</a>
                </li>
                <li>
                  <a href="#">Papayaya & Crisps</a>
                </li>
                <li>
                  <a href="#">Oatmeal</a>
                </li>
                <li>
                  <a href="#">Fresh Bananas</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="hero__search">
              <div className="hero__search__form">
                <form action="#">
                  <div className="hero__search__categories">
                    All Categories
                    <span className="arrow_carrot-down"></span>
                  </div>
                  <input type="text" placeholder="What do yo u need?" />
                  <button type="submit" className="site-btn">
                    SEARCH
                  </button>
                </form>
              </div>
              <div className="hero__search__phone">
                <div className="hero__search__phone__icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="hero__search__phone__text">
                  <h5>+65 11.188.888</h5>
                  <span>support 24/7 time</span>
                </div>
              </div>
            </div>
            <div className="hero__item set-bg">
              <div className="hero__text">
                <span>FRUIT FRESH</span>
                <h2>
                  Vegetable <br />
                  100% Organic
                </h2>
                <p>Free Pickup and Delivery Available</p>
                <Link to={url} className="primary-btn">
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Hero(props) {
  // const handleOnchange = (e) => {
  //   props.searchKeywordOnchange(e.target.value)
  // }
  const searchInput = useRef("");
  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.submitHandler(searchInput.current.value);
    console.log(searchInput.current.value);
  };

  return (
    <section className="hero hero-normal">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="hero__categories">
              <div className="hero__categories__all">
                <i className="fa fa-bars"></i>
                <span>All departments</span>
              </div>
              <ul>
                <li>
                  <a href="#">Fresh Meat</a>
                </li>
                <li>
                  <a href="#">Vegetables</a>
                </li>
                <li>
                  <a href="#">Fruit & Nut Gifts</a>
                </li>
                <li>
                  <a href="#">Fresh Berries</a>
                </li>
                <li>
                  <a href="#">Ocean Foods</a>
                </li>
                <li>
                  <a href="#">Butter & Eggs</a>
                </li>
                <li>
                  <a href="#">Fastfood</a>
                </li>
                <li>
                  <a href="#">Fresh Onion</a>
                </li>
                <li>
                  <a href="#">Papayaya & Crisps</a>
                </li>
                <li>
                  <a href="#">Oatmeal</a>
                </li>
                <li>
                  <a href="#">Fresh Bananas</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="hero__search">
              <div className="hero__search__form">
                <form onSubmit={handleOnSubmit}>
                  <div className="hero__search__categories">
                    All Categories
                    <span className="arrow_carrot-down"></span>
                  </div>
                  <input
                    type="text"
                    placeholder="What do yo u need?"
                    name="search"
                    ref={searchInput}
                  />
                  <button type="submit" className="site-btn">
                    SEARCH
                  </button>
                </form>
              </div>
              <div className="hero__search__phone">
                <div className="hero__search__phone__icon">
                  <i className="fa fa-phone"></i>
                </div>
                <div className="hero__search__phone__text">
                  <h5>+65 11.188.888</h5>
                  <span>support 24/7 time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
