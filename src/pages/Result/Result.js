import React, { useContext, useState, useEffect } from "react";
import classes from "./Result.module.scss";
import ResultSwiper from "./ResultSwiper";
import "../../assets/Result/info.scss";

import { Context } from "../../App";

import Overview from "./Overview/Overview";
import ResultSlide from "./ResultSlide/ResultSlide";

export const ResultContext = React.createContext();

const Result = (props) => {
  const { setIsLoading } = props;
  const [swiper, setSwiper] = useState(null);
  const [index, setIndex] = useState(0);
  const [isFromTop, setIsFromTop] = useState(true);

  const { recordData } = useContext(Context);

  useEffect(() => {
    let timer;
    if (recordData) {
      timer = setTimeout(() => {
        // document.getElementById("OverviewImg").onload = () => {
        //   setIsLoading(false);
        // };
        setIsLoading(false);
      }, 200);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [recordData]);

  return recordData ? (
    <ResultContext.Provider
      value={{
        index: index,
        isFromTop: isFromTop,
      }}
    >
      <ResultSwiper
        swiper={swiper}
        setSwiper={setSwiper}
        setIndex={setIndex}
        setIsFromTop={setIsFromTop}
      >
        <Overview />
        <ResultSlide type="weightHeight" />
      </ResultSwiper>
    </ResultContext.Provider>
  ) : null;
};

export default Result;
