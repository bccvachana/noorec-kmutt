import React from "react";
import classes from "./Auth.module.scss";
import { Link } from "react-router-dom";

import verifyEmail from "../../assets/web/Auth/verifyEmail.svg";

const AuthVerifyEmail = (props) => {
  return (
    <React.Fragment>
      <img className={classes.Img} src={verifyEmail} alt="verifyEmail" />
      <div className={classes.Title}>กรุณายืนยันอีเมลของคุณ</div>
      <div className={classes.Detail}>
        <div>ตรวจสอบอีเมลของคุณ</div>
        <div>และทำการยืนยันการสมัครสมาชิก</div>
      </div>
      <Link to="/auth?mode=resendVerifyEmail" className={classes.Link}>
        ส่งอีเมลยืนยันอีกครั้ง
      </Link>
    </React.Fragment>
  );
};

export default AuthVerifyEmail;
