import React from "react";
import classes from "./Switch.module.scss";

const Switch = (props) => {
  const { switches, switchIndex, setSwitchIndex, activeColor, type } = props;

  return (
    <div
      className={`${classes.SwitchContainer} ${
        type === "result" ? classes.ResultSwitch : null
      } ${type === "chart" ? classes.ChartSwitch : null}`}
      style={{
        gridTemplateColumns: `repeat(${switches.length}, 1fr)`,
      }}
    >
      <div
        className={classes.SwitchTypeActive}
        style={{
          width: `calc(100%/${switches.length})`,
          transform: `translateX(${switchIndex * 100}%)`,
          backgroundColor: activeColor,
        }}
      />
      {switches.map((switchEl, index) => (
        <div
          key={index}
          className={classes.Switch}
          style={{
            color: index === switchIndex ? "white" : "#3b4251",
          }}
          onClick={() => {
            setSwitchIndex(index);
          }}
        >
          {switchEl.icon ? (
            <div className={classes.IconContainer}>
              {React.cloneElement(switchEl.icon, {
                style: { opacity: index === switchIndex ? 0 : 1 },
              })}
              {React.cloneElement(switchEl.whiteIcon, {
                style: { opacity: index === switchIndex ? 1 : 0 },
              })}
            </div>
          ) : (
            switchEl
          )}
        </div>
      ))}
    </div>
  );
};

export default Switch;
