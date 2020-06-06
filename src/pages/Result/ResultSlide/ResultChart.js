import React, { useContext, useState } from "react";
import classes from "./ResultSlide.module.scss";

import { ResultSlideContext } from "./ResultSlide";
export const ResultChartContext = React.createContext();

const ResultChart = (props) => {
  const { children } = props;
  const { type, isSlideShow } = useContext(ResultSlideContext);

  const [isChart, setIsChart] = useState(false);
  const [isChartScroll, setIsChartScroll] = useState(false);
  const [valueIndex, setValueIndex] = useState(0);

  return (
    <ResultSlideContext.Provider
      value={{
        valueIndex: valueIndex,
        setValueIndex: setValueIndex,
      }}
    >
      {children}
      <div className={classes.Chart}>
        {/* {isChart ? (
          data[0].type === "bloodPressure" ? (
            <BpChart
              data={data}
              valueIndex={valueIndex}
              setValueIndex={setValueIndex}
            />
          ) : (
            <Chart
              data={data}
              valueIndex={valueIndex}
              setValueIndex={setValueIndex}
            />
          )
        ) : null} */}
      </div>
    </ResultSlideContext.Provider>
  );
};

export default ResultChart;
