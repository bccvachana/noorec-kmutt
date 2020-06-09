import React from "react";
import classes from "./ValueInfo.module.scss";
import infoStatic from "../../../pages/Result/static/infoStatic";
import resultArrow from "../../../assets/Result/resultArrow.svg";

const ValueInfo = (props) => {
  const { type, data, valueIndex, noTitle, titleCenter } = props;
  const { title, unit, toFixed } = infoStatic[type];

  const isValueIndex = valueIndex || valueIndex === 0;

  const difference = isValueIndex
    ? data[valueIndex - 1]
      ? data[valueIndex] - data[valueIndex - 1]
      : 0
    : null;

  return (
    <div
      className={classes.ValueInfo}
      style={{
        alignItems: isValueIndex || titleCenter ? "center" : "flex-start",
      }}
    >
      {noTitle ? null : <div className="InfoTitle">{title}</div>}
      {isValueIndex ? (
        <div className={classes.Container}>
          <div className={`InfoValue ${classes.ValueChart} ${classes[type]}`}>
            {parseFloat(data[valueIndex]).toFixed(toFixed)}
          </div>
          <div className={classes.Space}></div>
          <div className={`${classes.DetailContainerChart}  ${classes[type]}`}>
            <div className={classes.Unit}>{unit}</div>
            <div className={classes.Detail}>
              {difference > 0 ? (
                <img src={resultArrow} alt="resultArrow" />
              ) : (
                <img
                  src={resultArrow}
                  alt="resultArrow"
                  style={{ transform: "rotate(180deg)" }}
                />
              )}{" "}
              {Math.abs(difference).toFixed(toFixed)}
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.Container}>
          <div className="InfoValue">{parseFloat(data).toFixed(toFixed)}</div>
          {unit ? (
            <React.Fragment>
              <div className={classes.Space} />
              <div className={classes.Unit}>{unit}</div>
            </React.Fragment>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ValueInfo;
