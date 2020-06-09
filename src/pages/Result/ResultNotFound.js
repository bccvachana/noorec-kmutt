import React from "react";
import classes from "./Result.module.scss";
import { Link } from "react-router-dom";
import error from "../../assets/web/Auth/error.svg";

const ResultNotFound = (props) => {
  return (
    <React.Fragment>
      <img className={classes.Img} src={error} alt="error" />
      <div className={classes.ResultTitle}>ไม่พบข้อมูลสุขภาพของคุณ</div>
      <Link to="/record" className="Link" style={{ marginTop: "1rem" }}>
        คลิกที่นี่เพื่อตรวจสุขภาพ
      </Link>
    </React.Fragment>
  );
};

export default ResultNotFound;
