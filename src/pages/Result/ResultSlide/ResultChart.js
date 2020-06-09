import React, { useContext, useState, useEffect } from "react";
import classes from "./ResultSlide.module.scss";

import Chart from "../../../components/Result/Chart/Chart";
import ChartDetail from "./ChartDetail/ChartDetail";

import { Context } from "../../../App";
import { ResultSlideContext } from "./ResultSlide";
export const ResultChartContext = React.createContext();

const resultChartStatic = {
  weightHeight: ["weight", "height", "bmi"],
  temperature: ["temperature"],
  bloodPressure: ["bloodPressureHigh", "bloodPressureLow"],
  rate: ["rate"],
  oxygen: ["oxygen"],
};

const ResultChart = (props) => {
  const { record } = useContext(Context);
  const { type, isSlideShow, slideType } = useContext(ResultSlideContext);

  const [isChart, setIsChart] = useState(false);
  const [valueIndex, setValueIndex] = useState(
    record[type][resultChartStatic[type][0]].length - 1
  );

  const isBloodPressure = type === "bloodPressure";

  useEffect(() => {
    if (slideType !== 1 && !isSlideShow) {
      setIsChart(false);
      setValueIndex(record[type][resultChartStatic[type][0]].length - 1);
    } else {
      setIsChart(true);
    }
  }, [slideType]);

  return (
    <ResultChartContext.Provider
      value={{
        valueIndex: valueIndex,
        setValueIndex: setValueIndex,
        isBloodPressure: isBloodPressure,
      }}
    >
      <ChartDetail />
      <div id="ChartContainerRef" className={classes.Chart}>
        {isChart ? (
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
        ) : null}
      </div>
    </ResultChartContext.Provider>
  );
};

export default ResultChart;
