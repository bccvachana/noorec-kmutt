import React, { useContext } from "react";
import classes from "../../../Result/ResultSlide/ChartDetail/ChartDetail.module.scss";

import ValueInfo from "../../../../components/Result/ValueInfo/ValueInfo";

import { AdminResultChartContext } from "./AdminResultChart";

import criteriaStatic from "../../../Result/static/criteriaStatic";
import infoStatic from "../../../Result/static/infoStatic";

import { parseTime } from "../../../../utils/moment";

const AdminChartDetail = (props) => {
  const { record, type } = props;
  const { valueIndex } = useContext(AdminResultChartContext);

  let detail;

  switch (type) {
    case "weightHeight": {
      const { weight, height, bmi, criteria, createdAt } = record.weightHeight;
      detail = (
        <React.Fragment>
          <div className={classes.Row}>
            <ValueInfo type="weight" data={weight} valueIndex={valueIndex} />
            <div className={classes.RowSpace} />
            <ValueInfo type="height" data={height} valueIndex={valueIndex} />
          </div>
          <div className={`${classes.Row} ${classes.CriteriaRow}`}>
            <div className="InfoTitle">BMI</div>
            <div className="InfoValue">{bmi[valueIndex]}</div>
            <div className={`InfoCriteria ${classes.Criteria}`}>
              {criteriaStatic["bmi"][criteria[valueIndex]].title}
            </div>
          </div>
          <div className={`${classes.Row} ${classes.Time} InfoUnit`}>
            {parseTime(createdAt[valueIndex])}
          </div>
        </React.Fragment>
      );
      break;
    }
    case "bloodPressure": {
      const {
        bloodPressureHigh,
        bloodPressureLow,
        criteria,
        createdAt,
      } = record.bloodPressure;
      detail = (
        <React.Fragment>
          <div className={classes.Row}>
            <ValueInfo
              type="bloodPressureHigh"
              data={bloodPressureHigh}
              valueIndex={valueIndex}
            />
            <div className={classes.RowSpace} />
            <ValueInfo
              type="bloodPressureLow"
              data={bloodPressureLow}
              valueIndex={valueIndex}
            />
          </div>
          <div className={`${classes.Row} ${classes.CriteriaRow}`}>
            <div className={`InfoCriteria ${classes.Criteria}`}>
              {criteriaStatic["bloodPressure"][criteria[valueIndex]].title}
            </div>
          </div>
          <div className={`${classes.Row} ${classes.Time} InfoUnit`}>
            {parseTime(createdAt[valueIndex])}
          </div>
        </React.Fragment>
      );
      break;
    }
    default: {
      const data = record[type][type];
      const criteria = record[type].criteria;
      const createdAt = record[type].createdAt;
      detail = (
        <React.Fragment>
          <div className={`${classes.Row} InfoTitle`}>
            {infoStatic[type].title}
          </div>
          <div className={classes.Row}>
            <ValueInfo
              type={type}
              data={data}
              valueIndex={valueIndex}
              noTitle
            />
            <div className={classes.RowSpaceCriteria}></div>
            <div className={`InfoCriteria ${classes.Criteria}`}>
              {criteriaStatic[type][criteria[valueIndex]].title}
            </div>
          </div>
          <div className={`${classes.Row} ${classes.Time} InfoUnit`}>
            {parseTime(createdAt[valueIndex])}
          </div>
        </React.Fragment>
      );
      break;
    }
  }

  return detail;
};

export default AdminChartDetail;
