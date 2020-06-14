import React, { useState } from "react";
import classes from "../../../Result/ResultSlide/ResultSlide.module.scss";
import userClasses from "../AdminUser.module.scss";

import Chart from "../../../../components/Admin/AdminChart/Chart";
import ChartDetail from "./AdminChartDetail";
import chartIcon from "../../../../assets/Result/chart.svg";

export const AdminResultChartContext = React.createContext();

const resultChartStatic = {
  weightHeight: ["weight", "height", "bmi"],
  temperature: ["temperature"],
  bloodPressure: ["bloodPressureHigh", "bloodPressureLow"],
  rate: ["rate"],
  oxygen: ["oxygen"],
};

const AdminResultChart = (props) => {
  const { record, type } = props;

  const [valueIndex, setValueIndex] = useState(
    record && record[type]
      ? record[type][resultChartStatic[type][0]].length - 1
      : null
  );

  const isBloodPressure = type === "bloodPressure";

  return record && record[type] ? (
    <AdminResultChartContext.Provider
      value={{
        valueIndex: valueIndex,
        setValueIndex: setValueIndex,
        isBloodPressure: isBloodPressure,
      }}
    >
      <ChartDetail {...props} />
      <div id="ChartContainerRef" className={classes.Chart}>
        <Chart
          data={
            !isBloodPressure
              ? resultChartStatic[type].map((key) => {
                  return { type: key, data: record[type][key] };
                })
              : [
                  {
                    type: "bloodPressure",
                    data: resultChartStatic[type].map(
                      (key) => record[type][key]
                    ),
                  },
                ]
          }
        />
      </div>
    </AdminResultChartContext.Provider>
  ) : (
    <React.Fragment>
      <img className={userClasses.NoDataImg} src={chartIcon} alt="chartIcon" />
      <div className={userClasses.NoDataTitle}>ไม่พบข้อมูล</div>
    </React.Fragment>
  );
};

export default AdminResultChart;
