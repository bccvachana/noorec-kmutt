import React, { useContext, useState, useEffect } from "react";
import classes from "./Record.module.scss";
import record1 from "../../assets/web/Record/record1.svg";
import record2 from "../../assets/web/Record/record2.svg";

import { Context } from "../../App";
const QRCode = require("easyqrcodejs");

const Record = (props) => {
  const { user, userData } = useContext(Context);

  const [widthRef, setWidthRef] = useState(0);

  useEffect(() => {
    const recordRef = document.getElementById("RecordRef");
    const timer = setTimeout(() => {
      setWidthRef(recordRef.clientWidth);
    }, 200);
    window.addEventListener("resize", () => {
      setWidthRef(recordRef.clientWidth);
    });
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (user && userData) {
      const options = {
        width: 300,
        height: 300,
        text: JSON.stringify({ uid: user.uid, name: userData.firstName }),
        colorDark: "#3b4251",
        correctLevel: QRCode.CorrectLevel.L,
        quietZone: 20,
        PO: "#fa5458",
      };
      new QRCode(document.getElementById("qr"), options);
    }
  }, [user, userData]);

  return (
    <React.Fragment>
      <div className={classes.Container}>
        <div
          className={classes.ImgContainer}
          style={{ width: `${widthRef}px` }}
        >
          <img id="RecordRef" src={record1} alt="record1" />
          <div
            id="qr"
            className={classes.QrContainer}
            style={{ width: widthRef, height: widthRef }}
          >
            <img className={classes.Hand} src={record2} alt="record2" />
          </div>
        </div>
        <div>
          <div className="PageTitle">ตรวจสุขภาพ</div>
          นำ QR CODE ไปสแกนที่เครื่อง
          <br />
          และทำตามขั้นตอนที่ระบุ
        </div>
      </div>
    </React.Fragment>
  );
};

export default Record;
