import React, { useContext, useState, useEffect } from "react";
import classes from "./Chart.module.scss";
import withDeviceDetect from "../../../hoc/withDeviceDetect";
import Switch from "../Switch/Switch";

import BarChart from "./BarChart/BarChart";
import LineChart from "./LineChart/LineChart";
import ChartScroll from "./ChartScroll/ChartScroll";

import BarIcon from "../../../assets/Result/Chart/Bar.svg";
import BarIconWhite from "../../../assets/Result/Chart/BarWhite.svg";
import LineIcon from "../../../assets/Result/Chart/Line.svg";
import LineIconWhite from "../../../assets/Result/Chart/LineWhite.svg";

import infoStatic from "../../../pages/Result/static/infoStatic";

import { ResultChartContext } from "../../../pages/Result/ResultSlide/ResultChart";
export const ChartContext = React.createContext();

const Chart = (props) => {
  const { data, device } = props;
  const { valueIndex, isBloodPressure } = useContext(ResultChartContext);

  const [dataIndex, setDataIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [chartType, setChartType] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [isScrollChart, setIsScrollChart] = useState(false);
  const [isTransition, setIsTransition] = useState(false);
  const [isChart, setIsChart] = useState(false);

  const { type: dataType, data: dataData } = data[dataIndex];
  const chartWidth = !isBloodPressure
    ? 50 * dataData.length + 40
    : 2 * 50 * dataData[0].length + 20;
  const isChartOverflow = chartWidth > containerWidth;

  const rem = device === "Mobile" ? 14 : 16;
  const dataRange = !isBloodPressure
    ? Math.max(...dataData) - Math.min(...dataData)
    : Math.max(...[...dataData[0], ...dataData[1]]) -
      Math.min(...[...dataData[0], ...dataData[1]]);

  const switches = data.map(({ type }) => {
    return infoStatic[type].title;
  });

  useEffect(() => {
    setDataIndex(0);
    setContainerWidth(
      document.getElementById("ChartContainerRef").clientWidth - 2 * rem
    );
    window.addEventListener("resize", () => {
      setContainerWidth(
        document.getElementById("ChartContainerRef").clientWidth - 2 * rem
      );
      setScroll(0);
    });
  }, []);

  useEffect(() => {
    if (isChartOverflow) {
      setIsScrollChart(false);
      setIsTransition(true);
      setTimeout(() => {
        setIsScrollChart(true);
        setTimeout(() => {
          setIsTransition(false);
        }, 2000);
      }, 50);
    }
  }, [isChartOverflow]);

  useEffect(() => {
    setIsChart(false);
    setTimeout(() => {
      setIsChart(true);
    }, 25);
  }, [device]);

  return isChart ? (
    <ChartContext.Provider
      value={{
        chartWidth: chartWidth,
        containerWidth: containerWidth,
        data: [...dataData],
        isChartOverflow: isChartOverflow,
        scroll: scroll,
        setScroll: setScroll,
        isBloodPressure: isBloodPressure,
        isLineChart: chartType === 1,
        chartOption: {
          data: dataData,
          valueIndex: valueIndex,
          fontSize: rem,
          valuePadding: !isBloodPressure ? dataRange / 3 : dataRange / 5,
          toFixed: infoStatic[dataType].toFixed,
        },
        isScrollChart: isScrollChart,
        isTransition: isTransition,
      }}
    >
      <div
        className={classes.ChartControl}
        style={{
          justifyContent: switches.length > 1 ? "space-between" : "flex-end",
        }}
      >
        {switches.length > 1 ? (
          <Switch
            switches={[...switches]}
            switchIndex={dataIndex}
            setSwitchIndex={setDataIndex}
            activeColor="#fa5458"
            type="chart"
          />
        ) : null}
        <Switch
          switches={[
            {
              icon: <img src={BarIcon} alt="BarIcon" />,
              whiteIcon: <img src={BarIconWhite} alt="BarIconWhite" />,
            },
            {
              icon: <img src={LineIcon} alt="LineIcon" />,
              whiteIcon: <img src={LineIconWhite} alt="LineIconWhite" />,
            },
          ]}
          switchIndex={chartType}
          setSwitchIndex={setChartType}
          activeColor="#feb562"
          type="chart"
        />
      </div>
      <div
        className={classes.ChartContainer}
        style={{
          alignItems: `${isChartOverflow ? "flex-start" : "center"}`,
          marginBottom: `${isChartOverflow ? `${rem}px` : "0"}`,
        }}
      >
        <BarChart />
        <LineChart />
      </div>
      {isChartOverflow ? <ChartScroll /> : null}
    </ChartContext.Provider>
  ) : null;
};

export default withDeviceDetect(Chart);
