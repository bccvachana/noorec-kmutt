import React, { useContext, useState, useEffect } from "react";
import classes from "./RateCriteria.module.scss";
import { motion } from "framer-motion";

import Svg1 from "../../../../../assets/Result/Criteria/Rate/1.svg";

import ValueInfo from "../../../../../components/Result/ValueInfo/ValueInfo";
import { Context } from "../../../../../App";

const RateCriteria = (props) => {
  const {
    recentRecord: { rate },
  } = useContext(Context);

  const [widthRef, setWidthRef] = useState(0);
  const [heightRef, setHeightRef] = useState(0);

  useEffect(() => {
    let timer;
    const rateRef = document.getElementById("RateRef");
    rateRef.onload = () => {
      timer = setTimeout(() => {
        setWidthRef(rateRef.clientWidth);
        setHeightRef(rateRef.clientHeight);
      }, 200);
    };
    window.addEventListener("resize", () => {
      setWidthRef(rateRef.clientWidth);
      setHeightRef(rateRef.clientHeight);
    });
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <div id="RateContainerRef" className={classes.ContainerRelative}>
        <div className={classes.ContainerAbsolute}>
          <img id="RateRef" className={classes.ImgRef} src={Svg1} alt="Svg1" />
        </div>
        <div className={classes.ContainerAbsolute}>
          <div
            className={classes.Container}
            style={{ width: widthRef, height: heightRef }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 483 161"
              className={classes.Path}
            >
              <motion.path
                d="M6.5 85.5 182.5 85.5 205.5 6.5 245.5 154.5 289.5 47.5 304.5 85.5 476.5 85.5"
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 2.7,
                  times: [0, 0.8, 1],
                  ease: "easeInOut",
                  loop: Infinity,
                }}
              />
            </motion.svg>
          </div>
        </div>
      </div>
      <div className={classes.ValueContainer}>
        <ValueInfo type="rate" data={rate} titleCenter />
      </div>
    </React.Fragment>
  );
};

export default RateCriteria;
