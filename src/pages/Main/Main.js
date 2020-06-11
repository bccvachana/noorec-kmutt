import React, { useContext, useEffect, useState } from "react";
import classes from "./Main.module.scss";
import { Link } from "react-router-dom";

import recordSvg from "../../assets/web/Main/record.svg";
import heartSvg from "../../assets/web/Main/heart.svg";
import infoStatic from "../Result/static/infoStatic";

import { Context } from "../../App";

const resultStatic = [
  "weight",
  "height",
  "bmi",
  "temperature",
  "bloodPressure",
  "rate",
  "oxygen",
];

const Main = (props) => {
  const { userData, recentRecord, article } = useContext(Context);
  const [mainArticle, setMainArticle] = useState(null);

  useEffect(() => {
    setMainArticle(
      article
        ? Object.keys(article).map((key) => {
            return article[key];
          })
        : null
    );
  }, [article]);

  return userData && recentRecord ? (
    <div className={classes.Page}>
      <div className={classes.Title}>
        <div className={classes.Hello}>สวัสดี,</div>
        <div className={classes.Name}>คุณ{userData.firstName}</div>
      </div>
      <Link to="/record" className={classes.RecordButton}>
        {/* <img src={recordSvg} alt="recordSvg" /> */}
        <div>
          <img src={heartSvg} alt="heartSvg" />
        </div>
        ตรวจสุขภาพ
      </Link>
      <div className={classes.Result}>
        <span className={classes.ResultTitle}>บันทึกข้อมูลสุขภาพ</span>
        {resultStatic.map((type) => {
          const { title, unit } = infoStatic[type];
          return (
            <div key={type}>
              {title}
              <div>
                {type !== "bloodPressure"
                  ? recentRecord[type]
                    ? recentRecord[type]
                    : "--"
                  : recentRecord.bloodPressureHigh
                  ? `${recentRecord.bloodPressureHigh} | ${recentRecord.bloodPressureLow}`
                  : "-- | --"}{" "}
                <span>{unit}</span>
              </div>
            </div>
          );
        })}
        <div>
          <Link to="/result" className={classes.ResultLink}>
            ดูเพิ่มเติม
          </Link>
        </div>
      </div>
      <div className={classes.ArticleTitle}>บทความแนะนำสำหรับคุณ</div>
      <div className={classes.Article}>
        {mainArticle
          ? mainArticle.map(({ title, image }) => (
              <div key={title} style={{ backgroundImage: `url("${image}")` }}>
                {title}
              </div>
            ))
          : null}
      </div>
    </div>
  ) : null;
};

export default Main;
