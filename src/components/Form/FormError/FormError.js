import React from "react";
import classes from "./FormError.module.scss";
import errorIcon from "../../../assets/error.svg";

const FormError = (props) => {
  const { error } = props;

  return (
    <div className={`${classes.FormError} ${error ? classes.isError : ""}`}>
      {error ? (
        <React.Fragment>
          <img className={classes.ErrorIcon} src={errorIcon} alt="errorIcon" />{" "}
          {error.message}
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default FormError;
