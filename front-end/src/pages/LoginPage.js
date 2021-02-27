import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/userAction";

export default function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;
  const dispatch = useDispatch();
  const registerStyle = {
    marginBottom: "20px",
    float: "right",
  };

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div>
      <section className="checkout spad">
        <div className="container">
          <div className="checkout__form">
            <h4>
              Login
              <Link
                style={registerStyle}
                to="/register"
                className="primary-btn cart-btn"
              >
                Register
              </Link>
            </h4>
            <form onSubmit={submitHandler}>
              <div className="row">
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                <div className="col-lg-12 col-md-6">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="checkout__input">
                        <p>
                          Email<span>*</span>
                        </p>
                        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="checkout__input">
                        <p>
                          Password<span>*</span>
                        </p>
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                      </div>
                      <button type="submit" className="site-btn">
                        NEXT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
