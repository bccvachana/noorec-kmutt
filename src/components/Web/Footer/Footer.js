import React, { useContext } from "react";
import classes from "./Footer.module.scss";
import { NavLink } from "react-router-dom";

import logo from "../../../assets/web/Footer/logo.svg";
import heart from "../../../assets/web/Footer/heart.svg";

import { Context } from "../../../App";

const Footer = (props) => {
  const { isSignIn } = useContext(Context);

  return !isSignIn ? (
    <div className={classes.Footer}>
      <div className={classes.Container}>
        <NavLink exact to={"/"}>
          <img
            className={classes.logo}
            src={logo}
            alt="logo"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          />
        </NavLink>
        <div className={classes.Caption}>
          <div>Web Application and Device</div>{" "}
          <div>for Basic Medical Data Recording</div>
        </div>
        <div className={classes.Caption}>
          <div>
            Made with <img className={classes.Heart} src={heart} alt="heart" />{" "}
            by Vachana & Phanomrat ©2020
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Footer;
