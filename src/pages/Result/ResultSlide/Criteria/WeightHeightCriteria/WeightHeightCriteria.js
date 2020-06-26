import React, { useContext, useState, useEffect } from "react";
import classes from "./WeightHeightCriteria.module.scss";
import Swiper from "react-id-swiper";

import "../../../../../assets/Result/Criteria/WeightHeight/WeightHeightSwiper.scss";
import ValueInfo from "../../../../../components/Result/ValueInfo/ValueInfo";
import weightHeightStatic from "../../../../../assets/Result/Criteria/WeightHeight/WeightHeightStatic";

import { Context } from "../../../../../App";
import { ResultContext } from "../../../Result";
import { ResultSlideContext } from "../../ResultSlide";

const WeightHeightCriteria = (props) => {
  const { criteria } = props;
  const {
    userData: { weight, height, bmi },
  } = useContext(Context);
  const { bar, ratio } = weightHeightStatic[criteria];
  const { isFromTop } = useContext(ResultContext);
  const { isSlideShow } = useContext(ResultSlideContext);

  const [swiper, setSwiper] = useState(null);
  const [swiperWidth, setSwiperWidth] = useState(null);

  const bmiConst = (height * height) / 10000;

  const swiperParams = {
    allowTouchMove: false,
    spaceBetween: 30,
    direction: "vertical",
    getSwiper: (swiper) => {
      setSwiper(swiper);
    },
  };

  const reOrder = (criteria) => {
    const weightHeightStaticKey = Object.keys(weightHeightStatic);
    const index = weightHeightStaticKey.indexOf(criteria);
    const temp = weightHeightStaticKey.splice(0, index + 1);
    return [...weightHeightStaticKey, ...temp];
  };
  const keyArray = reOrder(criteria);

  useEffect(() => {
    let timer;
    const weightHeightSwiperRef = document.getElementById(
      "WeightHeightSwiperRef"
    );
    weightHeightSwiperRef.onload = () => {
      timer = setTimeout(() => {
        setSwiperWidth(weightHeightSwiperRef.clientWidth);
      }, 200);
    };
    timer = setTimeout(() => {
      setSwiperWidth(weightHeightSwiperRef.clientWidth);
    }, 500);
    window.addEventListener("resize", () => {
      if (weightHeightSwiperRef) {
        setSwiperWidth(weightHeightSwiperRef.clientWidth);
      }
    });
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isSlideShow && isFromTop) {
      if (swiper) {
        for (let slide = 2; slide <= 10; slide++) {
          swiper.slideTo(slide, 175 * slide);
        }
      }
    } else if (!isSlideShow && !isFromTop) {
      if (swiper) {
        timer = setTimeout(() => {
          swiper.slideTo(1, 200);
        }, 200);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isSlideShow]);

  return (
    <React.Fragment>
      <div className={classes.SwiperValueRef}>
        <div
          className={classes.SwiperValue}
          style={{ left: `-${(swiperWidth - ratio * swiperWidth) / 4}px` }}
        >
          <img
            id="WeightHeightSwiperRef"
            src={weightHeightStatic["extremeObase"].svg}
            alt="svg"
          />
          {swiperWidth ? (
            <div id="WeightHeightSwiper" style={{ width: swiperWidth }}>
              <Swiper {...swiperParams}>
                {[...Array(2)].map(() => {
                  return keyArray.map((key, index) => (
                    <div key={`${key}${index}`}>
                      <img src={weightHeightStatic[key].svg} alt="svg" />
                    </div>
                  ));
                })}
              </Swiper>
            </div>
          ) : null}

          <div className={classes.ValueContainer}>
            <ValueInfo type="weight" data={weight} />
            <div className={classes.ValueSpace} />
            <ValueInfo type="height" data={height} />
            <div className={classes.ValueSpace} />
            <ValueInfo type="bmi" data={bmi} />
          </div>
        </div>
      </div>
      <div className={classes.ColorBarContainer}>
        <div className={classes.ColorBarWeightLabel}>
          <div>{(18.5 * bmiConst).toFixed(1)}</div>
          <div>{(23 * bmiConst).toFixed(1)}</div>
          <div>{(25 * bmiConst).toFixed(1)}</div>
          <div>{(30 * bmiConst).toFixed(1)}</div>
        </div>
        <div className={classes.ColorBar}>
          {Object.keys(weightHeightStatic).map((key) => (
            <div key={key}></div>
          ))}
          <span
            className={classes.Circle}
            style={{
              left: `calc(${bar}% - 0.6rem)`,
            }}
          ></span>
        </div>
        <div className={classes.ColorBarDetail}>
          {Object.keys(weightHeightStatic).map((key) => (
            <div key={key}>{weightHeightStatic[key].title}</div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default WeightHeightCriteria;
