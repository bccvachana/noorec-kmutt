import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import withDeviceDetect from "../../hoc/withDeviceDetect";

const FixedFullPage = (props) => {
  const { isShow, children, device } = props;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let Timer;
    if (isShow) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
    } else {
      Timer = setTimeout(() => {
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0"));
      }, 200);
    }
    return () => {
      clearTimeout(Timer);
    };
  }, [isShow]);

  const { pathname } = useLocation();
  useEffect(() => {
    let scrollTimer;
    if (device === "Mobile") {
      scrollTimer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 250);
    }
    return () => {
      clearTimeout(scrollTimer);
    };
  }, [pathname]);

  window.addEventListener("scroll", () => {
    if (document.body.style.position !== "fixed") {
      setScrollY(window.scrollY);
    }
  });

  return children;
};

export default withDeviceDetect(FixedFullPage);
