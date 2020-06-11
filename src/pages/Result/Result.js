import React, { useContext, useState, useEffect } from "react";
import ResultSwiper from "./ResultSwiper";
import "../../assets/Result/info.scss";

import { Context } from "../../App";

import ResultNotFound from "./ResultNotFound";
import Overview from "./Overview/Overview";
import ResultSlide from "./ResultSlide/ResultSlide";

export const ResultContext = React.createContext();

const types = [
  "weightHeight",
  "temperature",
  "bloodPressure",
  "rate",
  "oxygen",
];

const Result = (props) => {
  const { setIsLoading } = props;
  const { recentRecord, record } = useContext(Context);

  const [swiper, setSwiper] = useState(null);
  const [index, setIndex] = useState(0);
  const [isFromTop, setIsFromTop] = useState(true);
  const [isRecord, setIsRecord] = useState(false);

  let pageIndex;
  if (record) {
    pageIndex = types.filter((type) => {
      return record[type];
    });
  }

  useEffect(() => {
    if (recentRecord && record) {
      if (
        Object.keys(recentRecord).length !== 0 &&
        Object.keys(record).length
      ) {
        setIsRecord(true);
      }
    } else setIsRecord(false);
  }, [recentRecord, record]);

  return isRecord ? (
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
        <Overview setIsLoading={setIsLoading} />
        {types.map((type) =>
          record[type] ? (
            <ResultSlide
              key={type}
              type={type}
              pageIndex={pageIndex.indexOf(type) + 1}
            />
          ) : null
        )}
      </ResultSwiper>
    </ResultContext.Provider>
  ) : (
    <ResultNotFound setIsLoading={setIsLoading} />
  );
};

export default Result;
