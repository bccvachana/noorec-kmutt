import React, { useContext, useEffect } from "react";
import classes from "./Overview.module.scss";

import { Context } from "../../../App";

import infoStatic from "../static/infoStatic";
import criteriaStatic from "../static/criteriaStatic";
import profileSvg from "../../../assets/profile.svg";

const Overview = (props) => {
  const { setIsLoading } = props;
  const { profileImg, userData } = useContext(Context);

  useEffect(() => {
    let timer;
    document.getElementById("OverviewImg").onload = () => {
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <div className={classes.Profile}>
        <div className={classes.Img}>
          <img src={profileSvg} alt="profileSvg" />
          {profileImg ? (
            <div>
              <img id="OverviewImg" src={profileImg} alt="profileSvg" />
            </div>
          ) : null}
        </div>
        <div className={classes.Text}>
          บันทึกข้อมูลสุขภาพ
          <div className={classes.Detail}>ของคุณ{userData.firstName}</div>
        </div>
      </div>
      <div className={classes.Row}>
        <OverviewInfo type="weight" />
        <div className={classes.Space}></div>
        <OverviewInfo type="height" />
      </div>
      <div className={classes.Row}>
        <OverviewInfo type="bmi" />
        <div className={classes.Space}></div>
        <OverviewInfo type="temperature" />
      </div>
      <div className={classes.Row}>
        <OverviewInfo type="bloodPressure" />
      </div>
      <div className={classes.Row}>
        <OverviewInfo type="rate" />
        <div className={classes.Space}></div>
        <OverviewInfo type="oxygen" />
      </div>
    </React.Fragment>
  );
};

export default Overview;

const OverviewInfo = (props) => {
  const { type } = props;
  const { recentRecord } = useContext(Context);
  const { title, unit } = infoStatic[type];

  return (
    <div
      className={`${classes.Info} ${
        type === "weight" || type === "height" ? classes.WeightHeight : ""
      } ${type === "bloodPressure" ? classes.BloodPressure : ""}`}
    >
      <div className={`InfoTitle ${classes.InfoTitle}`}>{title}</div>
      <div className={classes.ValueContainer}>
        {type !== "bloodPressure" ? (
          <div className={classes.Value}>
            {recentRecord[type] ? recentRecord[type] : "--"}
            {unit ? (
              <span className="InfoUnit">
                &nbsp;&nbsp;
                {unit}
              </span>
            ) : null}
          </div>
        ) : (
          <div className={classes.Value}>
            {recentRecord["bloodPressureHigh"]
              ? recentRecord["bloodPressureHigh"]
              : "--"}
            <span className={classes.BloodPressureLine}> | </span>
            {recentRecord["bloodPressureLow"]
              ? recentRecord["bloodPressureLow"]
              : "--"}
            <span className="InfoUnit">&nbsp;&nbsp;{unit}</span>
          </div>
        )}
        {recentRecord[`${type}Criteria`] ? (
          type !== "weight" && type !== "height" ? (
            <div className="InfoCriteria">
              {criteriaStatic[type][recentRecord[`${type}Criteria`]].title}
            </div>
          ) : null
        ) : null}
      </div>
    </div>
  );
};
