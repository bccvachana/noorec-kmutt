import React, { useEffect } from "react";
import Error from "../../components/UI/Error/Error";

const ResultNotFound = (props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <Error
        title="ไม่พบข้อมูลสุขภาพของคุณ"
        linkLabel="คลิกที่นี่เพื่อตรวจสุขภาพ"
        to="/record"
      />
    </React.Fragment>
  );
};

export default ResultNotFound;
