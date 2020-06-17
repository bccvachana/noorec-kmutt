import React, { useState, useRef, useEffect, useContext } from "react";
import classes from "./AdminSideBar.module.scss";
import { NavLink } from "react-router-dom";

import logo from "../../../assets/logo.svg";
import Hamburger from "../../Web/Hamburger/Hamburger";
import withDeviceDetect from "../../../hoc/withDeviceDetect";
import { Context } from "../../../App";

const AdminSideBar = (props) => {
  const { device } = props;
  const [isSidebar, setIsSideBar] = useState(false);
  const sideBarRef = useRef();
  const [chatNum, setChatNum] = useState();

  const { chat } = useContext(Context);

  window.onclick = (event) => {
    if (sideBarRef.current) {
      if (
        (!event.target.matches(".AdminSideBar") &&
          !sideBarRef.current.contains(event.target)) ||
        event.target.tagName === "A" ||
        event.target.tagName === "IMG"
      ) {
        setIsSideBar(false);
      }
    }
  };

  useEffect(() => {
    if (chat) {
      let num = 0;
      Object.keys(chat).map((id) => {
        num = num + parseInt(chat[id].adminUnread);
        return null;
      });
      setChatNum(num);
    }
  }, [chat]);

  return (
    <React.Fragment>
      <div
        className={`${classes.SideBar} ${isSidebar ? classes.Active : ""} ${
          device === "Desktop" ? classes.Active : ""
        }`}
        ref={sideBarRef}
      >
        <NavLink className={classes.Logo} to={"/admin"}>
          <img src={logo} alt="logo" />- Admin -
        </NavLink>
        <div className={classes.LinkContainer}>
          <NavLink
            className={classes.Link}
            exact
            to={"/admin"}
            activeClassName="AdminLinkActive"
          >
            ภาพรวม
          </NavLink>
          <NavLink
            className={classes.Link}
            to={"/admin/users"}
            activeClassName="AdminLinkActive"
          >
            สมาชิก
          </NavLink>
          <NavLink
            className={`${classes.Link} ${classes.Chat}`}
            to={"/admin/chat"}
            activeClassName="AdminLinkActive"
          >
            แชท
            {chatNum ? (
              <div className="SideBarChatNumber">{chatNum}</div>
            ) : null}
          </NavLink>
          <NavLink
            className={classes.Link}
            to={"/admin/articles"}
            activeClassName="AdminLinkActive"
          >
            บทความ
          </NavLink>

          <NavLink className={classes.Link} to={"/auth?mode=signOut"}>
            ออกจากระบบ
          </NavLink>
        </div>
      </div>
      <div className={classes.Nav}>
        <NavLink className={classes.LogoNav} to={"/admin"}>
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className={`AdminSideBar ${classes.Hamburger}`}>
        <Hamburger isDropDown={isSidebar} setIsDropDown={setIsSideBar} />
      </div>
      {device !== "Desktop" ? (
        <div
          className={`${classes.BackDrop} ${isSidebar ? classes.Active : ""}`}
        />
      ) : null}
    </React.Fragment>
  );
};

export default withDeviceDetect(AdminSideBar);
