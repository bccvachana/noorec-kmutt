import React, { useContext, useState, useEffect } from "react";
import classes from "./OxygenCriteria.module.scss";

import Svg1 from "../../../../../assets/Result/Criteria/Oxygen/1.svg";
import Svg2 from "../../../../../assets/Result/Criteria/Oxygen/2.svg";
import Svg3 from "../../../../../assets/Result/Criteria/Oxygen/3.svg";
import Svg4 from "../../../../../assets/Result/Criteria/Oxygen/4.svg";

import ValueInfo from "../../../../../components/Result/ValueInfo/ValueInfo";
import { Context } from "../../../../../App";
import { ResultContext } from "../../../Result";
import { ResultSlideContext } from "../../ResultSlide";

const OxygenCriteria = (props) => {
  const {
    userData: { oxygen },
  } = useContext(Context);
  const { isFromTop } = useContext(ResultContext);
  const { isSlideShow } = useContext(ResultSlideContext);

  const [widthRef, setWidthRef] = useState(0);
  const [heightRef, setHeightRef] = useState(0);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    let timer;
    const oxygenRef = document.getElementById("OxygenRef");
    oxygenRef.onload = () => {
      timer = setTimeout(() => {
        setWidthRef(oxygenRef.clientWidth);
        setHeightRef(oxygenRef.clientHeight);
      }, 200);
    };
    timer = setTimeout(() => {
      setWidthRef(oxygenRef.clientWidth);
      setHeightRef(oxygenRef.clientHeight);
    }, 500);
    window.addEventListener("resize", () => {
      setWidthRef(oxygenRef.clientWidth);
      setHeightRef(oxygenRef.clientHeight);
    });
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isSlideShow && isFromTop) {
      setIsShow(true);
    } else if (!isSlideShow && !isFromTop) {
      timer = setTimeout(() => {
        setIsShow(false);
      }, 200);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isSlideShow]);

  return (
    <React.Fragment>
      <div className={classes.ContainerRelative}>
        <div className={classes.ContainerAbsolute}>
          <img
            id="OxygenRef"
            className={classes.ImgRef}
            src={Svg1}
            alt="Svg1"
          />
        </div>
        <div className={classes.ContainerAbsolute}>
          <div
            className={classes.Container}
            style={{ width: widthRef, height: heightRef }}
          >
            <img
              className={`${classes.Svg2} ${isShow ? classes.Animate : ""}`}
              src={Svg2}
              alt="Svg2"
            />
            <img
              className={`${classes.Svg3} ${isShow ? classes.Animate : ""}`}
              src={Svg3}
              alt="Svg3"
            />
            <img
              className={`${classes.Svg4} ${isShow ? classes.Animate : ""}`}
              src={Svg4}
              alt="Svg4"
            />
          </div>
        </div>
      </div>
      <div className={classes.ValueContainer}>
        <ValueInfo type="oxygen" data={oxygen} titleCenter />
      </div>
    </React.Fragment>
  );
};

export default OxygenCriteria;
