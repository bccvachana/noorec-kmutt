import React from "react";
import classes from "./Hamburger.module.scss";

const Hamburger = (props) => {
  const { isDropDown, setIsDropDown } = props;
  return (
    <div
      className={`AdminSideBar NavDropdown ${classes.Hamburger} ${
        isDropDown ? classes.ButtonActive : ""
      }`}
      onClick={() => {
        setIsDropDown(!isDropDown);
      }}
    >
      {[...Array(3)].map((_, i) => (
        <div key={i} className={`AdminSideBar NavDropdown ${classes.Bar}`} />
      ))}
    </div>
  );
};

export default Hamburger;
