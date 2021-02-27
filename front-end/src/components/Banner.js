import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

export default function Banner() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const url = "/cart/" + userInfo._id;
  return (
    // Banner Begin
    <div class="banner">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-6">
            <div class="banner__pic">
            <Link to={url}>
                <img src={require("../img/banner/banner-1.jpg")} alt="" />
              </Link>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <div class="banner__pic">
              <Link to={url}>
                <img src={require("../img/banner/banner-2.jpg")} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    //Banner End
  );
}
