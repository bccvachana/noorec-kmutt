import React, { useState, useEffect } from "react";
import classes from "./withLoading.module.scss";
import LoadingDot from "../../components/UI/LoadingDot/LoadingDot";

const withLoading = (WrappedComponent, withLoadingOption) => {
  const { time, auto } = withLoadingOption ? withLoadingOption : {};
  const loadingTime = time ? time : 350;
  const loadingAuto = auto !== undefined ? auto : true;

  return (props) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      if (loadingAuto) {
        const timer = setTimeout(() => {
          setIsLoading(false);
          clearTimeout(timer);
        }, loadingTime);
      }
    }, []);
    return (
      <React.Fragment>
        <div
          className={classes.Container}
          style={{
            visibility: isLoading ? "visible" : "hidden",
            opacity: isLoading ? 1 : 0,
          }}
        >
          <LoadingDot width="8rem" color="#fa5458" />
        </div>
        <WrappedComponent {...props} setIsLoading={setIsLoading} />
      </React.Fragment>
    );
  };
};

export default withLoading;
