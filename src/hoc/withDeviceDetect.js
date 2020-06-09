import React, { useState, useEffect } from "react";

const checkDevice = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth > 1024) return "Desktop";
  else if (windowWidth > 768) return "Tablet";
  else return "Mobile";
};

const withDeviceDetect = (WrappedComponent) => {
  return (props) => {
    const [device, setDevice] = useState(checkDevice());

    window.addEventListener("resize", () => {
      setDevice(checkDevice());
    });

    return <WrappedComponent {...props} device={device} />;
  };
};

export default withDeviceDetect;
