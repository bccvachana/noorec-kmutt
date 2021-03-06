import React from "react";
import classes from "./Error.module.scss";
import { Link } from "react-router-dom";
import error from "../../../assets/error.svg";

const Error = (props) => {
  const { title, children, to, linkLabel } = props;
  return (
    <div className={classes.Container}>
      <img className={classes.Img} src={error} alt="error" />
      <div className={classes.Title}>{title ? title : "เกิดข้อผิดพลาด"}</div>
      {children ? <div className={classes.Detail}>{children}</div> : null}
      {to ? (
        <Link to={to} className={classes.Link}>
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
};

export default Error;
