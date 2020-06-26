import React, { useContext, useEffect, useState } from "react";
import classes from "./Main.module.scss";
import { Link } from "react-router-dom";

import heartSvg from "../../assets/web/Main/heart.svg";
import infoStatic from "../Result/static/infoStatic";

import { Context } from "../../App";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { filterArticle } from "../../utils/article";

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
  const { userData, article } = useContext(Context);
  const [mainArticle, setMainArticle] = useState(null);

  useEffect(() => {
    if (userData && article) {
      setMainArticle(filterArticle(article, userData, 4));
    }
  }, [userData, article]);

  useEffect(() => {
    if (mainArticle) props.delaySetIsLoadingFalse();
  }, [mainArticle]);

  return userData && mainArticle ? (
    <div className={classes.Page}>
      <div className={classes.Title}>
        <div className={classes.Hello}>สวัสดี,</div>
        <div className={classes.Name}>
          คุณ <span style={{ color: "#fa5458" }}>{userData.firstName}</span>
        </div>
      </div>
      <Link to="/record" className={classes.RecordButton}>
        <img src={heartSvg} alt="heartSvg" />
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
                  ? userData[type]
                    ? userData[type]
                    : "--"
                  : userData.bloodPressureHigh
                  ? `${userData.bloodPressureHigh} | ${userData.bloodPressureLow}`
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
      <div className={classes.ArticleTitle}>
        บทความแนะนำสำหรับคุณ
        <Link to="/article" className="Link">
          ดูทั้งหมด
        </Link>
      </div>
      <div className={classes.Article}>
        {mainArticle.map((id) => (
          <ArticleCard key={id} path="Main" id={id} />
        ))}
      </div>
    </div>
  ) : null;
};

export default Main;
