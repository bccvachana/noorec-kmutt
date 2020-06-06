import React, { useContext } from "react";
import classes from "./Overview.module.scss";

import { Context } from "../../../App";

import infoStatic from "../static/infoStatic";
import criteriaStatic from "../static/criteriaStatic";
import profileSvg from "../../../assets/profile.svg";

const Overview = (props) => {
  const { profileImg, userData } = useContext(Context);

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
  const { recordData } = useContext(Context);
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
            {recordData[type] ? recordData[type] : "--"}
            {unit ? (
              <span className="InfoUnit">
                &nbsp;&nbsp;
                {unit}
              </span>
            ) : null}
          </div>
        ) : (
          <div className={classes.Value}>
            {recordData["bloodPressureHigh"]
              ? recordData["bloodPressureHigh"]
              : "--"}
            <span className={classes.BloodPressureLine}> | </span>
            {recordData["bloodPressureLow"]
              ? recordData["bloodPressureLow"]
              : "--"}
            <span className="InfoUnit">&nbsp;&nbsp;{unit}</span>
          </div>
        )}
        {recordData[`${type}Criteria`] ? (
          type !== "weight" && type !== "height" ? (
            <div className="InfoCriteria">
              {criteriaStatic[type][recordData[`${type}Criteria`]].title}
            </div>
          ) : null
        ) : null}
      </div>
    </div>
  );
};
