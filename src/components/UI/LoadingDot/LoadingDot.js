import React from "react";
import "./LoadingDot.scss";

const LoadingDot = (props) => (
  <div
    className="spinner"
    style={{
      width: props.width,
      height: props.width,
    }}
  >
    <div className="bounce1" style={{ backgroundColor: props.color }} />
    <div className="bounce2" style={{ backgroundColor: props.color }} />
    <div className="bounce3" style={{ backgroundColor: props.color }} />
  </div>
);

export default LoadingDot;
