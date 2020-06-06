import React, { useContext, useState, useEffect } from "react";
import classes from "./ResultSlide.module.scss";

import resultSlideStatic from "../static/resultSlideStatic";
import ResultChart from "./ResultChart";

import infoModalButton from "../../../assets/Result/infoModalButton.svg";
import Switch from "../../../components/Result/Switch/Switch";
import criteria from "../../../assets/Result/criteria.svg";
import criteriaWhite from "../../../assets/Result/criteriaWhite.svg";
import chart from "../../../assets/Result/chart.svg";
import chartWhite from "../../../assets/Result/chartWhite.svg";

import { ResultContext } from "../Result";
import { ModalContext } from "../../../components/Web/ModalContainer/ModalContainer";
export const ResultSlideContext = React.createContext();

const ResultSlide = (props) => {
  const { type } = props;
  const { index } = useContext(ResultContext);
  const { openModal } = useContext(ModalContext);
  const { title, Criteria, Chart, pageIndex } = resultSlideStatic[type];

  const [slideType, setSlideType] = useState(1);
  const [isSlideShow, setIsSlideShow] = useState(false);

  useEffect(() => {
    setIsSlideShow(index === pageIndex ? true : false);
  }, [index]);

  useEffect(() => {
    if (!isSlideShow) {
      setSlideType(1);
    }
  }, [isSlideShow]);

  return (
    <ResultSlideContext.Provider
      value={{ type: type, isSlideShow: isSlideShow }}
    >
      <div className={classes.TitleBar}>
        <div className={classes.Title}>
          {title}
          <img
            src={infoModalButton}
            alt="infoModalButton"
            onClick={() => openModal(null, true)}
          />
        </div>
        <Switch
          switches={[
            {
              icon: <img src={criteria} alt="criteria" />,
              whiteIcon: <img src={criteriaWhite} alt="criteriaWhite" />,
            },
            {
              icon: <img src={chart} alt="chart" />,
              whiteIcon: <img src={chartWhite} alt="chartWhite" />,
            },
          ]}
          switchIndex={slideType}
          setSwitchIndex={setSlideType}
          activeColor="#fa5458"
          type="result"
        />
      </div>
      <div className={`${classes.Container} ContainerRef`}>
        <div className={classes.ResultCriteria}>
          {/* {React.cloneElement(Criteria, {
            ...props,
            pageIndex: pageIndex,
            data: data,
          })} */}
          <div
            className={classes.ResultChart}
            style={
              slideType === 1
                ? {
                    opacity: 1,
                    visibility: "visible",
                  }
                : { opacity: 0, visibility: "hidden" }
            }
          >
            <ResultChart></ResultChart>
            {/* {React.cloneElement(Chart, {
            ...props,
            pageIndex: pageIndex,
            data: data,
            isChartScroll: isChartScroll,
          })} */}
          </div>
        </div>
      </div>
    </ResultSlideContext.Provider>
  );
};

export default ResultSlide;
