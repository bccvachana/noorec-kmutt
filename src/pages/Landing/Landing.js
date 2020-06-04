import React from "react";
import classes from "./Landing.module.scss";
import { Link } from "react-router-dom";

const Landing = (props) => {
  return (
    <React.Fragment>
      <div className={classes.HeadContainer}>
        <div className={classes.SignInRegister}>
          <div className={classes.Title}>เว็บแอปพลิเคชันและอุปกรณ์</div>
          <div className={classes.Detail}>
            สำหรับบันทึกข้อมูลสุขภาพเบื้องต้น
          </div>
          <div className={classes.ButtonContainer}>
            <Link to="/signIn" className={classes.SignInButton}>
              เข้าสู่ระบบ
            </Link>
            <Link to="/signUp" className={classes.SignUpButton}>
              สมัครสมาชิก
            </Link>
          </div>
        </div>
        <div className={classes.Character}></div>
      </div>
      <div className={classes.Feature}>
        <div className={classes.Title}>หนูเรคทำอะไรได้บ้าง ?</div>
        <div className={classes.Container}>
          <div>
            <div className={classes.FeatureImg}></div>
            <div className={classes.FeatureTitle}>บันทึก</div>
            บันทึกข้อมูลสุขภาพเบื้องต้นของคุณ
            <br />
            ให้คุณสามารถเข้าถึงได้ทุกที่ทุกเวลา
            <br />
            และตรวจเช็คผลย้อนหลังได้
          </div>
          <div>
            <div className={classes.FeatureImg}></div>
            <div className={classes.FeatureTitle}>วิเคราะห์</div>
            วิเคราะห์ข้อมูลสุขภาพเบื้องต้นของคุณ
            <br />
            และแสดงผลออกมาในรูปแบบ
            <br />
            ที่เข้าใจได้ง่าย
          </div>
          <div>
            <div className={classes.FeatureImg}></div>
            <div className={classes.FeatureTitle}>แนะนำ</div>
            แนะนำคอนเทนต์ดี ๆ เกี่ยวกับสุขภาพ
            <br />
            เพื่อให้คุณสามารถดูแลตัวเอง
            <br />
            ได้อย่างเหมาะสม
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Landing;