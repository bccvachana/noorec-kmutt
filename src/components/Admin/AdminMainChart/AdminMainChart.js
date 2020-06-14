import React, { useContext, useState, useEffect } from "react";
import classes from "./AdminMainChart.module.scss";

const AdminMainChart = (props) => {
  const { criteriaKey, data } = props;

  return criteriaKey && data ? (
    <div className={classes.Container}>
      {criteriaKey.map((key, i) => (
        <div key={key} className={classes.HorizontalBar}>
          <div className={classes.Label}>{key}</div>
          <div className={classes.BarContainer}>
            <div
              className={classes.Bar}
              style={{
                width: `calc(${(data[i] * 100) / Math.max(...data)}% - 6rem)`,
                marginRight: data[i] > 0 ? "0.5rem" : 0,
              }}
            ></div>
            <div className={classes.ValueLabel}>{data[i]}</div>
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default AdminMainChart;
