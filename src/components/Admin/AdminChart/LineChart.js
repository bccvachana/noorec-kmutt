import React, { useContext, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import classes from "../../Result/Chart/Chart.module.scss";

import {
  lineData,
  lineOption,
} from "../../Result/Chart/LineChart/LineChartProps";
import {
  bPLineData,
  bPLineOption,
} from "../../Result/Chart/LineChart/BpLineChartProps";

import { ChartContext } from "./Chart";
import { AdminResultChartContext } from "../../../pages/Admin/AdminUser/AdminUserChart/AdminResultChart";

const LineChart = (props) => {
  const {
    chartWidth,
    containerWidth,
    data,
    isChartOverflow,
    scroll,
    isBloodPressure,
    chartOption,
    isLineChart,
    isScrollChart,
    isTransition,
  } = useContext(ChartContext);
  const { valueIndex, setValueIndex } = useContext(AdminResultChartContext);

  return (
    <div
      className={`${classes.LineContainerOutside} ${
        isLineChart ? classes.LineChartActive : ""
      }`}
      style={{
        width: chartWidth,
      }}
    >
      <div
        className={classes.LineContainerInside}
        style={{
          left: isChartOverflow
            ? isScrollChart
              ? -chartWidth + containerWidth - scroll
              : 0
            : 0,
          transition: isTransition ? "all 1.5s ease-in-out" : "",
        }}
      >
        <Line
          data={
            !isBloodPressure
              ? lineData(data, valueIndex)
              : bPLineData(data, valueIndex)
          }
          options={
            !isBloodPressure
              ? lineOption(chartOption)
              : bPLineOption(chartOption)
          }
          onElementsClick={(elememt) => {
            if (elememt[0]) {
              setValueIndex(elememt[0]._index);
            }
          }}
          redraw={!isScrollChart}
        />
      </div>
    </div>
  );
};

export default LineChart;
