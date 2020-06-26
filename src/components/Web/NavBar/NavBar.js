import React, { useState, useContext, useRef } from "react";
import classes from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";

import Hamburger from "../Hamburger/Hamburger";
import withDeviceDetect from "../../../hoc/withDeviceDetect";

import logo from "../../../assets/logo.svg";
import chatIcon from "../../../assets/chat.svg";
import profileSvg from "../../../assets/profile.svg";
import edit from "../../../assets/web/NavBar/edit.svg";

import { Context } from "../../../App";

const signInNav = [
  { path: "/", title: "หน้าหลัก" },
  { path: "/record", title: "ตรวจสุขภาพ" },
  { path: "/result", title: "บันทึกข้อมูลสุขภาพ" },
  { path: "/article", title: "บทความ" },
];

const NavBar = (props) => {
  const { device } = props;
  const { userState, isSignUp, profileImg, userChat } = useContext(Context);
  const [isDropDown, setIsDropDown] = useState(false);
  const dropDownMobileRef = useRef();
  const dropDownDesktopRef = useRef();

  const isSignInNav = !(!userState || userState === "notSignIn" || isSignUp)
    ? true
    : false;

  window.onclick = (event) => {
    if (dropDownMobileRef.current || dropDownDesktopRef.current) {
      const ref = device === "Mobile" ? dropDownMobileRef : dropDownDesktopRef;
      if (
        (!event.target.matches(".NavDropdown") &&
          !ref.current.contains(event.target)) ||
        event.target.tagName === "A"
      ) {
        setIsDropDown(false);
      }
    }
  };

  return (
    <React.Fragment>
      <div className={`${classes.NavBar} ${isSignInNav ? classes.SignIn : ""}`}>
        <div className={classes.Container}>
          <NavLink className={classes.Logo} exact to={"/"}>
            <img src={logo} alt="logo" />
          </NavLink>
          <div className={classes.LinkContainer}>
            <Nav />

            {isSignInNav ? (
              <React.Fragment>
                <NavLink
                  exact
                  to="/chat"
                  activeClassName="NavLinkActive"
                  id="NavChatIcon"
                >
                  <img src={chatIcon} alt="chatIcon" />
                  {userChat && !userChat.userRead ? (
                    <div className="NavChatUnread">{userChat.userUnread}</div>
                  ) : null}
                </NavLink>
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
              </React.Fragment>
            ) : null}
          </div>
          {isSignInNav && device === "Mobile" ? (
            <div>
              <NavLink
                exact
                to="/chat"
                id="NavChatIcon"
                className="NavChatMobile"
                style={{ marginRight: "1.5rem" }}
              >
                <img src={chatIcon} alt="chatIcon" />
                {userChat && !userChat.userRead ? (
                  <div className="NavChatUnread">{userChat.userUnread}</div>
                ) : null}
              </NavLink>
              <Hamburger
                isDropDown={isDropDown}
                setIsDropDown={setIsDropDown}
              />
            </div>
          ) : null}
        </div>
      </div>

      {isSignInNav && device === "Mobile" ? (
        <div
          className={`${classes.BackDrop} ${isDropDown ? classes.Active : ""}`}
        />
      ) : null}

      {isSignInNav && device === "Mobile" ? (
        <DropDownMobile
          isDropDown={isDropDown}
          dropDownMobileRef={dropDownMobileRef}
        />
      ) : null}

      {isSignInNav && device !== "Mobile" ? (
        <div
          className={`${classes.NavBar} ${classes.NavRef} ${
            isSignInNav ? classes.SignIn : ""
          }`}
        >
          <div className={classes.Container}>
            <DropDownDesktop
              isDropDown={isDropDown}
              dropDownDesktopRef={dropDownDesktopRef}
            />
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default withDeviceDetect(NavBar);

const Nav = (props) => {
  const { userState, isSignUp } = useContext(Context);

  return !userState || userState === "notSignIn" || isSignUp ? (
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

const DropDownMobile = (props) => {
  const { isDropDown, dropDownMobileRef } = props;
  const { profileImg, userData } = useContext(Context);
  return (
    <div
      className={`NavDropdown ${classes.DropDown} ${classes.DropDownMobile} ${
        isDropDown ? classes.Active : ""
      }`}
      ref={dropDownMobileRef}
    >
      <div className={classes.DropDownImgContainer}>
        <div className={classes.DropDownImg}>
          <img src={profileSvg} alt="profileSvg" />
          {profileImg ? (
            <div>
              <img src={profileImg} alt="profileSvg" />
            </div>
          ) : null}
        </div>
        <div className={classes.DropDownName}>
          <div
            style={{ backgroundColor: userData ? "transparent" : "#F1F2F3" }}
          >
            {userData ? `${userData.firstName} ${userData.lastName}` : ""}
          </div>
          <NavLink to="/editProfile" className={`Link ${classes.EditLink}`}>
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
  );
};

const DropDownDesktop = (props) => {
  const { isDropDown, dropDownDesktopRef } = props;
  const { profileImg, userData } = useContext(Context);
  return (
    <div
      className={`NavDropdown ${classes.DropDown} ${classes.DropDownDesktop} ${
        isDropDown ? classes.Active : ""
      }`}
      ref={dropDownDesktopRef}
    >
      <div className={classes.DropDownImg}>
        <img src={profileSvg} alt="profileSvg" />
        {profileImg ? (
          <div>
            <img src={profileImg} alt="profileSvg" />
          </div>
        ) : null}
      </div>
      <div className={classes.DropDownName}>
        <div style={{ backgroundColor: userData ? "transparent" : "#F1F2F3" }}>
          {userData ? `${userData.firstName} ${userData.lastName}` : ""}
        </div>
        <NavLink to="/editProfile" className={`Link ${classes.EditLink}`}>
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
