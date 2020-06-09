import { criteriaCheck } from "./criteria";

const filterStatic = {
  weightHeight: {
    filter: "weight",
    props: ["weight", "height", "bmi"],
    criteria: ["bmi"],
  },
  temperature: {
    filter: "temperature",
    props: ["temperature"],
    criteria: ["temperature"],
  },
  bloodPressure: {
    filter: "bloodPressureHigh",
    props: ["bloodPressureHigh", "bloodPressureLow"],
    criteria: ["bloodPressureHigh", "bloodPressureLow"],
  },
  rate: {
    filter: "rate",
    props: ["rate"],
    criteria: ["rate"],
  },
  oxygen: {
    filter: "oxygen",
    props: ["oxygen"],
    criteria: ["oxygen"],
  },
};

const types = [
  "weightHeight",
  "temperature",
  "bloodPressure",
  "rate",
  "oxygen",
];

export const RecentRecord = (record, type) => {
  const { filter, props, criteria } = filterStatic[type];
  let temp = record.filter((rec) => {
    return rec[filter];
  });
  let result;
  if (temp.length !== 0) {
    let recent = temp[temp.length - 1];
    props.map((prop) => {
      result = { ...result, [prop]: recent[prop] };
      return null;
    });
    result = {
      ...result,
      [`${type === "weightHeight" ? "bmi" : type}Criteria`]: criteriaCheck[
        type
      ](criteria.map((criteria) => recent[criteria])),
    };
  }
  return result;
};

export const getRecentRecord = (record) => {
  let result;
  types.map((type) => {
    result = { ...result, ...RecentRecord(record, type) };
    return null;
  });

  return Object.keys(result).length !== 0 ? result : null;
};

export const Record = (record, type) => {
  const { filter, props, criteria } = filterStatic[type];
  let recordfilter = record.filter((rec) => {
    return rec[filter];
  });
  let result;
  if (recordfilter.length !== 0) {
    result = {
      type: type,
      createdAt: recordfilter.map((rec) => rec.createdAt.seconds),
    };
    props.map((prop) => {
      result = { ...result, [prop]: recordfilter.map((rec) => rec[prop]) };
      return null;
    });
    result = {
      ...result,
      criteria: recordfilter.map((rec) => {
        return criteriaCheck[type](criteria.map((criteria) => rec[criteria]));
      }),
    };
  }
  return result;
};

export const getRecord = (record) => {
  let result;
  types.map((type) => {
    const temp = Record(record, type);
    if (temp) result = { ...result, [type]: temp };
    return null;
  });

  return Object.keys(result).length !== 0 ? result : null;
};
