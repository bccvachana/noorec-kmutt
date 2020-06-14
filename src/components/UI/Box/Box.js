import React from "react";
import classes from "./Box.module.scss";

const Box = (props) => {
  const { children, style } = props;

  return (
    <div className={classes.Box} style={style}>
      {children}
    </div>
  );
};

export default Box;
