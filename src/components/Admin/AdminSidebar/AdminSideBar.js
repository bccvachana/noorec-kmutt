import React, { useState, useRef, useEffect } from "react";
import classes from "./AdminSideBar.module.scss";
import { NavLink } from "react-router-dom";

import logo from "../../../assets/logo.svg";

const AdminSideBar = (props) => {
  return (
    <React.Fragment>
      <div className={classes.SideBar}>
        <NavLink className={classes.Logo} exact to={"/admin/main"}>
          <img src={logo} alt="logo" />- Admin -
        </NavLink>
        <div className={classes.LinkContainer}>
          <NavLink
            className={classes.Link}
            exact
            to={"/admin/main"}
            activeClassName="AdminLinkActive"
          >
            ภาพรวม
          </NavLink>
          <NavLink
            className={classes.Link}
            exact
            to={"/admin/users"}
            activeClassName="AdminLinkActive"
          >
            สมาชิก
          </NavLink>
          <NavLink
            className={classes.Link}
            to={"/admin/articles"}
            activeClassName="AdminLinkActive"
          >
            บทความ
          </NavLink>
        </div>
        <NavLink className={classes.SignOut} exact to={"/auth?mode=signOut"}>
          ออกจากระบบ
        </NavLink>
      </div>
    </React.Fragment>
  );
};

export default AdminSideBar;
