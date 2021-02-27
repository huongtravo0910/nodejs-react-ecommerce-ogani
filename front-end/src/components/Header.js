import React from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEnvelope, faHeart, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faLinkedin, faPinterest, faTwitter } from "@fortawesome/free-brands-svg-icons"

export default function Header() {
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
  return (
    <header className="header">
    <div className="header__top">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <div className="header__top__left">
                        <ul>
                            <li><FontAwesomeIcon icon={faEnvelope}/>hello@colorlib.com</li>
                            <li>Free Shipping for all Order of $99</li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="header__top__right">
                        <div className="header__top__right__social">
                            <a href="#"><FontAwesomeIcon icon={faFacebook}/></a>
                            <a href="#"><FontAwesomeIcon icon={faTwitter}/></a>
                            <a href="#"><FontAwesomeIcon icon={faLinkedin}/></a>
                            <a href="#"><FontAwesomeIcon icon={faPinterest}/></a>
                        </div>
                        <div className="header__top__right__language">
                            <img src={require("../img/language.png")} alt=""/>
                            <div>English</div>
                            <span className="arrow_carrot-down"></span>
                            <ul>
                                <li><a href="#">Spanis</a></li>
                                <li><a href="#">English</a></li>
                            </ul>
                        </div>
                        <div className="header__top__right__auth">
                            {   
                                userInfo? <Link to="/profile"><FontAwesomeIcon icon={faUser}/> {userInfo.name}</Link>:
                                <Link to="/login"><FontAwesomeIcon icon={faUser}/> Log in</Link>
                            }                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-lg-3">
                <div className="header__logo">
                    <Link to="/"><img src={require("../img/logo.png")} alt="logo"/></Link>
                </div>
            </div>
            <div className="col-lg-6">
                <nav className="header__menu">
                    <ul>
                        <li className="active"><Link to="/">Home</Link></li>
                        <li><Link to="/shopping">Shopping</Link></li>
                        <li><a href="#">Pages</a>
                            <ul className="header__menu__dropdown">
                                <li><a href="./shop-details.html">Shop Details</a></li>
                                <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                                <li><a href="./checkout.html">Check Out</a></li>
                                <li><a href="./blog-details.html">Blog Details</a></li>
                            </ul>
                        </li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="col-lg-3">
                <div className="header__cart">
                    <ul>
                        <li><a href="#" className="icon"><FontAwesomeIcon icon={faHeart}/><span>1</span></a></li>
                        <li><a href="#" className="icon"><FontAwesomeIcon icon={faShoppingBag}/><span>3</span></a></li>
                    </ul>
                    <div className="header__cart__price">item: <span>$150.00</span></div>
                </div>
            </div>
        </div>
        <div className="humberger__open">
        <FontAwesomeIcon icon={faBars}/>
        </div>
    </div>
</header>
  );
}
