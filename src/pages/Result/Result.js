import React, { useState, useEffect } from "react";
import classes from "./Result.module.scss";
import Swiper from "react-id-swiper";
import "../../assets/Result/swiper.scss";
import "../../assets/Result/ResultSwiper.scss";
import icon from "../../assets/image.svg";

const Result = (props) => {
  const { isLoading } = props;
  const [swiper, setSwiper] = useState(null);
  const [index, setIndex] = useState(0);
  const [isFromTop, setIsFromTop] = useState(true);

  const swiperParams = {
    direction: "vertical",
    speed: 450,
    followFinger: false,
    mousewheel: true,
    simulateTouch: false,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
      progressbarOpposite: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    getSwiper: (swiper) => {
      setSwiper(swiper);
    },
    on: {
      slideChange: () => {
        if (swiper) {
          const index = swiper.activeIndex;
          setIndex((prevIndex) => {
            setIsFromTop(index > prevIndex ? true : false);
            return index;
          });
          window.sessionStorage.setItem("noorecResultIndex", index);
        }
      },
    },
  };

  return (
    <React.Fragment>
      <div id="ResultSwiper" className={classes.Container}>
        {!isLoading ? (
          <Swiper {...swiperParams}>
            <div>uuuuu</div>
            <div>uuuuu</div>
            <div>uuuuu</div>
          </Swiper>
        ) : null}
      </div>
      <div className={classes.FooterMenu}>
        <div>หน้าหลัก</div>
        <div>ตรวจสุขภาพ</div>
        <div>บันทึกสุขภาพ</div>
        <div>บทความ</div>
      </div>
    </React.Fragment>
  );
};

export default Result;
