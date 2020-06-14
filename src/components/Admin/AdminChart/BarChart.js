import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import classes from "../../Result/Chart/Chart.module.scss";

import { barData, barOption } from "../../Result/Chart/BarChart/BarChartProps";
import {
  bPBarData,
  bPBarOption,
} from "../../Result/Chart/BarChart/BpBarChartProps";

import { ChartContext } from "./Chart";
import { AdminResultChartContext } from "../../../pages/Admin/AdminUser/AdminUserChart/AdminResultChart";

require("../../Result/Chart/BarChart/RoundedBar");

const BarChart = (props) => {
  const {
    chartWidth,
    containerWidth,
    data,
    isChartOverflow,
    scroll,
    isBloodPressure,
    chartOption,
    isScrollChart,
    isTransition,
  } = useContext(ChartContext);
  const { valueIndex, setValueIndex } = useContext(AdminResultChartContext);

  return (
    <div
      className={classes.BarContainer}
      style={{
        width: chartWidth,
        left: isChartOverflow
          ? isScrollChart
            ? -chartWidth + containerWidth - scroll
            : 0
          : 0,
        transition: isTransition ? "all 1.5s ease-in-out" : "",
      }}
    >
      <Bar
        data={
          !isBloodPressure
            ? barData(data, valueIndex)
            : bPBarData(data, valueIndex)
        }
        options={
          !isBloodPressure ? barOption(chartOption) : bPBarOption(chartOption)
        }
        onElementsClick={(elememt) => {
          if (elememt[0]) {
            setValueIndex(elememt[0]._index);
          }
        }}
        redraw={!isScrollChart}
      />
    </div>
  );
};

export default BarChart;
