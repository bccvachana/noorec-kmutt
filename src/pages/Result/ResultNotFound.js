import React, { useEffect } from "react";
import classes from "./Result.module.scss";
import { Link } from "react-router-dom";
import error from "../../assets/web/Auth/error.svg";

const ResultNotFound = (props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

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
