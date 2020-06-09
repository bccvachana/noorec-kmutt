import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import classes from "../Chart.module.scss";

import { barData, barOption } from "./BarChartProps";
import { bPBarData, bPBarOption } from "./BpBarChartProps";

import { ChartContext } from "../../Chart/Chart";
import { ResultChartContext } from "../../../../pages/Result/ResultSlide/ResultChart";

require("./RoundedBar");

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
  const { valueIndex, setValueIndex } = useContext(ResultChartContext);

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
