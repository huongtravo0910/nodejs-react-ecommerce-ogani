import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userAction";

export default function RegisterPage(props) {
  const checkboxStyle = {
    width: " auto",
    marginRight: "10px",
    height: "auto",
    border: "1px solid #ebebeb",
    paddingLeft: "0px",
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
    console.log(name);
    console.log(email);
    console.log(password);
  };

  return (
    <div>
      <section class="checkout spad">
        <div class="container">
          <div class="checkout__form">
            <h4>Register</h4>
            <form onSubmit={handleSubmit}>
              <div class="row">
                <div class="col-lg-12 col-md-6">
                  <div class="row">
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    <div class="col-lg-12">
                      <div class="checkout__input">
                        <p>
                          Username<span>*</span>
                        </p>
                        <input
                          type="text"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="checkout__input">
                        <p>
                          Email<span>*</span>
                        </p>
                        <input
                          type="text"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="checkout__input">
                        <p>
                          Password<span>*</span>
                        </p>
                        <input
                          type="password"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="checkout__input">
                        <p>
                          RePassword<span>*</span>
                        </p>
                        <input
                          type="password"
                          name="rePassword"
                          onChange={(e) =>
                            setRePassword(e.target.value)
                          }
                        />
                      </div>
                      <button id="btn" type="submit" class="site-btn">
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
