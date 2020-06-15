import React from "react";
import Error from "../../components/UI/Error/Error";
import classes from "./ErrorRoute.module.scss";

const ErrorRoute = (props) => {
  return (
    <Error title="ไม่พบหน้าที่คุณต้องการ" to="/" linkLabel="กลับสู่หน้าหลัก">
      กรุณาตรวจสอบลิงค์ของคุณ
    </Error>
  );
};
export default ErrorRoute;
