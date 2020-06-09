import React, { useContext, useState, useEffect } from "react";
import classes from "./ResultSlide.module.scss";

import resultSlideStatic from "../static/resultSlideStatic";
import ResultChart from "./ResultChart";
import ResultCriteria from "./ResultCriteria";

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
  const { type, pageIndex } = props;
  const { index } = useContext(ResultContext);
  const { openModal } = useContext(ModalContext);
  const { title, Criteria, detail } = resultSlideStatic[type];

  const [slideType, setSlideType] = useState(0);
  const [isSlideShow, setIsSlideShow] = useState(false);

  useEffect(() => {
    setIsSlideShow(index === pageIndex ? true : false);
  }, [index]);

  useEffect(() => {
    let timer;
    if (!isSlideShow) {
      timer = setTimeout(() => {
        setSlideType(0);
      }, 200);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isSlideShow]);

  return (
    <ResultSlideContext.Provider
      value={{ type: type, isSlideShow: isSlideShow, slideType: slideType }}
    >
      <div className={classes.TitleBar}>
        <div className={classes.Title}>
          {title}
          <img
            src={infoModalButton}
            alt="infoModalButton"
            onClick={() => openModal(detail, true, "Result")}
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
      <div className={classes.Container}>
        <div className={classes.ResultCriteria}>
          <ResultCriteria Component={Criteria} />
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
            <ResultChart />
          </div>
        </div>
      </div>
    </ResultSlideContext.Provider>
  );
};

export default ResultSlide;
