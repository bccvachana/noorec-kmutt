import React from "react";
import classes from "./Auth.module.scss";
import { useLocation, Link } from "react-router-dom";
import queryString from "query-string";

import error from "../../assets/error.svg";

const AuthError = (props) => {
  const { search } = useLocation();
  const { mode } = queryString.parse(search);

  switch (mode) {
    case "verifyEmail":
      return <ErrorVerifyEmail />;
    case "resetPassword":
      return <ErrorResetPassword />;
    default:
      return <ErrorDefault />;
  }
};

export default AuthError;

const ErrorVerifyEmail = (props) => {
  return (
    <React.Fragment>
      <img className={classes.Img} src={error} alt="error" />
      <div className={classes.Title}>เกิดข้อผิดพลาด</div>
      <div className={classes.Detail}>
        <div>คุณได้ยืนยันอีเมลนี้ไปแล้ว</div>
        <div>หรืออีเมลยืนยันหมดอายุ</div>
      </div>
      <Link to="/" className={classes.Link}>
        กลับสู่หน้าหลัก
      </Link>
    </React.Fragment>
  );
};

const ErrorResetPassword = (props) => {
  return (
    <React.Fragment>
      <img className={classes.Img} src={error} alt="error" />
      <div className={classes.Title}>เกิดข้อผิดพลาด</div>
      <div className={classes.Detail}>
        <div>คุณได้รีเซ็ตรหัสผ่านไปแล้ว</div>
        <div>หรืออีเมลรีเซ็ตรหัสผ่านหมดอายุ</div>
      </div>
      <Link to="/" className={classes.Link}>
        กลับสู่หน้าหลัก
      </Link>
    </React.Fragment>
  );
};

const ErrorDefault = (props) => {
  return (
    <React.Fragment>
      <img className={classes.Img} src={error} alt="error" />
      <div className={classes.Title}>เกิดข้อผิดพลาด</div>
      <div className={classes.Detail}>
        <div>โปรดลองอีกครั้งในภายหลัง</div>
      </div>
      <Link to="/" className={classes.Link}>
        กลับสู่หน้าหลัก
      </Link>
    </React.Fragment>
  );
};
