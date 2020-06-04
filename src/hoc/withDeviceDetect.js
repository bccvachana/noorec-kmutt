import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const withDeviceDetect = (WrappedComponent) => {
  return (props) => {
    const matchTablet = useMediaQuery(
      "(min-width: 768px) and (max-width: 1023px)"
    );
    const matchDesktop = useMediaQuery("(min-width: 1024px)");
    const device =
      matchTablet || matchDesktop
        ? matchTablet
          ? "Tablet"
          : "Desktop"
        : "Mobile";
    return <WrappedComponent {...props} device={device} />;
  };
};

export default withDeviceDetect;
