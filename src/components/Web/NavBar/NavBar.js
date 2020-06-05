import React, { useState, useContext } from "react";
import classes from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import profileSvg from "../../../assets/profile.svg";
import edit from "../../../assets/web/NavBar/edit.svg";
import Hamburger from "../Hamburger/Hamburger";

import { Context } from "../../../App";

const signInNav = [
  { path: "/", title: "หน้าหลัก" },
  { path: "/signIn", title: "ตรวจสุขภาพ" },
  { path: "/signIn1", title: "บันทึกข้อมูลสุขภาพ" },
  { path: "/signIn2", title: "บทความ" },
];

const NavBar = (props) => {
  const { isSignIn, isSignUp, profileImg, userData } = useContext(Context);
  const [isDropDown, setIsDropDown] = useState(false);

  window.onclick = (event) => {
    if (!event.target.matches(".NavDropdown")) {
      setIsDropDown(false);
    }
  };

  return (
    <React.Fragment>
      <div
        className={`${classes.NavBar} ${
          isSignIn && !isSignUp ? classes.SignIn : ""
        }`}
      >
        <div className={classes.Container}>
          <NavLink className={classes.Logo} exact to={"/"}>
            <img src={logo} alt="logo" />
          </NavLink>
          <div className={classes.LinkContainer}>
            <Nav />
            {isSignIn && !isSignUp ? (
              <div
                className={`NavDropdown ${classes.ProfileImg}`}
                onClick={() => {
                  setIsDropDown(!isDropDown);
                }}
              >
                <img
                  className="NavDropdown"
                  src={profileSvg}
                  alt="profileSvg"
                />
                {profileImg ? (
                  <div className="NavDropdown">
                    <img
                      className="NavDropdown"
                      src={profileImg}
                      alt="profileSvg"
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          {isSignIn && !isSignUp ? (
            <Hamburger isDropDown={isDropDown} setIsDropDown={setIsDropDown} />
          ) : null}
        </div>
      </div>

      {isSignIn && !isSignUp ? (
        <div
          className={`${classes.NavBar} ${classes.NavRef} ${
            isSignIn && !isSignUp ? classes.SignIn : ""
          }`}
        >
          <div className={classes.Container}>
            <DropDownDesktop isDropDown={isDropDown} />
          </div>
        </div>
      ) : null}

      <div
        className={`NavDropdown ${classes.DropDownMobile} ${
          isDropDown ? classes.Active : ""
        }`}
      >
        <div className={classes.ProfileContainer}>
          <div className={classes.ProfileImg}>
            <img src={profileSvg} alt="profileSvg" />
            {profileImg ? (
              <div>
                <img src={profileImg} alt="profileSvg" />
              </div>
            ) : null}
          </div>
          <div className={classes.NameEdit}>
            <div
              style={{ backgroundColor: userData ? "transparent" : "#F1F2F3" }}
            >
              {userData ? `${userData.firstName} ${userData.lastName}` : ""}
            </div>
            <NavLink to="/" className={`Link ${classes.EditLink}`}>
              <img src={edit} alt="edit" />
              แก้ไขข้อมูล
            </NavLink>
          </div>
        </div>
        <div className={classes.Line} />
        <Nav />
        <NavLink to="/auth?mode=signOut" className={classes.Link}>
          ออกจากระบบ
        </NavLink>
      </div>
    </React.Fragment>
  );
};

export default NavBar;

const Nav = (props) => {
  const { isSignIn, isSignUp } = useContext(Context);

  return !(isSignIn && !isSignUp) ? (
    <React.Fragment>
      <NavLink
        exact
        to="/signIn"
        className={`${classes.Link} ${classes.SignInLink}`}
      >
        เข้าสู่ระบบ
      </NavLink>
      <NavLink
        exact
        to="/signUp"
        className={`${classes.Link} ${classes.SignUpLink}`}
      >
        สมัครสมาชิก
      </NavLink>
    </React.Fragment>
  ) : (
    <React.Fragment>
      {signInNav.map(({ path, title, color }) => (
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
    </React.Fragment>
  );
};

const DropDownDesktop = (props) => {
  const { isDropDown } = props;
  const { profileImg, userData } = useContext(Context);
  console.log(isDropDown);
  return (
    <div
      className={`NavDropdown ${classes.DropDownDesktop} ${
        isDropDown ? classes.Active : ""
      }`}
    >
      <div className={classes.ProfileImg}>
        <img src={profileSvg} alt="profileSvg" />
        {profileImg ? (
          <div>
            <img src={profileImg} alt="profileSvg" />
          </div>
        ) : null}
      </div>
      <div className={classes.NameEdit}>
        <div style={{ backgroundColor: userData ? "transparent" : "#F1F2F3" }}>
          {userData ? `${userData.firstName} ${userData.lastName}` : ""}
        </div>
        <NavLink to="/" className={`Link ${classes.EditLink}`}>
          <img src={edit} alt="edit" />
          แก้ไขข้อมูล
        </NavLink>
      </div>
      <NavLink
        to="/auth?mode=signOut"
        className={`${classes.Link} ${classes.SignOut}`}
      >
        ออกจากระบบ
      </NavLink>
    </div>
  );
};
