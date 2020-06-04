import React, { useEffect, useState, useContext } from "react";
import classes from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.svg";

import { Context } from "../../../App";

const notSignInNav = [
  { path: "/", title: "หน้าหลัก" },
  { path: "/signIn", title: "เข้าสู่ระบบ" },
  { path: "/signUp", title: "สมัครสมาชิก", color: "#fa5458" },
];

const signInNav = [
  { path: "/", title: "หน้าหลัก" },
  { path: "/signIn", title: "เข้าสู่ระบบ" },
];

const NavBar = (props) => {
  const { isSignUp, isSignIn } = useContext(Context);
  const [nav, setNav] = useState(null);

  useEffect(() => {
    const checkNav = isSignIn && !isSignUp ? signInNav : notSignInNav;
    setNav(checkNav);
  }, [isSignIn]);

  return (
    <div className={classes.NavBar}>
      <NavLink className={classes.Logo} exact to={"/"}>
        <img src={logo} alt="logo" />
      </NavLink>
      {nav ? (
        <div className={classes.Container}>
          {nav.map(({ path, title, color }) => (
            <NavLink
              key={path}
              exact
              to={path}
              className={classes.Link}
              activeClassName="NavLinkActive"
            >
              {title}
            </NavLink>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;
