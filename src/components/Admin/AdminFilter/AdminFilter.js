import React from "react";
import classes from "./AdminFilter.module.scss";
import resultSlideStatic from "../../../pages/Result/static/resultSlideStatic";
import criteriaStatic from "../../../pages/Result/static/criteriaStatic";

const AdminFilter = (props) => {
  const { filter, setFilter, criteriaData, closeModal } = props;

  console.log(filter);

  return (
    <div className={classes.FilterModal}>
      <div className={classes.SelectAllContainer}>
        <div
          className={!filter ? classes.Selected : null}
          onClick={() => {
            setFilter(null);
            closeModal();
          }}
        >
          เลือกทั้งหมด
        </div>
      </div>
      {Object.keys(criteriaData).map((type) => {
        const { criteriaKey, data } = criteriaData[type];
        return (
          <div key={type} className={classes.FilterModalContainer}>
            <div className={classes.FilterModalTitle}>
              {resultSlideStatic[type].title}
            </div>
            <div className={classes.FilterModalCriteriaContainer}>
              {criteriaKey.map((criteria, i) => (
                <div
                  key={criteria}
                  className={
                    filter &&
                    filter.ref === type &&
                    criteriaStatic[type === "weightHeight" ? "bmi" : type][
                      filter.criteria
                    ].title === criteria
                      ? classes.Selected
                      : ""
                  }
                  onClick={() => {
                    setFilter({
                      ref: type,
                      criteria: Object.keys(
                        criteriaStatic[type === "weightHeight" ? "bmi" : type]
                      )[i],
                    });
                    closeModal();
                  }}
                >{`${criteria} (${data[i]})`}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminFilter;
