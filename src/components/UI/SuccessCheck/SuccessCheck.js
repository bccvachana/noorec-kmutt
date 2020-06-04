import React, { Component } from "react";
import mojs from "@mojs/core";

import withDeviceDetect from "../../../hoc/withDeviceDetect";

class Check extends mojs.CustomShape {
  getShape() {
    return '<path class="st0" d="M12,56.4l19.2,19.2c1.2,1.2,3.2,1.2,4.4,0c0,0,0,0,0,0L88,23.4"/>';
  }
  getLength() {
    return 105.99502563476562;
  } // optional
}
mojs.addShape("check", Check); // passing name and Bubble class

class SucessCheck extends Component {
  state = {
    isStarted: false,
  };

  componentDidMount() {
    const timer = setTimeout(() => {
      const device = this.props.device;
      const state = this;
      clearTimeout(timer);
      const circle = new mojs.Shape({
        delay: 500,
        parent: "#check",
        shape: "circle",
        fill: "#fa5458",
        radius: { 0: 80 },
        duration: 1000,
        scale: device === "Mobile" ? 1.3 * 0.8 : 1.5 * 0.8,
        easing: "circ.inout",
      });
      const check = new mojs.Shape({
        parent: "#check",
        easing: "ease.inout",
        shape: "check",
        fill: "none",
        stroke: "white",
        strokeWidth: 10,
        strokeDasharray: "100%",
        strokeDashoffset: { "100%": "0%" },
        duration: 900,
        scale: device === "Mobile" ? 1.3 * 1.1 : 1.5 * 1.1,
      });
      const lines = new mojs.Burst({
        delay: 200,
        parent: "#check",
        radius: { 65: 75 },
        angle: 0,
        count: 8,
        scale: device === "Mobile" ? 1.3 * 1.1 : 1.5 * 1.1,
        children: {
          shape: "line",
          radius: 20,
          scale: 1,
          stroke: "#feb562",
          strokeWidth: 4,
          strokeDasharray: "100%",
          strokeDashoffset: { "-100%": "100%" },
          duration: 700,
          easing: "quad.out",
        },
      });
      const timeline = new mojs.Timeline({
        speed: 1.5,
        onPlaybackComplete() {
          state.setState({ isStarted: true });
        },
      });
      timeline.append(circle, check, lines);
      timeline.play();
    }, 200);
  }
  render() {
    const device = this.props.device;
    if (this.state.isStarted) {
      document.getElementById("check").innerHTML = "";
      const circle = new mojs.Shape({
        parent: "#check",
        shape: "circle",
        fill: "#fa5458",
        radius: 80,
        scale: device === "Mobile" ? 1.3 * 0.8 : 1.5 * 0.8,
        isShowStart: true,
      });
      const check = new mojs.Shape({
        parent: "#check",
        shape: "check",
        fill: "none",
        stroke: "white",
        strokeWidth: 10,
        strokeDasharray: "100%",
        strokeDashoffset: "0%",
        duration: 900,
        scale: device === "Mobile" ? 1.3 * 1.1 : 1.5 * 1.1,
        isShowStart: true,
      });
    }
    return (
      <React.Fragment>
        <div
          id="check"
          style={{
            position: "relative",
            width: "13rem",
            height: "13rem",
          }}
        />
      </React.Fragment>
    );
  }
}

export default withDeviceDetect(SucessCheck);
