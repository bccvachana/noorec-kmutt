import React, { useContext, useState, useEffect } from "react";
import classes from "./BloodPressureCriteria.module.scss";

import ValueInfo from "../../../../../components/Result/ValueInfo/ValueInfo";
import Svg1 from "../../../../../assets/Result/Criteria/BloodPressure/1.svg";
import Svg2 from "../../../../../assets/Result/Criteria/BloodPressure/2.svg";

import { Context } from "../../../../../App";

const BloodPressureCriteria = (props) => {
  const {
    userData: { bloodPressureHigh, bloodPressureLow },
  } = useContext(Context);

  const [widthRef, setWidthRef] = useState(0);
  const [heightRef, setHeightRef] = useState(0);
  const [containerHeightRef, setContainerHeightRef] = useState(0);

  useEffect(() => {
    let timer;
    const bloodPressureRef = document.getElementById("BloodPressureRef");
    const bloodPressureContainerRef = document.getElementById(
      "BloodPressureContainerRef"
    );
    bloodPressureRef.onload = () => {
      timer = setTimeout(() => {
        setWidthRef(bloodPressureRef.clientWidth);
        setHeightRef(bloodPressureRef.clientHeight);
        setContainerHeightRef(bloodPressureContainerRef.clientHeight);
      }, 200);
    };
    timer = setTimeout(() => {
      setWidthRef(bloodPressureRef.clientWidth);
      setHeightRef(bloodPressureRef.clientHeight);
      setContainerHeightRef(bloodPressureContainerRef.clientHeight);
    }, 500);
    window.addEventListener("resize", () => {
      setWidthRef(bloodPressureRef.clientWidth);
      setHeightRef(bloodPressureRef.clientHeight);
      setContainerHeightRef(bloodPressureContainerRef.clientHeight);
    });
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <div id="BloodPressureContainerRef" className={classes.ContainerRelative}>
        <div className={classes.ContainerAbsolute}>
          <img
            id="BloodPressureRef"
            className={classes.ImgRef}
            src={Svg1}
            alt="Svg1"
          />
        </div>
        <div className={classes.ContainerAbsolute}>
          <div
            className={classes.AnimationContainer}
            style={{ width: widthRef, height: heightRef }}
          >
            <img src={Svg2} alt="Svg2" />
          </div>
        </div>
      </div>
      <div
        className={classes.ValueContainer}
        style={{
          top:
            containerHeightRef > heightRef
              ? `-${(containerHeightRef - heightRef) / 2}px`
              : 0,
        }}
      >
        <ValueInfo type="bloodPressureHigh" data={bloodPressureHigh} />
        <div className={classes.Space}></div>
        <ValueInfo type="bloodPressureLow" data={bloodPressureLow} />
      </div>
    </React.Fragment>
  );
};

export default BloodPressureCriteria;
