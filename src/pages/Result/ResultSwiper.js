import React, { Component } from "react";
import classes from "./Result.module.scss";
import Swiper from "react-id-swiper";
import "../../assets/Result/swiper.scss";
import "../../assets/Result/ResultSwiper.scss";

class ResultSwiper extends Component {
  swiperParams = {
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
      this.props.setSwiper(swiper);
    },
    on: {
      slideChange: () => {
        const { swiper, setIndex, setIsFromTop } = this.props;
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

  render() {
    return (
      <div id="ResultSwiper" className={classes.Container}>
        <Swiper {...this.swiperParams}>
          {this.props.children.map((child, i) => {
            return (
              <div key={i} className={classes.ResultSlide}>
                <div className={classes.ResultSlideContainer}>{child}</div>
              </div>
            );
          })}
        </Swiper>
      </div>
    );
  }
}

export default ResultSwiper;
