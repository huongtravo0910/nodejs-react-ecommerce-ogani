import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {withRouter} from 'react-router-dom';
import { Link } from "react-router-dom";
import { update, logout } from "../actions/userAction";

function ProfilePage(props) {
  const registerStyle = {
    marginBottom: "20px",
    float: "right",
  };

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, name, email, password }));
    console.log("success: "+ success);
    success && alert("Profile saved");
    console.log("Hello")
};
  const logoutHandler = () => {
    dispatch(logout());
    props.history.push("/login");
  };


  return (
    <div>
      <section className="checkout spad">
        <div className="container">
          <div className="checkout__form">
            <h4>
              Profile
              <button
                style={registerStyle}
                className="primary-btn cart-btn"
                type="submit"
                onClick={logoutHandler}
              >
                Log out
              </button>
            </h4>
            <form onSubmit={submitHandler}>
              <div className="row">
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {success && <div>Profile Saved Successfully.</div>}
                <div className="col-lg-12 col-md-6">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="checkout__input">
                        <p>
                          Username<span>*</span>
                        </p>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="checkout__input">
                        <p>
                          Email<span>*</span>
                        </p>
                        <input
                          type="text"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="checkout__input">
                        <p>
                          Password<span>*</span>
                        </p>
                        <input
                          type="password"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="site-btn">
                        Update profile
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


export default withRouter(ProfilePage);
