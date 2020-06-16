import React, { useContext } from "react";
import Error from "../../components/UI/Error/Error";
import classes from "./ErrorRoute.module.scss";
import { Context } from "../../App";

const ErrorRoute = (props) => {
  const { userState } = useContext(Context);

  return (
    <Error
      title="ไม่พบหน้าที่คุณต้องการ"
      to={userState === "admin" ? "/admin" : "/"}
      linkLabel="กลับสู่หน้าหลัก"
    >
      กรุณาตรวจสอบลิงค์ของคุณ
    </Error>
  );
};
export default ErrorRoute;
