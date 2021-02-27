import React from "react";
import "../sass/style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEnvelope, faMapMarked, faPhone } from "@fortawesome/free-solid-svg-icons";

export function ContactInfo() {
  return (
    <section className="contact spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 text-center">
            <div className="contact__widget">
              <FontAwesomeIcon icon={faPhone} className="icon" size="lg"/>
              <h4>Phone</h4>
              <p>+01-3-8888-6868</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 text-center">
            <div className="contact__widget">
              <FontAwesomeIcon icon={faMapMarked} className="icon" size="lg"/>
              <h4>Address</h4>
              <p>60-49 Road 11378 New York</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 text-center">
            <div className="contact__widget">
            <FontAwesomeIcon icon={faClock} className="icon" size="lg"/>
              <h4>Open time</h4>
              <p>10:00 am to 23:00 pm</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 text-center">
            <div className="contact__widget">
            <FontAwesomeIcon icon={faEnvelope} className="icon" size="lg"/>
              <h4>Email</h4>
              <p>hello@colorlib.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactForm() {
  return (
    <div className="contact-form spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="contact__form__title">
              <h2>Leave Message</h2>
            </div>
          </div>
        </div>
        <form action="#">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <input type="text" placeholder="Your name" />
            </div>
            <div className="col-lg-6 col-md-6">
              <input type="text" placeholder="Your Email" />
            </div>
            <div className="col-lg-12 text-center">
              <textarea placeholder="Your message"></textarea>
              <button type="submit" className="site-btn">
                SEND MESSAGE
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

