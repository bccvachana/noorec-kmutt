import { criteriaRefStatic } from "./static/typeStatic";
import criteriaStatic from "../pages/Result/static/criteriaStatic";

export const usersCritria = (users) => {
  let data;
  criteriaRefStatic.map((type) => {
    let criteria;
    Object.keys(criteriaStatic[type]).map((key) => {
      criteria = { ...criteria, [key]: 0 };
      return null;
    });
    const filterKey = Object.keys(users).filter((key) => {
      return users[key][`${type}Criteria`];
    });
    filterKey.map((key) => {
      criteria = {
        ...criteria,
        [users[key][`${type}Criteria`]]:
          criteria[users[key][`${type}Criteria`]] + 1,
      };
      return null;
    });
    data = {
      ...data,
      [type !== "bmi" ? type : "weightHeight"]: {
        userRecorded: filterKey.length,
        criteriaKey: Object.keys(criteria).map(
          (key) => criteriaStatic[type][key].title
        ),
        data: Object.keys(criteria).map((key) => criteria[key]),
      },
    };
    return null;
  });
  return data;
};
