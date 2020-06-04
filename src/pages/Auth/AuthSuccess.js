import React from "react";
import classes from "./Auth.module.scss";
import { useLocation, Redirect, Link } from "react-router-dom";
import queryString from "query-string";

import SuccessCheck from "../../components/UI/SuccessCheck/SuccessCheck";
import verifyEmailSuccess from "../../assets/web/Auth/verifyEmailSuccess.svg";
import resendEmail from "../../assets/web/Auth/resendEmail.svg";

const AuthSuccess = (props) => {
  const { search } = useLocation();
  const { mode } = queryString.parse(search);

  switch (mode) {
    case "signUp":
      return <SuccessSignUp />;
    case "verifyEmail":
      return <SuccessVerifyEmail />;
    case "resendVerifyEmail":
      return <SuccessResendVerifyEmail />;
    case "forgotPassword":
      return <SuccessForgotPassword />;
    case "resetPassword":
      return <SuccessResetPassword />;
    default:
      return <Redirect to="/" />;
  }
};

export default AuthSuccess;

const SuccessSignUp = (props) => {
  const { search } = useLocation();
  const { email } = queryString.parse(search);
  return (
    <React.Fragment>
      {email ? (
        <React.Fragment>
          <SuccessCheck />
          <div className={classes.Title}>สมัครสมาชิกสำเร็จ</div>
          <div className={classes.Detail}>
            <div>ระบบได้ส่งลิงค์ยืนยันไปที่</div> <div>{email}</div>
            <br />
            <div>กรุณาตรวจสอบอีเมลของคุณ</div>
            <div>และทำการยืนยันการสมัครสมาชิก</div>
          </div>
        </React.Fragment>
      ) : (
        <Redirect to="/" />
      )}
    </React.Fragment>
  );
};

const SuccessVerifyEmail = (props) => {
  const { search } = useLocation();
  const { oobCode } = queryString.parse(search);
  return (
    <React.Fragment>
      {oobCode ? (
        <React.Fragment>
          <img
            className={classes.Img}
            src={verifyEmailSuccess}
            alt="verifyEmailSuccess"
          />
          <div className={classes.Title}>ยืนยันอีเมลสำเร็จ</div>
          <Link to="/signIn" className={classes.Link}>
            คลิกที่นี่เพื่อเข้าสู่ระบบ
          </Link>
        </React.Fragment>
      ) : (
        <Redirect to="/" />
      )}
    </React.Fragment>
  );
};

const SuccessResendVerifyEmail = (props) => {
  const { search } = useLocation();
  const { email } = queryString.parse(search);
  return (
    <React.Fragment>
      {email ? (
        <React.Fragment>
          <img
            className={classes.Img}
            src={resendEmail}
            alt="resendEmail"
            style={{ height: "9.7rem" }}
          />
          <div className={classes.Title}>อีเมลยืนยันถูกส่งแล้ว</div>
          <div className={classes.Detail}>
            <div>ระบบได้ส่งลิงค์ยืนยันไปที่</div> <div>{email}</div>
            <br />
            <div>กรุณาตรวจสอบอีเมลของคุณ</div>
            <div>และทำการยืนยันการสมัครสมาชิก</div>
          </div>
        </React.Fragment>
      ) : (
        <Redirect to="/" />
      )}
    </React.Fragment>
  );
};

const SuccessForgotPassword = (props) => {
  const { search } = useLocation();
  const { email } = queryString.parse(search);
  return (
    <React.Fragment>
      {email ? (
        <React.Fragment>
          <img
            className={classes.Img}
            src={resendEmail}
            alt="resendEmail"
            style={{ height: "9.7rem" }}
          />
          <div className={classes.Title}>อีเมลรีเซ็ตรหัสผ่านถูกส่งแล้ว</div>
          <div className={classes.Detail}>
            <div>ระบบได้ส่งลิงค์รีเซ็ตรหัสผ่านไปที่</div> <div>{email}</div>
            <br />
            <div>กรุณาดำเนินการตามคำแนะนำในอีเมล</div>
            <div>เพื่อรีเซ็ตรหัสผ่านของคุณ</div>
          </div>
        </React.Fragment>
      ) : (
        <Redirect to="/" />
      )}
    </React.Fragment>
  );
};

const SuccessResetPassword = (props) => {
  const { search } = useLocation();
  const { oobCode } = queryString.parse(search);
  return (
    <React.Fragment>
      {oobCode ? (
        <React.Fragment>
          <SuccessCheck />
          <div className={classes.Title}>รีเซ็ตรหัสผ่านสำเร็จ</div>
          <Link to="/signIn" className={classes.Link}>
            คลิกที่นี่เพื่อเข้าสู่ระบบ
          </Link>
        </React.Fragment>
      ) : (
        <Redirect to="/" />
      )}
    </React.Fragment>
  );
};
