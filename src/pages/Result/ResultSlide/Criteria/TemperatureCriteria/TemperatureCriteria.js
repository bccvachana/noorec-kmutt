import React, { useContext } from "react";
import classes from "./TemperatureCriteria.module.scss";

import ValueInfo from "../../../../../components/Result/ValueInfo/ValueInfo";
import temperatureSvg from "../../../../../assets/Result/Criteria/Temperature/temperature.svg";

import { Context } from "../../../../../App";

const TemperatureCriteria = (props) => {
  const {
    userData: { temperature },
  } = useContext(Context);

  return (
    <div className={classes.ContainerRelative}>
      <div className={classes.ContainerAbsolute}>
        <div className={classes.Container}>
          <div className={classes.TemperatureContainer}>
            <img src={temperatureSvg} alt="temperature" />
            <div className={classes.BarContainer}>
              <div className={classes.Bar}></div>
            </div>
          </div>
          <div className={classes.ValueContainer}>
            <ValueInfo type="temperature" data={temperature} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureCriteria;
