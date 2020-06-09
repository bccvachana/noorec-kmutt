import React, { useContext } from "react";
import classes from "./ResultSlide.module.scss";

import { Context } from "../../../App";
import { ResultSlideContext } from "./ResultSlide";
import criteriaStatic from "../static/criteriaStatic";

const ResultCriteria = (props) => {
  const { Component } = props;
  const { recentRecord } = useContext(Context);
  const { type } = useContext(ResultSlideContext);

  const criteria =
    type === "weightHeight"
      ? recentRecord.bmiCriteria
      : recentRecord[`${type}Criteria`];
  const { title, detail } =
    type === "weightHeight"
      ? criteriaStatic.bmi[criteria]
      : criteriaStatic[type][criteria];

  return (
    <React.Fragment>
      <Component criteria={criteria} />
      <div className={classes.Criteria}>{title}</div>
      <div className={classes.CriteriaDetail}>{detail}</div>
    </React.Fragment>
  );
};

export default ResultCriteria;
